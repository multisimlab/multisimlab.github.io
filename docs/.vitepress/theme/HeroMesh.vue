<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const root = ref<HTMLElement | null>(null)
const canvas = ref<HTMLCanvasElement | null>(null)

type Node = {
  x: number
  y: number
  vx: number
  vy: number
  ox: number
  oy: number
  angle: number
  turn: number
  speed: number
}

let nodes: Node[] = []
let raf = 0
let width = 0
let height = 0
let dpr = 1
let mouseX = 0
let mouseY = 0
let mouseActive = false
let reduceMotion = false
let resizeObserver: ResizeObserver | null = null
let lastTs = 0
let nodeCount = 70
let linkDist = 72

const MOUSE_RADIUS = 130

function desiredNodeCount(w: number, h: number) {
  const area = w * h
  // 手机区域小 → 少节点；桌面稍多
  if (area < 90000) return 42
  if (area < 160000) return 64
  return 88
}

function initNodes() {
  nodeCount = desiredNodeCount(width, height)
  linkDist = Math.max(56, Math.min(86, Math.sqrt(width * height) * 0.16))
  nodes = Array.from({ length: nodeCount }, () => {
    const x = Math.random() * width
    const y = Math.random() * height
    return {
      x,
      y,
      ox: x,
      oy: y,
      vx: 0,
      vy: 0,
      angle: Math.random() * Math.PI * 2,
      turn: (Math.random() - 0.5) * 1.8,
      // 像素 / 秒
      speed: 22 + Math.random() * 28
    }
  })
}

function resize() {
  const el = root.value
  const c = canvas.value
  if (!el || !c) return

  const rect = el.getBoundingClientRect()
  const nextW = Math.max(1, Math.floor(rect.width))
  const nextH = Math.max(1, Math.floor(rect.height))
  const sizeChanged =
    Math.abs(nextW - width) > 2 || Math.abs(nextH - height) > 2

  width = nextW
  height = nextH
  dpr = Math.min(window.devicePixelRatio || 1, 2)

  c.width = Math.floor(width * dpr)
  c.height = Math.floor(height * dpr)
  c.style.width = `${width}px`
  c.style.height = `${height}px`

  const ctx = c.getContext('2d')
  if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

  if (!nodes.length || sizeChanged) initNodes()
}

function brandColor(alpha: number) {
  const dark = document.documentElement.classList.contains('dark')
  return dark
    ? `rgba(96, 165, 250, ${alpha})`
    : `rgba(37, 99, 235, ${alpha})`
}

function step(ts: number) {
  const c = canvas.value
  if (!c) return
  const ctx = c.getContext('2d')
  if (!ctx) return

  if (!lastTs) lastTs = ts
  // 限制单帧 dt，避免切后台回来瞬间猛跳；按真实时间积分，高刷/低刷速度一致
  const dt = Math.min(0.05, (ts - lastTs) / 1000) || 0.016
  lastTs = ts

  ctx.clearRect(0, 0, width, height)

  if (width < 2 || height < 2) {
    raf = requestAnimationFrame(step)
    return
  }

  for (const n of nodes) {
    if (!reduceMotion) {
      // 缓慢随机转向（弧度 / 秒）
      n.turn += (Math.random() - 0.5) * 3 * dt
      n.turn *= Math.exp(-2 * dt)
      n.angle += n.turn * dt + (Math.random() - 0.5) * 1.2 * dt

      let ax = Math.cos(n.angle) * n.speed
      let ay = Math.sin(n.angle) * n.speed

      // 轻微拉回原点附近，持续漂移但不散尽
      ax += (n.ox - n.x) * 0.45
      ay += (n.oy - n.y) * 0.45

      if (mouseActive) {
        const dx = mouseX - n.x
        const dy = mouseY - n.y
        const dist = Math.hypot(dx, dy) || 1
        if (dist < MOUSE_RADIUS) {
          const force = (1 - dist / MOUSE_RADIUS) * 120
          ax += (dx / dist) * force
          ay += (dy / dist) * force
        }
      }

      n.vx = ax
      n.vy = ay
      n.x += n.vx * dt
      n.y += n.vy * dt

      if (Math.random() < 2.5 * dt) {
        n.speed = 20 + Math.random() * 32
        n.turn = (Math.random() - 0.5) * 2
      }
    }

    const pad = 10
    if (n.x < pad) {
      n.x = pad
      n.angle = Math.PI - n.angle
    } else if (n.x > width - pad) {
      n.x = width - pad
      n.angle = Math.PI - n.angle
    }
    if (n.y < pad) {
      n.y = pad
      n.angle = -n.angle
    } else if (n.y > height - pad) {
      n.y = height - pad
      n.angle = -n.angle
    }
  }

  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const a = nodes[i]
      const b = nodes[j]
      const dx = a.x - b.x
      const dy = a.y - b.y
      const dist = Math.hypot(dx, dy)
      if (dist > linkDist) continue

      let alpha = (1 - dist / linkDist) * 0.42
      if (mouseActive) {
        const mx = (a.x + b.x) / 2
        const my = (a.y + b.y) / 2
        const md = Math.hypot(mx - mouseX, my - mouseY)
        if (md < MOUSE_RADIUS) alpha += (1 - md / MOUSE_RADIUS) * 0.3
      }

      ctx.beginPath()
      ctx.moveTo(a.x, a.y)
      ctx.lineTo(b.x, b.y)
      ctx.strokeStyle = brandColor(Math.min(alpha, 0.8))
      ctx.lineWidth = 1
      ctx.stroke()
    }
  }

  for (const n of nodes) {
    let r = 2
    let alpha = 0.65
    if (mouseActive) {
      const md = Math.hypot(n.x - mouseX, n.y - mouseY)
      if (md < MOUSE_RADIUS) {
        const t = 1 - md / MOUSE_RADIUS
        r += t * 2
        alpha = 0.5 + t * 0.45
      }
    }
    ctx.beginPath()
    ctx.arc(n.x, n.y, r, 0, Math.PI * 2)
    ctx.fillStyle = brandColor(alpha)
    ctx.fill()
  }

  if (mouseActive) {
    const g = ctx.createRadialGradient(
      mouseX,
      mouseY,
      0,
      mouseX,
      mouseY,
      MOUSE_RADIUS
    )
    g.addColorStop(0, brandColor(0.14))
    g.addColorStop(1, brandColor(0))
    ctx.fillStyle = g
    ctx.fillRect(0, 0, width, height)
  }

  raf = requestAnimationFrame(step)
}

function onPointerMove(e: PointerEvent) {
  // 手机滑动页面时不抢交互，只响应鼠标 / 精确指针
  if (e.pointerType === 'touch') return
  const el = root.value
  if (!el) return
  const rect = el.getBoundingClientRect()
  mouseX = e.clientX - rect.left
  mouseY = e.clientY - rect.top
  mouseActive = true
}

function onPointerLeave() {
  mouseActive = false
}

onMounted(() => {
  reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  resize()
  resizeObserver = new ResizeObserver(() => resize())
  if (root.value) resizeObserver.observe(root.value)
  lastTs = 0
  raf = requestAnimationFrame(step)
})

onUnmounted(() => {
  cancelAnimationFrame(raf)
  resizeObserver?.disconnect()
})
</script>

<template>
  <div
    ref="root"
    class="hero-mesh"
    aria-hidden="true"
    @pointermove="onPointerMove"
    @pointerleave="onPointerLeave"
  >
    <canvas ref="canvas" class="hero-mesh-canvas" />
  </div>
</template>

<style scoped>
.hero-mesh {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 24px;
  z-index: 2;
  cursor: crosshair;
  /* 允许手机正常滚动，不拦截触摸 */
  touch-action: pan-y;
  pointer-events: auto;
}

.hero-mesh-canvas {
  display: block;
  width: 100%;
  height: 100%;
}
</style>

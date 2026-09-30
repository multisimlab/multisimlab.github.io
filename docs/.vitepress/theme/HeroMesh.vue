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
  /** 随机游走方向角 */
  angle: number
  /** 游走转向速度 */
  turn: number
  /** 基础漂移速度 */
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

const NODE_COUNT = 110
const LINK_DIST = 78
const MOUSE_RADIUS = 150

function initNodes() {
  nodes = Array.from({ length: NODE_COUNT }, () => {
    const x = Math.random() * width
    const y = Math.random() * height
    return {
      x,
      y,
      ox: x,
      oy: y,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      angle: Math.random() * Math.PI * 2,
      turn: (Math.random() - 0.5) * 0.08,
      speed: 0.25 + Math.random() * 0.55
    }
  })
}

function resize() {
  const el = root.value
  const c = canvas.value
  if (!el || !c) return

  const rect = el.getBoundingClientRect()
  width = Math.max(1, Math.floor(rect.width))
  height = Math.max(1, Math.floor(rect.height))
  dpr = Math.min(window.devicePixelRatio || 1, 2)

  c.width = Math.floor(width * dpr)
  c.height = Math.floor(height * dpr)
  c.style.width = `${width}px`
  c.style.height = `${height}px`

  const ctx = c.getContext('2d')
  if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

  if (!nodes.length) initNodes()
  else {
    for (const n of nodes) {
      n.x = Math.min(width, Math.max(0, n.x))
      n.y = Math.min(height, Math.max(0, n.y))
      n.ox = Math.min(width, Math.max(0, n.ox))
      n.oy = Math.min(height, Math.max(0, n.oy))
    }
  }
}

function brandColor(alpha: number) {
  const dark = document.documentElement.classList.contains('dark')
  return dark
    ? `rgba(96, 165, 250, ${alpha})`
    : `rgba(37, 99, 235, ${alpha})`
}

function step() {
  const c = canvas.value
  if (!c) return
  const ctx = c.getContext('2d')
  if (!ctx) return

  ctx.clearRect(0, 0, width, height)

  for (const n of nodes) {
    if (!reduceMotion) {
      // 随机转向 + 噪声，形成不规则自动运动
      n.turn += (Math.random() - 0.5) * 0.04
      n.turn *= 0.96
      n.angle += n.turn + (Math.random() - 0.5) * 0.12

      const driftX = Math.cos(n.angle) * n.speed
      const driftY = Math.sin(n.angle) * n.speed
      n.vx += driftX * 0.08 + (Math.random() - 0.5) * 0.06
      n.vy += driftY * 0.08 + (Math.random() - 0.5) * 0.06

      // 很弱的回弹，避免完全飞出，但仍保持随机感
      n.vx += (n.ox - n.x) * 0.0006
      n.vy += (n.oy - n.y) * 0.0006

      if (mouseActive) {
        const dx = mouseX - n.x
        const dy = mouseY - n.y
        const dist = Math.hypot(dx, dy) || 1
        if (dist < MOUSE_RADIUS) {
          const force = (1 - dist / MOUSE_RADIUS) * 0.09
          n.vx += (dx / dist) * force
          n.vy += (dy / dist) * force
        }
      }

      n.vx *= 0.96
      n.vy *= 0.96
      n.x += n.vx
      n.y += n.vy

      // 偶尔随机换速，避免轨迹太规律
      if (Math.random() < 0.008) {
        n.speed = 0.2 + Math.random() * 0.7
        n.turn = (Math.random() - 0.5) * 0.1
      }
    }

    // hard clamp inside container
    const pad = 8
    if (n.x < pad) {
      n.x = pad
      n.vx *= -0.6
    } else if (n.x > width - pad) {
      n.x = width - pad
      n.vx *= -0.6
    }
    if (n.y < pad) {
      n.y = pad
      n.vy *= -0.6
    } else if (n.y > height - pad) {
      n.y = height - pad
      n.vy *= -0.6
    }
  }

  // links
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const a = nodes[i]
      const b = nodes[j]
      const dx = a.x - b.x
      const dy = a.y - b.y
      const dist = Math.hypot(dx, dy)
      if (dist > LINK_DIST) continue

      let alpha = (1 - dist / LINK_DIST) * 0.45
      if (mouseActive) {
        const mx = (a.x + b.x) / 2
        const my = (a.y + b.y) / 2
        const md = Math.hypot(mx - mouseX, my - mouseY)
        if (md < MOUSE_RADIUS) {
          alpha += (1 - md / MOUSE_RADIUS) * 0.35
        }
      }

      ctx.beginPath()
      ctx.moveTo(a.x, a.y)
      ctx.lineTo(b.x, b.y)
      ctx.strokeStyle = brandColor(Math.min(alpha, 0.85))
      ctx.lineWidth = 1
      ctx.stroke()
    }
  }

  // nodes
  for (const n of nodes) {
    let r = 2.2
    let alpha = 0.7
    if (mouseActive) {
      const md = Math.hypot(n.x - mouseX, n.y - mouseY)
      if (md < MOUSE_RADIUS) {
        const t = 1 - md / MOUSE_RADIUS
        r += t * 2.2
        alpha = 0.55 + t * 0.45
      }
    }

    ctx.beginPath()
    ctx.arc(n.x, n.y, r, 0, Math.PI * 2)
    ctx.fillStyle = brandColor(alpha)
    ctx.fill()
  }

  // cursor glow
  if (mouseActive) {
    const g = ctx.createRadialGradient(
      mouseX,
      mouseY,
      0,
      mouseX,
      mouseY,
      MOUSE_RADIUS
    )
    g.addColorStop(0, brandColor(0.16))
    g.addColorStop(1, brandColor(0))
    ctx.fillStyle = g
    ctx.fillRect(0, 0, width, height)
  }

  raf = requestAnimationFrame(step)
}

function onPointerMove(e: PointerEvent) {
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
  touch-action: none;
}

.hero-mesh-canvas {
  display: block;
  width: 100%;
  height: 100%;
}
</style>

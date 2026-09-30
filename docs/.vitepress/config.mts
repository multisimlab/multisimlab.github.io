import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-CN',

  title: '多学科仿真智能课题组',

  description: '面向多学科仿真、科学计算与智能化工程的研究与应用',

  // 用户站 multisimlab/multisimlab.github.io → https://multisimlab.github.io/（根路径，无需 base）

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }]
  ],

  // Windows 上 Node 常把 localhost 解析为 ::1，浏览器却优先连 127.0.0.1，导致 ERR_CONNECTION_REFUSED
  vite: {
    server: {
      host: '127.0.0.1',
      port: 5173,
      strictPort: true
    }
  },

  themeConfig: {
    siteTitle: '多学科仿真智能课题组',

    logo: '/logo.svg',

    nav: [
      { text: '首页', link: '/' },
      { text: '研究方向', link: '/research/' },
      { text: '科研项目', link: '/projects/' },
      { text: '科研成果', link: '/publications/' },
      { text: '课题组成员', link: '/members/' },
      { text: '加入我们', link: '/join/' },
      { text: '新闻动态', link: '/news/' }
    ],

    sidebar: {
      '/research/': [
        {
          text: '研究方向',
          items: [
            { text: '研究方向概览', link: '/research/' },
            { text: '多物理场仿真', link: '/research/multiphysics' },
            { text: '科学计算', link: '/research/scientific-computing' },
            { text: '人工智能', link: '/research/artificial-intelligence' },
            { text: '化工过程与系统', link: '/research/chemical-engineering' }
          ]
        }
      ],

      '/projects/': [
        {
          text: '科研项目',
          items: [
            { text: '项目概览', link: '/projects/' },
            { text: '软件平台', link: '/projects/software' }
          ]
        }
      ],

      '/publications/': [
        {
          text: '科研成果',
          items: [
            { text: '成果概览', link: '/publications/' },
            { text: '论文', link: '/publications/papers' },
            { text: '专利', link: '/publications/patents' },
            { text: '软件', link: '/publications/software' },
            { text: '获奖', link: '/publications/awards' }
          ]
        }
      ],

      '/news/': [
        {
          text: '新闻动态',
          items: [
            { text: '全部新闻', link: '/news/' }
          ]
        }
      ]
    },

    search: {
      provider: 'local'
    },

    socialLinks: [],

    footer: {
      message: '多学科仿真智能课题组',
      copyright: 'Copyright © 2026'
    },

    outline: {
      label: '本页目录'
    },

    docFooter: {
      prev: '上一页',
      next: '下一页'
    },

    returnToTopLabel: '返回顶部',

    sidebarMenuLabel: '菜单',

    darkModeSwitchLabel: '深色模式',

    lightModeSwitchTitle: '切换到浅色模式',

    darkModeSwitchTitle: '切换到深色模式'
  }
})

import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import MemberTable from './MemberTable.vue'
import HeroMesh from './HeroMesh.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout: () =>
    h(DefaultTheme.Layout, null, {
      'home-hero-image': () => h(HeroMesh)
    }),
  enhanceApp({ app }) {
    app.component('MemberTable', MemberTable)
  }
} satisfies Theme

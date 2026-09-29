import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import MemberTable from './MemberTable.vue'
import CollaboratorTable from './CollaboratorTable.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('MemberTable', MemberTable)
    app.component('CollaboratorTable', CollaboratorTable)
  }
} satisfies Theme

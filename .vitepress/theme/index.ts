// https://vitepress.dev/zh/guide/custom-theme
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import ElementPlus from 'element-plus'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme-without-fonts'
import { h } from 'vue'
import './style/index.css'
import './style/fonts.css'
import 'virtual:group-icons.css'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import AiDocAsideColumns from './components/AiDocAsideColumns.vue'
import AiDocAsideStatus from './components/AiDocAsideStatus.vue'
import AiDocBeforeRevisionInfo from './components/AiDocBeforeRevisionInfo.vue'
import LinkCard from './components/LinkCard.vue'
import NotFound from './components/NotFound.vue'
import SeeAlsoBar from './components/SeeAlsoBar.vue'

export default {
    extends: DefaultTheme,
    Layout: () => {
        return h(DefaultTheme.Layout, null, {
            // https://vitepress.dev/zh/guide/extending-default-theme#layout-slots
            'not-found': () => h(NotFound),
            'doc-before': () => h(AiDocBeforeRevisionInfo),
            'aside-top': () => h(AiDocAsideStatus),
            'aside-outline-after': () => h(AiDocAsideColumns),
        })
    },
    enhanceApp({ app }) {
        for (const [ key, component ] of Object.entries(ElementPlusIconsVue)) {
            app.component(key, component)
        }
        app.use(ElementPlus)
        app.component('LinkCard', LinkCard)
        app.component('SeeAlsoBar', SeeAlsoBar)
    }
} satisfies Theme

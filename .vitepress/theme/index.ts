// https://vitepress.dev/zh/guide/custom-theme
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import ElementPlus from "element-plus";
import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import { h } from "vue";
import "./style.css";
import "virtual:group-icons.css";
import "element-plus/dist/index.css";
import "element-plus/theme-chalk/dark/css-vars.css";
import AiDocAsideStatus from "../../src/components/AiDocAsideStatus.vue";
import AiDocAsideTagsMenu from "../../src/components/AiDocAsideTagsMenu.vue";
import NotFound from "../../src/components/NotFound.vue";
import Paragraph from "../../src/components/Paragraph.vue";
import RevisionInfo from "../../src/components/RevisionInfo.vue";

export default {
    extends: DefaultTheme,
    Layout: () => {
        return h(DefaultTheme.Layout, null, {
            // https://vitepress.dev/zh/guide/extending-default-theme#layout-slots
            'not-found': () => h(NotFound),
            'aside-top': () => h(AiDocAsideStatus),
            'aside-outline-after': () => h(AiDocAsideTagsMenu),
        })
    },
    enhanceApp({ app }) {
        for (const [ key, component ] of Object.entries(ElementPlusIconsVue)) {
            app.component(key, component)
        }
        app.use(ElementPlus)
        app.component('Paragraph', Paragraph)
        app.component('RevisionInfo', RevisionInfo)
    }
} satisfies Theme

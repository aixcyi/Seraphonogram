// https://vitepress.dev/guide/custom-theme
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import ElementPlus from "element-plus";
import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import { h } from "vue";
import "./style.css";
import "element-plus/dist/index.css";
import "element-plus/theme-chalk/dark/css-vars.css";
import NotFound from "../../src/components/NotFound.vue";
import RevisionInfo from "../../src/components/RevisionInfo.vue";
import TagsCloud from "../../src/components/TagsCloud.vue";

export default {
    extends: DefaultTheme,
    Layout: () => {
        return h(DefaultTheme.Layout, null, {
            // https://vitepress.dev/zh/guide/extending-default-theme#layout-slots
            'not-found': () => h(NotFound),
            'aside-outline-after': () => h(TagsCloud),
        })
    },
    enhanceApp({ app }) {
        for (const [ key, component ] of Object.entries(ElementPlusIconsVue)) {
            app.component(key, component)
        }
        app.use(ElementPlus)
        app.component('RevisionInfo', RevisionInfo)
    }
} satisfies Theme

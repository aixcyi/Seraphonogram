import { ElDivider } from "element-plus";
import { h } from "vue";

export const spacer = h(ElDivider, { direction: 'vertical' })

export const favicons: Record<string, string> = {
    'https://cheatsheets.zip': 'https://cheatsheets.zip/images/favicon.png?v=1',
    'https://quickref.cn': 'https://quickref.cn/icons/favicon.svg',
    'https://shiki.style': 'https://shiki.style/logo.svg',
    'https://vitepress.dev': 'https://vitepress.dev/vitepress-logo-mini.svg',
}

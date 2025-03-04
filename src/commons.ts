import { ElDivider } from "element-plus";
import { h } from "vue";

export const spacer = h(ElDivider, { direction: 'vertical' })

export const favicons: Record<string, string> = {
    'cn.quickref': 'https://quickref.cn/icons/favicon.svg',
    'com.jetbrains.blog': 'https://blog.jetbrains.com/wp-content/uploads/2024/01/cropped-mstile-310x310-1-192x192.png',
    'dev.vitepress': 'https://vitepress.dev/vitepress-logo-mini.svg',
    'style.shiki': 'https://shiki.style/logo.svg',
    'zip.cheatsheets': 'https://cheatsheets.zip/images/favicon.png?v=1',
}

export function getFavicon(url: URL) {
    return favicons[url.hostname.split('.').reverse().join('.')]
}

/**
 * VitePress Tools
 */

import { compile, match } from "path-to-regexp";
import type { DefaultTheme, UserConfig } from "vitepress";


function compileRewrites(rewrites: UserConfig['rewrites']) {
    const trimMd = (s: string) => {
        if (s.endsWith('.md'))
            return s.substring(0, s.length - 3)
        return s
    }
    switch (typeof rewrites) {
        case "object":
            const rewriteRules = Object.entries(rewrites || {}).map(
                ([ from, to ]) => ({
                    toPath: compile(`/${trimMd(to)}`),
                    matchUrl: match(from.startsWith('^') ? new RegExp(from) : from)
                })
            )
            return (page: string) => {
                for (const { matchUrl, toPath } of rewriteRules) {
                    const res = matchUrl(page)
                    if (res) {
                        return toPath(res.params).slice(1)
                    }
                }
                return page
            }
        case "function":
            return rewrites
        default:
            return (page: string) => page
    }
}


function rewriteSidebarItems(items: DefaultTheme.SidebarItem[], handle: ((link: string) => string)): DefaultTheme.SidebarItem[] {
    items.forEach(item => {
        if (item.items && item.items.length) {
            item.items = rewriteSidebarItems(item.items, handle)
        } else if (item.link) {
            item.link = handle(item.link)
        }
        return item
    })
    return items
}


/**
 * 对 `UserConfig.themeConfig.sidebar` 执行路由重写。
 */
export function rewriteSidebar(configs: UserConfig<DefaultTheme.Config>): UserConfig<DefaultTheme.Config> {
    if (!configs.themeConfig)
        return configs
    if (!configs.themeConfig.sidebar)
        return configs

    const rewriter = compileRewrites(configs.rewrites)

    if (Array.isArray(configs.themeConfig.sidebar))
        configs.themeConfig.sidebar = rewriteSidebarItems(configs.themeConfig.sidebar, rewriter)

    return configs
}

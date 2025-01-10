/**
 * VitePress Tools
 */

import { compile, match } from "path-to-regexp";
import type { DefaultTheme, UserConfig } from "vitepress";


/**
 * 去除字符串 s 末尾的 sub 部分（如果有的话）。
 */
function trimEnd(s: string, sub: string) {
    return s.endsWith(sub) ? s.slice(0, s.length - sub.length) : s
}

/**
 * 编译 `UserConfig.rewrites` 并返回重写函数。
 */
function compileRewrites(rewrites: UserConfig['rewrites']) {
    switch (typeof rewrites) {
        case "object":
            const rewriteRules = Object.entries(rewrites || {}).map(
                ([ from, to ]) => {
                    return {
                        toPath: compile(trimEnd(to, '.md')),
                        matchUrl: match(trimEnd(from, '.md')),
                    }
                }
            )
            return (page: string) => {
                for (const { matchUrl, toPath } of rewriteRules) {
                    const res = matchUrl(page)
                    if (res) {
                        return toPath(res.params)
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

/**
 * 按照 `UserConfig.rewrites` 递归重写 `DefaultTheme.SidebarItem[]`。
 */
function rewriteSidebarItems(items: DefaultTheme.SidebarItem[], handle: ((link: string) => string)): DefaultTheme.SidebarItem[] {
    items.forEach(item => {
        if (item.items && item.items.length) {
            item.items = rewriteSidebarItems(item.items, handle)
        } else if (item.link) {
            item.link = `/${handle(item.link)}`
        }
        return item
    })
    return items
}


/**
 * 按照 `UserConfig.rewrites` 对 `UserConfig.themeConfig.sidebar` 执行路由重写。
 *
 * > 用以解决 VitePress Sidebar 无法执行重写的问题。
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

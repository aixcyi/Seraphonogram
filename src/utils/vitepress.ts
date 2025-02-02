import type { DefaultTheme } from "vitepress";

export function rewriteItems(items: DefaultTheme.SidebarItem[], fn: (lnk: string) => string) {
    for (const item of items) {
        if (item.link)
            item.link = fn(item.link)
        else if (item.items)
            rewriteItems(item.items, fn)
    }
}

import { resolve } from 'path'
import { defineConfig } from 'vite'


// https://cn.vite.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            '@': resolve(__dirname, './.vitepress'),
        },
    },
    css: {
        preprocessorOptions: {
            scss: { api: 'modern-compiler' },
        },
    }
})

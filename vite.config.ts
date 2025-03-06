import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
    plugins: [ vue() ],
    resolve: {
        alias: {
            '@': resolve(__dirname, './src'),
        },
    },
    css: {
        preprocessorOptions: {
            scss: { api: 'modern-compiler' },
        },
    }
})

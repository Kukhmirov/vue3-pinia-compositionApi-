import vue from "@vitejs/plugin-vue";
import path from "path";
import { defineConfig, loadEnv } from "vite";

export default ({ mode }) => {
    process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

    return defineConfig({
        plugins: [ vue() ],
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "./src"),
            },
        },
    });
};
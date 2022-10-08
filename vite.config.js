import { defineConfig, loadEnv } from "vite";
import { createVuePlugin as vue } from "vite-plugin-vue2";

export default defineConfig(({command, mode}) => {

  const env = loadEnv(mode, process.cwd(), '')
  const appUrl = env.APP_URL
  
  const path = require("path");
  const host = appUrl.match(/^https?:\/\/([^:]+)/) && appUrl.match(/^https?:\/\/([^:]+)/)[1] || 'localhost'
  const port = appUrl.match(/:([0-9]+)/) && appUrl.match(/:([0-9]+)/)[1] || '8080'

  return {
    plugins: [vue()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src")
      },
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
    },
    server: {
      host,
      port
    }
  }
});

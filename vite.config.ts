import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import federation from "@originjs/vite-plugin-federation";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  const API_REM1 = `${env.VITE_REM1 ?? "http://localhost:5173/"}`;

  return {
    plugins: [
      react(),
      federation({
        name: "pokemonHome",
        remotes: {
          remote1: `${API_REM1}assets/remoteEntry.js`,
        },
        shared: ["react", "react-dom"],
      }),
    ],
    build: {
      modulePreload: false,
      target: "esnext",
      minify: false,
      cssCodeSplit: false,
    },
    resolve: {
      alias: [{ find: "@", replacement: resolve(__dirname, "src") }],
    },
  };
});

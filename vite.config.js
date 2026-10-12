import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // GitHub Pages は https://mizuho093067.github.io/task-board/ で公開されるため、
  // 本番ビルドのみリポジトリ名をベースパスにする
  base: process.env.NODE_ENV === "production" ? "/task-board/" : "/",
});

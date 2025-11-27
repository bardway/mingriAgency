import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteStaticCopy } from 'vite-plugin-static-copy';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // 复制 data 目录到构建输出
    viteStaticCopy({
      targets: [
        {
          src: 'data/*',
          dest: 'data'
        }
      ]
    })
  ],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  publicDir: 'public',
  base: './', // 适配 GitHub Pages 部署
});

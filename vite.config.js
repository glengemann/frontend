import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import pluginRewriteAll from 'vite-plugin-rewrite-all';

export default defineConfig({
  plugins: [vue(), pluginRewriteAll()],
})

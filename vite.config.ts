import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import jsconfigPaths from "vite-jsconfig-paths";
import path from 'path';

export default defineConfig({
 
  plugins: [react(), tailwindcss(), jsconfigPaths()],
   resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },  
});

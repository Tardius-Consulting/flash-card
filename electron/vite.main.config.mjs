import { defineConfig } from 'vite';

// https://vitejs.dev/config
export default defineConfig({
    build: {
    // Configura o Vite para gerar uma build em formato de biblioteca (bundle único)
        lib: {
            entry: resolve(__dirname, 'src/preload/index.ts'), // Ajuste para o caminho real do seu preload (pode ser .ts se usar TypeScript)
            formats: ['cjs'], // O Electron lida muito bem com CommonJS (.cjs/.js) no preload padrão
            fileName: () => 'index.js'
        },
        rollupOptions: {
        // Impede que o Vite tente empacotar o próprio Electron ou módulos nativos do Node.js
            external: ['electron'],
        },
    },
});

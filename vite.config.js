import glsl from 'vite-plugin-glsl'
import path from 'path'
import { createFilter } from '@rollup/pluginutils'
import { readFileSync } from 'fs'
import glslify from 'glslify'
import basicSsl from '@vitejs/plugin-basic-ssl'

function glslifyPlugin(options = {}) {
    const filter = createFilter(options.include, options.exclude)

    return {
        name: 'vite-plugin-glslify',
        transform(code, id) {
            if (!filter(id)) return

            if (
                id.endsWith('.glsl') ||
                id.endsWith('.vert') ||
                id.endsWith('.frag')
            ) {
                const transformedCode = glslify.compile(
                    readFileSync(id, 'utf-8')
                )
                return `export default ${JSON.stringify(transformedCode)}`
            }
        },
    }
}

export default {
    plugins: [basicSsl(), glsl(), glslifyPlugin({ include: '**/*.glsl' })],
    root: 'src/',
    publicDir: '../public/',
    base: './',
    server: {
        host: true,
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            public: path.resolve(__dirname, './public'),
            css: path.resolve(__dirname, './src/css'),
        },
    },
    esbuild: {
        drop: ['console', 'debugger'],
    },
    build: {
        outDir: '../dist',
        emptyOutDir: true,
        sourcemap: false,
    },
}

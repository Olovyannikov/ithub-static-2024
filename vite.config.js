import { defineConfig } from 'vite';
import vituum from 'vituum';
import pug from '@vituum/vite-plugin-pug';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import createSvgSpritePlugin from 'vite-plugin-svg-spriter'

export default defineConfig(({ mode }) => {
    console.log({ mode });

    return {
        base: mode === 'development' ? './' : '/ithub-static-2024',
        css: {
            devSourcemap: mode === 'development',
            preprocessorOptions: {
                scss: {
                    additionalData: [
                        '@import "./src/scss/general/_grid.scss";',
                        ''
                    ].join('\n')
                }
            }
        },
        plugins: [
            vituum({
                imports: {
                    filenamePattern: {
                        '+.css': [],
                        '+.scss': 'src/scss',
                    },
                },
            }),
            createSvgSpritePlugin({
                svgFolder: './public/icons'
            }),
            pug({
                root: './src',
                options: {
                    pretty: mode === 'production',
                },
            }),
            ViteImageOptimizer({
                test: /\.(jpe?g|png|gif|tiff|webp|svg|avif)$/i,
                exclude: undefined,
                include: undefined,
                includePublic: true,
                logStats: true,
                ansiColors: true,
                svg: {
                    multipass: true,
                    plugins: [
                        {
                            name: 'preset-default',
                            params: {
                                overrides: {
                                    cleanupNumericValues: false,
                                    removeViewBox: false,
                                },
                            },
                        },
                        'sortAttrs',
                        {
                            name: 'addAttributesToSVGElement',
                            params: {
                                attributes: [{ xmlns: 'http://www.w3.org/2000/svg' }],
                            },
                        },
                    ],
                },
                png: {
                    quality: 100,
                },
                jpeg: {
                    quality: 100,
                },
                jpg: {
                    quality: 100,
                },
                tiff: {
                    quality: 100,
                },
                gif: {},
                webp: {
                    lossless: true,
                },
                avif: {
                    lossless: true,
                },
                cache: false,
                cacheLocation: undefined,
            }),
        ],
        server: {
            host: true, open: true,
        },
    };
});
import { UserConfig } from 'vite';

export default {
    server: {
        host: '0.0.0.0',
        port: 5432
    },
    build: {
        minify: true,
        outDir: './out'
    }
} as UserConfig;

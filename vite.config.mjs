import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import svgr from 'vite-plugin-svgr';

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), '');

	return {
		plugins: [react({ disableOxcRecommendation: true }), svgr()],
		publicDir: false,
		base: './',
		define: {
			'process.env.NODE_ENV': JSON.stringify(
				mode === 'production' ? 'production' : 'development'
			),
			'process.env.API_URL': JSON.stringify(env.API_URL),
		},
		build: {
			outDir: 'dist-vite',
			emptyOutDir: true,
		},
	};
});

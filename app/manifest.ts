import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
	return {
		background_color: '#000000',
		categories: [
			'business',
			'e-commerce',
			'jewelry',
			'shopping'
		],
		description: 'Ювелир Трейд - ваш надежный партнер в оптовой торговле ювелирными изделиями.',
		dir: 'ltr',
		display: 'standalone',
		icons: [{
			src: '/web-app-manifest/192x192.png',
			type: 'image/png',
			sizes: '192x192',
			purpose: 'maskable'
		}, {
			src: '/web-app-manifest/512x512.png',
			type: 'image/png',
			sizes: '512x512',
			purpose: 'maskable'
		}],
		lang: 'ru',
		name: 'Ювелир Трейд Опт',
		orientation: 'portrait-primary',
		scope: '/',
		short_name: 'ЮТ Опт',
		start_url: '/catalog',
		theme_color: '#000000'
	}
}
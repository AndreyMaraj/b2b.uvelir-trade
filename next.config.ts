import type { NextConfig } from 'next'
import { NEXT_PUBLIC_FILE_SERVER_GET_IMAGE_PATH } from '@/consts'

const parsedUrl = new URL(NEXT_PUBLIC_FILE_SERVER_GET_IMAGE_PATH)

export default {
	images: {
		remotePatterns: [{
			protocol: parsedUrl.protocol.replace(':', '') === 'https' ? 'https' : 'http',
			hostname: parsedUrl.hostname,
			port: parsedUrl.port,
			pathname: `${parsedUrl.pathname}/**`
		}]
	},
	async headers() {
		return [{
			source: '/:path*{/}?',
			headers: [{
				key: 'X-Accel-Buffering',
				value: 'no'
			}]
		}]
	}
} as NextConfig
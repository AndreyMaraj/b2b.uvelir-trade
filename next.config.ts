import type { NextConfig } from 'next'
import { FILE_SERVER_GET_IMAGE_PATH } from '@/consts'

const parsedUrl = new URL(FILE_SERVER_GET_IMAGE_PATH),
	nextConfig: NextConfig = {
		images: {
			remotePatterns: [{
				protocol: parsedUrl.protocol.replace(':', '') === 'https' ? 'https' : 'http',
				hostname: parsedUrl.hostname,
				port: parsedUrl.port,
				pathname: `${parsedUrl.pathname}/**`
			}]
		}
	}

export default nextConfig
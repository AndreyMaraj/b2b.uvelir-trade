import type { NextConfig } from 'next'

const parsedUrl = new URL(process.env.NEXT_PUBLIC_IMAGE_UPLOAD_API_URL ?? ''),
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
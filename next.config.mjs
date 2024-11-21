/** @type {import('next').NextConfig} */

const parsedUrl = new URL(process.env.NEXT_PUBLIC_IMAGE_UPLOAD_API_URL)

const nextConfig = {
	images: {
		remotePatterns: [{
			protocol: parsedUrl.protocol.replace(':', ''),
			hostname: parsedUrl.hostname,
			port: parsedUrl.port,
			pathname: `${parsedUrl.pathname}/**`
		}]
	}
}

export default nextConfig
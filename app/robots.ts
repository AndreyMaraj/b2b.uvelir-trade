import { BASE_URL } from '@/consts'
import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: '*',
			allow: '/',
			disallow: [
				'/profile',
				'/administration',
				'/privacy-policy'
			]
		},
		sitemap: `${BASE_URL}/sitemap.xml`,
		host: BASE_URL
	}
}
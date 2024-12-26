import { NEXT_PUBLIC_BASE_URL } from '@/consts'
import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
	return [{
		url: NEXT_PUBLIC_BASE_URL,
		lastModified: new Date(),
		changeFrequency: 'monthly',
		priority: 0.6
	}, {
		url: `${NEXT_PUBLIC_BASE_URL}/about`,
		lastModified: new Date(),
		changeFrequency: 'monthly',
		priority: 0.5
	}, {
		url: `${NEXT_PUBLIC_BASE_URL}/privacy-policy`,
		lastModified: new Date(),
		changeFrequency: 'yearly',
		priority: 0.3
	}]
}
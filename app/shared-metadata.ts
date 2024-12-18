import type { OpenGraph } from 'next/dist/lib/metadata/types/opengraph-types'
import type { Twitter } from 'next/dist/lib/metadata/types/twitter-types'

export const openGraph: OpenGraph = {
	determiner: 'the',
	type: 'website',
	locale: 'ru_RU',
	siteName: 'Ювелир Трейд',
	countryName: 'Россия'
}

export const twitter: Twitter = {
	card: 'summary_large_image'
}
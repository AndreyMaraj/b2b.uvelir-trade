import { Inter } from 'next/font/google'
import '@/app/globals.css'
import type { ReactNode } from 'react'
import Header from '@/components/header'
import { Providers } from '@/app/providers'
import Footer from '@/components/footer'
import { auth } from '@/auth'
import type { Metadata } from 'next'
import { BASE_URL } from '@/consts'

const title = {
	default: 'Ювелир Трейд Опт',
	template: '%s | Ювелир Трейд Опт'
}

export const metadata: Metadata = {
	metadataBase: new URL(BASE_URL),
	title,
	applicationName: 'Ювелир Трейд Опт',
	authors: [{
		name: 'Команда разработки Ювелир Трейд',
		url: BASE_URL
	}],
	generator: 'Next.js',
	keywords: ['ювелирные изделия', 'оптовая торговля ювелиркой', 'ювелирный опт', 'дизайнерские украшения', 'золотые изделия оптом', 'серебряные украшения', 'ювелирные аксессуары', 'оптовые цены на ювелирные изделия', 'поставщики ювелирных изделий'],
	referrer: 'origin-when-cross-origin',
	creator: 'Ювелир Трейд',
	publisher: 'Ювелир Трейд',
	robots: {
		index: true,
		follow: true
	},
	openGraph: { title },
	twitter: { title },
	appleWebApp: {
		capable: true,
		title: 'Ювелир Трейд Опт',
		startupImage: '/apple-icon.png',
		statusBarStyle: 'black'
	},
	formatDetection: {
		telephone: true,
		date: true,
		email: true,
		url: true
	},
	bookmarks: ['https://uvelirtrade.ru'],
	category: 'Ювелирные изделия',
	classification: 'Бизнес, Торговля'
}

const inter = Inter({ subsets: ['latin'] })

export default async function Layout({ children }: Readonly<{ children: ReactNode }>) {
	const sessions = await auth(),
		sessionKey = new Date().valueOf()

	return (
		<html lang='ru' className={inter.className}>
			<body>
				<Providers className='min-h-screen bg-white flex flex-col' session={sessions} sessionKey={sessionKey}>
					<Header />
					<main className='flex-1 flex flex-col'>
						{children}
					</main>
					<Footer />
				</Providers>
			</body>
		</html>
	)
}
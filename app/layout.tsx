import { Inter } from 'next/font/google'
import '@/app/globals.css'
import type { ReactNode } from 'react'
import Header from '@/components/header'
import { Providers } from '@/app/providers'
import Footer from '@/components/footer'
import { auth } from '@/auth'

const inter = Inter({ subsets: ['latin'] })

export default async function Layout({ children }: Readonly<{ children: ReactNode }>) {
	const sessions = await auth(),
		sessionKey = new Date().valueOf()

	return (
		<html lang='ru'>
			<body className={inter.className}>
				<Providers className='min-h-screen bg-white flex flex-col' session={sessions} sessionKey={sessionKey}>
					<Header />
					{children}
					<Footer />
				</Providers>
			</body>
		</html>
	)
}
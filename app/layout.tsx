import { Inter } from 'next/font/google'
import './globals.css'
import { ReactNode } from 'react'
import Header from './_components/header'
import { Providers } from './providers'
import Footer from './_components/footer'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
	return (
		<html lang='ru'>
			<body className={inter.className}>
				<Providers className='min-h-screen bg-white flex flex-col'>
					<Header />
					<main className='flex-grow'>
						{children}
					</main>
					<Footer />
				</Providers>
			</body>
		</html>
	)
}
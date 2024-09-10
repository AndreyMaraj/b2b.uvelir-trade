import { Inter } from 'next/font/google'
import './globals.css'
import { ReactNode } from 'react'
import Header from '@/components/header'
import { Providers } from './providers'
import Footer from '@/components/footer'

const inter = Inter({ subsets: ['latin'] })

export default function ({ children }: Readonly<{ children: ReactNode }>) {
	return (
		<html lang='ru'>
			<body className={inter.className}>
				<Providers className='min-h-screen bg-white flex flex-col'>
					<Header />
					{children}
					<Footer />
				</Providers>
			</body>
		</html>
	)
}
import { Inter } from 'next/font/google';
import './globals.css';
import { ReactNode } from 'react';
import Header from './_components/header';
import { Providers } from './providers';
import Footer from './_components/footer';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
	return (
		<html lang='ru'>
			<body className={`${inter.className} min-h-screen bg-white`}>
				<Providers>
					<Header />
					{children}
					<Footer />
				</Providers>
			</body>
		</html>
	);
}
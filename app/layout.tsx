import { Inter } from 'next/font/google';
import './globals.css';
import { ReactNode } from 'react';
import { NextUIProvider } from '@nextui-org/react';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
	return (
		<html lang='en'>
			<body className={inter.className}>
				<NextUIProvider>
					{children}
				</NextUIProvider>
			</body>
		</html>
	);
}
import { ReactNode } from 'react'

export default function Layout({ children }: Readonly<{ children: ReactNode }>) {
	return (
		<main className='flex flex-grow'>
			{children}
		</main>
	)
}
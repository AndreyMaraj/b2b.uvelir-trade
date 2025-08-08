import type { ReactNode } from 'react'

export default function Layout({ children }: Readonly<{ children: ReactNode }>) {
	return (
		<main className='grow'>
			<div className='container px-4 py-3'>
				{children}
			</div>
		</main>
	)
}
import type { ReactNode } from 'react'

export default function Layout({ children }: Readonly<{ children: ReactNode }>) {
	return (
		<section className='flex-1'>
			<div className='container px-4 py-3'>
				{children}
			</div>
		</section>
	)
}
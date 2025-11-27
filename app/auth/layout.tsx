import type { ReactNode } from 'react'

export default function Layout({ children }: Readonly<{ children: ReactNode }>) {
	return (
		<section className='flex flex-1'>
			{children}
		</section>
	)
}
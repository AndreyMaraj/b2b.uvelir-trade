import { ReactNode } from 'react'

export default function ({ children }: Readonly<{ children: ReactNode }>) {
	return (
		<main className='flex flex-grow'>
			<div className='container px-4 py-3 flex items-center justify-center'>
				{children}
			</div>
		</main>
	)
}
import NavLinks from '@/components/nav-links'
import type { ReactNode } from 'react'
import type { Metadata } from 'next'

const title = {
	template: '%s | Администрирование | Ювелир Трейд Опт',
	default: 'Администрирование'
}

export const metadata: Metadata = {
	title,
	robots: {
		index: false,
		follow: true
	},
	openGraph: { title },
	twitter: { title }
}

const menuItems = [{
	label: 'Пользователи',
	href: '/administration/users'
}, {
	label: 'Заказы',
	href: '/administration/orders'
}]

export default function Layout({ children }: Readonly<{ children: ReactNode }>) {
	return (
		<main className='flex-grow'>
			<div className='container px-4 py-3 flex flex-col lg:flex-row gap-5'>
				<div className='lg:basis-1/5'>
					<NavLinks menuItems={menuItems} />
				</div>
				<div className='lg:basis-4/5 min-w-0'>
					{children}
				</div>
			</div>
		</main>
	)
}
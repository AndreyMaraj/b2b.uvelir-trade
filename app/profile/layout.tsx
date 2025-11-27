import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import NavLinks from '@/components/nav-links'

const title = {
	template: '%s | Личный кабинет | Ювелир Трейд Опт',
	default: 'Личный кабинет'
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
	label: 'Личная информация',
	href: '/profile'
}, {
	label: 'История заказов',
	href: '/profile/orders'
}, {
	label: 'Корзина',
	href: '/profile/shopping-bag'
}]

export default function Layout({ children }: Readonly<{ children: ReactNode }>) {
	return (
		<section className='flex-1'>
			<div className='container px-4 py-3 flex flex-col lg:flex-row gap-5'>
				<div className='lg:basis-1/5'>
					<NavLinks menuItems={menuItems} />
				</div>
				<div className='lg:basis-4/5 min-w-0'>
					{children}
				</div>
			</div>
		</section>
	)
}
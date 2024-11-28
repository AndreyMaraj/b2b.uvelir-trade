import type { ReactNode } from 'react'
import NavLinks from '@/components/nav-links'

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
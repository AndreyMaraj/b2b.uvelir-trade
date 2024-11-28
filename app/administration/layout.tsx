import NavLinks from '@/components/nav-links'
import type { ReactNode } from 'react'

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
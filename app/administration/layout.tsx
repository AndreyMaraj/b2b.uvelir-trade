import Link from '@/components/link'
import type { ReactNode } from 'react'

const menuItems = [{
	label: 'Пользователи',
	href: '/administration/users'
}, {
	label: 'Заказы',
	href: '/administration/orders'
}]

export default function ({ children }: Readonly<{ children: ReactNode }>) {
	return (
		<main className='flex-grow'>
			<div className='container px-4 py-3 flex flex-col lg:flex-row gap-5'>
				<div className='lg:basis-1/5'>
					<nav>
						<ul>
							{menuItems.map((item, index) =>
								<li key={index}>
									<Link href={item.href} color='foreground'>
										{item.label}
									</Link>
								</li>
							)}
						</ul>
					</nav>
				</div>
				<div className='lg:basis-4/5 min-w-0'>
					{children}
				</div>
			</div>
		</main>
	)
}
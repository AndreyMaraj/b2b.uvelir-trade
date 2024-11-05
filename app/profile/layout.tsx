import { signOut } from '@/auth'
import Link from '@/components/link'
import type { ReactNode } from 'react'

const menuItems = [{
	label: 'Личная информация',
	href: '/profile'
}, {
	label: 'История заказов',
	href: '/profile/orders'
}, {
	label: 'Загрузка файла Excel',
	href: ''
}, {
	label: 'Корзина',
	href: '/profile/shopping-bag'
}, {
	label: 'Смена пароля',
	href: ''
}]

export default function ({ children }: Readonly<{ children: ReactNode }>) {
	const onSiinOutButtonClick = async () => {
		'use server'
		await signOut({ redirectTo: '/' })
	}

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
							<li key='sign-out'>
								<form action={onSiinOutButtonClick}>
									<button type='submit'>
										Выход
									</button>
								</form>
							</li>
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
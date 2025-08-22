import type { Metadata } from 'next'
import { auth } from '@/auth'
import OrdersTable from './orders-table'
import { openGraph, twitter } from '@/app/shared-metadata'
import { UserRole } from '@prisma/client'

const title = 'Заказы',
	description = 'Управление заказами в системе.',
	url = '/administration/orders'

export const metadata: Metadata = {
	title,
	description,
	alternates: {
		canonical: url
	},
	openGraph: {
		...openGraph,
		url,
		title,
		description
	},
	twitter: {
		...twitter,
		description,
		title
	}
}

export default async function Page() {
	const session = await auth()

	if (!session || !session.user.id || session.user.role == UserRole.CLIENT) {
		return
	}

	return (
		<>
			<h1 className='text-3xl mb-5'>
				Администрирование заказов
			</h1>
			<OrdersTable userId={session.user.role == UserRole.MANAGER ? session.user.id : undefined} />
		</>
	)
}
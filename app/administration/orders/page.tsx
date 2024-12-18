import { auth } from '@/auth'
import OrdersTable from './orders-table'
import { openGraph, twitter } from '@/app/shared-metadata'
import type { Metadata } from 'next/types'

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

	if (!session || !session.user.id || session.user.role !== 'ADMIN') {
		return
	}

	return (
		<>
			<h1 className='text-3xl mb-5'>
				Администрирование заказов
			</h1>
			<OrdersTable />
		</>
	)
}
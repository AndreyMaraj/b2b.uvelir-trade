import { auth } from '@/auth'
import OrdersTable from './orders-table'
import { openGraph, twitter } from '@/app/shared-metadata'
import type { Metadata } from 'next'
import { UserRole } from '@prisma/client'

const title = 'Заказы',
	description = 'Просмотрите историю ваших заказов.',
	url = '/profile/orders'

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

	if (!session?.user.id || session.user.role !== UserRole.CLIENT) {
		return
	}

	return (
		<>
			<h1 className='text-3xl mb-5'>
				История заказов
			</h1>
			<div>
				<OrdersTable userId={session.user.id} />
			</div>
		</>
	)
}
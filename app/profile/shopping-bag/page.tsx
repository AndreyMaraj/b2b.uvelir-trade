import ProductsTable from './products-table'
import { auth } from '@/auth'
import { openGraph, twitter } from '@/app/shared-metadata'
import type { Metadata } from 'next'

const title = 'Корзина',
	description = 'Просмотрите товары в вашей корзине.',
	url = '/profile/shopping-bag'

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

	if (!session?.user.id) {
		return
	}

	return (
		<>
			<h1 className='text-3xl mb-5'>
				Оформление заказа
			</h1>
			<div>
				<ProductsTable userId={session.user.id} />
			</div>
		</>
	)
}
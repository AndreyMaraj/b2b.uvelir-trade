
import { auth } from '@/auth'
import OrdersTable from './orders-table'

export default async function () {
	const session = await auth()

	if (!session?.user.id) {
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
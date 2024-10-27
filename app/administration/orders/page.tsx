import { auth } from '@/auth'
import OrdersTable from './orders-table'

export default async function () {
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
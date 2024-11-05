import ProductsTable from './products-table'
import { auth } from '@/auth'

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
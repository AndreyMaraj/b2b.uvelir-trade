import { auth } from '@/auth'
import ProductsTable from './products-table'
import { getOrder } from '@/actions/order'
import EmptyProductMedia from '@/public/empty-product-media.jpg'

export default async function Page({ params }: Omit<PageProps<'id', never>, 'searchParams'>) {
	const session = await auth()

	if (!session?.user.id) {
		return
	}

	const order = await getOrder(Number(params.id)),
		orderItems = order?.orderItems.map(item => ({
			id: item.invisibleModelModification.id,
			count: item.count,
			article: item.invisibleModelModification.article,
			photo: item.invisibleModelModification.visibleModelModification.media.length === 1 ? `data:image/jpeg;base64,${item.invisibleModelModification.visibleModelModification.media[0].data}` : EmptyProductMedia.src
		})) ?? []

	return (
		<>
			<h1 className='text-3xl mb-5'>
				Заказ от {order?.date.toLocaleDateString('ru-RU')}
			</h1>
			<div>
				<ProductsTable rows={orderItems} />
			</div>
		</>
	)
}
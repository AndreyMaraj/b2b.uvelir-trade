import { auth } from '@/auth'
import ProductsTable from './products-table'
import { getOrder } from '@/actions/order'
import EmptyProductMedia from '@/public/empty-product-media.jpg'

export default async function ({ params }: Omit<PageProps<'id', never>, 'searchParams'>) {
	const session = await auth()

	if (!session?.user.id) {
		return
	}

	const order = await getOrder(Number(params.id), session.user.id),
		orderItems = order?.orderItems.map(item => ({
			id: item.invisibleModelModification.id,
			count: item.count,
			article: item.invisibleModelModification.article,
			photo: item.invisibleModelModification.visibleModelModification.productModificationMedia.length === 1 ? `/product-media/${item.invisibleModelModification.visibleModelModification.productModificationMedia[0].visibleModelModificationId}/${item.invisibleModelModification.visibleModelModification.productModificationMedia[0].id}.jpg` : EmptyProductMedia.src
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
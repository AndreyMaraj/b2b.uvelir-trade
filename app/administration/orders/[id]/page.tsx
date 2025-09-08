import type { Metadata } from 'next'
import { auth } from '@/auth'
import ProductsTable from './products-table'
import { getOrder } from '@/actions/order'
import EmptyProductMedia from '@/public/empty-product-media.jpg'
import { openGraph, twitter } from '@/app/shared-metadata'
import { NEXT_PUBLIC_FILE_SERVER_GET_IMAGE_PATH } from '@/consts'
import { Textarea } from '@heroui/input'
import { UserRole } from '@prisma/client'

interface CurrentPageProps extends PageProps<'/administration/orders/[id]', never> { }

export async function generateMetadata({ params }: CurrentPageProps): Promise<Metadata> {
	const session = await auth(),
		id = (await params).id,
		url = `/administration/orders/${id}`,
		{ order } = (!session || !session.user.id || session.user.role !== UserRole.ADMIN) ? { order: null } : await getOrder(Number(id), undefined, session.user.id),
		title = order ? `Заказ от ${new Date(order.date).toLocaleDateString('ru-RU')}` : '',
		description = 'Подробная информация о заказе.'

	return {
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
}

export default async function Page({ params }: CurrentPageProps) {
	const session = await auth()

	if (!session || !session.user.id || session.user.role === UserRole.CLIENT) {
		return
	}

	const { order, invisibleModelModifications } = await getOrder(Number((await params).id), undefined, session.user.id)

	if (!order) {
		return
	}

	const orderItems = invisibleModelModifications.map(invisibleModelModification => ({
		id: invisibleModelModification.id,
		photo: invisibleModelModification.media.length ? `${NEXT_PUBLIC_FILE_SERVER_GET_IMAGE_PATH}${invisibleModelModification.media[0].path}` : EmptyProductMedia.src,
		article: invisibleModelModification.article,
		...invisibleModelModification.orderItems.reduce((sum, orderItem) => ({
			sizes: orderItem.invisibleModelModificationSize ? `${sum.sizes ? sum.sizes + ' / ' : ''} ${orderItem.invisibleModelModificationSize.size.value} - ${orderItem.count}` : '',
			count: sum.count + orderItem.count,
			weight: sum.weight + orderItem.count * (orderItem.invisibleModelModificationSize?.averageWeight ?? invisibleModelModification.averageWeight)
		}), { sizes: '', count: 0, weight: 0 })
	})) ?? []

	return (
		<>
			<h1 className='text-3xl mb-5'>
				Заказ № {order.id} от {new Date(order.date).toLocaleDateString('ru-RU')}
			</h1>
			<div>
				Пользователь: {order.client.organization} {order.client.tin} {order.client.city}
			</div>
			<div>
				<ProductsTable orderId={order.id} rows={orderItems} />
				{order.comment &&
					<Textarea
						label='Комментарий к заказу'
						value={order.comment}
						isReadOnly
						className='mt-5'
					/>
				}
			</div>
		</>
	)
}
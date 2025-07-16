import ProductsTable from './products-table'
import { getOrder } from '@/actions/order'
import EmptyProductMedia from '@/public/empty-product-media.jpg'
import { openGraph, twitter } from '@/app/shared-metadata'
import type { Metadata } from 'next'
import { NEXT_PUBLIC_FILE_SERVER_GET_IMAGE_PATH } from '@/consts'

interface CurrentPageProps extends PageProps<'id', never> { }

export async function generateMetadata({ params }: CurrentPageProps): Promise<Metadata> {
	const id = (await params).id,
		url = `/profile/orders/${id}`,
		{ order } = await getOrder(Number(id)),
		title = order ? `Заказ от ${new Date(order.date).toLocaleDateString('ru-RU')}` : '',
		description = 'Подробная информация о вашем заказе.'

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
	const { order, invisibleModelModifications } = await getOrder(Number((await params).id))

	if (!order) {
		return
	}

	const orderItems = invisibleModelModifications.map(invisibleModelModification => ({
		id: invisibleModelModification.id,
		photo: invisibleModelModification.visibleModelModification.media.length ? `${NEXT_PUBLIC_FILE_SERVER_GET_IMAGE_PATH}${invisibleModelModification.visibleModelModification.media[0].path}` : EmptyProductMedia.src,
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
				Заказ от {new Date(order.date).toLocaleDateString('ru-RU')}
			</h1>
			<div>
				<ProductsTable rows={orderItems} />
			</div>
		</>
	)
}
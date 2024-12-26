import { auth } from '@/auth'
import ProductsTable from './products-table'
import { getOrder } from '@/actions/order'
import EmptyProductMedia from '@/public/empty-product-media.jpg'
import { openGraph, twitter } from '@/app/shared-metadata'
import type { Metadata } from 'next'
import { FILE_SERVER_GET_IMAGE_PATH } from '@/consts'

interface CurrentPageProps extends PageProps<'id', never> { }

export async function generateMetadata({ params }: CurrentPageProps): Promise<Metadata> {
	const id = (await params).id,
		url = `/profile/orders/${id}`,
		order = await getOrder(Number(id)),
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
	const session = await auth()

	if (!session?.user.id) {
		return
	}

	const order = await getOrder(Number((await params).id))

	if (!order) {
		return
	}
	const orderItems = order?.orderItems.map(item => ({
		id: item.invisibleModelModification.id,
		count: item.count,
		article: item.invisibleModelModification.article,
		photo: item.invisibleModelModification.visibleModelModification.media.length === 1 ? `${FILE_SERVER_GET_IMAGE_PATH}${item.invisibleModelModification.visibleModelModification.media[0].path}` : EmptyProductMedia.src
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
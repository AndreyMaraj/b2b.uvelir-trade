'use client'

import { getShoppingBagsWithProducts } from '@/actions/shopping-bag'
import { useShoppingBag } from '@/components/shopping-bag-hook'
import { Pagination } from '@nextui-org/pagination'
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/table'
import { useCallback, useEffect, useMemo, useState } from 'react'
import type { Key } from 'react'
import EmptyProductMedia from '@/public/empty-product-media.jpg'
import type { InvisibleModelModification, Order, ShoppingBagsProduct } from '@prisma/client'
import { Image } from '@nextui-org/image'
import { Button } from '@nextui-org/button'
import NextImage from 'next/image'
import Link from '@/components/link'
import { createOrder } from '@/actions/order'
import { Tooltip } from '@nextui-org/tooltip'
import { NEXT_PUBLIC_FILE_SERVER_GET_IMAGE_PATH } from '@/consts'

interface ProductRow {
	id: InvisibleModelModification['id'],
	photo: string,
	article: InvisibleModelModification['article'],
	sizes: string,
	count: ShoppingBagsProduct['count'],
	weight: number
}

const rowsPerPage = 25

export default function ProductsTable({ userId }: { userId: Order['userId'] }) {
	const { products, isPending, clearShoppingBag } = useShoppingBag(),
		[rows, setRows] = useState<ProductRow[]>([]),
		[page, setPage] = useState(1),
		pages = Math.ceil(rows.length / rowsPerPage),
		items = useMemo(() => {
			const start = (page - 1) * rowsPerPage,
				end = start + rowsPerPage

			return rows.slice(start, end)
		}, [page, rows]),
		renderCell = useCallback((product: ProductRow, columnKey: Key) => {
			const cellValue = product[columnKey as keyof ProductRow]

			switch (columnKey) {
				case 'photo':
					return (
						<Image
							as={NextImage}
							src={product.photo}
							alt={product.article}
							width={70}
							height={70}
							quality={100}
							radius='none'
							sizes='100vw'
							classNames={{ 'wrapper': 'flex-shrink-0' }}
							className='object-cover rounded-lg'
						/>
					)
				case 'article':
					return (
						<Link
							className='hover:underline'
							href={`/catalog/${cellValue}`}
							size='sm'
							color='foreground'
						>
							{cellValue}
						</Link>
					)
				case 'remove':
					return (
						<Tooltip color='danger' content='Удалить товар'>
							<Button variant='ghost' isIconOnly onPress={() => clearShoppingBag(product.id)} >
								<span className='iconify mdi--delete-outline text-2xl' />
							</Button>
						</Tooltip>
					)
				default: return cellValue
			}
		}, [clearShoppingBag]),
		onCreateOrderClick = useCallback(async () => {
			await createOrder(userId)
			clearShoppingBag()
		}, [userId, clearShoppingBag])

	useEffect(() => {
		const fetchData = async () =>
			setRows((await getShoppingBagsWithProducts(userId))?.map(invisibleModelModification => ({
				id: invisibleModelModification.id,
				photo: invisibleModelModification.visibleModelModification.media.length ? `${NEXT_PUBLIC_FILE_SERVER_GET_IMAGE_PATH}${invisibleModelModification.visibleModelModification.media[0].path}` : EmptyProductMedia.src,
				article: invisibleModelModification.article,
				...invisibleModelModification.shoppingBagsProducts.reduce((sum, shoppingBagsProduct) => ({
					sizes: shoppingBagsProduct.invisibleModelModificationSize ? `${sum.sizes ? sum.sizes + ' / ' : ''} ${shoppingBagsProduct.invisibleModelModificationSize.size.value} - ${shoppingBagsProduct.count}` : '',
					count: sum.count + shoppingBagsProduct.count,
					weight: sum.weight + shoppingBagsProduct.count * (shoppingBagsProduct.invisibleModelModificationSize?.averageWeight ?? invisibleModelModification.averageWeight)
				}), { sizes: '', count: 0, weight: 0 })
			})) ?? [])

		!isPending && fetchData()
	}, [products, isPending, setRows, userId])

	return (
		<>
			<Table bottomContentPlacement='outside'
				topContentPlacement='outside'
				topContent={!!rows.length &&
					<div className='flex justify-end'>
						<Button
							color='danger'
							endContent={<span className='iconify mdi--delete-outline text-2xl' />}
							onPress={() => clearShoppingBag()}
						>
							Очистить
						</Button>
					</div>
				}
				bottomContent={pages > 1 &&
					<div className='flex justify-center'>
						<Pagination
							isCompact
							showControls
							showShadow
							page={page}
							total={pages}
							onChange={setPage}
						/>
					</div>
				}>
				<TableHeader>
					<TableColumn key='photo' width={90}>
						Фото
					</TableColumn>
					<TableColumn key='article'>
						Артикул
					</TableColumn>
					<TableColumn key='sizes'>
						Размеры
					</TableColumn>
					<TableColumn key='count'>
						Количество
					</TableColumn>
					<TableColumn key='weight'>
						Вес
					</TableColumn>
					<TableColumn key='remove' align='end' width={90}>
						Удалить
					</TableColumn>
				</TableHeader>
				<TableBody
					items={items}
					emptyContent='Корзина пустая'
				>
					{item =>
						<TableRow key={item.id}>
							{columnKey =>
								<TableCell>
									{renderCell(item, columnKey)}
								</TableCell>
							}
						</TableRow>
					}
				</TableBody>
			</Table>
			{!!rows.length &&
				<div className='flex justify-center mt-5'>
					<Button as={Link} color='primary' onPress={onCreateOrderClick} href='/profile/orders'>
						Отправить заказ
					</Button>
				</div>
			}
		</>
	)
}
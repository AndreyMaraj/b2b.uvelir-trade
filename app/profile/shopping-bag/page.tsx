'use client'

import { getShoppingBagsProducts } from '@/actions/shopping-bag'
import { useShoppingBag } from '@/components/shopping-bag-hook'
import { Button, Pagination, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip } from '@nextui-org/react'
import { type Key, useCallback, useEffect, useMemo, useState } from 'react'
import EmptyProductMedia from '@/public/empty-product-media.jpg'
import type { InvisibleModelModification, ShoppingBagsProduct } from '@prisma/client'
import { Image } from '@nextui-org/react'
import NextImage from 'next/image'
import Link from '@/components/link'

interface ProductRow {
	id: InvisibleModelModification['id'],
	count: ShoppingBagsProduct['count'],
	article: InvisibleModelModification['article'],
	photo: string
}

const rowsPerPage = 5

export default function () {
	const { products, isPending, updateProducts, clearShoppingBag } = useShoppingBag(),
		[productRows, setProductRows] = useState<ProductRow[]>([]),
		[page, setPage] = useState(1),
		pages = Math.ceil(productRows.length / rowsPerPage),
		items = useMemo(() => {
			const start = (page - 1) * rowsPerPage,
				end = start + rowsPerPage

			return productRows.slice(start, end)
		}, [page, productRows]),
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
							href={`/catalog/product/${cellValue}`}
							size='sm'
							color='foreground'
						>
							{cellValue}
						</Link>
					)
				case 'remove':
					return (
						<Tooltip color='danger' content='Удалить товар'>
							<Button variant='ghost' isIconOnly onClick={() => updateProducts(product.id, 0)}>
								<span className='iconify mdi--delete-outline text-2xl' />
							</Button>
						</Tooltip>
					)
				default: return cellValue
			}
		}, [])

	useEffect(() => {
		const fetchData = async () =>
			setProductRows((await getShoppingBagsProducts(products.map(product => product.id)))?.map(product => ({
				id: product.invisibleModelModification.id,
				count: product.count,
				article: product.invisibleModelModification.article,
				photo: product.invisibleModelModification.visibleModelModification.productModificationMedia.length === 1 ? `/product-media/${product.invisibleModelModification.visibleModelModification.productModificationMedia[0].visibleModelModificationId}/${product.invisibleModelModification.visibleModelModification.productModificationMedia[0].id}.jpg` : EmptyProductMedia.src
			})) ?? [])
		if (!isPending) {
			fetchData()
		}
	}, [products, isPending, setProductRows])

	return (
		<>
			<h1 className='text-3xl mb-5'>
				Оформление заказа
			</h1>
			<Table
				topContent={!!productRows.length &&
					<div className='flex justify-end'>
						<Button
							color='danger'
							endContent={<span className='iconify mdi--delete-outline text-2xl' />}
							onClick={() => clearShoppingBag()}
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
					<TableColumn key='count'>
						Количество
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
			<div className='flex justify-center mt-5'>
				<Button color='primary'>
					Отправить заказ
				</Button>
			</div>
		</>
	)
}
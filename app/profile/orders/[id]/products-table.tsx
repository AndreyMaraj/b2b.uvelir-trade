'use client'

import { Pagination, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'
import { type Key, useCallback, useMemo, useState } from 'react'
import type { InvisibleModelModification, OrderItem } from '@prisma/client'
import { Image } from '@nextui-org/react'
import NextImage from 'next/image'
import Link from '@/components/link'

interface ProductRow {
	id: InvisibleModelModification['id'],
	count: OrderItem['count'],
	article: InvisibleModelModification['article'],
	photo: string
}

const rowsPerPage = 25

export default function ProductsTable({ rows }: { rows: ProductRow[] }) {
	const [page, setPage] = useState(1),
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
							href={`/catalog/product/${cellValue}`}
							size='sm'
							color='foreground'
						>
							{cellValue}
						</Link>
					)
				default: return cellValue
			}
		}, [])

	return (
		<Table bottomContentPlacement='outside'
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
			</TableHeader>
			<TableBody items={items}>
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
	)
}
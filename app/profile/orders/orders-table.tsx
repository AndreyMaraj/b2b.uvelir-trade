'use client'

import { Pagination } from '@nextui-org/pagination'
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/table'
import { useCallback, useEffect, useMemo, useState } from 'react'
import type { Key } from 'react'
import type { Order } from '@prisma/client'
import { getUserOrders } from '@/actions/order'
import Link from '@/components/link'

interface OrderRow {
	id: Order['id'],
	date: Order['date'],
	itemsCount: number,
	totalCount: number
}

const rowsPerPage = 25

export default function OrdersTable({ userId }: { userId: Order['userId'] }) {
	const [rows, setRows] = useState<OrderRow[]>([]),
		[page, setPage] = useState(1),
		pages = Math.ceil(rows.length / rowsPerPage),
		items = useMemo(() => {
			const start = (page - 1) * rowsPerPage,
				end = start + rowsPerPage

			return rows.slice(start, end)
		}, [page, rows]),
		renderCell = useCallback((order: OrderRow, columnKey: Key) => {
			const cellValue = order[columnKey as keyof OrderRow]

			if (cellValue instanceof Date) {
				return cellValue.toLocaleDateString('ru-RU')
			}

			return cellValue
		}, [])

	useEffect(() => {
		const fetchData = async () =>
			setRows((await getUserOrders(userId))?.map(order => ({
				id: order.id,
				date: order.date,
				itemsCount: order.orderItems.length,
				totalCount: order.orderItems.reduce((sum, orderItem) => sum + orderItem.count, 0)
			})) ?? [])

		fetchData()
	}, [userId])

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
			}
		>
			<TableHeader>
				<TableColumn key='date'>
					Дата
				</TableColumn>
				<TableColumn key='itemsCount'>
					Количество позиций
				</TableColumn>
				<TableColumn key='totalCount'>
					Количество штук
				</TableColumn>
			</TableHeader>
			<TableBody
				items={items}
				emptyContent='Вы еще не делали заказов'
			>
				{item =>
					<TableRow as={Link} key={item.id} href={`/profile/orders/${item.id}`} className='cursor-pointer'>
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
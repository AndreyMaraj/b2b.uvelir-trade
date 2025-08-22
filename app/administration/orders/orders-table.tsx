'use client'

import type { Key } from 'react'
import type { Client, Order } from '@prisma/client'
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@heroui/table'
import { Pagination } from '@heroui/pagination'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { getOrders } from '@/actions/order'
import Link from '@/components/link'

interface OrderRow {
	id: Order['id'],
	date: Order['date'],
	client: Pick<Client, 'organization' | 'tin' | 'city'>,
	itemsCount: number,
	totalCount: number,
	comment: string | null
}

type OrdersTableProps = {
	userId?: Client['userId']
}

const rowsPerPage = 25

export default function OrdersTable({ userId }: OrdersTableProps) {
	const [rows, setRows] = useState<OrderRow[]>([]),
		[page, setPage] = useState(1),
		pages = Math.ceil(rows.length / rowsPerPage),
		items = useMemo(() => {
			const start = (page - 1) * rowsPerPage

			return rows.slice(start, start + rowsPerPage)
		}, [page, rows]),
		renderCell = useCallback((order: OrderRow, columnKey: Key) => {
			const cellValue = order[columnKey as keyof OrderRow]

			if (cellValue instanceof Date) {
				return cellValue.toLocaleDateString('ru-RU')
			}

			switch (columnKey) {
				case 'client':
					return (
						<div className='flex flex-col'>
							<p className='text-bold text-sm capitalize'>{(cellValue as OrderRow['client']).organization}</p>
							<p className='text-bold text-sm capitalize text-default-400'>{(cellValue as OrderRow['client']).tin}, {(cellValue as OrderRow['client']).city}</p>
						</div>
					)
				default: return cellValue?.toString()
			}
		}, [])

	useEffect(() => {
		const fetchData = async () =>
			setRows((await getOrders(userId))?.map(order => ({
				id: order.id,
				date: order.date,
				client: order.client,
				itemsCount: order.orderItems.length,
				totalCount: order.orderItems.reduce((sum, orderItem) => sum + orderItem.count, 0),
				comment: order.comment
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
				<TableColumn key='client'>
					Клиент
				</TableColumn>
				<TableColumn key='date'>
					Дата
				</TableColumn>
				<TableColumn key='itemsCount'>
					Количество позиций
				</TableColumn>
				<TableColumn key='totalCount'>
					Количество штук
				</TableColumn>
				<TableColumn key='comment'>
					Комментарий
				</TableColumn>
			</TableHeader>
			<TableBody
				items={items}
				emptyContent='Вы еще не делали заказов'
			>
				{item =>
					<TableRow as={Link} key={item.id} href={`/administration/orders/${item.id}`} className='cursor-pointer'>
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
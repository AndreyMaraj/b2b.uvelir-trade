'use client'

import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/table'
import { Pagination } from '@nextui-org/pagination'
import { useCallback, useEffect, useMemo, useState } from 'react'
import type { Key } from 'react'
import type { Order, User } from '@prisma/client'
import { getOrders } from '@/actions/order'
import Link from '@/components/link'

interface OrderRow {
	id: Order['id'],
	date: Order['date'],
	user: Pick<User, 'name' | 'tin' | 'city'>,
	itemsCount: number,
	totalCount: number
}

const rowsPerPage = 25

export default function OrdersTable() {
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

			switch (columnKey) {
				case 'user':
					return (
						<div className='flex flex-col'>
							<p className='text-bold text-sm capitalize'>{(cellValue as OrderRow['user']).name}</p>
							<p className='text-bold text-sm capitalize text-default-400'>{(cellValue as OrderRow['user']).tin}, {(cellValue as OrderRow['user']).city}</p>
						</div>
					)
				default: return cellValue.toString()
			}
		}, [])

	useEffect(() => {
		const fetchData = async () =>
			setRows((await getOrders())?.map(order => ({
				id: order.id,
				date: order.date,
				user: order.user,
				itemsCount: order.orderItems.length,
				totalCount: order.orderItems.reduce((sum, orderItem) => sum + orderItem.count, 0)
			})) ?? [])

		fetchData()
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
			}
		>
			<TableHeader>
				<TableColumn key='user'>
					Пользователь
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
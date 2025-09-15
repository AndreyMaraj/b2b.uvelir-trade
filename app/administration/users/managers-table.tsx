'use client'

import type { Key } from 'react'
import { Button } from '@heroui/button'
import { Chip } from '@heroui/chip'
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@heroui/dropdown'
import { Pagination } from '@heroui/pagination'
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@heroui/table'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { getManagers, setUserActive } from '@/data/user'
import Link from '@/components/link'

type ManagerRow = {
	id: string,
	name: string,
	createdAt: Date,
	email: string,
	phone: string,
	active: boolean
}
const rowsPerPage = 25

export default function ManagersTable() {
	const [rows, setRows] = useState<ManagerRow[]>([]),
		[page, setPage] = useState(1),
		pages = Math.ceil(rows.length / rowsPerPage),
		items = useMemo(() => {
			const start = (page - 1) * rowsPerPage

			return rows.slice(start, start + rowsPerPage)
		}, [page, rows]),
		renderCell = useCallback((user: ManagerRow, columnKey: Key) => {
			const cellValue = user[columnKey as keyof ManagerRow]

			if (cellValue instanceof Date) {
				return cellValue.toLocaleDateString('ru-RU')
			}

			switch (columnKey) {
				case 'active':
					return (
						<Chip color={cellValue ? 'success' : 'danger'} variant='flat' radius='full' startContent={<span className={cellValue ? 'icon-[mdi--check-circle]' : 'icon-[mdi--close-circle]'} />}>
							{cellValue ? 'Активный' : 'Неактивный'}
						</Chip>
					)
				case 'actions':
					return (
						<Dropdown>
							<DropdownTrigger>
								<Button isIconOnly size='sm' radius='full' variant='light'>
									<span className='icon-[mdi--dots-vertical]' />
								</Button>
							</DropdownTrigger>
							<DropdownMenu>
								<DropdownItem key='active' onPress={async () => {
									const updatedUser = await setUserActive(user.id, !user.active)
									updatedUser && setRows(prevRows => prevRows.map(row => row.id === updatedUser.id ? { ...row, active: updatedUser.active } : row))
								}}>
									{user.active ? 'Неактивный' : 'Активный'}
								</DropdownItem>
							</DropdownMenu>
						</Dropdown>
					)
				default: return cellValue
			}
		}, [])

	useEffect(() => {
		const fetchData = async () => setRows(((await getManagers()) ?? []).map(client => ({
			id: client.user.id,
			name: client.surname + ' ' + client.name + ' ' + client.patronymic,
			createdAt: client.user.createdAt,
			email: client.user.email,
			phone: client.user.phone,
			active: client.user.active
		})))

		fetchData()
	}, [setRows])

	return (
		<Table
			topContentPlacement='outside'
			topContent={
				<div className='flex justify-end'>
					<Link href='/administration/users/create-manager'>
						Создать
					</Link>
				</div>
			}
			bottomContentPlacement='outside'
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
				<TableColumn key='createdAt'>
					Дата регистрации
				</TableColumn>
				<TableColumn key='name'>
					ФИО
				</TableColumn>
				<TableColumn key='email'>
					Почта
				</TableColumn>
				<TableColumn key='phone'>
					Телефон
				</TableColumn>
				<TableColumn key='active'>
					Активность
				</TableColumn>
				<TableColumn key='actions' align='end' width={90}>
					Действия
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
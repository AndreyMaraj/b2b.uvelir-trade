'use client'

import type { Key } from 'react'
import { Button } from '@heroui/button'
import { Chip } from '@heroui/chip'
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@heroui/dropdown'
import { Pagination } from '@heroui/pagination'
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@heroui/table'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { getClients, setUserActive } from '@/data/user'

type ClientsTableProps = {
	userId?: string
}

type ClientRow = {
	id: string,
	createdAt: Date,
	organization: string,
	tin: string,
	city: string,
	email: string,
	phone: string,
	active: boolean,
	manager?: string
}

type Header = {
	key: string,
	name: string,
	isAction?: true
}

const rowsPerPage = 25

export default function ClientsTable({ userId }: ClientsTableProps) {
	const [rows, setRows] = useState<ClientRow[]>([]),
		[page, setPage] = useState(1),
		pages = Math.ceil(rows.length / rowsPerPage),
		items = useMemo(() => {
			const start = (page - 1) * rowsPerPage

			return rows.slice(start, start + rowsPerPage)
		}, [page, rows]),
		columns = useMemo<Header[]>(() => [{
			key: 'createdAt',
			name: 'Дата регистрации'
		}, {
			key: 'organization',
			name: 'Организация'
		}, {
			key: 'tin',
			name: 'ИНН'
		}, {
			key: 'city',
			name: 'Город'
		}, {
			key: 'email',
			name: 'Почта'
		}, {
			key: 'phone',
			name: 'Телефон'
		}, ...(!userId ? [{
			key: 'manager',
			name: 'Менеджер'
		}] : []), {
			key: 'active',
			name: 'Активность'
		}, {
			key: 'actions',
			name: 'Действия',
			isAction: true
		}], [userId]),
		renderCell = useCallback((user: ClientRow, columnKey: Key) => {
			const cellValue = user[columnKey as keyof ClientRow]

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
		const fetchData = async () => setRows(((await getClients(userId)) ?? []).map(client => ({
			id: client.user.id,
			createdAt: client.user.createdAt,
			organization: client.organization,
			tin: client.tin,
			city: client.city,
			email: client.user.email,
			phone: client.user.phone,
			active: client.user.active,
			manager: client.manager && (client.manager.surname + ' ' + client.manager.name + ' ' + client.manager.patronymic)
		})))

		fetchData()
	}, [userId, setRows])

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
			<TableHeader columns={columns}>
				{column =>
					<TableColumn key={column.key} align={column.isAction && 'end'} width={column.isAction && 90}>
						{column.name}
					</TableColumn>
				}
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
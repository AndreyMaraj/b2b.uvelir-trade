'use client'

import { Button, Chip, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Pagination, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'
import { type Key, useCallback, useEffect, useMemo, useState } from 'react'
import { type User, UserRole } from '@prisma/client'
import { getUsers, setUserRole, setUserVerified } from '@/data/user'

interface UserRow extends Omit<User, 'updatedAt' | 'password'> { }

const rowsPerPage = 20

export default function UsersTable({ userId }: { userId: User['id'] }) {
	const [rows, setRows] = useState<UserRow[]>([]),
		[page, setPage] = useState(1),
		pages = Math.ceil(rows.length / rowsPerPage),
		items = useMemo(() => {
			const start = (page - 1) * rowsPerPage

			return rows.slice(start, start + rowsPerPage)
		}, [page, rows]),
		renderCell = useCallback((user: UserRow, columnKey: Key) => {
			const cellValue = user[columnKey as keyof UserRow]

			if (cellValue instanceof Date) {
				return cellValue.toLocaleDateString('ru-RU')
			}

			switch (columnKey) {
				case 'role':
					return (
						<Chip color={cellValue as UserRole === UserRole.ADMIN ? 'secondary' : 'primary'} variant='flat'>
							{cellValue as UserRole === UserRole.ADMIN ? 'Администратор' : 'Пользователь'}
						</Chip>
					)
				case 'verified':
					return (
						<Chip color={cellValue ? 'success' : 'danger'} variant='flat' radius='full' startContent={<span className={`iconify ${cellValue ? 'mdi--check-circle' : 'mdi--close-circle'} text-2xl`} />}>
							{cellValue ? 'Верифицирован' : 'Не верифицирован'}
						</Chip>
					)
				case 'actions':
					return (
						<Dropdown>
							<DropdownTrigger>
								<Button isIconOnly size='sm' radius='full' variant='light'>
									<span className='iconify mdi--dots-vertical text-2xl' />
								</Button>
							</DropdownTrigger>
							<DropdownMenu disabledKeys={userId === user.id ? ['verified', 'admin'] : undefined}>
								<DropdownItem key='verified' onClick={async () => {
									const updatedUser = await setUserVerified(user.id, !user.verified)
									updatedUser && setRows(prevRows => prevRows.map(row => row.id === updatedUser.id ? { ...row, verified: updatedUser.verified } : row))
								}}>
									{user.verified ? 'Отменить верификацию' : 'Верифицивровать'}
								</DropdownItem>
								<DropdownItem key='admin' onClick={async () => {
									const updatedUser = await setUserRole(user.id, user.role === UserRole.ADMIN ? UserRole.USER : UserRole.ADMIN)

									updatedUser && setRows(prevRows => prevRows.map(row => row.id === updatedUser.id ? { ...row, role: updatedUser.role } : row))
								}}>
									{user.role === UserRole.ADMIN ? 'Удалить права администратора' : 'Дать права администратора'}
								</DropdownItem>
							</DropdownMenu>
						</Dropdown>
					)
				default: return cellValue
			}
		}, [userId])

	useEffect(() => {
		const fetchData = async () => setRows((await getUsers()) ?? [])

		fetchData()
	}, [setRows])

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
				<TableColumn key='createdAt'>
					Дата регистрации
				</TableColumn>
				<TableColumn key='name'>
					Название
				</TableColumn>
				<TableColumn key='tin'>
					ИНН
				</TableColumn>
				<TableColumn key='city'>
					Город
				</TableColumn>
				<TableColumn key='email'>
					Почта
				</TableColumn>
				<TableColumn key='phone'>
					Телефон
				</TableColumn>
				<TableColumn key='role'>
					Роль
				</TableColumn>
				<TableColumn key='verified'>
					Верифицирован
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
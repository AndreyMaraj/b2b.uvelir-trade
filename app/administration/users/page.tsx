import UsersTable from './users-table'
import { auth } from '@/auth'

export default async function () {
	const session = await auth()

	if (!session || !session.user.id || session.user.role !== 'ADMIN') {
		return
	}

	return (
		<>
			<h1 className='text-3xl mb-5'>
				Администрирование пользователей
			</h1>
			<UsersTable userId={session.user.id} />
		</>
	)
}
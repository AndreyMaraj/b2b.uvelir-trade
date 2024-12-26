import UsersTable from './users-table'
import { auth } from '@/auth'
import { openGraph, twitter } from '@/app/shared-metadata'
import type { Metadata } from 'next'

const title = 'Пользователи',
	description = 'Управление пользователями в системе.',
	url = '/administration/users'

export const metadata: Metadata = {
	title,
	description,
	alternates: {
		canonical: url
	},
	openGraph: {
		...openGraph,
		url,
		title,
		description
	},
	twitter: {
		...twitter,
		description,
		title
	}
}

export default async function Page() {
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
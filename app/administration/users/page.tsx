import type { Metadata } from 'next'
import ClientsTable from './clients-table'
import { auth } from '@/auth'
import { openGraph, twitter } from '@/app/shared-metadata'
import { UserRole } from '@prisma/client'
import AdminPanel from './admin-panel'

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

	if (!session || !session.user.id || session.user.role === UserRole.CLIENT) {
		return
	}

	return (
		<>
			<h1 className='text-3xl mb-5'>
				Администрирование пользователей
			</h1>
			{session.user.role === UserRole.ADMIN ?
				<AdminPanel />
				:
				<ClientsTable userId={session.user.id} />
			}
		</>
	)
}
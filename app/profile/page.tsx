import type { Metadata } from 'next'
import { auth } from '@/auth'
import ClientPrifileForm from './client-profile-form'
import { getClientById, getManagerById, getUserById } from '@/data/user'
import { openGraph, twitter } from '@/app/shared-metadata'
import { UserRole } from '@prisma/client'
import AdminPrifileForm from './admin-profile-form'
import ManagerPrifileForm from './manager-profile-form'
import Link from '@/components/link'

const description = 'Просмотрите и обновите информацию о своем профиле.',
	url = '/profile'

export const metadata: Metadata = {
	description,
	alternates: {
		canonical: url
	},
	openGraph: {
		...openGraph,
		url,
		description
	},
	twitter: {
		...twitter,
		description
	}
}

export default async function Page() {
	const session = await auth()

	if (!session?.user.id) {
		return
	}

	if (session.user.role === UserRole.ADMIN) {
		const user = await getUserById(session.user.id)

		if (!user) {
			return
		}

		return (
			<div className='max-w-80'>
				<h1 className='mb-5'>
					Личные данные
				</h1>
				<AdminPrifileForm admin={user} />
			</div>
		)
	} else if (session.user.role === UserRole.MANAGER) {
		const user = await getManagerById(session.user.id)

		if (!user) {
			return
		}

		return (
			<div className='max-w-80'>
				<h1 className='mb-5'>
					Личные данные
				</h1>
				<ManagerPrifileForm manager={user} />
			</div>
		)
	} else {
		const user = await getClientById(session.user.id)

		if (!user) {
			return
		}

		return (
			<div className='flex gap-10 lg:flex-row flex-col-reverse'>
				<div>
					<h1 className='mb-5'>
						Личные данные
					</h1>
					<ClientPrifileForm client={user} />
				</div>
				<div>
					<h1 className='mb-5'>
						Ваш менеджер
					</h1>
					<div className='flex flex-col gap-1'>
						<span>
							{user.manager.surname} {user.manager.name} {user.manager.patronymic}
						</span>
						<Link href={`mailto:${user.manager.user.email}`} isExternal>
							{user.manager.user.email}
						</Link>
						<Link href={`tel:${user.manager.user.phone}`} isExternal>
							{user.manager.user.phone}
						</Link>
					</div>
				</div>
			</div>
		)
	}
}
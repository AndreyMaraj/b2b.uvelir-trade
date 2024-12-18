import { auth } from '@/auth'
import PrifileForm from './profile-form'
import { getUserById } from '@/data/user'
import { openGraph, twitter } from '@/app/shared-metadata'
import type { Metadata } from 'next/types'

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

	const user = await getUserById(session?.user.id)

	if (!user) {
		return
	}

	return (
		<div className='max-w-80'>
			<h1 className='mb-5'>
				Личные данные
			</h1>
			<PrifileForm user={user} />
		</div>
	)
}
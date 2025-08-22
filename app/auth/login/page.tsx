import Link from '@/components/link'
import LoginForm from '@/components/login-form'
import { Card, CardBody, CardFooter, CardHeader } from '@heroui/card'
import { openGraph, twitter } from '@/app/shared-metadata'
import type { Metadata } from 'next'

const title = 'Вход',
	description = 'Войдите в свою учетную запись на Ювелир Трейд Опт.',
	url = '/auth/login'

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

export default function Page() {
	return (
		<div className='container px-4 py-3 flex items-center justify-center'>
			<Card className='p-6 w-96'>
				<CardHeader>
					<h1 className='text-3xl text-center w-full'>
						Вход для партнёров
					</h1>
				</CardHeader>
				<CardBody>
					<LoginForm />
				</CardBody>
				<CardFooter className='flex justify-between'>
					<Link href='/auth/register'>Регистрация</Link>
				</CardFooter>
			</Card>
		</div>
	)
}
import Link from '@/components/link'
import RegisterForm from '@/components/register-form'
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/react'

export default function () {
	return (
		<Card className='p-6 w-96'>
			<CardHeader>
				<h1 className='text-3xl text-center w-full'>
					Регистрация
				</h1>
			</CardHeader>
			<CardBody>
				<RegisterForm />
			</CardBody>
			<CardFooter className='flex justify-between'>
				<Link href='#'>Забыли пароль?</Link>
				<Link href='/auth/login'>Вход</Link>
			</CardFooter>
		</Card>
	)
}
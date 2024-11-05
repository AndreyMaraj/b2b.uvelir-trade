import Link from '@/components/link'
import LoginForm from '@/components/login-form'
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/react'

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
					{/* <Link href='#'>Забыли пароль?</Link> */}
					<Link href='/auth/register'>Регистрация</Link>
				</CardFooter>
			</Card>
		</div>
	)
}
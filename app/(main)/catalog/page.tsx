import Link from '@/components/link';

export default function () {
	return (
		<>
			<h1 className='text-3xl'>Доступ только для зарегистрированных пользователей</h1>
			<p className='mt-5'>
				Необходимо&nbsp;
				<Link href='/login'>
					авторизоваться
				</Link>
				&nbsp;или&nbsp;
				<Link href='/register'>
					зарегистрироваться
				</Link>
				.
			</p>
		</>
	)
}
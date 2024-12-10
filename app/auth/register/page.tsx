import Link from '@/components/link'
import RegisterForm from '@/components/register-form'
import { Card, CardBody } from '@nextui-org/card'

export default function Page() {
	return (
		<div className='container px-4 py-3'>
			<h1 className='text-3xl w-full mb-5'>
				Регистрация
			</h1>
			<div className='flex gap-10 flex-col md:flex-row'>
				<div className='md:basis-1/2'>
					<div>
						Если у вас есть аккаунт, пожалуйста, <Link href='/auth/login'>войдите</Link>.
					</div>
					<div className='mb-5'>
						<p>
							Регистрация на сайте для работы с оптовым каталогом доступна только для юридических лиц и индивидуальных предпринимателей, имеющих соответствующие документы. После регистрации Ваш персональный менджер свяжется с Вами в ближайшее время для завершения процесса.<br />
						</p>
					</div>
					<div>
						<span className='text-xl'>
							Обратите внимание
						</span>
					</div>
					<div>
						Воспользоваться каталогом Вы сможе только после проверки ваших данных нашим модератором. До этого момента вход в каталог будет невозможен.
					</div>
					<p className='my-5'>
						Все поля обязательны для заполнения!
					</p>
					<p>
						Нажимая кнопку <b>&quot;Зарегистрироваться&quot;</b> Вы соглашаетесь с <Link href='/privacy-policy'>политикой конфеденциальности</Link> данного сайта.
					</p>
				</div>
				<Card className='p-6 md:basis-1/2'>
					<CardBody>
						<RegisterForm />
					</CardBody>
				</Card>
			</div>
		</div>
	)
}
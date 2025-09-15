import ManagerRegisterForm from '@/components/manager-register-form'

export default function Page() {
	return (
		<div className='max-w-80'>
			<h1 className='mb-5'>
				Регистрация менеджера
			</h1>
			<ManagerRegisterForm />
		</div>

	)
}
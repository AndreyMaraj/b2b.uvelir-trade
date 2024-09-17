import PrifileForm from '@/components/profile-form'

export default async function () {
	return (
		<div className='max-w-80'>
			<h1>
				Личные данные
			</h1>
			<PrifileForm />
		</div>
	)
}
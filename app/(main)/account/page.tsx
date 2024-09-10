import { auth, signOut } from '@/auth'
import { Button } from '@nextui-org/react'

export default async function () {
	const session = await auth()

	return (
		<>
			{JSON.stringify(session)}
			<form
				action={async (formData) => {
					'use server'
					await signOut()
				}}
			>
				<Button type='submit'>Выход</Button>
			</form>
		</>
	)
}
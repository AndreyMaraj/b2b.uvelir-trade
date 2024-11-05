'use client'

import { updateProfile } from '@/actions/update-profile'
import { ProfileSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@nextui-org/button'
import { Code, Input } from '@nextui-org/react'
import { useSession } from 'next-auth/react'
import { useCallback, useState, useTransition } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

export default function PrifileForm() {
	const session = useSession(),
		[isPending, startTransition] = useTransition(),
		[error, setError] = useState<string>(),
		{ control, handleSubmit } = useForm<z.infer<typeof ProfileSchema>>({
			resolver: zodResolver(ProfileSchema),
			defaultValues: {
				name: session.data?.user.name ?? '',
				email: session.data?.user.email ?? ''
			}
		}),
		onSubmit = useCallback((values: z.infer<typeof ProfileSchema>) => startTransition(() => {
			if (!session.data?.user.id) {
				setError('User data is empty')
				return
			}
			updateProfile(values, session.data.user.id).then(data => setError(data?.error))
		}), [])

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Controller
				control={control}
				name='name'
				render={({ field, fieldState }) =>
					<Input
						{...field}
						variant='bordered'
						label='Имя'
						className='mb-4'
						type='text'
						autoComplete='name'
						isDisabled={isPending}
						isInvalid={fieldState.invalid}
						errorMessage={fieldState.error?.message}
					/>
				}
			/>
			<Controller
				control={control}
				name='email'
				render={({ field, fieldState }) =>
					<Input
						{...field}
						variant='bordered'
						label='Электронная почта'
						className='mb-4'
						type='email'
						autoComplete='email'
						isDisabled={isPending}
						isInvalid={fieldState.invalid}
						errorMessage={fieldState.error?.message}
					/>
				}
			/>
			{error &&
				<Code color='danger' className='w-full mb-4'>
					{error}
				</Code>
			}
			<Button type='submit' className='w-full' isDisabled={isPending}>
				Сохранить
			</Button>
		</form>
	)
}
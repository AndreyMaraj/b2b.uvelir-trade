'use client'

import { updateProfile } from '@/actions/update-profile'
import { UserWithoutPassword } from '@/data/user'
import { ProfileSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@nextui-org/button'
import { Code } from '@nextui-org/code'
import { Input } from '@nextui-org/input'
import { useCallback, useState, useTransition } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { signOut } from 'next-auth/react'
import { Form } from '@nextui-org/form'

export default function PrifileForm({ user }: { user: UserWithoutPassword }) {
	const [isPending, startTransition] = useTransition(),
		[error, setError] = useState<string>(),
		{ control, handleSubmit } = useForm<z.infer<typeof ProfileSchema>>({
			resolver: zodResolver(ProfileSchema),
			defaultValues: {
				name: user.name,
				phone: user.phone,
				email: user.email,
				tin: user.tin,
				city: user.city
			}
		}),
		onSubmit = useCallback((values: z.infer<typeof ProfileSchema>) => startTransition(() => {
			updateProfile(values, user.id).then(data => setError(data?.error))
		}), [user.id])

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<Controller
				control={control}
				name='name'
				render={({ field, fieldState }) =>
					<Input
						{...field}
						variant='bordered'
						label='Название организации'
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
				name='tin'
				render={({ field, fieldState }) =>
					<Input
						{...field}
						variant='bordered'
						label='ИНН организации'
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
				name='city'
				render={({ field, fieldState }) =>
					<Input
						{...field}
						variant='bordered'
						label='Город'
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
			<Controller
				control={control}
				name='phone'
				render={({ field, fieldState }) =>
					<Input
						{...field}
						variant='bordered'
						label='Телефон'
						className='mb-4'
						type='tel'
						autoComplete='tel'
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
			<Button color='danger' variant='light' fullWidth className='mt-5' onPress={() => signOut({ redirectTo: '/auth/login' })}>
				Выход
			</Button>
		</Form>
	)
}
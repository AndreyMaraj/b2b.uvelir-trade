'use client'

import { register } from '@/actions/register'
import { RegisterSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@nextui-org/button'
import { Code, Input } from '@nextui-org/react'
import { useCallback, useState, useTransition } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

export default function RegisterForm() {
	const [isVisiblePassword, setIsVisiblePassword] = useState(false),
		[isPending, startTransition] = useTransition(),
		[error, setError] = useState<string>(),
		{ control, handleSubmit } = useForm<z.infer<typeof RegisterSchema>>({
			resolver: zodResolver(RegisterSchema),
			defaultValues: {
				name: '',
				email: '',
				password: ''
			}
		}),
		onSubmit = useCallback((values: z.infer<typeof RegisterSchema>) => startTransition(() => register(values).then(data => setError(data?.error))), []),
		changeIsVisiblePassword = useCallback(() => setIsVisiblePassword(!isVisiblePassword), [isVisiblePassword])

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
			<Controller
				control={control}
				name='password'
				render={({ field, fieldState }) =>
					<Input
						{...field}
						variant='bordered'
						label='Пароль'
						type={isVisiblePassword ? 'text' : 'password'}
						autoComplete='current-password'
						className='mb-4'
						isDisabled={isPending}
						isInvalid={fieldState.invalid}
						errorMessage={fieldState.error?.message}
						endContent={
							<Button isIconOnly variant='light' onClick={changeIsVisiblePassword}>
								<span className={`iconify ${isVisiblePassword ? 'mdi--eye-off-outline' : 'mdi--eye-outline'} text-2xl`} />
							</Button>
						}
					/>
				}
			/>
			{error &&
				<Code color='danger' className='w-full mb-4'>
					{error}
				</Code>
			}
			<Button type='submit' className='w-full' isDisabled={isPending}>
				Зарегестрироваться
			</Button>
		</form>
	)
}
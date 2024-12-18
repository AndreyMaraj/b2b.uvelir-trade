'use client'

import { login } from '@/actions/login'
import { LoginSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@nextui-org/button'
import { Code } from '@nextui-org/code'
import { Input } from '@nextui-org/input'
import { useCallback, useState, useTransition } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form } from '@nextui-org/form'

export default function LoginForm() {
	const [isVisiblePassword, setIsVisiblePassword] = useState(false),
		[isPending, startTransition] = useTransition(),
		[error, setError] = useState<string>(),
		{ control, handleSubmit } = useForm<z.infer<typeof LoginSchema>>({
			resolver: zodResolver(LoginSchema),
			defaultValues: {
				email: '',
				password: ''
			}
		}),
		onSubmit = useCallback((values: z.infer<typeof LoginSchema>) => {
			startTransition(() => {
				login(values).then(data => setError(data?.error))
			})
		}, []),
		changeIsVisiblePassword = useCallback(() => setIsVisiblePassword(!isVisiblePassword), [isVisiblePassword])

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
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
							<Button isIconOnly variant='light' onPress={changeIsVisiblePassword}>
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
				Войти
			</Button>
		</Form>
	)
}
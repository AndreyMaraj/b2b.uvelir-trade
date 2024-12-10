'use client'

import { register } from '@/actions/register'
import { RegisterSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@nextui-org/button'
import { Code } from '@nextui-org/code'
import { Input } from '@nextui-org/input'
import { useRouter } from 'next/navigation'
import { useCallback, useState, useTransition } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

export default function RegisterForm() {
	const router = useRouter(),
		[isVisiblePassword, setIsVisiblePassword] = useState(false),
		[isVisibleConfirmPassword, setIsVisibleConfirmPassword] = useState(false),
		[isPending, startTransition] = useTransition(),
		[error, setError] = useState<string>(),
		{ control, handleSubmit } = useForm<z.infer<typeof RegisterSchema>>({
			resolver: zodResolver(RegisterSchema),
			defaultValues: {
				name: '',
				email: '',
				phone: '',
				password: '',
				confirmPassword: '',
				tin: '',
				city: ''
			}
		}),
		changeIsVisiblePassword = useCallback(() => setIsVisiblePassword(!isVisiblePassword), [isVisiblePassword]),
		changeIsVisibleConfirmPassword = useCallback(() => setIsVisibleConfirmPassword(!isVisiblePassword), [isVisiblePassword]),
		onSubmit = useCallback((values: z.infer<typeof RegisterSchema>) => {
			if (values.password !== values.confirmPassword) {
				setError('Пароли не совпадают')
				return
			}
			startTransition(() => {
				register(values).then(data => {
					setError(data?.error)
					if (data.success) {
						router.push('/auth/login')
					}
				})
			})
		}, [router])

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
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
			<Controller
				control={control}
				name='password'
				render={({ field, fieldState }) =>
					<Input
						{...field}
						variant='bordered'
						label='Пароль'
						type={isVisiblePassword ? 'text' : 'password'}
						autoComplete='new-password'
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
			<Controller
				control={control}
				name='confirmPassword'
				render={({ field, fieldState }) =>
					<Input
						{...field}
						variant='bordered'
						label='Пароль еще раз'
						type={isVisibleConfirmPassword ? 'text' : 'password'}
						autoComplete='new-password'
						className='mb-4'
						isDisabled={isPending}
						isInvalid={fieldState.invalid}
						errorMessage={fieldState.error?.message}
						endContent={
							<Button isIconOnly variant='light' onClick={changeIsVisibleConfirmPassword}>
								<span className={`iconify ${isVisibleConfirmPassword ? 'mdi--eye-off-outline' : 'mdi--eye-outline'} text-2xl`} />
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
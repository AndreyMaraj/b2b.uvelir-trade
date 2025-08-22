'use client'

import { registerManager } from '@/actions/register'
import { ManagerRegisterSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@heroui/button'
import { Code } from '@heroui/code'
import { Input } from '@heroui/input'
import { useRouter } from 'next/navigation'
import { useCallback, useState, useTransition } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form } from '@heroui/form'

export default function ManagerRegisterForm() {
	const router = useRouter(),
		[isVisiblePassword, setIsVisiblePassword] = useState(false),
		[isVisibleConfirmPassword, setIsVisibleConfirmPassword] = useState(false),
		[isPending, startTransition] = useTransition(),
		[error, setError] = useState<string>(),
		{ control, handleSubmit } = useForm<z.infer<typeof ManagerRegisterSchema>>({
			resolver: zodResolver(ManagerRegisterSchema)
		}),
		changeIsVisiblePassword = useCallback(() => setIsVisiblePassword(!isVisiblePassword), [isVisiblePassword]),
		changeIsVisibleConfirmPassword = useCallback(() => setIsVisibleConfirmPassword(!isVisiblePassword), [isVisiblePassword]),
		onSubmit = useCallback((values: z.infer<typeof ManagerRegisterSchema>) => {
			if (values.password !== values.confirmPassword) {
				setError('Пароли не совпадают')
				return
			}
			startTransition(() => {
				registerManager(values).then(data => {
					setError(data?.error)
					if (data.success) {
						router.push('/administration/users')
					}
				})
			})
		}, [router])

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<Controller
				control={control}
				name='surname'
				render={({ field, fieldState }) =>
					<Input
						{...field}
						variant='bordered'
						label='Фамилия'
						className='mb-4'
						type='text'
						autoComplete='family-name'
						isDisabled={isPending}
						isInvalid={fieldState.invalid}
						errorMessage={fieldState.error?.message}
					/>
				}
			/>
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
						autoComplete='given-name'
						isDisabled={isPending}
						isInvalid={fieldState.invalid}
						errorMessage={fieldState.error?.message}
					/>
				}
			/>
			<Controller
				control={control}
				name='patronymic'
				render={({ field, fieldState }) =>
					<Input
						{...field}
						variant='bordered'
						label='Отчество'
						className='mb-4'
						type='text'
						autoComplete='additional-name'
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
							<Button isIconOnly variant='light' onPress={changeIsVisiblePassword}>
								<span className={isVisiblePassword ? 'icon-[mdi--eye-off-outline]' : 'icon-[mdi--eye-outline]'} />
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
							<Button isIconOnly variant='light' onPress={changeIsVisibleConfirmPassword}>
								<span className={isVisibleConfirmPassword ? 'icon[mdi--eye-off-outline]' : 'icon-[mdi--eye-outline]'} />
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
				Зарегестрировать
			</Button>
		</Form>
	)
}
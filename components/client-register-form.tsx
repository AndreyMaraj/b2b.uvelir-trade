'use client'

import { registerClient } from '@/actions/register'
import { ClientRegisterSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@heroui/button'
import { Code } from '@heroui/code'
import { Input } from '@heroui/input'
import { useRouter } from 'next/navigation'
import { useCallback, useState, useTransition } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form } from '@heroui/form'
import { Prisma } from '@prisma/client'
import { getManagers } from '@/data/user'
import { Select, SelectItem } from '@heroui/select'

type ClientRegisterFormProps = {
	managers: Prisma.PromiseReturnType<typeof getManagers>
}

export default function ClientRegisterForm({ managers }: ClientRegisterFormProps) {
	const router = useRouter(),
		[isVisiblePassword, setIsVisiblePassword] = useState(false),
		[isVisibleConfirmPassword, setIsVisibleConfirmPassword] = useState(false),
		[isPending, startTransition] = useTransition(),
		[error, setError] = useState<string>(),
		{ control, handleSubmit } = useForm<z.infer<typeof ClientRegisterSchema>>({
			resolver: zodResolver(ClientRegisterSchema),
			defaultValues: {
				organization: '',
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
		onSubmit = useCallback((values: z.infer<typeof ClientRegisterSchema>) => {
			if (values.password !== values.confirmPassword) {
				setError('Пароли не совпадают')
				return
			}
			startTransition(() => {
				registerClient(values).then(data => {
					setError(data?.error)
					if (data.success) {
						router.push('/auth/login')
					}
				})
			})
		}, [router])

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<Controller
				control={control}
				name='organization'
				render={({ field, fieldState }) =>
					<Input
						{...field}
						variant='bordered'
						label='Название организации'
						className='mb-4'
						type='text'
						autoComplete='organization'
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
						autoComplete='address-level2'
						isDisabled={isPending}
						isInvalid={fieldState.invalid}
						errorMessage={fieldState.error?.message}
					/>
				}
			/>
			<Controller
				control={control}
				name='managerId'
				render={({ field, fieldState }) =>
					<Select
						selectedKeys={field.value != null ? new Set([String(field.value)]) : new Set()}
						onSelectionChange={(keys) => field.onChange(Array.from(keys)[0])}
						required
						variant='bordered'
						label='Менеджер'
						className='mb-4'
						isDisabled={isPending}
						isInvalid={fieldState.invalid}
						errorMessage={fieldState.error?.message}
					>
						{managers.map(manager => (
							<SelectItem key={manager.user.id} textValue={manager.surname + ' ' + manager.name + ' ' + manager.patronymic}>
								<div className='flex flex-col'>
									<span className='text-small'>{manager.surname} {manager.name} {manager.patronymic}</span>
									<span className='text-tiny text-default-400'>{manager.user.phone} | {manager.user.email}</span>
								</div>
							</SelectItem>
						))}
					</Select>
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
				Зарегестрироваться
			</Button>
		</Form>
	)
}
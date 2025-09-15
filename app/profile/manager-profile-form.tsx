'use client'

import { updateManagerProfile } from '@/actions/update-profile'
import { ManagerProfileSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@heroui/button'
import { Code } from '@heroui/code'
import { Input } from '@heroui/input'
import { useCallback, useState, useTransition } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { signOut } from 'next-auth/react'
import { Form } from '@heroui/form'
import { Prisma } from '@prisma/client'
import { getManagerById } from '@/data/user'

type ManagerPrifileFormProps = {
	manager: NonNullable<Prisma.PromiseReturnType<typeof getManagerById>>
}

export default function ManagerPrifileForm({ manager }: ManagerPrifileFormProps) {
	const [isPending, startTransition] = useTransition(),
		[error, setError] = useState<string>(),
		{ control, handleSubmit } = useForm<z.infer<typeof ManagerProfileSchema>>({
			resolver: zodResolver(ManagerProfileSchema),
			defaultValues: {
				surname: manager.surname,
				name: manager.name,
				patronymic: manager.patronymic,
				phone: manager.user.phone,
				email: manager.user.email
			}
		}),
		onSubmit = useCallback((values: z.infer<typeof ManagerProfileSchema>) => startTransition(() => {
			updateManagerProfile(values, manager.user.id).then(data => setError(data?.error))
		}), [manager.user.id])

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
						isDisabled={true}
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
			<Button color='danger' variant='light' fullWidth className='mt-5' onPress={() => signOut()}>
				Выход
			</Button>
		</Form>
	)
}
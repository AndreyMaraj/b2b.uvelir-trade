'use client'

import { updateAdminProfile } from '@/actions/update-profile'
import { AdminProfileSchema } from '@/schemas'
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
import { getUserById } from '@/data/user'

type AdminPrifileFormProps = {
	admin: NonNullable<Prisma.PromiseReturnType<typeof getUserById>>
}

export default function AdminPrifileForm({ admin }: AdminPrifileFormProps) {
	const [isPending, startTransition] = useTransition(),
		[error, setError] = useState<string>(),
		{ control, handleSubmit } = useForm<z.infer<typeof AdminProfileSchema>>({
			resolver: zodResolver(AdminProfileSchema),
			defaultValues: {
				phone: admin.phone,
				email: admin.email
			}
		}),
		onSubmit = useCallback((values: z.infer<typeof AdminProfileSchema>) => startTransition(() => {
			updateAdminProfile(values, admin.id).then(data => setError(data?.error))
		}), [admin.id])

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
			<Button color='danger' variant='light' fullWidth className='mt-5' onPress={() => signOut({ redirectTo: '/auth/login' })}>
				Выход
			</Button>
		</Form>
	)
}
'use server'

import { InvalidLoginError, signIn, UnverifiedAccountLoginError } from '@/auth'
import { DEFAULT_LOGIN_REDIRECT } from '@/routes'
import { LoginSchema } from '@/schemas'
import { z } from 'zod'

export const login = async (values: z.infer<typeof LoginSchema>) => {
	const validatedFields = LoginSchema.safeParse(values)

	if (!validatedFields.success) return { error: 'Invalid fields' }

	const { email, password } = validatedFields.data

	try {
		await signIn('credentials', {
			email,
			password,
			redirectTo: DEFAULT_LOGIN_REDIRECT
		})
	} catch (error) {
		if (error instanceof InvalidLoginError) {
			return { error: 'Неверный email или пароль' }
		} else if (error instanceof UnverifiedAccountLoginError) {
			return { error: 'Аккаунт не верифицирован' }
		}

		throw error
	}
}
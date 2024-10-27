'use server'

import { RegisterSchema } from '@/schemas'
import { z } from 'zod'
import bcrypt from 'bcrypt'
import { prisma } from '@/prisma'
import { getUserByEmail } from '@/data/user'

export const register = async (values: z.infer<typeof RegisterSchema>) => {
	const validatedFields = RegisterSchema.safeParse(values)

	if (!validatedFields.success) return { error: 'Invalid fields' }

	const { email, phone, password, name, tin, city } = validatedFields.data,
		hashedPassword = await bcrypt.hash(password, await bcrypt.genSalt(11)),
		existingUser = await getUserByEmail(email)

	if (existingUser) return { error: 'Email already in use!' }

	await prisma.user.create({
		data: {
			name,
			tin,
			city,
			email,
			phone,
			password: hashedPassword
		}
	})

	return { success: 'User created' }
}
'use server'

import { ProfileSchema } from '@/schemas'
import { z } from 'zod'
import { prisma } from '@/prisma'
import { getUserByEmail } from '@/data/user'

export const updateProfile = async (values: z.infer<typeof ProfileSchema>, userId: string) => {
	const validatedFields = ProfileSchema.safeParse(values)

	if (!validatedFields.success) {
		return { error: 'Invalid fields' }
	}

	const { email, name } = validatedFields.data,
		existingUser = await getUserByEmail(email)

	if (existingUser && existingUser.id !== userId) {
		return { error: 'Email already in use!' }
	}

	await prisma.user.update({
		where: {
			id: userId
		},
		data: { name, email }
	})

	return { success: 'User updated' }
}
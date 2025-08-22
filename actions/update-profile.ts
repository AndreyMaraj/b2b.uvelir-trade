'use server'

import type { User } from '@prisma/client'
import { AdminProfileSchema, ClientProfileSchema, ManagerProfileSchema } from '@/schemas'
import { z } from 'zod'
import { prisma } from '@/prisma'
import { getUserByUniqueFields } from '@/data/user'

export const updateAdminProfile = async (values: z.infer<typeof AdminProfileSchema>, userId: User['id']) => {
	const validatedFields = AdminProfileSchema.safeParse(values)

	if (!validatedFields.success) {
		return { error: 'Invalid fields' }
	}

	const { email, phone } = validatedFields.data,
		existingUser = await getUserByUniqueFields(email, phone)

	if (existingUser && existingUser.id !== userId) {
		return { error: 'Email or phone already in use!' }
	}

	await prisma.user.update({
		where: {
			id: userId
		},
		data: { phone }
	})

	return { success: 'User updated' }
}

export const updateManagerProfile = async (values: z.infer<typeof ManagerProfileSchema>, userId: User['id']) => {
	const validatedFields = ManagerProfileSchema.safeParse(values)

	if (!validatedFields.success) {
		return { error: 'Invalid fields' }
	}

	const { email, surname, name, patronymic, phone } = validatedFields.data,
		existingUser = await getUserByUniqueFields(email, phone)

	if (existingUser && existingUser.id !== userId) {
		return { error: 'Email or phone already in use!' }
	}

	await prisma.manager.update({
		where: { userId },
		data: {
			surname, name, patronymic,
			user: {
				update: {
					phone
				}
			}
		}
	})

	return { success: 'User updated' }
}

export const updateClientProfile = async (values: z.infer<typeof ClientProfileSchema>, userId: User['id']) => {
	const validatedFields = ClientProfileSchema.safeParse(values)

	if (!validatedFields.success) {
		return { error: 'Invalid fields' }
	}

	const { email, organization, city, tin, phone } = validatedFields.data,
		existingUser = await getUserByUniqueFields(email, phone)

	if (existingUser && existingUser.id !== userId) {
		return { error: 'Email or phone already in use!' }
	}

	await prisma.client.update({
		where: { userId },
		data: {
			organization, city, tin, user: {
				update: {
					phone
				}
			}
		}
	})

	return { success: 'User updated' }
}
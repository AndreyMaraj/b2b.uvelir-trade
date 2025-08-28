'use server'

import { ClientRegisterSchema, ManagerRegisterSchema } from '@/schemas'
import { z } from 'zod'
import bcrypt from 'bcrypt'
import { prisma } from '@/prisma'
import { getClientByUniqueFields, getUserByUniqueFields } from '@/data/user'
import { UserRole } from '@prisma/client'

export const registerClient = async (values: z.infer<typeof ClientRegisterSchema>) => {
	const validatedFields = ClientRegisterSchema.safeParse(values)

	if (!validatedFields.success) return { error: 'Invalid fields' }

	const { email, phone, password, organization, tin, city, managerId } = validatedFields.data,
		hashedPassword = await bcrypt.hash(password, await bcrypt.genSalt(11)),
		existingUser = await getUserByUniqueFields(email, phone)

	if (existingUser) return { error: 'Email or phone already in use!' }

	if ((await getClientByUniqueFields(tin))) return { error: 'TIN already in use!' }

	await prisma.user.create({
		data: {
			email,
			phone,
			password: hashedPassword,
			client: {
				create: {
					organization,
					tin,
					city,
					manager: {
						connect: {
							userId: managerId
						}
					}
				}
			}
		}
	})

	return { success: 'User created' }
}

export const registerManager = async (values: z.infer<typeof ManagerRegisterSchema>) => {
	const validatedFields = ManagerRegisterSchema.safeParse(values)

	if (!validatedFields.success) return { error: 'Invalid fields' }

	const { email, phone, password, surname, name, patronymic } = validatedFields.data,
		hashedPassword = await bcrypt.hash(password, await bcrypt.genSalt(11)),
		existingUser = await getUserByUniqueFields(email, phone)

	if (existingUser) return { error: 'Email or phone already in use!' }

	await prisma.user.create({
		data: {
			email,
			phone,
			role: UserRole.MANAGER,
			active: true,
			password: hashedPassword,
			manager: {
				create: {
					surname,
					name,
					patronymic
				}
			}
		}
	})

	return { success: 'User created' }
}
'use server'

import { prisma } from '@/prisma'
import { Prisma } from '@prisma/client'
import type { User } from '@prisma/client'

export const getUserByEmail = async (email: User['email']) => {
	try {
		return await prisma.user.findUnique({ where: { email } })
	} catch (e) {
		console.log(e)
		return null
	}
}

const userWithoutPassword = Prisma.validator<Prisma.UserDefaultArgs>()({
	select: {
		id: true,
		name: true,
		tin: true,
		city: true,
		email: true,
		phone: true,
		role: true,
		verified: true
	}
})

export type UserWithoutPassword = Prisma.UserGetPayload<typeof userWithoutPassword>

export const getUserById = async (id: User['id']): Promise<UserWithoutPassword | null> => {
	try {
		return await prisma.user.findUnique({
			select: {
				id: true,
				name: true,
				tin: true,
				city: true,
				email: true,
				phone: true,
				role: true,
				verified: true
			},
			where: { id }
		})
	} catch (e) {
		console.log(e)
		return null
	}
}

export const getUsers = async () => {
	try {
		return await prisma.user.findMany()
	} catch (e) {
		console.log(e)
		return null
	}
}

export const setUserRole = async (id: User['id'], role: User['role']) => {
	try {
		return await prisma.user.update({
			select: {
				id: true,
				role: true
			},
			where: { id },
			data: { role }
		})
	} catch (e) {
		console.log(e)
		return null
	}
}

export const setUserVerified = async (id: User['id'], verified: User['verified']) => {
	try {
		return await prisma.user.update({
			select: {
				id: true,
				verified: true
			},
			where: { id },
			data: { verified }
		})
	} catch (e) {
		console.log(e)
		return null
	}
}
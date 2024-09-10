import { prisma } from '@/prisma'

export const getUserByEmail = async (email: string) => {
	try {
		return await prisma.user.findUnique({ where: { email } })
	} catch {
		return null
	}
}

export const getuserById = async (id: string) => {
	try {
		return await prisma.user.findUnique({ where: { id } })
	} catch {
		return null
	}
}
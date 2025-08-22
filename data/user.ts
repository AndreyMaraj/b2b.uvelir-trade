'use server'

import type { Client, Manager, User } from '@prisma/client'
import { prisma } from '@/prisma'

export const getUserByUniqueFields = async (email?: User['email'], phone?: User['phone']) => {
	try {
		return await prisma.user.findFirst({
			where: {
				OR: [
					...(email ? [{ email }] : []),
					...(phone ? [{ phone }] : [])
				]
			}
		})
	} catch (e) {
		console.log(e)
		return null
	}
}

export const getUserById = async (id: User['id']) => {
	try {
		return await prisma.user.findUnique({
			select: {
				id: true,
				email: true,
				phone: true
			},
			where: { id }
		})
	} catch (e) {
		console.log(e)
		return null
	}
}

export const getUserByIdWithRole = async (id: User['id']) => {
	try {
		return await prisma.user.findUnique({
			select: {
				id: true,
				email: true,
				phone: true,
				role: true
			},
			where: { id }
		})
	} catch (e) {
		console.log(e)
		return null
	}
}

export const getManagerById = async (userId: Manager['userId']) => {
	try {
		return await prisma.manager.findUnique({
			select: {
				surname: true,
				name: true,
				patronymic: true,
				user: {
					select: {
						id: true,
						email: true,
						phone: true
					}
				}
			},
			where: { userId }
		})
	} catch (e) {
		console.log(e)
		return null
	}
}

export const getClientById = async (userId: Client['userId']) => {
	try {
		return await prisma.client.findUnique({
			select: {
				organization: true,
				tin: true,
				city: true,
				user: {
					select: {
						id: true,
						email: true,
						phone: true
					}
				},
				manager: {
					select: {
						surname: true,
						name: true,
						patronymic: true,
						user: {
							select: {
								email: true,
								phone: true
							}
						}
					}
				}
			},
			where: { userId }
		})
	} catch (e) {
		console.log(e)
		return null
	}
}

export const setUserActive = async (id: User['id'], active: User['active']) => {
	try {
		return await prisma.user.update({
			select: {
				id: true,
				active: true
			},
			where: { id },
			data: { active }
		})
	} catch (e) {
		console.log(e)
		return null
	}
}

export const getClients = async (userId?: Client['userId']) => {
	try {
		return await prisma.client.findMany({
			select: {
				organization: true,
				tin: true,
				city: true,
				user: {
					select: {
						id: true,
						email: true,
						phone: true,
						active: true,
						createdAt: true
					}
				},
				...(!userId ? {
					manager: {
						select: {
							surname: true,
							name: true,
							patronymic: true
						}
					}
				} : undefined)
			},
			where: {
				...(userId && { manager: { userId } })
			}
		})
	} catch (e) {
		console.log(e)
		return []
	}
}

export const getManagers = async () => {
	try {
		return await prisma.manager.findMany({
			select: {
				surname: true,
				name: true,
				patronymic: true,
				user: {
					select: {
						id: true,
						phone: true,
						email: true,
						active: true,
						createdAt: true
					}
				}
			}
		})
	} catch (e) {
		console.log(e)
		return []
	}
}
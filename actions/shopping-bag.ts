'use server'

import { prisma } from '@/prisma'
import { Prisma, type User } from '@prisma/client'

export async function updateShoppingBag(userId: string, invisibleModelModificationId: number, count: number) {
	const where = Prisma.validator<Prisma.ShoppingBagsProductWhereUniqueInput>()({
		userId_invisibleModelModificationId: { userId, invisibleModelModificationId }
	})
	try {
		if (count) {
			return await prisma.shoppingBagsProduct.upsert({
				where,
				create: { userId, invisibleModelModificationId, count },
				update: { count }
			})
		}
		const shoppingBagsProduct = await prisma.shoppingBagsProduct.findUnique({ where })

		if (shoppingBagsProduct) {
			return await prisma.shoppingBagsProduct.delete({ where })
		}

		return null
	} catch (e) {
		console.log(e)
		return
	}
}

export async function clearUsersShoppingBag(userId: string) {
	try {
		return await prisma.shoppingBagsProduct.deleteMany({ where: { userId } })
	} catch (e) {
		console.log(e)
		return
	}
}

export async function getShoppingBagsProducts(userId: User['id']) {
	try {
		return await prisma.shoppingBagsProduct.findMany({ where: { userId } })
	} catch (e) {
		console.log(e)
		return
	}
}

export async function getShoppingBagsWithProducts(userId: User['id']) {
	try {
		return await prisma.shoppingBagsProduct.findMany({
			where: { userId },
			select: {
				count: true,
				invisibleModelModification: {
					select: {
						id: true,
						article: true,
						visibleModelModification: {
							select: {
								media: { take: 1 }
							}
						}
					}
				}
			}
		})
	} catch (e) {
		console.log(e)
		return
	}
}
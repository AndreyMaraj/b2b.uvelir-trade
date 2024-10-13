'use server'

import { prisma } from '@/prisma'
import { Prisma, type ShoppingBagsProduct, type User } from '@prisma/client'

export const updateShoppingBag = async (userId: string, invisibleModelModificationId: number, count: number) => {
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

export const clearUsersShoppingBag = async (userId: string) => {
	try {
		return await prisma.shoppingBagsProduct.deleteMany({ where: { userId } })
	} catch (e) {
		console.log(e)
		return
	}
}

export async function getShoppingBagsProductsUser(userId: User['id']) {
	try {
		return await prisma.shoppingBagsProduct.findMany({ where: { userId } })
	} catch (e) {
		console.log(e)
		return
	}
}

export async function getShoppingBagsProducts(ids: ShoppingBagsProduct['id'][]) {
	try {
		return await prisma.shoppingBagsProduct.findMany({
			select: {
				count: true,
				invisibleModelModification: {
					select: {
						id: true,
						article: true,
						visibleModelModification: {
							select: {
								productModificationMedia: { take: 1 }
							}
						}
					}
				}
			},
			where: {
				id: { in: ids }
			}
		})
	} catch (e) {
		console.log(e)
		return
	}
}
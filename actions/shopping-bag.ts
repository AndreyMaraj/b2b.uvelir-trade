'use server'

import { prisma } from '@/prisma'
import type { ShoppingBagsProduct } from '@prisma/client'

export async function updateShoppingBag(data: Omit<ShoppingBagsProduct, 'id'>) {
	try {
		const shoppingBagsProduct = await prisma.shoppingBagsProduct.findFirst({
			where: {
				userId: data.userId,
				invisibleModelModificationId: data.invisibleModelModificationId,
				invisibleModelModificationSizeId: data.invisibleModelModificationSizeId
			}
		})

		if (data.count) {
			if (shoppingBagsProduct) {
				return await prisma.shoppingBagsProduct.update({
					where: {
						id: shoppingBagsProduct.id
					},
					data: {
						count: data.count
					}
				})
			} else {
				return await prisma.shoppingBagsProduct.create({ data })
			}
		}

		if (shoppingBagsProduct) {
			return await prisma.shoppingBagsProduct.delete({
				where: {
					id: shoppingBagsProduct.id
				}
			})
		}

		return null
	} catch (e) {
		console.log(e)
		return
	}
}

export async function clearUsersShoppingBag(userId: ShoppingBagsProduct['userId'], invisibleModelModificationId?: ShoppingBagsProduct['invisibleModelModificationId']) {
	try {
		return await prisma.shoppingBagsProduct.deleteMany({ where: { userId, invisibleModelModificationId } })
	} catch (e) {
		console.log(e)
		return
	}
}

export async function getShoppingBagsProducts(userId: ShoppingBagsProduct['userId']) {
	try {
		return await prisma.shoppingBagsProduct.findMany({ where: { userId } })
	} catch (e) {
		console.log(e)
		return
	}
}

export async function getShoppingBagsWithProducts(userId: ShoppingBagsProduct['userId']) {
	try {
		return (await prisma.invisibleModelModification.findMany({
			where: {
				shoppingBagsProducts: {
					some: { userId }
				}
			},
			select: {
				id: true,
				article: true,
				averageWeight: true,
				visibleModelModification: {
					select: {
						media: {
							take: 1
						}
					}
				},
				shoppingBagsProducts: {
					where: { userId },
					select: {
						id: true,
						count: true,
						invisibleModelModificationSize: {
							select: {
								id: true,
								averageWeight: true,
								size: {
									select: {
										value: true
									}
								}
							}
						}
					}
				}
			}
		})).map(invisibleModelModification => ({
			...invisibleModelModification,
			averageWeight: invisibleModelModification.averageWeight.toNumber(),
			shoppingBagsProducts: invisibleModelModification.shoppingBagsProducts.map(shoppingBagsProduct => ({
				...shoppingBagsProduct,
				invisibleModelModificationSize: shoppingBagsProduct.invisibleModelModificationSize && {
					...shoppingBagsProduct.invisibleModelModificationSize,
					averageWeight: shoppingBagsProduct.invisibleModelModificationSize.averageWeight.toNumber(),
					size: {
						...shoppingBagsProduct.invisibleModelModificationSize.size,
						value: shoppingBagsProduct.invisibleModelModificationSize.size.value.toNumber()
					}
				}
			}))
		}))
	} catch (e) {
		console.log(e)
		return
	}
}
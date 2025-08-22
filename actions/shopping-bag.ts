'use server'

import type { Client, ShoppingBagsProduct } from '@prisma/client'
import { prisma } from '@/prisma'

export async function updateShoppingBag(data: Omit<ShoppingBagsProduct, 'id' | 'clientId'>, userId: Client['userId']) {
	try {
		const shoppingBagsProduct = await prisma.shoppingBagsProduct.findFirst({
			where: {
				client: { userId },
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
				return await prisma.shoppingBagsProduct.create({
					data: {
						client: {
							connect: {
								userId
							}
						},
						invisibleModelModification: {
							connect: {
								id: data.invisibleModelModificationId
							}
						},
						invisibleModelModificationSize: data.invisibleModelModificationSizeId ? {
							connect: {
								id: data.invisibleModelModificationSizeId
							}
						} : undefined,
						count: data.count
					}
				})
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

export async function clearUsersShoppingBag(userId: Client['userId'], invisibleModelModificationId?: ShoppingBagsProduct['invisibleModelModificationId']) {
	try {
		return await prisma.shoppingBagsProduct.deleteMany({
			where: {
				client: { userId },
				invisibleModelModificationId
			}
		})
	} catch (e) {
		console.log(e)
		return
	}
}

export async function getShoppingBagsProducts(userId: Client['userId']) {
	try {
		return await prisma.shoppingBagsProduct.findMany({
			where: {
				client: {
					userId
				}
			}
		})
	} catch (e) {
		console.log(e)
		return
	}
}

export async function getShoppingBagsWithProducts(userId: Client['userId']) {
	try {
		return (await prisma.invisibleModelModification.findMany({
			where: {
				shoppingBagsProducts: {
					some: { client: { userId } }
				}
			},
			select: {
				id: true,
				article: true,
				averageWeight: true,
				media: {
					take: 1,
					select: {
						path: true
					}
				},
				shoppingBagsProducts: {
					where: { client: { userId } },
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
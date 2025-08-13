'use server'

import { prisma } from '@/prisma'
import type { Order } from '@prisma/client'
import { getShoppingBagsProducts } from './shopping-bag'

export async function createOrder(userId: Order['userId'], comment: Order['comment']) {
	const shoppingBagsProducts = await getShoppingBagsProducts(userId)

	if (!shoppingBagsProducts || !shoppingBagsProducts.length) {
		return
	}

	try {
		return await prisma.order.create({
			data: {
				userId,
				comment,
				orderItems: {
					createMany: {
						data: shoppingBagsProducts.map(shoppingBagsProduct => ({
							invisibleModelModificationId: shoppingBagsProduct.invisibleModelModificationId,
							invisibleModelModificationSizeId: shoppingBagsProduct.invisibleModelModificationSizeId,
							count: shoppingBagsProduct.count
						}))
					}
				}
			}
		})
	} catch (e) {
		console.log(e)
		return
	}
}

export async function getUserOrders(userId: Order['userId']) {
	try {
		return await prisma.order.findMany({
			where: { userId },
			include: {
				orderItems: {
					select: {
						count: true
					}
				}
			}
		})
	} catch (e) {
		console.log(e)
		return
	}
}

export async function getOrders() {
	try {
		return await prisma.order.findMany({
			include: {
				user: {
					select: {
						name: true,
						tin: true,
						city: true
					}
				},
				orderItems: {
					select: {
						count: true
					}
				}
			}
		})
	} catch (e) {
		console.log(e)
		return
	}
}

export async function getOrder(orderId: Order['id'], userId?: Order['userId']) {
	try {
		return {
			order: await prisma.order.findUnique({
				where: { id: orderId, userId },
				select: {
					id: true,
					date: true,
					comment: true,
					...(!userId && {
						user: {
							select: {
								name: true,
								tin: true,
								city: true
							}
						}
					})
				}
			}),
			invisibleModelModifications: (await prisma.invisibleModelModification.findMany({
				where: {
					orderItems: {
						some: { orderId }
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
					orderItems: {
						where: { orderId },
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
				orderItems: invisibleModelModification.orderItems.map(orderItem => ({
					...orderItem,
					invisibleModelModificationSize: orderItem.invisibleModelModificationSize && {
						...orderItem.invisibleModelModificationSize,
						averageWeight: orderItem.invisibleModelModificationSize.averageWeight.toNumber(),
						size: {
							...orderItem.invisibleModelModificationSize.size,
							value: orderItem.invisibleModelModificationSize.size.value.toNumber()
						}
					}
				}))
			}))
		}
	} catch (e) {
		console.log(e)
		return { order: null, invisibleModelModifications: [] }
	}
}
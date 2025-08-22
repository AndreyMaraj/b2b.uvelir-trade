'use server'

import type { Client, Manager, Order } from '@prisma/client'
import { prisma } from '@/prisma'
import { getShoppingBagsProducts } from './shopping-bag'

export async function createOrder(userId: Client['userId'], comment: Order['comment']) {
	const shoppingBagsProducts = await getShoppingBagsProducts(userId)

	if (!shoppingBagsProducts || !shoppingBagsProducts.length) {
		return
	}

	try {
		return await prisma.order.create({
			data: {
				comment,
				client: {
					connect: {
						userId
					}
				},
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

export async function getClientOrders(userId: Client['userId']) {
	try {
		return await prisma.order.findMany({
			where: {
				client: {
					userId
				}
			},
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

export async function getOrders(userId?: Manager['userId']) {
	try {
		return await prisma.order.findMany({
			...(userId && {
				where: {
					client: {
						manager: {
							userId
						}
					}
				}
			}),
			include: {
				client: {
					select: {
						organization: true,
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

export async function getOrder(orderId: Order['id'], clientUserId?: Client['userId'], managerUserId?: Manager['userId']) {
	try {
		return {
			order: await prisma.order.findFirst({
				where: {
					id: orderId,
					...((clientUserId || managerUserId) && {
						client: {
							...(clientUserId && { userId: clientUserId }),
							...(managerUserId && { manager: { userId: managerUserId } })
						}
					})
				},
				select: {
					id: true,
					date: true,
					comment: true,
					...(!clientUserId && {
						client: {
							select: {
								organization: true,
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
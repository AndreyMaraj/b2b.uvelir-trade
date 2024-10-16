'use server'

import { prisma } from '@/prisma'
import type { Order, Prisma } from '@prisma/client'

export async function createOrder(userId: Order['userId'], orderItems: Prisma.OrderItemCreateManyOrderInput[]) {
	try {
		return await prisma.order.create({
			data: {
				userId,
				orderItems: {
					createMany: {
						data: orderItems.map(orderItem => ({ ...orderItem }))
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
					include: {
						invisibleModelModification: true
					}
				}
			}
		})
	} catch (e) {
		console.log(e)
		return
	}
}

export async function getOrder(id: Order['id'], userId: Order['userId']) {
	try {
		return await prisma.order.findUnique({
			where: { id, userId },
			select: {
				id: true,
				date: true,
				orderItems: {
					include: {
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
					}
				}
			}
		})
	} catch (e) {
		console.log(e)
		return
	}
}
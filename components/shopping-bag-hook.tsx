'use client'

import type { ReactNode } from 'react'
import type { ShoppingBagsProduct, User } from '@prisma/client'
import { clearUsersShoppingBag, getShoppingBagsProducts, updateShoppingBag } from '@/actions/shopping-bag'
import { useSession } from 'next-auth/react'
import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'

interface ShoppingBagContextType {
	products: ShoppingBagsProduct[],
	updateProducts: (count: number, invisibleModelModificationId: number, invisibleModelModificationSizeId: number | null) => void,
	clearShoppingBag: (invisibleModelModificationId?: number) => void,
	isPending: boolean
}

const ShoppingBagContext = createContext<ShoppingBagContextType | undefined>(undefined)

export const ShoppingBagProvider = ({ children }: { children: ReactNode }) => {
	const [products, setProducts] = useState<ShoppingBagsProduct[]>([]),
		[isPending, setIsPending] = useState(true),
		session = useSession(),
		previousUserIdRef = useRef<User['id'] | null>(null)

	const updateProducts = useDebouncedCallback(async (count: number, invisibleModelModificationId: number, invisibleModelModificationSizeId: number | null) => {
		if (!session.data?.user.id) {
			return
		}

		setIsPending(true)

		try {
			const shoppingBagProduct = await updateShoppingBag({
				count,
				invisibleModelModificationId,
				invisibleModelModificationSizeId
			}, session.data.user.id)
			setProducts(prevProducts => {
				if (!shoppingBagProduct) {
					return prevProducts
				}

				if (count) {
					const productIndex = prevProducts.findIndex(product => invisibleModelModificationId === product.invisibleModelModificationId && (!invisibleModelModificationSizeId || invisibleModelModificationSizeId === product.invisibleModelModificationSizeId))
					if (productIndex !== -1) {
						const updatedProducts = [...prevProducts]
						updatedProducts[productIndex].count = count
						return updatedProducts
					}

					return [...prevProducts, shoppingBagProduct]
				}

				return prevProducts.filter(product => invisibleModelModificationId !== product.invisibleModelModificationId || invisibleModelModificationSizeId !== product.invisibleModelModificationSizeId)
			})
		} finally {
			setIsPending(false)
		}
	}, 500)

	const clearShoppingBag = useCallback(async (invisibleModelModificationId?: number) => {
		if (!session.data?.user.id) {
			return
		}

		setIsPending(true)

		try {
			await clearUsersShoppingBag(session.data.user.id, invisibleModelModificationId)
			setProducts([])
		} finally {
			setIsPending(false)
		}
	}, [session.data?.user.id, setIsPending, setProducts])

	useEffect(() => {
		const fetchData = async (userId: User['id']) => {
			setIsPending(true)
			setProducts(await getShoppingBagsProducts(userId) ?? [])
			setIsPending(false)
		}

		if (session.data?.user.id && previousUserIdRef.current !== session.data.user.id) {
			fetchData(session.data.user.id)
			previousUserIdRef.current = session.data.user.id;
		}
	}, [session.data?.user.id])

	return (
		<ShoppingBagContext.Provider value={{ products, updateProducts, isPending, clearShoppingBag }}>
			{children}
		</ShoppingBagContext.Provider>
	)
}

export const useShoppingBag = () => {
	const context = useContext(ShoppingBagContext)
	if (!context) {
		throw new Error('useShoppingBag must be used within a ShoppingBagProvider')
	}
	return context
}
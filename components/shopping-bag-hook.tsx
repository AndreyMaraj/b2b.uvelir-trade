'use client'

import { clearUsersShoppingBag, getShoppingBagsProducts, updateShoppingBag } from '@/actions/shopping-bag'
import type { ShoppingBagsProduct, User } from '@prisma/client'
import { useSession } from 'next-auth/react'
import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react'
import { useDebouncedCallback } from 'use-debounce'

interface ShoppingBagContextType {
	products: ShoppingBagsProduct[],
	updateProducts: (productId: number, count: number) => void,
	clearShoppingBag: () => void,
	isPending: boolean
}

const ShoppingBagContext = createContext<ShoppingBagContextType | undefined>(undefined)

export const ShoppingBagProvider = ({ children }: { children: ReactNode }) => {
	const [products, setProducts] = useState<ShoppingBagsProduct[]>([]),
		[isPending, setIsPending] = useState(true),
		session = useSession(),
		previousUserIdRef = useRef<User['id'] | null>(null)

	const updateProducts = useDebouncedCallback(async (productId: number, count: number) => {
		if (!session.data?.user.id) {
			return
		}

		setIsPending(true)

		try {
			const shoppingBagProduct = await updateShoppingBag(session.data.user.id, productId, count)
			setProducts((prevProducts: ShoppingBagsProduct[]) => {
				if (!shoppingBagProduct) {
					return prevProducts
				}

				if (count) {
					const productIndex = prevProducts.findIndex(product => product.invisibleModelModificationId === productId)
					if (productIndex !== -1) {
						const updatedProducts = [...prevProducts]
						updatedProducts[productIndex].count = count
						return updatedProducts
					}

					return [...prevProducts, shoppingBagProduct]
				}

				return prevProducts.filter(product => product.invisibleModelModificationId !== productId)
			})
		} finally {
			setIsPending(false)
		}
	}, 800)

	const clearShoppingBag = useCallback(async () => {
		if (!session.data?.user.id) {
			return
		}

		setIsPending(true)

		try {
			await clearUsersShoppingBag(session.data.user.id)
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
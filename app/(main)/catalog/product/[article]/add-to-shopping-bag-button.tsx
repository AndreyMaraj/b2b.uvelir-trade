'use client'

import { Button, Input } from '@nextui-org/react'
import { useCallback, useEffect, useState } from 'react'
import { useShoppingBag } from '@/components/shopping-bag-hook'

export default function AddToShoppingBagButton({ productId }: { productId: number }) {
	const { products, updateProducts, isPending } = useShoppingBag(),
		[count, setCount] = useState(0),
		onCountChange = useCallback((newCount: number) => {
			updateProducts(productId, newCount)
			setCount(newCount)
		}, [updateProducts, productId, setCount])

	useEffect(() => setCount(products.find(product => product.invisibleModelModificationId === productId)?.count ?? 0), [products, productId, setCount])

	return count ?
		<Input
			className='w-40'
			value={count.toString()}
			onChange={e => onCountChange(Number(e.target.value))}
			type='number'
			min='0'
			disabled={isPending}
		/>
		:
		<Button
			className='w-40'
			color='primary'
			disabled={isPending}
			onClick={() => onCountChange(1)}
		>
			Добавить в корзину
		</Button>
}
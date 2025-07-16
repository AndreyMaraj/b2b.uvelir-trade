'use client'

import { Button } from '@nextui-org/button'
import { Input } from '@nextui-org/input'
import { useCallback, useEffect, useState } from 'react'
import { useShoppingBag } from '@/components/shopping-bag-hook'

export default function AddToShoppingBagButton({ invisibleModelModificationId, invisibleModelModificationSizeId }: { invisibleModelModificationId: number, invisibleModelModificationSizeId: number | null }) {
	const { products, updateProducts, isPending } = useShoppingBag(),
		[count, setCount] = useState(0),
		onCountChange = useCallback((newCount: number) => {
			updateProducts(newCount, invisibleModelModificationId, invisibleModelModificationSizeId)
			setCount(newCount)
		}, [updateProducts, setCount, invisibleModelModificationId, invisibleModelModificationSizeId])

	useEffect(() => setCount(products.find(product => invisibleModelModificationId === product.invisibleModelModificationId && (!invisibleModelModificationSizeId || invisibleModelModificationSizeId === product.invisibleModelModificationSizeId))?.count ?? 0), [products, invisibleModelModificationId, invisibleModelModificationSizeId, setCount])

	return count ?
		<Input
			className='w-24'
			value={count.toString()}
			onChange={e => onCountChange(Number(e.target.value))}
			type='number'
			min='0'
			disabled={isPending}
		/>
		:
		<Button
			className='w-24'
			color='primary'
			disabled={isPending}
			onPress={() => onCountChange(1)}
		>
			В корзину
		</Button>
}
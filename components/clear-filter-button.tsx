'use client'

import { QueryParam } from '@/consts'
import { Button } from '@nextui-org/react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

export default function ClearFilterButton() {
	const pathname = usePathname(),
		searchParams = useSearchParams(),
		router = useRouter(),
		onClick = useCallback(() => {
			const params = new URLSearchParams(searchParams)
			if (params.has(QueryParam.METAL_COLOR) || params.has(QueryParam.METAL_TYPE) || params.has(QueryParam.STONE_TYPE)) {
				params.delete(QueryParam.PAGE)
			}

			params.delete(QueryParam.METAL_COLOR)
			params.delete(QueryParam.METAL_TYPE)
			params.delete(QueryParam.STONE_TYPE)

			router.push(`${pathname}?${params.toString()}`)
		}, [pathname, searchParams, router])

	return (
		<Button variant='light' className='self-center' size='sm' onClick={onClick}>
			Сбросить фильтр
		</Button>
	)
}
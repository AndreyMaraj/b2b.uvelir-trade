'use client'

import { Pagination } from '@nextui-org/pagination'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

export default function PaginationClient({ total }: { total: number }) {
	const pathname = usePathname(),
		searchParams = useSearchParams(),
		currentPage = Number(searchParams.get('page')) || 1,
		router = useRouter(),
		onPaginationChange = useCallback((pageNumber: number) => {
			const params = new URLSearchParams(searchParams)
			params.set('page', pageNumber.toString())
			window.scrollTo({ top: 0, behavior: 'smooth' })
			router.push(`${pathname}?${params.toString()}`)
		}, [pathname, searchParams, router])

	return (
		<Pagination variant='light' showControls total={total} page={currentPage} onChange={onPaginationChange} />
	)
}
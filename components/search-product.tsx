'use client'

import { Input } from '@nextui-org/input'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'
import { useDebouncedCallback } from 'use-debounce'

export default function SearchProduct() {
	const searchParams = useSearchParams(),
		pathname = usePathname(),
		router = useRouter(),
		handleSearch = useDebouncedCallback(useCallback((term: string) => {
			const params = new URLSearchParams(searchParams)
			params.delete('page')
			if (term) {
				params.set('query', term)
			} else {
				params.delete('query')
			}
			router.push(`${pathname}?${params.toString()}`)
		}, [searchParams, pathname, router]), 800)

	return (
		<Input
			variant='bordered'
			placeholder='Найти артикул...'
			className='mb-4'
			radius='sm'
			defaultValue={searchParams.get('query')?.toString()}
			onChange={e => handleSearch(e.target.value)}
			endContent={
				<span className='iconify mdi--search text-xl' />
			}
		/>
	)
}
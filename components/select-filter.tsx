'use client'

import { Select, SelectItem, SharedSelection } from '@nextui-org/react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'

interface SelectFilterProps {
	items: {
		id: number,
		name: string
	}[],
	label: string,
	paramName: string
}

export default function SelectFilter({ items, label, paramName }: SelectFilterProps) {
	const pathname = usePathname(),
		searchParams = useSearchParams(),
		router = useRouter(),
		[selectedKeys, setSelectedKeys] = useState<string[]>([]),
		onSelectionChange = useCallback((keys: SharedSelection) => {
			const params = new URLSearchParams(searchParams)
			if (keys.currentKey) {
				params.set(paramName, keys.currentKey)
			} else {
				params.delete(paramName)
			}
			router.push(`${pathname}?${params.toString()}`)
		}, [paramName, pathname, searchParams, router])

	useEffect(() => {
		if (!searchParams.has(paramName)) {
			setSelectedKeys([])
		} else {
			const item = items.find(item => item.id === Number(searchParams.get(paramName)))
			setSelectedKeys(item ? [item.id.toString()] : [])
		}

	}, [searchParams, paramName, items, setSelectedKeys])

	return (
		<Select className='max-w-xs mr-2' label={label} selectedKeys={selectedKeys} onSelectionChange={onSelectionChange}>
			{items.map(item =>
				<SelectItem key={item.id}>
					{item.name}
				</SelectItem>
			)}
		</Select>
	)
}
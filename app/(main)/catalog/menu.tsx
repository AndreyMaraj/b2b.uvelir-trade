'use client'

import Link from '@/components/link'
import { useState, useRef, useEffect, useCallback } from 'react'
import { Button } from '@nextui-org/button'
import { useSearchParams } from 'next/navigation'
import { getNomenclatureGroupQueryParam, QueryParam } from '@/consts'
import type { MenuItemWithChildren } from '@/data/menu-item'

const findMenuItem = (items: MenuItemWithChildren[], searchParams: string, path: number[] = []): number[] | null => {
	for (const item of items) {
		if (item.urlParams === searchParams) {
			return [...path, item.id]
		} else {
			const childPath = item?.children && findMenuItem(item.children, searchParams, [...path, item.id])
			if (childPath) return childPath
		}
	}
	return null
}

const MenuItem = ({
	item,
	activeIds,
	setActiveIds,
	level = 0
}: {
	item: MenuItemWithChildren
	activeIds: number[]
	setActiveIds: (ids: number[]) => void
	level?: number
}) => {
	const isExpand = level < activeIds.length && activeIds[level] === item.id,
		isSelected = level === activeIds.length - 1 && activeIds[level] === item.id && (!item.children || item.children.length === 0),
		contentRef = useRef<HTMLDivElement>(null),
		[height, setHeight] = useState<number | undefined>(0)

	useEffect(() => {
		if (contentRef.current) {
			const resizeObserver = new ResizeObserver((entries) => {
				for (const entry of entries) {
					const contentHeight = entry.target.scrollHeight
					setHeight(contentHeight)
				}
			})

			resizeObserver.observe(contentRef.current)
			return () => resizeObserver.disconnect()
		}
	}, [])

	const handleClick = useCallback(() => {
		if (item.children && item.children.length > 0) {
			if (isExpand) {
				setActiveIds(activeIds.slice(0, level))
			} else {
				setActiveIds([...activeIds.slice(0, level), item.id])
			}
		}
	}, [item, isExpand, setActiveIds, activeIds, level])

	return (
		<>
			<Button
				variant='light'
				radius='none'
				className={`
					relative h-auto py-1.5
					transition-all duration-300 ease-in-out
					${item.parentId === null ? 'font-medium' : ''}
					${isSelected ? 'before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-primary before:transition-all before:duration-300' : ''}
					whitespace-normal text-start text-base
				`}
				fullWidth
				onPress={handleClick}
				style={{ paddingLeft: `${level * 0.5 + 1}rem` }}
				endContent={item.children && item.children.length > 0 &&
					<span
						className={`
							iconify mdi--keyboard-arrow-down text-xl transition-transform duration-300 ease-in-out
							${isExpand ? 'rotate-0' : 'rotate-90'}
						`}
					/>
				}
			>
				{!item.children || item.children.length === 0 ?
					<Link
						href={`/catalog?${item.urlParams}`}
						className={`w-full text-inherit hover:text-gray-900 transition-colors duration-300${isSelected ? ' font-medium' : ''}`}
					>
						{item.name}
					</Link>
					:
					<span className='w-full text-inherit'>
						{item.name}
					</span>
				}
			</Button>
			{item?.children && item.children.length > 0 &&
				<div
					className='transition-all duration-200 ease-in-out overflow-hidden'
					style={{
						maxHeight: isExpand ? `${height}px` : '0',
						opacity: isExpand ? 1 : 0,
						visibility: isExpand ? 'visible' : 'hidden'
					}}
				>
					<div ref={contentRef}>
						{item?.children?.map(child =>
							<MenuItem
								key={child.id}
								item={child}
								activeIds={activeIds}
								setActiveIds={setActiveIds}
								level={level + 1}
							/>
						)}
					</div>
				</div>
			}
		</>
	)
}

interface MenuProps {
	menuItems: MenuItemWithChildren[]
}

export default function Menu({ menuItems }: MenuProps) {
	const [activeIds, setActiveIds] = useState<number[]>([]),
		params = useSearchParams(),
		nomenclatureGroupId = Number(params.get(QueryParam.NOMENCLATURE_GROUP)) || null

	useEffect(() => {
		setActiveIds(nomenclatureGroupId ? findMenuItem(menuItems, getNomenclatureGroupQueryParam(nomenclatureGroupId)) ?? [] : [])
	}, [nomenclatureGroupId])

	return (
		<div>
			{menuItems.map(item =>
				<MenuItem
					key={item.id}
					item={item}
					activeIds={activeIds}
					setActiveIds={setActiveIds}
				/>
			)}
		</div>
	)
}
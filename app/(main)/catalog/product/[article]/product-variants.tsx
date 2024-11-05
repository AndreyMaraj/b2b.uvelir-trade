'use client'

import { Image } from '@nextui-org/react'
import NextImage from 'next/image'
import EmptyProductMedia from '@/public/empty-product-media.jpg'
import { Prisma } from '@prisma/client'
import { useCallback } from 'react'
import { getProductVariants } from '@/data/product'
import { useRouter } from 'next/navigation'

export default function ProductVariants({ currentProductArcticle, productPrototype }: { currentProductArcticle: string, productPrototype: NonNullable<Prisma.PromiseReturnType<typeof getProductVariants>> }) {
	const router = useRouter(),
		onVariantClick = useCallback((article: string) => {
			router.push(`/catalog/product/${article}`)
		}, [router])

	return (
		<div className='flex gap-x-2 overflow-x-auto py-3'>
			{productPrototype.productModels.map(productModel =>
				productModel.visibleProductModifications.map(visibleProductModification =>
					visibleProductModification.invisibleModelModifications.map((invisibleModelModification, index) =>
						<Image
							as={NextImage}
							key={index}
							src={visibleProductModification.media.length > 0 ? visibleProductModification.media[0].path : EmptyProductMedia.src}
							alt={invisibleModelModification.article}
							width={55}
							height={55}
							quality={100}
							radius='none'
							sizes='100vw'
							classNames={{ 'wrapper': 'flex-shrink-0' }}
							className={`object-cover rounded-lg border-2 hover:border-sky-300${invisibleModelModification.article === currentProductArcticle ? ' border-sky-500' : ''}`}
							onClick={() => onVariantClick(invisibleModelModification.article)}
						/>
					)
				)
			)}
		</div>
	)
}
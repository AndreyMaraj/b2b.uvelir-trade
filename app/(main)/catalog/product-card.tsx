import { Card, CardBody, CardFooter } from '@heroui/card'
import { Image } from '@heroui/image'
import NextImage from 'next/image'
import { Prisma } from '@prisma/client'
import EmptyProductMedia from '@/public/empty-product-media.jpg'
import Link from '@/components/link'
import { NEXT_PUBLIC_FILE_SERVER_GET_IMAGE_PATH } from '@/consts'

const ProductCardData = Prisma.validator<Prisma.InvisibleModelModificationDefaultArgs>()({
	include: {
		visibleModelModification: {
			include: {
				productModel: {
					include: {
						productPrototyp: {
							include: { type: true }
						}
					}
				}
			}
		},
		invisibleModelModificationSizes: {
			select: {
				averageWeight: true
			}
		},
		media: {
			select: {
				path: true
			}
		}
	}
})

interface ProductCardProps {
	product: Prisma.InvisibleModelModificationGetPayload<typeof ProductCardData>,
	className?: string
}

export default function ProductCard({ product, className }: ProductCardProps) {
	return (
		<div key={product.article} className={`aspect-square${className ? ` ${className}` : ''}`}>
			<Card className='w-full h-full flex flex-col' isPressable isHoverable shadow-sm='sm' as={Link} href={`/catalog/${product.article}`}>
				<CardBody className='w-full h-full p-0'>
					<div className='relative w-full h-full'>
						<Image
							as={NextImage}
							src={product.media.length ? `${NEXT_PUBLIC_FILE_SERVER_GET_IMAGE_PATH}${product.media[0].path}` : EmptyProductMedia.src}
							className='object-cover'
							radius='lg'
							alt=''
							fill
							quality={100}
							sizes='(max-width: 640px) 50vw, 33vw'
							removeWrapper
						/>
					</div>
				</CardBody>
				<CardFooter className='text-small justify-between'>
					<b>{product.visibleModelModification.productModel.productPrototyp.type.name} {product.article}</b>
					<p className='text-default-500'>{product.invisibleModelModificationSizes?.length ? product.invisibleModelModificationSizes[0].averageWeight.toNumber() : product.averageWeight.toNumber()}</p>
				</CardFooter>
			</Card>
		</div>
	)
}
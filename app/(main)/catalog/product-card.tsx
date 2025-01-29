import { Card, CardBody, CardHeader } from '@nextui-org/card'
import { Image } from '@nextui-org/image'
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
				},
				media: true
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
		<Card className={`p-3.5 flex-grow-0 flex-shrink-0${className ? ` ${className}` : ''}`} radius='none' isPressable isHoverable as={Link} href={`/catalog/product/${product.article}`}>
			<CardHeader>
				<p className='mx-auto'>
					{product.visibleModelModification.productModel.productPrototyp.type.name} {product.article}
				</p>
			</CardHeader>
			<CardBody className='overflow-visible py-2 items-center justify-end'>
				<Image
					as={NextImage}
					src={product.visibleModelModification.media.length > 0 ? `${NEXT_PUBLIC_FILE_SERVER_GET_IMAGE_PATH}${product.visibleModelModification.media[0].path}` : EmptyProductMedia.src}
					alt=''
					width={160}
					height={160}
					quality={100}
					radius='none'
					sizes='100vw'
					className='object-cover'
				/>
			</CardBody>
		</Card>
	)
}
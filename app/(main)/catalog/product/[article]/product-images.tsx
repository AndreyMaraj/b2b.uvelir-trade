'use client'

import { Image } from '@nextui-org/react'
import NextImage from 'next/image'
import EmptyProductMedia from '@/public/empty-product-media.jpg'
import { Media } from '@prisma/client'
import { useState } from 'react'

export default function ProductImages({ media }: { media: Media[] }) {
	const [selectedImage, setSelectedImage] = useState(media.length > 0 ? media[0] : undefined)

	return (
		<div className='md:w-1/2 flex flex-col'>
			<div className='flex justify-center items-center h-full'>
				<Image
					as={NextImage}
					src={selectedImage ? `${process.env.NEXT_PUBLIC_IMAGE_UPLOAD_API_URL}${selectedImage.path}` : EmptyProductMedia.src}
					alt=''
					width={557}
					height={557}
					quality={100}
					radius='none'
					sizes='100vw'
					className='object-cover'
				/>
			</div>
			{media.length > 1 &&
				<div className='flex justify-center mt-2 gap-x-2'>
					{media.map((mediaFile, index) =>
						<Image
							as={NextImage}
							key={index}
							src={`${process.env.NEXT_PUBLIC_IMAGE_UPLOAD_API_URL}${mediaFile.path}`}
							alt=''
							width={55}
							height={55}
							quality={100}
							radius='none'
							sizes='100vw'
							className={`object-cover rounded-lg border-2 hover:border-sky-300${mediaFile.id === selectedImage?.id ? ' border-sky-500' : ''}`}
							onClick={() => setSelectedImage(mediaFile)}
						/>
					)}
				</div>
			}
		</div>
	)
}
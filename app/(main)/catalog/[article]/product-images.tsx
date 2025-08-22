'use client'

import { Image } from '@heroui/image'
import NextImage from 'next/image'
import EmptyProductMedia from '@/public/empty-product-media.jpg'
import { Media } from '@prisma/client'
import { useState } from 'react'
import { NEXT_PUBLIC_FILE_SERVER_GET_IMAGE_PATH } from '@/consts'

export default function ProductImages({ media }: { media: Media['path'][] }) {
	const [selectedImage, setSelectedImage] = useState(media.length > 0 ? media[0] : undefined)

	return (
		<div className='md:w-1/2 flex flex-col'>
			<div className='flex justify-center items-center w-full'>
				<div className='relative w-full aspect-square max-w-[557px] overflow-hidden'>
					<Image
						as={NextImage}
						src={selectedImage ? `${NEXT_PUBLIC_FILE_SERVER_GET_IMAGE_PATH}${selectedImage}` : EmptyProductMedia.src}
						alt=''
						isZoomed
						quality={100}
						radius='lg'
						sizes='(max-width: 768px) 100vw, 557px'
						className='object-cover'
						fill
						removeWrapper
					/>
				</div>
			</div>
			{media.length > 1 &&
				<div className='flex justify-center mt-2 gap-x-2'>
					{media.map((mediaFile, index) =>
						<Image
							as={NextImage}
							key={index}
							src={`${NEXT_PUBLIC_FILE_SERVER_GET_IMAGE_PATH}${mediaFile}`}
							alt=''
							width={55}
							height={55}
							quality={100}
							radius='lg'
							sizes='55px'
							className={`cursor-pointer object-cover border-2 hover:border-sky-300${mediaFile === selectedImage ? ' border-sky-500' : ''}`}
							onClick={() => setSelectedImage(mediaFile)}
						/>
					)}
				</div>
			}
		</div>
	)
}
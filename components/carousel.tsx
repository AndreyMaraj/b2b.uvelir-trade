'use client'

import { useCallback, useEffect, useState } from 'react'
import { Button } from '@heroui/button'
import { Image } from '@heroui/image'
import NextImage from 'next/image'

type CarouselProps = {
	images: {
		src: string
		alt: string
	}[]
	hideArrows?: boolean
	className?: string
}

type ArrowButtonProps = {
	icon: string
	onClick: () => void
}

function ArrowButton(props: ArrowButtonProps) {
	return (
		<Button isIconOnly variant='light' radius='full' onPress={props.onClick}>
			<span className={props.icon} />
		</Button>
	)
}

export default function Carousel(props: CarouselProps) {
	const [current, setCurrent] = useState(0),
		previousSlide = useCallback(() => setCurrent((current === 0 ? props.images.length : current) - 1), [current, props.images]),
		nextSlide = useCallback(() => setCurrent(current === props.images.length - 1 ? 0 : current + 1), [current, props.images])

	useEffect(() => {
		const interval = setTimeout(nextSlide, 8000)
		return () => clearInterval(interval)
	}, [current, nextSlide])

	return (
		<div className={`relative overflow-hidden h-full w-full${props.className ? ` ${props.className}` : ''}`}>
			<div
				className='absolute flex transition ease-out duration-1000 h-full w-full'
				style={{ transform: `translateX(-${current * 100}%)` }}
			>
				{props.images.map((image, index) =>
					<Image
						{...image}
						as={NextImage}
						alt=''
						key={index}
						fill
						quality={100}
						radius='none'
						sizes='100vw'
						classNames={{ 'wrapper': 'max-w-full! h-full w-full  shrink-0', 'img': 'object-cover' }}
					/>
				)}
			</div>

			{!props.hideArrows &&
				<div className='absolute top-0 h-full w-full justify-between items-center flex px-8 text-3xl'>
					<ArrowButton icon='icon-[mdi--keyboard-arrow-left]' onClick={previousSlide} />
					<ArrowButton icon='icon-[mdi--keyboard-arrow-right]' onClick={nextSlide} />
				</div>
			}

			<div className='absolute bottom-0 py-4 flex justify-center gap-3 w-full'>
				{props.images.map((images, index) =>
					<div
						onClick={() => setCurrent(index)}
						key={index}
						className={`rounded-full border border-white w-4 h-4 cursor-pointer ${index == current ? 'bg-white' : 'backdrop-blur-xl'}`}
					/>
				)}
			</div>
		</div>
	)
}
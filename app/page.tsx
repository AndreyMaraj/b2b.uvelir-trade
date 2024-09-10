import Carousel from '@/components/carousel'
import Slider1 from '@/public/slider-1.png'
import Slider2 from '@/public/slider-2.png'
import Slider3 from '@/public/slider-3.png'
import Slider4 from '@/public/slider-4.png'
import Slider5 from '@/public/slider-5.jpg'
import Slider6 from '@/public/slider-6.jpg'
import Slider7 from '@/public/slider-7.jpg'
import Slider8 from '@/public/slider-8.jpg'
import Slider9 from '@/public/slider-9.jpg'
import Slider10 from '@/public/slider-10.jpg'
import Slider11 from '@/public/slider-11.jpg'
import Slider12 from '@/public/slider-12.jpg'
import Slider13 from '@/public/slider-13.jpg'
import { Button, Image } from '@nextui-org/react'
import NextImage from 'next/image'
import DiamondIcon from '@/public/diamond-icon.svg'

export default function () {
	return (
		<main className='flex flex-col flex-grow'>
			<div className='container md:h-[42rem] sm:h-[30rem] h-[21rem] py-3'>
				<Carousel images={[{
					src: Slider1.src,
					alt: ''
				}, {
					src: Slider2.src,
					alt: ''
				}, {
					src: Slider3.src,
					alt: ''
				}, {
					src: Slider4.src,
					alt: ''
				}]} hideArrows />
			</div>
			<div className='container xl:h-[48rem] md:h-[42rem] h-[102rem] py-3'>
				<div className='flex w-full h-full flex-1 gap-10 md:flex-row flex-col'>
					<Carousel images={[{
						src: Slider5.src,
						alt: ''
					}, {
						src: Slider6.src,
						alt: ''
					}, {
						src: Slider7.src,
						alt: ''
					}, {
						src: Slider8.src,
						alt: ''
					}, {
						src: Slider9.src,
						alt: ''
					}, {
						src: Slider10.src,
						alt: ''
					}, {
						src: Slider11.src,
						alt: ''
					}, {
						src: Slider12.src,
						alt: ''
					}, {
						src: Slider13.src,
						alt: ''
					}]} hideArrows className='flex-1' />
					<div className='flex flex-col flex-1 gap-y-10'>
						<Image
							as={NextImage}
							src={DiamondIcon.src}
							alt='Diamond Icon'
							classNames={{ 'wrapper': 'self-center' }}
							width={100}
							height={89}
						/>
						<p className='text-center text-6xl md:text-5xl lg:text-6xl font-light !leading-[100px]'>
							Начните сотрудничать<br />с UvelirTrade уже сегодня!
						</p>
						<Button size='lg' variant='ghost' className='self-center border-black hover:!bg-black hover:text-white'>
							Стать партнёром
						</Button>
					</div>
				</div>
			</div>
		</main>
	)
}
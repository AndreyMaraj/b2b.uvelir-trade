import Carousel from '@/components/carousel'
import Slider1 from '@/public/slider-18.jpg'
import Slider2 from '@/public/slider-19.jpg'
import Slider3 from '@/public/slider-20.jpg'
import Slider4 from '@/public/slider-21.jpg'
import Slider5 from '@/public/slider-14.jpg'
import Slider6 from '@/public/slider-15.jpg'
import Slider7 from '@/public/slider-16.jpg'
import Slider8 from '@/public/slider-17.jpg'
import NextImage from 'next/image'
import DiamondIcon from '@/public/diamond-icon.svg'
import Link from '@/components/link'
import { Button } from '@nextui-org/button'
import { Image } from '@nextui-org/image'
import { openGraph, twitter } from '@/app/shared-metadata'
import type { Metadata } from 'next'

const description = 'Ювелир Трейд предлагает широкий ассортимент ювелирных изделий оптом: от золотых и серебряных украшений до дизайнерских аксессуаров. Мы гарантируем высокое качество и конкурентные цены для оптовых покупателей в России И СНГ.',
	url = '/'

export const metadata: Metadata = {
	description,
	alternates: {
		canonical: url
	},
	openGraph: {
		...openGraph,
		url,
		description
	},
	twitter: {
		...twitter,
		description
	}
}

export default function Page() {
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
						<Button size='lg' variant='ghost' className='self-center border-black hover:!bg-black hover:text-white' as={Link} href='/auth/register'>
							Стать партнёром
						</Button>
					</div>
				</div>
			</div>
		</main>
	)
}
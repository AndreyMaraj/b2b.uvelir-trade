import { Button } from '@nextui-org/button'
import { openGraph, twitter } from '@/app/shared-metadata'
import type { Metadata } from 'next'

const title = 'Партнеры',
	description = 'Информация о наших партнерах и условиях сотрудничества.',
	url = '/partners'

export const metadata: Metadata = {
	title,
	description,
	alternates: {
		canonical: url
	},
	openGraph: {
		...openGraph,
		url,
		title,
		description
	},
	twitter: {
		...twitter,
		description,
		title
	}
}

const offers = [
	'Мы предлагаем индивидуальный подход к каждому клиенту',
	'Систему скидок и отсрочку платежа',
	'За каждым нашим клиентом закрепляется персональный менеджер'
]

export default function Page() {
	return (
		<>
			<h1 className='text-3xl'>Партнерам</h1>
			<p className='mt-5'>Наши преимущества:</p>
			<ul className='space-y-4 mt-5'>
				{offers.map((offer, index) => (
					<li key={index} className='flex items-start'>
						<span className='inline-flex items-center justify-center w-6 h-6 mr-2 text-sm font-semibold text-white bg-primary rounded-full flex-shrink-0'>
							{index + 1}
						</span>
						<span className='text-foreground'>{offer}</span>
					</li>
				))}
			</ul>
			<p className='mt-10'>В нашей команде сотрудники с опытом работы более 10 лет! Контроль качества осуществляется на каждом этапе в процессе производства.</p>
			<Button size='lg' variant='ghost' className='mt-10 border-black hover:!bg-black hover:text-white'>
				Стать партнёром
			</Button>
		</>
	)
}
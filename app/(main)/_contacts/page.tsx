import { openGraph, twitter } from '@/app/shared-metadata'
import Link from '@/components/link'
import type { Metadata } from 'next'

const title = 'Контакты',
	description = 'Свяжитесь с нами для получения дополнительной информации.',
	url = '/contacts'

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

const contacts = [{
	department: 'Менеджер',
	responsible: 'Екатерина',
	displayPhone: '+7 (999) 999-99-99',
	phone: '+79999999999'
}, {
	department: 'Руководитель отдела продаж',
	responsible: 'Александр',
	displayPhone: '+7 (999) 999-99-99',
	phone: '+79999999999'
}, {
	department: 'Бухгалтерия',
	displayPhone: '+7 (999) 999-99-99',
	phone: '+79999999999'
}]

export default function Page() {
	return (
		<>
			<h1 className='text-3xl mb-5'>Контакты</h1>
			{contacts.length &&
				<ul>
					{contacts.map((contact, index) =>
						<li key={index}>
							<p className='mb-5'>
								{contact.department}:
								{contact.responsible &&
									<>
										&nbsp;
										<strong>
											{contact.responsible}
										</strong>
									</>
								}
								<br />
								т. <Link href={`tel:${contact.phone}`} isExternal>{contact.displayPhone}</Link>
							</p>
						</li>
					)}
				</ul>
			}
			<p className='mb-5'>
				эл. почта&nbsp;
				<Link href='mailto:info@uvelirtrade.ru' isExternal>
					info@uvelirtrade.ru
				</Link>
			</p>
			<p>Адрес: Индустриальная 50/2</p>
		</>
	)
}
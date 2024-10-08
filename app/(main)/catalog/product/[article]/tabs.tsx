'use client'

import { Tab, Tabs } from '@nextui-org/react'
import { ReactNode } from 'react'

export default function ProductTabs({ description, characteristics }: { description?: ReactNode, characteristics?: ReactNode }) {
	return (
		<Tabs variant='underlined' className='mt-8'>
			{description &&
				<Tab key='about' title='Описание'>
					{description}
				</Tab>
			}
			{characteristics &&
				<Tab key='characteristics' title='Характеристики'>
					{characteristics}
				</Tab>
			}
		</Tabs>
	)
}
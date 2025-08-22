'use client'

import { Tab, Tabs } from '@heroui/tabs'
import ClientsTable from './clients-table'
import ManagersTable from './managers-table'

export default function AdminPanel() {
	return (
		<Tabs variant='underlined'>
			<Tab key='clients' title='Клиенты'>
				<ClientsTable />
			</Tab>
			<Tab key='managers' title='Менеджеры'>
				<ManagersTable />
			</Tab>
		</Tabs>
	)
}
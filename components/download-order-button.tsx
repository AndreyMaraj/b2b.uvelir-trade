import type { Order } from '@prisma/client'
import { Button } from '@heroui/button'
import { useCallback, useState } from 'react'

interface DownloadOrderButtonProps {
	orderId: Order['id']
}

export default function DownloadOrderButton({ orderId }: DownloadOrderButtonProps) {
	const [isOrderLoading, setIsOrderLoading] = useState(false),
		onPressLoadOrderButton = useCallback(async () => {
			setIsOrderLoading(true)
			try {
				const response = await fetch(`/api/export/order/${orderId}`)
				if (!response.ok) {
					return
				}
				const blob = await response.blob(),
					contentDisposition = response.headers.get('Content-Disposition')
				let filename = `order-${orderId}.xlsx`

				if (contentDisposition) {
					const match = /filename\*?=(?:UTF-8''|")?([^;\"]+)/.exec(contentDisposition)
					if (match && match[1]) {
						filename = decodeURIComponent(match[1])
					}
				}

				const url = window.URL.createObjectURL(blob),
					a = document.createElement('a')
				a.href = url
				a.download = filename
				document.body.appendChild(a)
				a.click()
				window.URL.revokeObjectURL(url)
				a.remove()
			} finally {
				setIsOrderLoading(false)
			}
		}, [orderId])

	return (
		<Button
			isIconOnly
			variant='flat'
			isLoading={isOrderLoading}
			onPress={onPressLoadOrderButton}
		>
			<span className='icon-[mdi--download-outline]' />
		</Button>
	)
}
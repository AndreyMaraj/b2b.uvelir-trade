'use client'

import { NextUIProvider } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import { ReactNode } from 'react'

type ProvidersProps = {
	children: ReactNode
	className?: string
}

export function Providers({ children, className }: ProvidersProps) {
	const router = useRouter()

	return (
		<NextUIProvider navigate={router.push} className={className}>
			{children}
		</NextUIProvider>
	)
}
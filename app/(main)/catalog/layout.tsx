import type { ReactNode } from 'react'
import type { Metadata } from 'next/types'

export const metadata: Metadata = {
	robots: {
		index: false,
		follow: true
	}
}

export default function Layout({ children }: Readonly<{ children: ReactNode }>) {
	return children
}
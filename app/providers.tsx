'use client'

import { ShoppingBagProvider } from '@/components/shopping-bag-hook'
import { NextUIProvider } from '@nextui-org/react'
import type { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useMemo, type ReactNode } from 'react'

type ProvidersProps = {
	children: ReactNode
	className?: string,
	session: Session | null,
	sessionKey: number
}

export function Providers({ children, className, session, sessionKey }: ProvidersProps) {
	const router = useRouter(),
		memoizedSessionKey = useMemo(() => sessionKey, [session])

	return (
		<SessionProvider session={session} key={memoizedSessionKey}>
			<ShoppingBagProvider>
				<NextUIProvider navigate={router.push} className={className}>
					{children}
				</NextUIProvider>
			</ShoppingBagProvider>
		</SessionProvider>
	)
}
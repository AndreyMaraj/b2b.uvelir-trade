'use client'

import { NextUIProvider } from '@nextui-org/react';
import { useRouter } from 'next/navigation'
import { ReactNode } from 'react';

export function Providers({ children }: Readonly<{ children: ReactNode }>) {
	const router = useRouter();

	return (
		<NextUIProvider navigate={router.push}>
			{children}
		</NextUIProvider>
	);
}
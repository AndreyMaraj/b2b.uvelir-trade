'use client'

import Link from '@/components/link'
import { usePathname } from 'next/navigation'

interface NavLinksProps {
	menuItems: {
		label: string,
		href: string
	}[]
}

export default function NavLinks(props: NavLinksProps) {
	const pathname = usePathname()

	return (
		<nav>
			<ul>
				{props.menuItems.map((item, index) =>
					<li key={index}>
						<Link
							href={item.href}
							color='foreground'
							className={`cursor-pointer w-full font-medium py-2.5 ${item.href === pathname ? 'font-bold' : 'hover:font-semibold'}`}
						>
							{item.label}
						</Link>
					</li>
				)}
			</ul>
		</nav>
	)
}
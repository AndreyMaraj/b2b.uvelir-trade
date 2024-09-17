'use client'

import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button, NavbarMenuToggle, NavbarMenu, NavbarMenuItem } from '@nextui-org/react'
import { useCallback, useState } from 'react'
import Link from '@/components/link'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const menuItems = [{
	label: 'О компании',
	href: '/about'
}, {
	label: 'Партнерам',
	href: '/partners'
}, {
	label: 'Каталог',
	href: '/catalog'
}, {
	label: 'Контакты',
	href: '/contacts'
}]

export default function Header() {
	const [isMenuOpen, setIsMenuOpen] = useState(false),
		session = useSession(),
		router = useRouter(),
		onProfileButtonClick = useCallback(() => {
			if (session.data) {
				router.push('/profile')
			} else {
				signIn()
			}
		}, [session.data])

	return (
		<Navbar
			classNames={{ 'base': 'bg-black', 'wrapper': 'flex flex-col justify-center gap-2 text-white' }}
			isMenuOpen={isMenuOpen}
			onMenuOpenChange={setIsMenuOpen}
			height='6rem'
			maxWidth='full'
		>
			<div className='flex flex-row w-full flex-nowrap items-center justify-between container'>
				<NavbarContent justify='start' className='hidden sm:flex'>
				</NavbarContent>

				<NavbarContent className='sm:hidden' justify='start'>
					<NavbarMenuToggle aria-label={isMenuOpen ? 'Close menu' : 'Open menu'} />
				</NavbarContent>

				<NavbarContent justify='center'>
					<NavbarBrand>
						<Link href='/' className='font-bold text-inherit'>
							UvelirTrade
						</Link>
					</NavbarBrand>
				</NavbarContent>
				<NavbarContent justify='end' className='self-end'>
					<NavbarItem>
						<Button className='hidden sm:flex text-white hover:text-black' variant='ghost' startContent={<span className='iconify mdi--account-outline text-2xl' />} onClick={onProfileButtonClick}>
							{session.data ? 'Личный кабинет' : 'Вход для партнеров'}
						</Button>
						<Button className='sm:hidden text-white hover:text-black' variant='ghost' isIconOnly onClick={onProfileButtonClick}>
							<span className='iconify mdi--account-outline text-2xl' />
						</Button>
					</NavbarItem>
				</NavbarContent>
				<NavbarMenu>
					{menuItems.map((item, index) =>
						<NavbarMenuItem key={`${item.label}-${index}`}>
							<Link
								className='w-full'
								href={item.href}
								size='lg'
								color='foreground'
							>
								{item.label}
							</Link>
						</NavbarMenuItem>
					)}
				</NavbarMenu>
			</div>
			<div className='hidden sm:flex sm:flex-row sm:w-full sm:flex-nowrap sm:items-center sm:justify-center'>
				<NavbarContent justify='center'>
					{menuItems.map((item, index) =>
						<NavbarItem key={`${item.label}-${index}`}>
							<Link
								href={item.href}
								className='text-inherit'
							>
								{item.label}
							</Link>
						</NavbarItem>
					)}
				</NavbarContent>
			</div>
		</Navbar>
	)
}
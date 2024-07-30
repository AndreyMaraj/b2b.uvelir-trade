'use client'

import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link } from '@nextui-org/react';
import { useState } from 'react';

const menuItems = [{
	label: 'О компании',
	href: '#'
}, {
	label: 'Партнерам',
	href: '#'
}, {
	label: 'Каталог',
	href: '#'
}, {
	label: 'Контакты',
	href: '#'
}];

export default function Header() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	return (
		<Navbar
			classNames={{ 'base': 'bg-black', 'wrapper': 'flex flex-col justify-center gap-2 text-white' }}
			isMenuOpen={isMenuOpen}
			onMenuOpenChange={setIsMenuOpen}
			height='6rem'
		>
			<div className='flex flex-row w-full flex-nowrap items-center justify-between'>
				<NavbarContent justify='start' className='hidden sm:flex'>
				</NavbarContent>

				<NavbarContent className='sm:hidden' justify='start'>
					<NavbarMenuToggle aria-label={isMenuOpen ? 'Close menu' : 'Open menu'} />
				</NavbarContent>

				<NavbarContent justify='center'>
					<NavbarBrand>
						<p className='font-bold'>UvelirTrade</p>
					</NavbarBrand>
				</NavbarContent>
				<NavbarContent justify='end' className='self-end'>
					<NavbarItem>
						<Button className='hidden sm:flex' variant='light' startContent={<span className='iconify mdi--account-outline text-2xl' />}>
							Вход для партнеров
						</Button>
						<Button className='sm:hidden' variant='light' startContent={<span className='iconify mdi--account-outline text-2xl' />} isIconOnly />
					</NavbarItem>
				</NavbarContent>

				<NavbarMenu>
					{menuItems.map((item, index) => (
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
					))}
				</NavbarMenu>
			</div>
			<div className='hidden sm:flex sm:flex-row sm:w-full sm:flex-nowrap sm:items-center sm:justify-center'>
				<NavbarContent justify='center'>
					{menuItems.map((item, index) => (
						<NavbarItem key={`${item.label}-${index}`}>
							<Link
								href={item.href}
								className='text-inherit'
							>
								{item.label}
							</Link>
						</NavbarItem>
					))}
				</NavbarContent>
			</div>
		</Navbar>
	);
}
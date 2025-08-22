'use client'

import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem } from '@heroui/navbar'
import { Button } from '@heroui/button'
import { Badge } from '@heroui/badge'
import { Popover, PopoverTrigger, PopoverContent } from '@heroui/popover'
import { useCallback, useMemo, useState } from 'react'
import Link from '@/components/link'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useShoppingBag } from './shopping-bag-hook'
import { UserRole } from '@prisma/client'

function ShoppingBagButton({ productsCount, positionCount, isBadgeInvisible }: { productsCount: number, positionCount: number, isBadgeInvisible: boolean }) {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<Badge color='primary' content={productsCount} isInvisible={isBadgeInvisible}>
			<Popover
				showArrow
				offset={10}
				placement='bottom'
				backdrop='opaque'
				isOpen={isOpen}
				onOpenChange={setIsOpen}
			>
				<PopoverTrigger>
					<Button className='text-white hover:text-black' variant='ghost' isIconOnly>
						<span className='icon-[mdi--cart]' />
					</Button>
				</PopoverTrigger>
				<PopoverContent className='p-6'>
					{titleProps =>
						<div className='w-full'>
							<h3 className='text-2xl mb-5' {...titleProps}>
								Корзина
							</h3>
							<div className='mt-2 flex flex-col gap-2 w-full'>
								<p>
									Позиций: {positionCount}
								</p>
								<p>
									Штук: {productsCount}
								</p>
								<Link
									className='mt-5 hover:underline'
									href='/profile/shopping-bag'
									size='sm'
									color='foreground'
									onPress={() => setIsOpen(false)}
								>
									Оформить заказ
								</Link>
							</div>
						</div>
					}
				</PopoverContent>
			</Popover>
		</Badge>
	)
}

export default function Header() {
	const [isMenuOpen, setIsMenuOpen] = useState(false),
		{ products, isPending } = useShoppingBag(),
		productsCount = useMemo(() => products.reduce((sum, product) => sum + product.count, 0), [products]),
		session = useSession(),
		router = useRouter(),
		menuItems = [{
			label: 'О компании',
			href: '/about'
		}, {
			label: 'Каталог',
			href: '/catalog'
		}, ...(session.data?.user.role === UserRole.ADMIN || session.data?.user.role === UserRole.MANAGER ? [{
			label: 'Администрирование',
			href: '/administration/users'
		}] : [])],
		onProfileButtonClick = useCallback(() => {
			if (session.data) {
				router.push('/profile')
			} else {
				signIn()
			}
		}, [session.data, router])

	return (
		<Navbar
			classNames={{ 'base': 'bg-black', 'wrapper': 'flex flex-col justify-center gap-2 text-white' }}
			isMenuOpen={isMenuOpen}
			onMenuOpenChange={setIsMenuOpen}
			height='6rem'
			maxWidth='full'
		>
			<div className='flex w-full flex-nowrap items-center justify-between container'>
				<NavbarContent justify='start'>
					<NavbarItem className='sm:hidden'>
						<NavbarMenuToggle icon={<span className='icon-[mdi--hamburger-menu]' />} />
					</NavbarItem>
					{!!products.length &&
						<NavbarItem className='hidden sm:flex'>
							<ShoppingBagButton positionCount={products.length} productsCount={productsCount} isBadgeInvisible={isPending} />
						</NavbarItem>
					}
				</NavbarContent>

				<NavbarContent justify='center'>
					<NavbarBrand>
						<Link href='/' className='font-bold text-inherit'>
							UvelirTrade
						</Link>
					</NavbarBrand>
				</NavbarContent>
				<NavbarContent justify='end' className='self-end'>
					{!!products.length &&
						<NavbarItem className='sm:hidden' >
							<ShoppingBagButton positionCount={products.length} productsCount={productsCount} isBadgeInvisible={isPending} />
						</NavbarItem>
					}
					<NavbarItem>
						<Button className='hidden sm:flex text-white hover:text-black' variant='ghost' startContent={<span className='icon-[mdi--account-outline]' />} onPress={onProfileButtonClick}>
							{session.data ? 'Личный кабинет' : 'Вход для партнеров'}
						</Button>
						<Button className='sm:hidden text-white hover:text-black' variant='ghost' isIconOnly onPress={onProfileButtonClick}>
							<span className='icon-[mdi--account-outline]' />
						</Button>
					</NavbarItem>
				</NavbarContent>
				<NavbarMenu>
					{menuItems.map((item, index) =>
						<NavbarMenuItem key={index}>
							<Link
								className='w-full'
								href={item.href}
								size='lg'
								color='foreground'
								onPress={() => setIsMenuOpen(false)}
							>
								{item.label}
							</Link>
						</NavbarMenuItem>
					)}
				</NavbarMenu>
			</div>
			<div className='hidden sm:flex sm:w-full sm:flex-nowrap sm:items-center sm:justify-center'>
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
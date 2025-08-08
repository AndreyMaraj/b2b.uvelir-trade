'use client'

import { forwardRef, ForwardedRef } from 'react'
import NextLink, { LinkProps as NextLinkProps } from 'next/link'
import { Link as NextUILink, LinkProps as NextUILinkProps } from '@heroui/link'

export type LinkProps = Omit<NextUILinkProps, 'as' | 'href'> &
	Pick<NextLinkProps, 'replace' | 'scroll' | 'shallow' | 'passHref' | 'prefetch' | 'locale'> & {
		isExternal?: boolean
		href: string
	}

export default forwardRef<HTMLAnchorElement, LinkProps>(
	function Link(props: LinkProps, ref: ForwardedRef<HTMLAnchorElement>) {
		const {
			href,
			replace,
			scroll,
			shallow,
			passHref,
			prefetch,
			locale,
			isExternal = false,
			...restProps
		} = props

		const nextLinkProps = { href, replace, scroll, shallow, passHref, prefetch, locale }

		if (isExternal) {
			return (
				<NextUILink
					ref={ref}
					href={href}
					target='_blank'
					rel='noopener noreferrer'
					isExternal
					{...restProps}
				/>
			)
		}

		return (
			<NextUILink
				ref={ref}
				as={NextLink}
				{...nextLinkProps}
				{...restProps}
			/>
		)
	}
)
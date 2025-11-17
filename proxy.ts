import authConfig from '@/auth.config'
import NextAuth from 'next-auth'
import { apiAuthPrefix, authRoutes, DEFAULT_LOGIN_REDIRECT, publicRoutes } from '@/routes'

const { auth } = NextAuth(authConfig)

export default auth(req => {
	const isApiAuthRoute = req.nextUrl.pathname.startsWith(apiAuthPrefix)

	if (isApiAuthRoute) return

	const isLoggedIn = !!req.auth,
		isPublicRoute = publicRoutes.includes(req.nextUrl.pathname),
		isAuthRoute = authRoutes.includes(req.nextUrl.pathname)

	if (isAuthRoute) {
		if (isLoggedIn) {
			return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, req.nextUrl))
		}
		return
	}

	if (!isLoggedIn && !isPublicRoute) {
		return Response.redirect(new URL('/auth/login', req.nextUrl))
	}

	return
})

export const config = {
	matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)']
}
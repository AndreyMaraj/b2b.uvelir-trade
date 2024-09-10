import type { DefaultSession } from 'next-auth'
import type { UserRole } from '@prisma/client'
import type { JWT } from 'next-auth/jwt'

declare module 'next-auth' {
	interface Session {
		user: {
			role?: UserRole
		} & DefaultSession['user']
	}
}

declare module 'next-auth/jwt' {
	interface JWT {
		role?: UserRole
	}
}
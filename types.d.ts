import type { DefaultSession } from 'next-auth'
import type { UserRole } from '@prisma/client'
import type { JWT } from 'next-auth/jwt'
import type { Prisma } from '@prisma/client'

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

type MapPrismaDecimalToNumber<PropType> = PropType extends Prisma.Decimal ? number : PropType
export type SerializedPrismaEntity<TPrismaEntity> = {
	[PropertyKey in keyof TPrismaEntity]: MapPrismaDecimalToNumber<TPrismaEntity[PropertyKey]>
}
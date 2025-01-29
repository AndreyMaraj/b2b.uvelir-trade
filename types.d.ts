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

declare global {
	type Prettify<T> = {
		[K in keyof T]: T[K]
	} & {}

	type UnionToIntersection<T> = Prettify<
		(T extends any ? (x: T) => any : never) extends (x: infer R) => any
		? R
		: never
	>

	interface PageProps<TParams extends string = never, TSearchParams extends string = never> {
		params: Promise<UnionToIntersection<
			{
				[K in TParams]: {
					[F in K extends `...${infer U}` ? U : K]: K extends `...${string}`
					? string[]
					: string;
				}
			}[TParams]
		>>
		searchParams: Promise<{ [K in TSearchParams]: string | string[] | undefined }>
	}
}
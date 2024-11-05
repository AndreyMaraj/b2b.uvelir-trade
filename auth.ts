import NextAuth, { CredentialsSignin } from 'next-auth'
import authConfig from '@/auth.config'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from '@/prisma'
import { getUserByEmail, getUserById } from '@/data/user'
import Credentials from 'next-auth/providers/credentials'
import { LoginSchema } from '@/schemas'
import bcrypt from 'bcrypt'

export class InvalidLoginError extends CredentialsSignin {
	code = 'Invalid identifier or password'
}

export class UnverifiedAccountLoginError extends CredentialsSignin {
	code = 'Unverified account'
}

export const { handlers: { GET, POST }, signIn, signOut, auth } = NextAuth({
	...authConfig,
	providers: [
		Credentials({
			async authorize(credentials) {
				const validatedFields = LoginSchema.safeParse(credentials)

				if (validatedFields.success) {
					const { email, password } = validatedFields.data

					const user = await getUserByEmail(email)

					if (!user) {
						throw new InvalidLoginError()
					}

					const passwordsMatch = await bcrypt.compare(password, user.password)

					if (!passwordsMatch) {
						throw new InvalidLoginError()
					}

					if (!user.verified) {
						throw new UnverifiedAccountLoginError()
					}

					return user
				}

				throw new InvalidLoginError()
			}
		})
	],
	adapter: PrismaAdapter(prisma),
	session: { strategy: 'jwt' },
	callbacks: {
		async session({ token, session }) {
			if (session.user) {
				if (token.sub) {
					session.user.id = token.sub
				}
				if (token.role) {
					session.user.role = token.role
				}
			}
			return session
		},
		async jwt({ token }) {
			if (!token.sub) return token

			const existingUser = await getUserById(token.sub)
			if (existingUser) {
				token.role = existingUser.role
			}

			return token
		}
	}
})
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

export const prisma = globalForPrisma.prisma || new PrismaClient({ log: ['warn', 'error'] })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

//@ts-ignore
prisma.$on('warn', (e) => {
	console.log(e)
})

//@ts-ignore
prisma.$on('error', (e) => {
	console.log(e)
})
import { Prisma, PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

export const prisma = globalForPrisma.prisma || new PrismaClient({ log: ['warn', 'error'] })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

const transformData = (data: any): any => {
	if (Array.isArray(data)) {
		return data.map(item => transformData(item))
	}

	if (data === null || data === undefined || typeof data !== 'object') {
		return data
	}

	const transformed: any = { ...data }

	for (const key in transformed) {
		if (transformed[key] instanceof Prisma.Decimal) {
			transformed[key] = transformed[key].toNumber()
		} else if (transformed[key] instanceof Date) {
			transformed[key] = transformed[key].toISOString()
		} else if (transformed[key] instanceof Uint8Array) {
			transformed[key] = Buffer.from(transformed[key]).toString('base64')
		} else if (typeof transformed[key] === 'object') {
			transformed[key] = transformData(transformed[key])
		}
	}

	return transformed
}

prisma.$use(async (params, next) => {
	const result = await next(params)
	return transformData(result)
})

//@ts-ignore
prisma.$on('warn', (e) => {
	console.log(e)
})

//@ts-ignore
prisma.$on('error', (e) => {
	console.log(e)
})
'use server'

import { prisma } from '@/prisma'
import type { SerializedPrismaEntity } from '@/types'
import { Prisma } from '@prisma/client'
import type { EarringDimensions, InvisibleModelModification, Metal, ModelComponent, ProductModel, ProductPrototype, RingDimensions, Stone, VisibleModelModification } from '@prisma/client'

const SELECT_ID = {
	select: {
		id: true
	}
} as const

export async function upsertCutType(name: string) {
	const { id } = await prisma.cutType.upsert({
		...SELECT_ID,
		where: { name },
		create: { name },
		update: {}
	})

	return id
}

export async function upsertStoneType(name: string) {
	return (await prisma.stoneType.upsert({
		...SELECT_ID,
		where: { name },
		create: { name },
		update: {}
	})).id
}

export async function upsertColor(name: string) {
	return (await prisma.color.upsert({
		...SELECT_ID,
		where: { name },
		create: { name },
		update: {}
	})).id
}

export async function upsertMetalCoating(name: string) {
	return (await prisma.metalCoating.upsert({
		...SELECT_ID,
		where: { name },
		create: { name },
		update: {}
	})).id
}

export async function upsertMetalType(name: string) {
	return (await prisma.metalType.upsert({
		...SELECT_ID,
		where: { name },
		create: { name },
		update: {}
	})).id
}

export async function upsertProductLockType(name: string) {
	return (await prisma.productLockType.upsert({
		...SELECT_ID,
		where: { name },
		create: { name },
		update: {}
	})).id
}

export async function upsertProductTheme(name: string) {
	return (await prisma.productTheme.upsert({
		...SELECT_ID,
		where: { name },
		create: { name },
		update: {}
	})).id
}

export async function upsertProductStyle(name: string) {
	return (await prisma.productStyle.upsert({
		...SELECT_ID,
		where: { name },
		create: { name },
		update: {}
	})).id
}

export async function upsertProductType(name: string) {
	return (await prisma.productType.upsert({
		...SELECT_ID,
		where: { name },
		create: { name },
		update: {}
	})).id
}

export async function upsertWeavingType(name: string) {
	return (await prisma.weavingType.upsert({
		...SELECT_ID,
		where: { name },
		create: { name },
		update: {}
	})).id
}

export async function upsertWireType(name: string) {
	return (await prisma.wireType.upsert({
		...SELECT_ID,
		where: { name },
		create: { name },
		update: {}
	})).id
}

export async function upsertAgeCategory(name: string) {
	return (await prisma.ageCategory.upsert({
		...SELECT_ID,
		where: { name },
		create: { name },
		update: {}
	})).id
}

export async function upsertSex(name: string) {
	return (await prisma.sex.upsert({
		...SELECT_ID,
		where: { name },
		create: { name },
		update: {}
	})).id
}

export async function upsertRingDimensions(data: SerializedPrismaEntity<Omit<RingDimensions, 'id'>>) {
	return (await prisma.ringDimensions.upsert({
		...SELECT_ID,
		where: { ...data },
		create: { ...data },
		update: {}
	})).id
}

export async function upsertEarringDimensions(data: SerializedPrismaEntity<Omit<EarringDimensions, 'id'>>) {
	return (await prisma.earringDimensions.findFirst({
		...SELECT_ID,
		where: { ...data }
	}))?.id ?? (await prisma.earringDimensions.create({ ...SELECT_ID, data })).id
}

export async function upsertMetal(data: Omit<Metal, 'id'>) {
	return (await prisma.metal.findFirst({
		...SELECT_ID,
		where: { ...data }
	}))?.id ?? (await prisma.metal.create({ ...SELECT_ID, data })).id
}

export async function upsertStone(data: Omit<Stone, 'id'>) {
	return (await prisma.stone.findFirst({
		...SELECT_ID,
		where: { ...data }
	}))?.id ?? (await prisma.stone.create({ ...SELECT_ID, data })).id
}

export async function upsertModelComponent(data: SerializedPrismaEntity<Omit<ModelComponent, 'id'>>) {
	const model = await prisma.modelComponent.findFirst({
		...SELECT_ID,
		where: {
			stoneId: data.stoneId,
			weight: data.weight,
			visibleModelModificationId: data.visibleModelModificationId
		}
	})

	return model ? (await prisma.modelComponent.update({
		...SELECT_ID,
		where: { ...model },
		data: {
			count: data.count
		}
	})).id : (await prisma.modelComponent.create({ ...SELECT_ID, data })).id
}

export async function upsertInvisibleModelModification(data: SerializedPrismaEntity<Omit<InvisibleModelModification, 'id'>>) {
	return (await prisma.invisibleModelModification.upsert({
		...SELECT_ID,
		where: {
			article: data.article
		},
		create: { ...data },
		update: {
			height: data.height,
			width: data.width,
			description: data.description,
			wireTypeId: data.wireTypeId
		}
	})).id
}

export async function upsertVisibleModelModification(data: SerializedPrismaEntity<Omit<VisibleModelModification, 'id'>>) {
	return (await prisma.visibleModelModification.upsert({
		...SELECT_ID,
		where: {
			code_productModelId: {
				code: data.code,
				productModelId: data.productModelId
			}
		},
		create: { ...data },
		update: {
			wireDiameter: data.wireDiameter
		}
	})).id
}

export async function upsertProductModel(data: Omit<ProductModel, 'id'>) {
	return (await prisma.productModel.upsert({
		...SELECT_ID,
		where: {
			productPrototypId_metalId: {
				productPrototypId: data.productPrototypId,
				metalId: data.metalId
			}
		},
		create: { ...data },
		update: {}
	})).id
}

export async function upsertProductPrototyp(data: Omit<ProductPrototype, 'id'>) {
	return (await prisma.productPrototype.upsert({
		...SELECT_ID,
		where: {
			code_typeId: {
				code: data.code,
				typeId: data.typeId
			},

		},
		create: { ...data },
		update: {
			sexId: data.sexId,
			ageCategoryId: data.ageCategoryId,
			styleId: data.styleId,
			themeId: data.themeId,
			lockTypeId: data.lockTypeId,
			ringDimensionsId: data.ringDimensionsId,
			earringDimensionsId: data.earringDimensionsId,
			weavingTypeId: data.weavingTypeId
		}
	})).id
}

interface GetProductsProps {
	skip?: number,
	take?: number,
	articleQuery?: string,
	stoneTypeId?: number,
	metalTypeId?: number,
	colorId?: number,
	typeId?: number,
	sort?: string
}

export async function getProducts({ skip, take, articleQuery, stoneTypeId, metalTypeId, colorId, typeId }: GetProductsProps) {
	try {
		const where = Prisma.validator<Prisma.InvisibleModelModificationWhereInput>()({
			article: { contains: articleQuery },
			visibleModelModification: {
				...(stoneTypeId && {
					modelComponents: {
						some: {
							stone: { stoneTypeId }
						}
					}
				}),
				productModel: {
					metal: { metalTypeId, colorId },
					productPrototyp: { typeId }
				}
			}
		})

		return {
			products: await prisma.invisibleModelModification.findMany({
				where,
				skip,
				take,
				include: {
					visibleModelModification: {
						include: {
							media: true,
							productModel: {
								include: {
									productPrototyp: {
										include: {
											type: true
										}
									}
								}
							}
						}
					}
				}
			}),
			productsCount: await prisma.invisibleModelModification.count({ where })
		}
	} catch (e) {
		console.log(e)
		return
	}
}

export async function getProductByArticle(article: string) {
	try {
		return await prisma.invisibleModelModification.findUnique({
			where: { article },
			include: {
				wireType: true,
				visibleModelModification: {
					include: {
						media: true,
						productModel: {
							include: {
								productPrototyp: {
									include: {
										type: true,
										sex: true,
										ringDimensions: true,
										earringDimensions: true,
										weavingType: true,
										lockType: true
									}
								},
								metal: {
									include: {
										color: true,
										metalType: true,
										metalCoating: true
									}
								}
							}
						},
						modelComponents: {
							include: {
								stone: {
									include: {
										stoneType: true,
										color: true,
										cutType: true
									}
								}
							}
						}
					}
				}
			}
		})
	} catch (e) {
		console.log(e)
		return
	}
}

export async function getProductVariants(id: number) {
	try {
		return await prisma.productPrototype.findUnique({
			where: { id },
			include: {
				productModels: {
					include: {
						visibleProductModifications: {
							include: {
								invisibleModelModifications: true,
								media: true
							}
						}
					}
				}
			}
		})
	} catch (e) {
		console.log(e)
		return
	}
}

export async function getAdditionalProducts({ take, skipIds }: { take?: number, skipIds?: Array<number> }) {
	try {
		return await prisma.invisibleModelModification.findMany({
			take,
			where: {
				id: { notIn: skipIds }
			},
			include: {
				visibleModelModification: {
					include: {
						productModel: {
							include: {
								productPrototyp: {
									include: { type: true }
								}
							}
						},
						media: true
					}
				}
			}
		})
	} catch (e) {
		console.log(e)
		return
	}
}

export async function getMetalTypes() {
	try {
		return await prisma.metalType.findMany()
	} catch (e) {
		console.log(e)
		return
	}
}

export async function getStoneTypes() {
	try {
		return await prisma.stoneType.findMany()
	} catch (e) {
		console.log(e)
		return
	}
}

export async function getMetalColors() {
	try {
		return await prisma.color.findMany({
			where: {
				metals: {
					some: {}
				}
			}
		})
	} catch (e) {
		console.log(e)
		return
	}
}

export async function getProductTypes() {
	try {
		return await prisma.productType.findMany()
	} catch (e) {
		console.log(e)
		return
	}
}
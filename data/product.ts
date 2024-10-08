import { prisma } from '@/prisma'
import { SerializedPrismaEntity } from '@/types'
import { EarringDimensions, InvisibleModelModification, Metal, ModelComponent, Prisma, ProductModel, ProductPrototyp, RingDimensions, Stone, VisibleModelModification } from '@prisma/client'

export const SELECT_ID = {
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
	const { id } = await prisma.stoneType.upsert({
		...SELECT_ID,
		where: { name },
		create: { name },
		update: {}
	})

	return id
}

export async function upsertColor(name: string) {
	const { id } = await prisma.color.upsert({
		...SELECT_ID,
		where: { name },
		create: { name },
		update: {}
	})

	return id
}

export async function upsertMetalCoating(name: string) {
	const { id } = await prisma.metalCoating.upsert({
		...SELECT_ID,
		where: { name },
		create: { name },
		update: {}
	})

	return id
}

export async function upsertMetalType(name: string) {
	const { id } = await prisma.metalType.upsert({
		...SELECT_ID,
		where: { name },
		create: { name },
		update: {}
	})

	return id
}

export async function upsertProductLockType(name: string) {
	const { id } = await prisma.productLockType.upsert({
		...SELECT_ID,
		where: { name },
		create: { name },
		update: {}
	})

	return id
}

export async function upsertProductTheme(name: string) {
	const { id } = await prisma.productTheme.upsert({
		...SELECT_ID,
		where: { name },
		create: { name },
		update: {}
	})

	return id
}

export async function upsertProductStyle(name: string) {
	const { id } = await prisma.productStyle.upsert({
		...SELECT_ID,
		where: { name },
		create: { name },
		update: {}
	})

	return id
}

export async function upsertProductType(name: string) {
	const { id } = await prisma.productType.upsert({
		...SELECT_ID,
		where: { name },
		create: { name },
		update: {}
	})

	return id
}

export async function upsertWeavingType(name: string) {
	const { id } = await prisma.weavingType.upsert({
		...SELECT_ID,
		where: { name },
		create: { name },
		update: {}
	})

	return id
}

export async function upsertWireType(name: string) {
	const { id } = await prisma.wireType.upsert({
		...SELECT_ID,
		where: { name },
		create: { name },
		update: {}
	})

	return id
}

export async function upsertAgeCategory(name: string) {
	const { id } = await prisma.ageCategory.upsert({
		...SELECT_ID,
		where: { name },
		create: { name },
		update: {}
	})

	return id
}

export async function upsertSex(name: string) {
	const { id } = await prisma.sex.upsert({
		...SELECT_ID,
		where: { name },
		create: { name },
		update: {}
	})

	return id
}

export async function upsertRingDimensions(data: SerializedPrismaEntity<Omit<RingDimensions, 'id'>>) {
	const { id } = await prisma.ringDimensions.upsert({
		...SELECT_ID,
		where: { ...data },
		create: { ...data },
		update: {}
	})

	return id
}

export async function upsertEarringDimensions(data: SerializedPrismaEntity<Omit<EarringDimensions, 'id'>>) {
	const { id } = await prisma.earringDimensions.findFirst({
		...SELECT_ID,
		where: { ...data }
	}) ?? await prisma.earringDimensions.create({ ...SELECT_ID, data })

	return id
}

export async function upsertMetal(data: Omit<Metal, 'id'>) {
	const { id } = await prisma.metal.findFirst({
		...SELECT_ID,
		where: { ...data }
	}) ?? await prisma.metal.create({ ...SELECT_ID, data })

	return id
}

export async function upsertStone(data: Omit<Stone, 'id'>) {
	const { id } = await prisma.stone.findFirst({
		...SELECT_ID,
		where: { ...data }
	}) ?? await prisma.stone.create({ ...SELECT_ID, data })

	return id
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

	const { id } = model ? await prisma.modelComponent.update({
		...SELECT_ID,
		where: { ...model },
		data: {
			count: data.count
		}
	}) : await prisma.modelComponent.create({ ...SELECT_ID, data })

	return id
}

export async function upsertInvisibleModelModification(data: SerializedPrismaEntity<Omit<InvisibleModelModification, 'id'>>) {
	const { id } = await prisma.invisibleModelModification.upsert({
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
	})

	return id
}

export async function upsertVisibleModelModification(data: SerializedPrismaEntity<Omit<VisibleModelModification, 'id'>>) {
	const { id } = await prisma.visibleModelModification.upsert({
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
	})

	return id
}

export async function upsertProductModel(data: Omit<ProductModel, 'id'>) {
	const { id } = await prisma.productModel.upsert({
		...SELECT_ID,
		where: {
			productPrototypId_metalId: {
				productPrototypId: data.productPrototypId,
				metalId: data.metalId
			}
		},
		create: { ...data },
		update: {}
	})

	return id
}

export async function upsertProductPrototyp(data: Omit<ProductPrototyp, 'id'>) {
	const { id } = await prisma.productPrototyp.upsert({
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
	})

	return id
}

interface GetProductsProps {
	skip?: number,
	take?: number,
	articleQuery?: string,
	stoneType?: string,
	metalType?: string,
	metalColor?: string,
	productType?: string,
	sort?: string
}

export async function getProducts({ skip, take, articleQuery, stoneType, metalType, metalColor, productType }: GetProductsProps) {
	try {
		const where = Prisma.validator<Prisma.InvisibleModelModificationWhereInput>()({
			article: articleQuery !== undefined ? {
				contains: articleQuery
			} : undefined,
			visibleModelModification: {
				modelComponents: stoneType !== undefined ? {
					some: {
						stone: {
							stoneTypeId: Number(stoneType)
						}
					}
				} : undefined,
				productModel: metalType !== undefined || metalColor !== undefined || productType !== undefined ? {
					metal: {
						metalTypeId: metalType !== undefined ? Number(metalType) : undefined,
						colorId: metalColor !== undefined ? Number(metalColor) : undefined
					},
					productPrototyp: {
						typeId: productType !== undefined ? Number(productType) : undefined,
					}
				} : undefined
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
							productModificationMedia: true,
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
						productModificationMedia: true,
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

export async function getProductVariants(productPrototypId: number) {
	try {
		return await prisma.productPrototyp.findUnique({
			where: {
				id: productPrototypId
			},
			include: {
				productModels: {
					include: {
						visibleProductModifications: {
							include: {
								invisibleModelModifications: true,
								productModificationMedia: true
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

export async function getOtherProducts({ take, skipIds }: { take?: number, skipIds?: Array<number> }) {
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
						productModificationMedia: true
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
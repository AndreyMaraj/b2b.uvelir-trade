'use server'

import { prisma } from '@/prisma'
import type { SerializedPrismaEntity } from '@/types'
import { Prisma } from '@prisma/client'
import type { EarringDimensions, InvisibleModelModification, InvisibleModelModificationSize, Metal, ModelComponent, ProductModel, ProductPrototype, RingDimensions, Stone } from '@prisma/client'

const SELECT_ID = {
	select: {
		id: true
	}
} as const

export async function upsertSize(value: number) {
	return (await prisma.size.upsert({
		...SELECT_ID,
		where: { value },
		create: { value },
		update: {}
	})).id
}

export async function upsertInvisibleModelModificationSize(data: SerializedPrismaEntity<Omit<InvisibleModelModificationSize, 'id'>>) {
	return (await prisma.invisibleModelModificationSize.upsert({
		...SELECT_ID,
		where: {
			sizeId_invisibleModelModificationId: {
				sizeId: data.sizeId,
				invisibleModelModificationId: data.invisibleModelModificationId
			}
		},
		create: { ...data },
		update: {
			averageWeight: data.averageWeight
		}
	})).id
}

export async function upsertCutType(name: string) {
	return (await prisma.cutType.upsert({
		...SELECT_ID,
		where: { name },
		create: { name },
		update: {}
	})).id
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

export async function upsertNomenclatureGroupe(name: string) {
	return (await prisma.nomenclatureGroup.upsert({
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
			averageWeight: data.averageWeight,
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
			wireTypeId: data.wireTypeId,
			nomenclatureGroupId: data.nomenclatureGroupId,
			averageWeight: data.averageWeight
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
	nomenclatureGroupId?: number,
	sort?: string
}

export async function getProducts({ skip, take, articleQuery, stoneTypeId, metalTypeId, colorId, nomenclatureGroupId }: GetProductsProps) {
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
				...(nomenclatureGroupId && {
					invisibleModelModifications: {
						some: { nomenclatureGroupId }
					}
				}),
				productModel: {
					metal: { metalTypeId, colorId }
				}
			}
		})

		return {
			products: (await prisma.invisibleModelModification.findMany({
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
					},
					invisibleModelModificationSizes: {
						take: 1,
						select: {
							averageWeight: true
						},
						orderBy: {
							size: {
								value: 'asc'
							}
						}
					}
				}
			})),
			productsCount: await prisma.invisibleModelModification.count({ where })
		}
	} catch (e) {
		console.log(e)
		return { products: [], productsCount: 0 }
	}
}

export async function getProductByArticle(article: string) {
	try {
		return await prisma.invisibleModelModification.findUnique({
			where: { article },
			include: {
				wireType: {
					select: {
						name: true
					}
				},
				visibleModelModification: {
					select: {
						wireDiameter: true,
						media: {
							select: {
								path: true
							}
						},
						productModel: {
							select: {
								productPrototyp: {
									select: {
										id: true,
										type: {
											select: {
												name: true
											}
										},
										sex: true,
										ringDimensions: {
											select: {
												tireWidth: true
											}
										},
										earringDimensions: {
											select: {
												depth: true,
												pinLowering: true,
												pinWorkingArea: true
											}
										},
										weavingType: {
											select: {
												name: true
											}
										},
										lockType: {
											select: {
												name: true
											}
										}
									}
								},
								metal: {
									select: {
										standard: true,
										color: {
											select: {
												name: true
											}
										},
										metalType: {
											select: {
												name: true
											}
										},
										metalCoating: {
											select: {
												name: true
											}
										},
									}
								}
							}
						},
						modelComponents: {
							select: {
								count: true,
								averageWeight: true,
								stone: {
									select: {
										chroma: true,
										purity: true,
										stoneType: {
											select: {
												name: true
											}
										},
										color: {
											select: {
												name: true
											}
										},
										cutType: {
											select: {
												name: true
											}
										}
									}
								}
							}
						}
					}
				},
				invisibleModelModificationSizes: {
					select: {
						id: true,
						averageWeight: true,
						size: {
							select: {
								value: true
							}
						}
					},
					orderBy: {
						size: {
							value: 'asc'
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
			select: {
				productModels: {
					select: {
						visibleProductModifications: {
							select: {
								invisibleModelModifications: {
									select: {
										id: true,
										article: true
									}
								},
								media: {
									select: {
										path: true
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
				},
				invisibleModelModificationSizes: {
					take: 1,
					select: {
						averageWeight: true
					},
					orderBy: {
						size: {
							value: 'asc'
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

export async function getNomenclatureGroups() {
	try {
		return await prisma.nomenclatureGroup.findMany()
	} catch (e) {
		console.log(e)
		return
	}
}
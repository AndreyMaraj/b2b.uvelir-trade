import { getAdditionalProducts, getProductByArticle, getProductVariants } from '@/data/product'
import { Card, CardBody, CardHeader } from '@heroui/card'
import ProductImages from './product-images'
import ProductVariants from './product-variants'
import ProductTabs from './tabs'
import ProductCard from '../product-card'
import AddToShoppingBagButton from './add-to-shopping-bag-button'
import { openGraph, twitter } from '@/app/shared-metadata'
import type { Metadata } from 'next'

interface CurrentPageProps extends PageProps<'/catalog/[article]', never> { }

export async function generateMetadata({ params }: CurrentPageProps): Promise<Metadata> {
	const article = decodeURIComponent(decodeURIComponent((await params).article)),
		url = `/catalog/${article}`,
		product = await getProductByArticle(article),
		title = product ? `${product.visibleModelModification.productModel.productPrototyp.type.name} ${product.article}` : '',
		description = 'Подробная информация о товаре.'

	return {
		title,
		description,
		alternates: {
			canonical: url
		},
		openGraph: {
			...openGraph,
			url,
			title,
			description
		},
		twitter: {
			...twitter,
			description,
			title
		}
	}
}

interface Characteristic {
	label: string,
	value: string | number
}

interface CharacteristicGroup {
	groupLabel: string,
	characteristics: Characteristic[]
}

const youMayLikeBlockProductCount = 20

export default async function Page({ params }: CurrentPageProps) {
	const product = await getProductByArticle(decodeURIComponent((await params).article))

	if (!product) {
		return
	}

	const productPrototype = await getProductVariants(product.visibleModelModification.productModel.productPrototyp.id),
		additionalProducts = await getAdditionalProducts({
			take: youMayLikeBlockProductCount,
			skipIds: productPrototype ? productPrototype.productModels.flatMap(productModel => productModel.visibleProductModifications.flatMap(visibleProductModification => visibleProductModification.invisibleModelModifications.map(invisibleModelModification => invisibleModelModification.id))) : undefined
		}),
		mainCharacteristics: Characteristic[] = [{
			label: 'Металл',
			value: product.visibleModelModification.productModel.metal.metalType.name
		}, {
			label: 'Проба',
			value: product.visibleModelModification.productModel.metal.standard
		}, ...(product.visibleModelModification.modelComponents.length > 0 ? [{
			label: 'Вставка',
			value: product.visibleModelModification.modelComponents.map(modelComponent => modelComponent.stone.stoneType.name).filter((value, index, array) => array.indexOf(value) === index).join(', ')
		}] : []), ...(product.invisibleModelModificationSizes.length === 0 && product.averageWeight ? [{
			label: 'Вес',
			value: product.averageWeight.toNumber()
		}] : [])],
		characteristicsGroups: CharacteristicGroup[] = [{
			groupLabel: 'Общие характеристики',
			characteristics: [{
				label: 'Артикул',
				value: product.article
			}, ...(product.visibleModelModification.productModel.productPrototyp.sex ? [{
				label: 'Для кого',
				value: product.visibleModelModification.productModel.productPrototyp.sex.name
			}] : []), ...(product.wireType ? [{
				label: 'Вид цепи',
				value: product.wireType.name
			}] : []), ...(product.visibleModelModification.wireDiameter ? [{
				label: 'Диаметр проволоки',
				value: product.visibleModelModification.wireDiameter.toString()
			}] : []), ...(product.visibleModelModification.productModel.productPrototyp.weavingType ? [{
				label: 'Плетение',
				value: product.visibleModelModification.productModel.productPrototyp.weavingType.name
			}] : []), ...(product.visibleModelModification.productModel.productPrototyp.lockType ? [{
				label: 'Тип замка',
				value: product.visibleModelModification.productModel.productPrototyp.lockType.name
			}] : [])]
		}, {
			groupLabel: 'Материал',
			characteristics: [{
				label: 'Метал',
				value: product.visibleModelModification.productModel.metal.metalType.name
			}, {
				label: 'Проба',
				value: product.visibleModelModification.productModel.metal.standard
			}, ...(product.visibleModelModification.productModel.metal.color ? [{
				label: 'Цвет',
				value: product.visibleModelModification.productModel.metal.color.name
			}] : []), ...(product.visibleModelModification.productModel.metal.metalCoating ? [{
				label: 'Покрытие',
				value: product.visibleModelModification.productModel.metal.metalCoating.name
			}] : [])]
		}, ...(product.visibleModelModification.modelComponents.map(modelComponent => ({
			groupLabel: modelComponent.stone.stoneType.name + ', ' + modelComponent.count + ' шт',
			characteristics: [{
				label: 'Тип вставки',
				value: modelComponent.stone.stoneType.name
			}, {
				label: 'Форма вставки',
				value: modelComponent.stone.cutType.name
			}, {
				label: 'Количество',
				value: modelComponent.count
			}, ...(modelComponent.stone.color ? [{
				label: 'Цвет',
				value: modelComponent.stone.color.name
			}] : []), ...(modelComponent.stone.chroma ? [{
				label: 'Цветность',
				value: modelComponent.stone.chroma
			}] : []), ...(modelComponent.stone.purity ? [{
				label: 'Чистота',
				value: modelComponent.stone.purity
			}] : [])]
		}))), ...((product.height || product.width || product.visibleModelModification.productModel.productPrototyp.ringDimensions || product.visibleModelModification.productModel.productPrototyp.earringDimensions) ? [{
			groupLabel: 'Размеры',
			characteristics: [...(product.width ? [{
				label: 'Ширина',
				value: product.width.toNumber()
			}] : []), ...(product.height ? [{
				label: 'Высота',
				value: product.height.toNumber()
			}] : []), ...(product.visibleModelModification.productModel.productPrototyp.ringDimensions ? [{
				label: 'Ширина шинки',
				value: product.visibleModelModification.productModel.productPrototyp.ringDimensions.tireWidth.toNumber()
			}] : [])], ...(product.visibleModelModification.productModel.productPrototyp.earringDimensions ? [...(product.visibleModelModification.productModel.productPrototyp.earringDimensions.depth ? [{
				label: 'Глубина',
				value: product.visibleModelModification.productModel.productPrototyp.earringDimensions.depth.toNumber()
			}] : []), ...(product.visibleModelModification.productModel.productPrototyp.earringDimensions.pinLowering ? [{
				label: 'Занижение штифта',
				value: product.visibleModelModification.productModel.productPrototyp.earringDimensions.pinLowering.toNumber()
			}] : []), ...(product.visibleModelModification.productModel.productPrototyp.earringDimensions.pinWorkingArea ? [{
				label: 'Рабочая зона штифта',
				value: product.visibleModelModification.productModel.productPrototyp.earringDimensions.pinWorkingArea.toNumber()
			}] : [])] : [])
		}] : [])]

	return (
		<>
			<div className='flex flex-col md:flex-row gap-5 lg:gap-x-14'>
				<ProductImages media={product.media.map(mediaFile => mediaFile.path)} />
				<div className='md:w-1/2'>
					<h1 className='text-3xl uppercase'>
						{product.visibleModelModification.productModel.productPrototyp.type.name}
					</h1>
					<p className='mt-2 text-gray-500'>
						Артикул: {product.article}
					</p>
					{mainCharacteristics &&
						<div className='mt-4'>
							<p className='uppercase text-xl mb-3.5'>
								Характеристики
							</p>
							{mainCharacteristics.map((characteristic, index) =>
								<div key={index} className='flex items-baseline'>
									<span className='max-w-24 sm:max-w-52 md:max-w-24 hyphens-auto'>
										{characteristic.label}
									</span>
									<span className='flex-1 border-b border-dashed mx-1 border-gray-400' />
									<span className='max-w-24 sm:max-w-52 md:max-w-24 hyphens-auto text-right'>
										{characteristic.value}
									</span>
								</div>
							)}
						</div>

					}
					{product.invisibleModelModificationSizes.length ?
						<div className='flex flex-wrap gap-2 mt-4'>
							{product.invisibleModelModificationSizes.map(invisibleModelModificationSize => (
								<div
									key={invisibleModelModificationSize.id}
									className='flex flex-col items-center border border-gray-400 rounded-lg p-2 w-28 shadow-xs bg-white'
								>
									<div className='text-lg font-semibold mb-0.5'>
										{invisibleModelModificationSize.size.value.toNumber()}
									</div>
									<div className='text-sm text-gray-500 mb-0.5'>
										{invisibleModelModificationSize.averageWeight.toNumber()}
									</div>
									<AddToShoppingBagButton invisibleModelModificationId={product.id} invisibleModelModificationSizeId={invisibleModelModificationSize.id} />
								</div>
							))}
						</div>
						:
						<div className='flex justify-end mt-4'>
							<AddToShoppingBagButton invisibleModelModificationId={product.id} invisibleModelModificationSizeId={null} />
						</div>
					}
					{productPrototype &&
						<div className='mt-3'>
							<h3 className='mb-3'>
								Другие варианты данной модели
							</h3>
							<ProductVariants currentProductArcticle={product.article} productPrototype={productPrototype} />
						</div>
					}
				</div>
			</div>
			<ProductTabs description={
				product.description ?
					<Card>
						<CardBody>
							{product.description}
						</CardBody>
					</Card>
					: undefined
			}
				characteristics={
					<div className='flex flex-col md:flex-row gap-4 p-3 md:overflow-x-auto'>
						{characteristicsGroups.map((characteristic, index) =>
							<Card key={index} className='md:w-72 p-3 shrink-0'>
								<CardHeader>
									<p className='font-semibold'>
										{characteristic.groupLabel}
									</p>
								</CardHeader>
								<CardBody>
									{characteristic.characteristics.map((ch, index) =>
										<div key={index} className='flex items-baseline'>
											<span className='max-w-24 sm:max-w-52 md:max-w-24 hyphens-auto'>
												{ch.label}
											</span>
											<span className='flex-1 border-b border-dashed mx-1 border-gray-400' />
											<span className='max-w-24 sm:max-w-52 md:max-w-24 hyphens-auto text-right'>
												{ch.value}
											</span>
										</div>)}
								</CardBody>
							</Card>
						)}
					</div>
				}
			/>
			{additionalProducts &&
				<section>
					<h2 className='mt-12 text-xl font-semibold'>
						Вам может понравиться
					</h2>
					<div className='flex overflow-x-auto p-3 gap-x-2.5'>
						{additionalProducts.map(additionalProduct =>
							<ProductCard key={additionalProduct.article} product={additionalProduct} className='w-56 shrink-0' />
						)}
					</div>
				</section>
			}
		</>
	)
}
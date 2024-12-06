import { getAdditionalProducts, getProductByArticle, getProductVariants } from '@/data/product'
import { Card, CardBody, CardHeader } from '@nextui-org/react'
import ProductImages from './product-images'
import ProductVariants from './product-variants'
import ProductTabs from './tabs'
import ProductCard from '../../product-card'
import AddToShoppingBagButton from './add-to-shopping-bag-button'

interface Characteristic {
	label: string,
	value: string | number
}

interface CharacteristicGroup {
	groupLabel: string,
	characteristics: Characteristic[]
}

const youMayLikeBlockProductCount = 20

export default async function Page({ params }: Omit<PageProps<'article', never>, 'searchParams'>) {
	const article = decodeURIComponent(params.article),
		product = await getProductByArticle(article)

	if (!product) {
		return (
			<>
				Товара с артикулом {article} не существует
			</>
		)
	}

	const productPrototype = await getProductVariants(product.visibleModelModification.productModel.productPrototypId),
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
			}] : []), ...(modelComponent.weight ? [{
				label: 'Вес',
				value: modelComponent.weight.toString()
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
				value: product.width.toString()
			}] : []), ...(product.height ? [{
				label: 'Высота',
				value: product.height.toString()
			}] : []), ...(product.visibleModelModification.productModel.productPrototyp.ringDimensions ? [{
				label: 'Ширина шинки',
				value: product.visibleModelModification.productModel.productPrototyp.ringDimensions.tireWidth.toString()
			}] : [])], ...(product.visibleModelModification.productModel.productPrototyp.earringDimensions ? [...(product.visibleModelModification.productModel.productPrototyp.earringDimensions.depth ? [{
				label: 'Глубина',
				value: product.visibleModelModification.productModel.productPrototyp.earringDimensions.depth.toString()
			}] : []), ...(product.visibleModelModification.productModel.productPrototyp.earringDimensions.pinLowering ? [{
				label: 'Занижение штифта',
				value: product.visibleModelModification.productModel.productPrototyp.earringDimensions.pinLowering.toString()
			}] : []), ...(product.visibleModelModification.productModel.productPrototyp.earringDimensions.pinWorkingArea ? [{
				label: 'Рабочая зона штифта',
				value: product.visibleModelModification.productModel.productPrototyp.earringDimensions.pinWorkingArea.toString()
			}] : [])] : [])
		}] : [])]

	return (
		<>
			<div className='flex flex-col md:flex-row gap-5 lg:gap-x-14'>
				<ProductImages media={product.visibleModelModification.media} />
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
					<div className='flex justify-end mt-4'>
						<AddToShoppingBagButton productId={product.id} />
					</div>
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
							<Card key={index} className='md:w-72 p-3 flex-shrink-0'>
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
					<h2 className='my-12 text-xl font-semibold'>
						Вам может понравиться
					</h2>
					<div className='flex overflow-x-auto p-3 gap-x-2.5'>
						{additionalProducts.map(product =>
							<ProductCard key={product.article} product={product} className='basis-[calc(50%-10px)] sm:basis-[calc(33.33%-10px)] md:basis-[calc(25%-10px)] lg:basis-[calc(20%-10px)]' />
						)}
					</div>
				</section>
			}
		</>
	)
}
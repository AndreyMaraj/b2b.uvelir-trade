import { auth } from '@/auth'
import Link from '@/components/link'
import SelectFilter from '@/components/select-filter'
import { Card, CardBody, CardFooter, CardHeader, Chip, Image } from '@nextui-org/react'
import NextImage from 'next/image'
import { getMetalColors, getMetalTypes, getProducts, getProductTypes, getStoneTypes } from '@/data/product'
import PaginationClient from '@/components/pagination'
import SearchProduct from '@/components/search-product'
import { Suspense } from 'react'
import ClearFilterButton from '@/components/clear-filter-button'
import { QueryParam } from '@/consts'
import EmptyProductMedia from '@/public/empty-product-media.jpg'

const numberOfProductsPerPage = 15

async function Page({ searchParams }: Omit<PageProps<never, `${QueryParam}`>, 'params'>) {
	const currentPage = Number(searchParams[QueryParam.PAGE]) || 1,
		{ products, productsCount } = await getProducts({
			skip: (currentPage - 1) * numberOfProductsPerPage,
			take: numberOfProductsPerPage,
			articleQuery: searchParams[QueryParam.QUERY]?.toString(),
			stoneType: searchParams[QueryParam.STONE_TYPE]?.toString(),
			metalType: searchParams[QueryParam.METAL_TYPE]?.toString(),
			metalColor: searchParams[QueryParam.METAL_COLOR]?.toString(),
			productType: searchParams[QueryParam.PRODUCT_TYPE]?.toString()
		}) ?? { products: [], productsCount: 0 },
		productsPagesCount = Math.ceil(productsCount / numberOfProductsPerPage),
		stoneTypes = await getStoneTypes() ?? [],
		metalTypes = await getMetalTypes() ?? [],
		metalColors = await getMetalColors() ?? [],
		productTypes = await getProductTypes() ?? []

	return (
		<>
			<h1 className='text-3xl mb-5'>
				Каталог
			</h1>
			<div className='flex flex-col sm:flex-row gap-7'>
				<div className='md:basis-1/3 lg:basis-1/4'>
					<div className='p-5 shadow-lg sticky top-28'>
						<SearchProduct />
						<ul className='mt-8'>
							{productTypes.map(productType =>
								<li key={productType.id} className={`transition ease-in-out duration-300 hover:bg-black ${productType.id === Number(searchParams[QueryParam.PRODUCT_TYPE]) ? 'bg-black' : ''}`}>
									<Link href={`/catalog?productType=${productType.id}`} color='foreground' className={`transition ease-in-out duration-300 p-2.5 uppercase w-full hover:text-white ${productType.id === Number(searchParams[QueryParam.PRODUCT_TYPE]) ? 'text-white' : ''}`}>
										{productType.name}
									</Link>
								</li>
							)}
						</ul>
					</div>
				</div>
				<div className='flex flex-col gap-4 flex-1'>
					<div className='p-2.5 shadow-lg flex flex-col gap-4'>
						<div className='flex gap-4 flex-col lg:flex-row'>
							<SelectFilter items={stoneTypes} label='Вставка' paramName={QueryParam.STONE_TYPE} />
							<SelectFilter items={metalTypes} label='Металл' paramName={QueryParam.METAL_TYPE} />
							<SelectFilter items={metalColors} label='Цвет металла' paramName={QueryParam.METAL_COLOR} />
						</div>
						<ClearFilterButton />
					</div>
					<div>
						<div className='flex flex-wrap'>
							<Suspense key={currentPage}>
								{products.map((product, index) =>
									<Card className='p-3.5 basis-full sm:basis-1/2 lg:basis-1/3' key={index} radius='none'>
										<CardHeader>
											<p className='mx-auto'>
												{product.visibleModelModification.productModel.productPrototyp.type.name} {product.article}
											</p>
										</CardHeader>
										<CardBody className='overflow-visible py-2 items-center'>
											<Image
												as={NextImage}
												src={product.visibleModelModification.productModificationMedia.length > 0 ? `/product-media/${product.visibleModelModificationId}/${product.visibleModelModification.productModificationMedia[0].id}.jpg` : EmptyProductMedia.src}
												alt='test'
												width={160}
												height={160}
												quality={100}
												radius='none'
												sizes='100vw'
												className='object-cover'
											/>
										</CardBody>
									</Card>
								)}
							</Suspense>
						</div>
						{productsPagesCount > 1 &&
							<div className='flex justify-center mt-4'>
								<PaginationClient total={productsPagesCount} />
							</div>
						}
					</div>
				</div>
			</div>
		</>
	)
}

function NotLoggedInPage() {
	return (
		<>
			<h1 className='text-3xl'>Доступ только для зарегистрированных пользователей</h1 >
			<p className='mt-5'>
				Необходимо&nbsp;
				<Link href='/login'>
					авторизоваться
				</Link>
				&nbsp;или&nbsp;
				<Link href='/register'>
					зарегистрироваться
				</Link>
				.
			</p>
		</>
	)
}

export default async function ({ searchParams }: PageProps<never, 'page' | 'query'>) {
	const session = await auth()

	return session?.user ? (
		<Page searchParams={searchParams} />
	) : (
		<NotLoggedInPage />
	)
}
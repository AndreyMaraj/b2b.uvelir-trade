import { auth } from '@/auth'
import Link from '@/components/link'
import SelectFilter from '@/components/select-filter'
import { getMetalColors, getMetalTypes, getProducts, getProductTypes, getStoneTypes } from '@/data/product'
import SearchProduct from '@/components/search-product'
import ClearFilterButton from '@/components/clear-filter-button'
import { QueryParam } from '@/consts'
import ProductCard from './product-card'
import PaginationClient from './pagination'
import { openGraph, twitter } from '@/app/shared-metadata'
import type { Metadata } from 'next'

const title = 'Каталог',
	description = 'Просмотрите наш каталог ювелирных изделий, доступных для авторизованных пользователей.',
	url = '/catalog'

export const metadata: Metadata = {
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

const numberOfProductsPerPage = 15

export default async function Page(props: PageProps<never, QueryParam>) {
	const session = await auth(),
		searchParams = await props.searchParams

	if (!session?.user) {
		return (
			<>
				<h1 className='text-3xl'>
					Доступ только для зарегистрированных пользователей
				</h1>
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

	const currentPage = Number(searchParams[QueryParam.PAGE]) || 1,
		{ products, productsCount } = await getProducts({
			skip: (currentPage - 1) * numberOfProductsPerPage,
			take: numberOfProductsPerPage,
			articleQuery: searchParams[QueryParam.QUERY]?.toString(),
			stoneTypeId: Number(searchParams[QueryParam.STONE_TYPE]) || undefined,
			metalTypeId: Number(searchParams[QueryParam.METAL_TYPE]) || undefined,
			colorId: Number(searchParams[QueryParam.METAL_COLOR]) || undefined,
			typeId: Number(searchParams[QueryParam.PRODUCT_TYPE]) || undefined
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
								<li key={productType.id} className={`transition ease-in-out duration-300 hover:bg-black${productType.id === Number(searchParams[QueryParam.PRODUCT_TYPE]) ? ' bg-black' : ''}`}>
									<Link href={`/catalog?productType=${productType.id}`} color='foreground' className={`transition ease-in-out duration-300 p-2.5 uppercase w-full hover:text-white${productType.id === Number(searchParams[QueryParam.PRODUCT_TYPE]) ? ' text-white' : ''}`}>
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
						<div className='flex flex-wrap gap-x-2.5 gap-y-4'>
							{products.map(product =>
								<ProductCard key={product.article} product={product} className='basis-[calc(50%-10px)] sm:basis-full md:basis-[calc(50%-10px)] lg:basis-[calc(33.333%-10px)]' />
							)}
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
import { auth } from '@/auth'
import Link from '@/components/link'
import SelectFilter from '@/components/select-filter'
import { getMetalColors, getMetalTypes, getProducts, getStoneTypes } from '@/data/product'
import SearchProduct from '@/components/search-product'
import ClearFilterButton from '@/components/clear-filter-button'
import { QueryParam } from '@/consts'
import ProductCard from './product-card'
import PaginationClient from './pagination'
import { openGraph, twitter } from '@/app/shared-metadata'
import type { Metadata } from 'next'
import { getMenuItems } from '@/data/menu-item'
import Menu from './menu'

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

const numberOfProductsPerPage = 30

export default async function Page(props: PageProps<never, QueryParam>) {
	const session = await auth()

	if (!session?.user) {
		return (
			<>
				<h1 className='text-3xl'>
					Доступ только для зарегистрированных пользователей
				</h1>
				<p className='mt-5'>
					Необходимо&nbsp;
					<Link href='/auth/login'>
						авторизоваться
					</Link>
					&nbsp;или&nbsp;
					<Link href='/auth/register'>
						зарегистрироваться
					</Link>
					.
				</p>
			</>
		)
	}

	const searchParams = await props.searchParams,
		currentPage = Number(searchParams[QueryParam.PAGE]) || 1,
		{ products, productsCount } = await getProducts({
			skip: (currentPage - 1) * numberOfProductsPerPage,
			take: numberOfProductsPerPage,
			articleQuery: searchParams[QueryParam.QUERY]?.toString(),
			stoneTypeId: Number(searchParams[QueryParam.STONE_TYPE]) || undefined,
			metalTypeId: Number(searchParams[QueryParam.METAL_TYPE]) || undefined,
			colorId: Number(searchParams[QueryParam.METAL_COLOR]) || undefined,
			nomenclatureGroupId: Number(searchParams[QueryParam.NOMENCLATURE_GROUP]) || undefined
		}) ?? { products: [], productsCount: 0 },
		productsPagesCount = Math.ceil(productsCount / numberOfProductsPerPage),
		stoneTypes = await getStoneTypes() ?? [],
		metalTypes = await getMetalTypes() ?? [],
		metalColors = await getMetalColors() ?? [],
		menuItems = await getMenuItems() ?? []

	return (
		<>
			<h1 className='text-3xl mb-5'>
				Каталог
			</h1>
			<div className='flex flex-col sm:flex-row gap-7'>
				<div className='md:basis-1/3 lg:basis-1/4'>
					<div className='p-5 shadow-lg sticky top-28'>
						<SearchProduct />
						<Menu menuItems={menuItems} />
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
						<div className='grid w-full gap-4 grid-cols-2 md:grid-cols-3'>
							{products.map(product =>
								<ProductCard key={product.article} product={product} />
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
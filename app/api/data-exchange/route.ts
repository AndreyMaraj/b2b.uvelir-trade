'use server'

import type { NextRequest } from 'next/server'
import { promises as fs } from 'fs'
import * as fsSync from 'fs'
import { ElementCompact, xml2js } from 'xml-js'
import { upsertProductModel, upsertInvisibleModelModification, upsertEarringDimensions, upsertModelComponent, upsertMetal, upsertProductPrototyp, upsertRingDimensions, upsertStone, upsertWeavingType, upsertWireType, upsertMetalCoating, upsertColor, upsertSex, upsertProductTheme, upsertProductStyle, upsertProductLockType, upsertAgeCategory, upsertProductType, upsertMetalType, upsertStoneType, upsertCutType, upsertNomenclatureGroupe, upsertSize, upsertInvisibleModelModificationSize } from '@/data/product'
import { prisma } from '@/prisma'
import path from 'path'
import FormData from 'form-data'
import fetch from 'node-fetch'
import { FILE_SERVER_UPLOAD_IMAGE_PATH } from '@/consts'
import { updateMenuItemsFromNomenclatureGroups } from '@/data/menu-item'
import { transliterate } from '@/translate'

enum RequestMode {
	CheckAuth = 'checkauth',
	Init = 'init',
	File = 'file',
	Import = 'import',
	Complete = 'complete'
}

enum XMLFileKey {
	CommercialInformation = 'КоммерческаяИнформация',
	Classifier = 'Классификатор',
	Properties = 'Свойства',
	Property = 'Свойство',
	ID = 'Ид',
	Name = 'Наименование',
	ValueType = 'ТипЗначений',
	ValueOptions = 'ВариантыЗначений',
	Item = 'Справочник',
	ValueID = 'ИдЗначения',
	Value = 'Значение',
	Catalog = 'Каталог',
	Products = 'Товары',
	Product = 'Товар',
	Article = 'Артикул',
	Picture = 'Картинка',
	ProductType = 'ТипИзделия',
	Metal = 'Металл',
	MetalStandard = 'ПробаЧисло',
	Description = 'Описание',
	PropertiesValues = 'ЗначенияСвойств',
	PropertyValues = 'ЗначенияСвойства',
	ProductCharacteristics = 'ХарактеристикиТовара',
	ProductCharacteristic = 'ХарактеристикаТовара',
	Weight = 'Вес',
	Quantity = 'Количество',
	StoneColor = 'ЦветКамня',
	TypeCut = 'ТипОгранки',
	Chroma = 'Цветность',
	Purity = 'Чистота',
	NomenclatureGroup = 'НоменклатурнаяГруппа',
	AverageWeight = 'СреднийВес',
	SizesProperties = 'СвойстваРазмеров',
	SizeProperties = 'СвойстваРазмера',
	Size = 'Размер'
}

enum PropType {
	Number = 'Число',
	List = 'Справочник'
}

enum PropName {
	Diameter = 'Диаметр проволоки',
	WeavingType = 'Тип плетения',
	WireType = 'Вид цепи',
	MetalCoating = 'Покрытие',
	Color = 'Цвет металла',
	Sex = 'Пол',
	ProductTheme = 'Тематика',
	ProductStyle = 'Стиль изделия',
	ProductLockType = 'Тип замка',
	AgeCategory = 'Возраст',
	Height = 'Высота',
	Width = 'Ширина',
	PinWorkingArea = 'Рабочая зона штифта',
	PinLowering = 'Занижение штифта',
	Depth = 'Глубина',
	TireWidth = 'Ширина шинки'
}

type PropProps = {
	type: PropType,
	upsertFunction?: (name: string) => Promise<number>
}

type Prop = PropProps & {
	name: PropName
}

type Props = {
	[key: string]: PropProps
}

type IdValueComparison = {
	fileId: string,
	modelId: number
}

type PropWithValue = {
	[key: string]: number
}

type DataExchangeProp = Prop & {
	id: string,
	values?: IdValueComparison[]
}

type DataExchangeProductInlay = {
	stoneType: string,
	averageWeight: number,
	count: number,
	color: string | null,
	cutType: string,
	chroma: string | null,
	purity: string | null
}

type DataExchangeProductSizeProperties = {
	size: number,
	averageWeight: number
}

const COOKIE_NAME = 'Cookie',
	DATA_EXCHANGE_FOLDER = 'data-exchange',
	DATA_EXCHANGE_MEDIA_FOLDER = 'import_files',
	DATA_EXCHANGE_MEDIA_FOLDER_PATH = path.join(DATA_EXCHANGE_FOLDER, DATA_EXCHANGE_MEDIA_FOLDER),
	PRODUCT_FOLDER = 'product',
	IMPORT_PREFIX = 'import',
	expectedProps: Props = {
		[PropName.Diameter]: {
			type: PropType.Number
		},
		[PropName.WeavingType]: {
			type: PropType.List,
			upsertFunction: upsertWeavingType
		},
		[PropName.WireType]: {
			type: PropType.List,
			upsertFunction: upsertWireType
		},
		[PropName.MetalCoating]: {
			type: PropType.List,
			upsertFunction: upsertMetalCoating
		},
		[PropName.Color]: {
			type: PropType.List,
			upsertFunction: upsertColor
		},
		[PropName.Sex]: {
			type: PropType.List,
			upsertFunction: upsertSex
		},
		[PropName.ProductTheme]: {
			type: PropType.List,
			upsertFunction: upsertProductTheme
		},
		[PropName.ProductStyle]: {
			type: PropType.List,
			upsertFunction: upsertProductStyle
		},
		[PropName.ProductLockType]: {
			type: PropType.List,
			upsertFunction: upsertProductLockType
		},
		[PropName.AgeCategory]: {
			type: PropType.List,
			upsertFunction: upsertAgeCategory
		},
		[PropName.Height]: {
			type: PropType.Number
		},
		[PropName.Width]: {
			type: PropType.Number
		},
		[PropName.PinWorkingArea]: {
			type: PropType.Number
		},
		[PropName.PinLowering]: {
			type: PropType.Number
		},
		[PropName.Depth]: {
			type: PropType.Number
		},
		[PropName.TireWidth]: {
			type: PropType.Number
		}
	}

function getModelComponentsFromFileProduct(article: string, modelComponents: ElementCompact) {
	const result: DataExchangeProductInlay[] = []

	modelComponents && (Array.isArray(modelComponents) ? modelComponents : [modelComponents]).forEach((modelComponent: ElementCompact) => {
		try {
			const stoneType = modelComponent[XMLFileKey.Name]?._text
			if (!stoneType) {
				throw new TypeError(`Article '${article}' inlay doesn't have a stone type`)
			}

			const cutType = modelComponent[XMLFileKey.TypeCut]?._text
			if (!cutType) {
				throw new TypeError(`Article '${article}' inlay doesn't have a cut type`)
			}

			const count = +modelComponent[XMLFileKey.Quantity]?._text
			if (!Number.isFinite(count)) {
				throw new TypeError(`Article '${article}' inlay doesn't have a count`)
			}

			result.push({
				stoneType,
				cutType,
				count,
				averageWeight: Number.isFinite(+modelComponent[XMLFileKey.Weight]?._text) ? +modelComponent[XMLFileKey.Weight]?._text : 0,
				color: modelComponent[XMLFileKey.StoneColor]?._text ?? null,
				chroma: modelComponent[XMLFileKey.Chroma]?._text ?? null,
				purity: modelComponent[XMLFileKey.Purity]?._text ?? null
			})
		} catch (e) {
			console.warn(e)
		}
	})

	return result
}

function getSizesPropertiesFromFileProduct(article: string, sizesProperties: ElementCompact) {
	const result: DataExchangeProductSizeProperties[] = []

	sizesProperties && (Array.isArray(sizesProperties) ? sizesProperties : [sizesProperties]).forEach((sizeProperties: ElementCompact) => {
		try {
			const size = +sizeProperties[XMLFileKey.Size]?._text
			if (!Number.isFinite(size)) {
				throw new TypeError(`Article '${article}' size properties doesn't have a size`)
			}

			result.push({
				size,
				averageWeight: Number.isFinite(+sizeProperties[XMLFileKey.AverageWeight]?._text) ? +sizeProperties[XMLFileKey.AverageWeight]?._text : 0
			})
		} catch (e) {
			console.warn(e)
		}
	})

	return result
}

function getPropValue(article: string, prop: DataExchangeProp, fileValue: string) {
	let value
	switch (prop.type) {
		case PropType.Number:
			value = +fileValue
			if (!Number.isFinite(value)) {
				throw new TypeError(`Impossible to convert value '${fileValue}' of the article '${article}' from a property '${prop.name}'`)
			}
			return value
		case PropType.List:
			if (!Array.isArray(prop.values)) {
				throw new TypeError(`Property dictionary doesn't contain values for property '${prop.name}'`)
			}
			value = prop.values.find(v => v.fileId === fileValue)
			if (!value) {
				throw new TypeError(`Property dictionary doesn't contain value with ID '${fileValue}' for property '${prop.name}'`)
			}
			return value.modelId
		default: throw new TypeError(`Property with ID '${prop.id}' has unknown type '${prop.type}'`)
	}
}

function getPropValuesFromFileProduct(article: string, fileProductPropValues: ElementCompact, dataExchangeProps: DataExchangeProp[]) {
	if (!fileProductPropValues) {
		console.log(`Article '${article}' doesn't contain properties`)
		return
	}

	let result: PropWithValue = {} as PropWithValue

	(Array.isArray(fileProductPropValues) ? fileProductPropValues : [fileProductPropValues]).forEach((propValue: ElementCompact) => {
		try {
			const id = propValue[XMLFileKey.ID]?._text
			if (!id) {
				throw new TypeError(`Product '${article}' has the property without ID`)
			}

			const prop = dataExchangeProps.find(prop => prop.id === id)
			if (!prop) {
				throw new TypeError(`The properties dictionary doesn't contain the property with the ID '${id}' of the article '${article}'`)
			}

			const fileValue = propValue[XMLFileKey.Value]?._text
			if (!fileValue) {
				throw new TypeError(`The property with ID '${id}' of the article '${article}' doesn't contain a value`)
			}

			result = {
				...result,
				[prop.name]: getPropValue(article, prop, fileValue)
			}
		} catch (e) {
			console.warn(e)
		}
	})

	return result
}

function getArticleFromFile(fileArticle?: string) {
	if (!fileArticle) {
		throw new TypeError(`Product doesn't have an article`)
	}

	let article = null,
		prototypCode = null,
		visibleModelModificationCode = null

	if (fileArticle.includes('-')) {
		if (fileArticle.length !== 13 && fileArticle.length !== 14) {
			throw new TypeError(`Invalid number of characters for article '${fileArticle}' number for not wire products`)
		}

		const articleParts = fileArticle.split('-')
		if (articleParts.length !== 4) {
			throw new TypeError(`Incorrect number of article '${fileArticle}' parts`)
		}

		article = fileArticle
		prototypCode = +articleParts[2]
		if (!Number.isFinite(prototypCode)) {
			throw new TypeError(`It's impossible to convert the model of the article '${fileArticle}' into a number`)
		}

		visibleModelModificationCode = articleParts[3]
	} else {
		if (fileArticle.length !== 9) {
			throw new TypeError(`Invalid number of characters for article '${fileArticle}' number for wire products`)
		}

		article = fileArticle.slice(0, -1)
		prototypCode = +fileArticle.slice(1, 4)
		if (!Number.isFinite(prototypCode)) {
			throw new TypeError(`It's impossible to convert the model of the article '${fileArticle}' into a number`)
		}
		visibleModelModificationCode = fileArticle.slice(4, 7)
	}

	return { article, prototypCode, visibleModelModificationCode }
}

function parseAndValidateImagePath(filePath: string) {
	const parts = path.normalize(filePath).split(path.sep)
	if (parts.length !== 3 || parts[0] !== DATA_EXCHANGE_MEDIA_FOLDER) return null

	const article = parts[1]
	if (!article || article.includes(path.sep) || article === '.' || article === '..') return null

	const encodedArticle = transliterate(article),
		fileName = parts[2]

	if (!fileName || !fileName.includes('.')) return null

	return {
		encodedArticle,
		fileName,
		fullPath: path.join(DATA_EXCHANGE_FOLDER, DATA_EXCHANGE_MEDIA_FOLDER, encodedArticle, fileName)
	}
}

async function uploadImage(filesPaths: string[], article: string): Promise<string[]> {
	const formData = new FormData()
	for (const filePath of filesPaths) {
		const parsed = parseAndValidateImagePath(path.relative(DATA_EXCHANGE_FOLDER, filePath))
		if (!parsed) continue
		const fileBuffer = fsSync.readFileSync(parsed.fullPath)
		formData.append('files', fileBuffer, { filename: parsed.fileName })
	}
	formData.append('folderPath', path.join(`/${PRODUCT_FOLDER}`, transliterate(article)))

	const response = await fetch(FILE_SERVER_UPLOAD_IMAGE_PATH, {
		method: 'POST',
		body: formData
	})

	if (!response.ok) {
		throw new Error(`Error uploading images: ${await response.text()}`)
	}

	return await response.json() as string[]
}

async function handleExchangeFileProducts(fileProducts: ElementCompact, file: string, dataExchangeProps?: DataExchangeProp[]) {
	if (!fileProducts) {
		console.warn(`Exchange file '${file}' doesn't contain products`)
		return
	}

	for (const fileProduct of Array.isArray(fileProducts) ? fileProducts : [fileProducts]) {
		try {
			const { article, prototypCode, visibleModelModificationCode } = getArticleFromFile(fileProduct[XMLFileKey.Article]?._text)

			const productType = fileProduct[XMLFileKey.ProductType]?._text
			if (!productType) {
				throw new TypeError(`Product '${article}' doesn't have a product type`)
			}

			const metalType = fileProduct[XMLFileKey.Metal]?._text
			if (!metalType) {
				throw new TypeError(`Product '${article}' doesn't have a metal type`)
			}

			const standard = +fileProduct[XMLFileKey.MetalStandard]?._text
			if (!Number.isFinite(standard)) {
				throw new TypeError(`Product '${article}' doesn't have a standard`)
			}

			const propValues = dataExchangeProps && getPropValuesFromFileProduct(article, fileProduct[XMLFileKey.PropertiesValues]?.[XMLFileKey.PropertyValues], dataExchangeProps),
				modelComponents = getModelComponentsFromFileProduct(article, fileProduct[XMLFileKey.ProductCharacteristics]?.[XMLFileKey.ProductCharacteristic]),
				nomenclatureGroup = fileProduct[XMLFileKey.NomenclatureGroup]?._text,
				images = fileProduct[XMLFileKey.Picture] && (Array.isArray(fileProduct[XMLFileKey.Picture]) ? fileProduct[XMLFileKey.Picture] : [fileProduct[XMLFileKey.Picture]]).map(image => path.join(process.cwd(), DATA_EXCHANGE_FOLDER, image._text.replaceAll('\\', '/'))),
				description = fileProduct[XMLFileKey.Description]?._text,
				averageWeight = Number.isFinite(+fileProduct[XMLFileKey.AverageWeight]?._text) ? +fileProduct[XMLFileKey.AverageWeight]?._text : 0,
				sizesProperties = getSizesPropertiesFromFileProduct(article, fileProduct[XMLFileKey.SizesProperties]?.[XMLFileKey.SizeProperties]),
				typeId = await upsertProductType(productType),
				nomenclatureGroupId = await upsertNomenclatureGroupe(nomenclatureGroup),
				productPrototypId = await upsertProductPrototyp({
					code: prototypCode,
					typeId,
					...propValues ? {
						sexId: propValues[PropName.Sex] ?? null,
						ageCategoryId: propValues[PropName.AgeCategory] ?? null,
						styleId: propValues[PropName.ProductStyle] ?? null,
						themeId: propValues[PropName.ProductTheme] ?? null,
						lockTypeId: propValues[PropName.ProductLockType] ?? null,
						ringDimensionsId: propValues[PropName.TireWidth] ? await upsertRingDimensions({
							tireWidth: propValues[PropName.TireWidth]
						}) : null,
						earringDimensionsId: (propValues[PropName.Depth] || propValues[PropName.PinLowering] || propValues[PropName.PinWorkingArea]) ? await upsertEarringDimensions({
							depth: propValues[PropName.Depth] ?? null,
							pinLowering: propValues[PropName.PinLowering] ?? null,
							pinWorkingArea: propValues[PropName.PinWorkingArea] ?? null
						}) : null,
						weavingTypeId: propValues[PropName.WeavingType] ?? null
					} : {
						sexId: null,
						ageCategoryId: null,
						styleId: null,
						themeId: null,
						lockTypeId: null,
						ringDimensionsId: null,
						earringDimensionsId: null,
						weavingTypeId: null
					}
				}),
				metalTypeId = await upsertMetalType(metalType),
				metalId = await upsertMetal({
					standard,
					metalTypeId,
					...propValues ? {
						metalCoatingId: propValues[PropName.MetalCoating] ?? null,
						colorId: propValues[PropName.Color] ?? null
					} : {
						metalCoatingId: null,
						colorId: null
					}
				}),
				productModelId = await upsertProductModel({ productPrototypId, metalId }),
				{ id: visibleModelModificationId } = await prisma.visibleModelModification.upsert({
					select: { id: true },
					where: {
						code_productModelId: {
							code: visibleModelModificationCode,
							productModelId
						}
					},
					create: {
						code: visibleModelModificationCode,
						productModelId,
						wireDiameter: propValues?.[PropName.Diameter] ?? null,
						...images && {
							media: {
								createMany: {
									data: (await uploadImage(images, article)).map(path => ({ path }))
								}
							}
						}
					},
					update: {
						wireDiameter: propValues?.[PropName.Diameter] ?? null,
						media: {
							deleteMany: {},
							...images && {
								createMany: {
									data: (await uploadImage(images, article)).map(path => ({ path }))
								}
							}
						}
					}
				})

			for (const modelComponent of modelComponents) {
				const stoneTypeId = await upsertStoneType(modelComponent.stoneType),
					cutTypeId = await upsertCutType(modelComponent.cutType),
					colorId = modelComponent.color !== null ? await upsertColor(modelComponent.color) : null,
					stoneId = await upsertStone({
						chroma: modelComponent.chroma,
						purity: modelComponent.purity,
						colorId,
						stoneTypeId,
						cutTypeId
					})

				await upsertModelComponent({
					count: modelComponent.count,
					averageWeight: modelComponent.averageWeight,
					stoneId,
					visibleModelModificationId
				})
			}

			const invisibleModelModificationId = await upsertInvisibleModelModification({
				article,
				description,
				visibleModelModificationId,
				averageWeight,
				nomenclatureGroupId,
				...propValues ? {
					wireTypeId: propValues[PropName.WireType] ?? null,
					height: propValues[PropName.Height] ?? 0,
					width: propValues[PropName.Width] ?? 0,
				} : {
					wireTypeId: null,
					height: 0,
					width: 0
				}
			})

			for (const sizeProperties of sizesProperties) {
				await upsertInvisibleModelModificationSize({
					invisibleModelModificationId,
					sizeId: await upsertSize(sizeProperties.size),
					averageWeight: sizeProperties.averageWeight
				})
			}
		} catch (e) {
			console.warn(e)
		}
	}
}

async function handleExchangeFilePropertyValues(prop: Prop, values: ElementCompact) {
	if (prop.type === PropType.Number) {
		return
	}
	if (!prop.upsertFunction) {
		throw new TypeError(`Property '${prop.name}' has no prisma model`)
	}
	if (!values) {
		throw new TypeError(`Property '${prop.name}' has no values`)
	}

	const result: IdValueComparison[] = []
	for (const value of Array.isArray(values) ? values : [values]) {
		const fileId = value[XMLFileKey.ValueID]?._text
		if (!fileId) {
			throw new TypeError(`The property '${prop.name}' value doesn't have an ID`)
		}

		const name = value[XMLFileKey.Value]?._text
		if (!name) {
			throw new TypeError(`The property '${prop.name}' value with ID '${fileId}' doesn't have a name`)
		}

		result.push({
			fileId,
			modelId: await prop.upsertFunction(name)
		})
	}

	return result
}

async function handleExchangeFileProps(props: ElementCompact, file: string) {
	if (!props) {
		console.warn(`Exchange file '${file}' doesn't contain products`)
		return
	}

	const result: DataExchangeProp[] = []
	for (const prop of Array.isArray(props) ? props : [props]) {
		try {
			const id = prop[XMLFileKey.ID]?._text
			if (!id) {
				throw new TypeError('The property doesn\'t have an ID')
			}

			const name = prop[XMLFileKey.Name]?._text
			if (!name) {
				throw new TypeError(`The property with ID '${id}' doesn't have a name`)
			}

			const expectedProp = expectedProps[name]
			if (!expectedProp) {
				throw new TypeError(`Unknown property '${name}' in exchange files`)
			}

			const type = prop[XMLFileKey.ValueType]?._text
			if (expectedProp.type !== type) {
				throw new TypeError(`The data type '${type}' is not the expected one for property '${name}'`)
			}

			result.push({
				id,
				name,
				type,
				values: await handleExchangeFilePropertyValues({ ...expectedProp, name }, prop[XMLFileKey.ValueOptions]?.[XMLFileKey.Item])
			})
		} catch (e) {
			console.warn(e)
		}
	}

	return result
}

async function handleExchangeFiles() {
	if (!fsSync.existsSync(DATA_EXCHANGE_FOLDER)) {
		throw new TypeError(`No folder ${DATA_EXCHANGE_FOLDER}`)
	}
	try {
		const importFiles: string[] = []

		fsSync.readdirSync(DATA_EXCHANGE_FOLDER, { withFileTypes: true })
			.sort((first: fsSync.Dirent, second: fsSync.Dirent) => {
				const [firstCatalog, firstFileIndex] = first.name.split(/\D/).filter((s: string) => s).map((s: string) => +s),
					[secondCatalog, secondFileIndex] = second.name.split(/\D/).filter((s: string) => s).map((s: string) => +s)

				return firstCatalog > secondCatalog ? 1 : firstCatalog < secondCatalog ? -1 : firstFileIndex > secondFileIndex ? 1 : firstFileIndex < secondFileIndex ? -1 : 0
			})
			.forEach((file: fsSync.Dirent) => {
				if (!file.isFile()) {
					return
				}
				if (!file.name.includes(IMPORT_PREFIX)) {
					console.warn(`Unknown file '${file.name}'`)
					return
				}

				importFiles.push(file.name)
			})

		let props: DataExchangeProp[] | undefined
		for (const file of importFiles) {
			const data = xml2js(fsSync.readFileSync(`${DATA_EXCHANGE_FOLDER}/${file}`).toString(), { compact: true, trim: true, ignoreInstruction: true, ignoreDeclaration: true, ignoreAttributes: true, ignoreComment: true, ignoreCdata: true, ignoreDoctype: true }) as ElementCompact
			props ??= await handleExchangeFileProps(data[XMLFileKey.CommercialInformation]?.[XMLFileKey.Classifier]?.[XMLFileKey.Properties]?.[XMLFileKey.Property], file)
			await handleExchangeFileProducts(data[XMLFileKey.CommercialInformation]?.[XMLFileKey.Catalog]?.[XMLFileKey.Products]?.[XMLFileKey.Product], file, props)
		}

		updateMenuItemsFromNomenclatureGroups()

		fsSync.rmSync(DATA_EXCHANGE_FOLDER, { recursive: true })
	} catch (e) {
		console.warn(e)
	}
}

export async function GET(request: NextRequest) {
	const mode = request.nextUrl.searchParams.get('mode'),
		requestHeaders = new Headers(request.headers),
		sessionId = requestHeaders.get(COOKIE_NAME)

	switch (mode) {
		case RequestMode.CheckAuth:
			return new Response(`success\n${COOKIE_NAME}\n123`)
		case RequestMode.Init:
			return new Response('zip=no\nfile_limit=100000000')
		case RequestMode.Import:
			return new Response('success')
		case RequestMode.Complete:
			handleExchangeFiles()
			return new Response('success')
		default:
			return new Response(`Unknown mode: ${mode}`, { status: 400 })
	}
}

export async function POST(request: NextRequest) {
	const mode = request.nextUrl.searchParams.get('mode')

	switch (mode) {
		case RequestMode.File:
			try {
				await fs.mkdir(DATA_EXCHANGE_MEDIA_FOLDER_PATH, { recursive: true })

				const fileName = request.nextUrl.searchParams.get('filename') ?? ''

				if (!fileName) {
					return new Response('File name is empty', { status: 400 })
				}

				if (fileName.includes(DATA_EXCHANGE_MEDIA_FOLDER)) {
					const parsed = parseAndValidateImagePath(fileName)
					if (!parsed) {
						return new Response(`File name must match the mask: ${DATA_EXCHANGE_MEDIA_FOLDER}/{product article}/{index}.{extension}`, { status: 400 })
					}
					await fs.mkdir(path.dirname(parsed.fullPath), { recursive: true })
					await fs.writeFile(parsed.fullPath, Buffer.from(await request.arrayBuffer()))
				} else {
					await fs.writeFile(path.join(DATA_EXCHANGE_FOLDER, fileName), await request.text())
				}
			} catch (err) {
				console.error(err)
				return new Response('File saving error', { status: 400 })
			}
			return new Response('success')
		default:
			return new Response(`Unknown mode: ${mode}`, { status: 400 })
	}
}
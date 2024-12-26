export const NEXT_PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? ''
export const FILE_SERVER_UPLOAD_IMAGE_PATH = `${process.env.FILE_SERVER_BASE_URL ?? ''}/${process.env.FILE_SERVER_UPLOAD_IMAGE_API ?? ''}`
export const FILE_SERVER_GET_IMAGE_PATH = `${process.env.NEXT_PUBLIC_FILE_SERVER_BASE_URL ?? process.env.NEXT_PUBLIC_BASE_URL ?? ''}/${process.env.NEXT_PUBLIC_FILE_SERVER_GET_IMAGE_API ?? ''}`

export enum QueryParam {
	STONE_TYPE = 'stoneType',
	METAL_TYPE = 'metalType',
	METAL_COLOR = 'metalColor',
	PRODUCT_TYPE = 'productType',
	PAGE = 'page',
	QUERY = 'query'
}
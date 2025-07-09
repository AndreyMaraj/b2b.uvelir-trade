export const BASE_URL = process.env.BASE_URL ?? ''
export const FILE_SERVER_UPLOAD_IMAGE_PATH = process.env.FILE_SERVER_UPLOAD_IMAGE_PATH ?? ''
export const NEXT_PUBLIC_FILE_SERVER_GET_IMAGE_PATH = process.env.NEXT_PUBLIC_FILE_SERVER_GET_IMAGE_PATH ?? ''

export enum QueryParam {
	STONE_TYPE = 'stoneType',
	METAL_TYPE = 'metalType',
	METAL_COLOR = 'metalColor',
	NOMENCLATURE_GROUP = 'nomenclatureGroup',
	PAGE = 'page',
	QUERY = 'query'
}

export function getNomenclatureGroupQueryParam(nomenclatureGroupId: number) {
	return `${QueryParam.NOMENCLATURE_GROUP}=${nomenclatureGroupId}`
}
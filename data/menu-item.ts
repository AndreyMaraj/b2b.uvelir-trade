import { getNomenclatureGroupQueryParam } from '@/consts'
import { prisma } from '@/prisma'
import { type MenuItem, MenuType } from '@prisma/client'
import { getNomenclatureGroups } from './product'

export type MenuItemWithChildren = MenuItem & {
	children?: MenuItemWithChildren[]
}

export async function updateMenuItemsFromNomenclatureGroups() {
	const nomenclatureGroups = await getNomenclatureGroups() || []

	for (const group of nomenclatureGroups) {
		await prisma.menuItem.upsert({
			where: {
				menuType_name: {
					menuType: MenuType.CATALOG,
					name: group.name
				}
			},
			create: {
				menuType: MenuType.CATALOG,
				name: group.name,
				urlParams: getNomenclatureGroupQueryParam(group.id)
			},
			update: {}
		})
	}
}

export async function getMenuItems(): Promise<MenuItemWithChildren[]> {
	return await prisma.menuItem.findMany({
		where: {
			parentId: null
		},
		include: {
			children: {
				orderBy: {
					order: 'asc'
				}
			}
		},
		orderBy: {
			order: 'asc'
		}
	})
}
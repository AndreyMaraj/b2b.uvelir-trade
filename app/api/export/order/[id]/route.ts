import { NextResponse, type NextRequest } from 'next/server'
import { UserRole } from '@prisma/client'
import { auth } from '@/auth'
import ExcelJS from 'exceljs'
import { NEXT_PUBLIC_FILE_SERVER_GET_IMAGE_PATH } from '@/consts'
import { prisma } from '@/prisma'

const tableBorderStyles = {
	top: { style: 'thin' },
	bottom: { style: 'thin' },
	left: { style: 'thin' },
	right: { style: 'thin' }
} as ExcelJS.Row['border']

function addEmptyRow(sheet: ExcelJS.Worksheet) {
	const row = sheet.addRow([])
	sheet.mergeCells(`A${row.number}:${sheet.lastColumn?.letter}${row.number}`)
}

function addValueRow(sheet: ExcelJS.Worksheet, label: string, value: string) {
	const valueRow = sheet.addRow([label, value]),
		keyCell = valueRow.getCell(1)
	keyCell.font = { bold: true }
	keyCell.alignment = { vertical: 'top' }
	sheet.mergeCells(`B${valueRow.number}:${sheet.lastColumn?.letter}${valueRow.number}`)
	valueRow.getCell(2).alignment = { vertical: 'top' }
}

function addMultilineValue(sheet: ExcelJS.Worksheet, label: string, value: string) {
	const rawLines = value.split(/\r?\n/),
		startRow = sheet.rowCount + 1

	rawLines.forEach(() => sheet.addRow([]))
	sheet.mergeCells(`A${startRow}:A${sheet.rowCount}`)
	sheet.mergeCells(`B${startRow}:${sheet.lastColumn?.letter}${sheet.rowCount}`)

	const keyCell = sheet.getCell(`A${startRow}`),
		valueCell = sheet.getCell(`B${startRow}`)
	keyCell.value = label
	keyCell.font = { bold: true }
	keyCell.alignment = { vertical: 'top' }
	valueCell.value = value
	valueCell.alignment = { vertical: 'top' }
}

export async function GET(request: NextRequest, ctx: RouteContext<'/api/export/order/[id]'>) {
	const orderId = Number((await ctx.params).id),
		session = await auth()

	try {
		if (!session?.user.id || !session.user.role) {
			throw new Error('There is no active session')
		}

		const { order, invisibleModelModifications } = {
			order: await prisma.order.findFirst({
				where: {
					id: orderId,
					...(session.user.role === UserRole.CLIENT ? {
						client: {
							userId: session.user.id
						}
					} : {}),
					...(session.user.role === UserRole.MANAGER ? {
						client: {
							manager: {
								userId: session.user.id
							}
						}
					} : {})
				},
				select: {
					id: true,
					date: true,
					comment: true,
					client: {
						select: {
							organization: true,
							tin: true,
							city: true,
							user: {
								select: {
									phone: true,
									email: true
								}
							},
							manager: {
								select: {
									surname: true,
									name: true,
									patronymic: true,
									user: {
										select: {
											phone: true,
											email: true
										}
									}
								}
							}
						}
					}
				}
			}),
			invisibleModelModifications: (await prisma.invisibleModelModification.findMany({
				where: {
					orderItems: {
						some: { orderId }
					}
				},
				select: {
					id: true,
					article: true,
					averageWeight: true,
					media: {
						take: 1,
						select: {
							path: true
						}
					},
					orderItems: {
						where: { orderId },
						select: {
							id: true,
							count: true,
							invisibleModelModificationSize: {
								select: {
									id: true,
									averageWeight: true,
									size: {
										select: {
											value: true
										}
									}
								}
							}
						}
					}
				}
			})).map(invisibleModelModification => ({
				...invisibleModelModification,
				averageWeight: invisibleModelModification.averageWeight.toNumber(),
				orderItems: invisibleModelModification.orderItems.map(orderItem => ({
					...orderItem,
					invisibleModelModificationSize: orderItem.invisibleModelModificationSize && {
						...orderItem.invisibleModelModificationSize,
						averageWeight: orderItem.invisibleModelModificationSize.averageWeight.toNumber(),
						size: {
							...orderItem.invisibleModelModificationSize.size,
							value: orderItem.invisibleModelModificationSize.size.value.toNumber()
						}
					}
				}))
			}))
		}

		if (!order) {
			throw new Error('No order')
		}

		const workbook = new ExcelJS.Workbook(),
			sheet = workbook.addWorksheet(),
			title = `Заказ № ${order.id} от ${new Date(order.date).toLocaleDateString('ru-RU')}`

		sheet.getColumn(1).width = 17
		sheet.getColumn(2).width = 15
		sheet.getColumn(3).width = 30
		sheet.getColumn(4).width = 10
		sheet.getColumn(5).width = 10

		const titleRow = sheet.addRow([title])
		sheet.mergeCells(`A${titleRow.number}:E${titleRow.number}`)
		titleRow.getCell(1).font = { bold: true, size: 16 }
		titleRow.height = 20

		addEmptyRow(sheet)

		addValueRow(sheet, 'Менеджер:', `${order.client.manager.surname} ${order.client.manager.name} ${order.client.manager.patronymic}`)
		addValueRow(sheet, 'Контакты:', `${order.client.manager.user.phone}, ${order.client.manager.user.email}`)

		addEmptyRow(sheet)

		addValueRow(sheet, 'Покупатель:', `${order.client.organization}, ИНН ${order.client.tin}, Город ${order.client.city}`)
		addValueRow(sheet, 'Контакты:', `${order.client.user.phone}, ${order.client.user.email}`)

		addEmptyRow(sheet)

		if (order.comment) {
			addMultilineValue(sheet, 'Комментарий:', order.comment)
			addEmptyRow(sheet)
		}

		const headerRow = sheet.addRow(['Фото', 'Артикул', 'Размеры', 'Количество', 'Вес'])
		headerRow.font = { bold: true }
		headerRow.border = tableBorderStyles

		for (const invisibleModelModification of invisibleModelModifications) {
			const dataRow = sheet.addRow([
				null,
				invisibleModelModification.article,
				...invisibleModelModification.orderItems.reduce<[string, number, number]>((sum, orderItem) => ([
					orderItem.invisibleModelModificationSize ? `${sum[0] ? sum[0] + ' / ' : ''} ${orderItem.invisibleModelModificationSize.size.value} - ${orderItem.count}` : sum[0],
					sum[1] + orderItem.count,
					sum[2] + orderItem.count * (orderItem.invisibleModelModificationSize?.averageWeight ?? invisibleModelModification.averageWeight)
				]), ['', 0, 0])
			])

			dataRow.border = tableBorderStyles

			if (!invisibleModelModification.media.length) {
				continue
			}
			dataRow.height = 110

			const ext = (invisibleModelModification.media[0].path.split('.').pop() ?? '').toLowerCase(),
				extension = ext === 'jpg' ? 'jpeg' : ext

			if (extension !== 'png' && extension !== 'jpeg' && extension !== 'gif') {
				continue
			}

			try {
				const response = await fetch(`${NEXT_PUBLIC_FILE_SERVER_GET_IMAGE_PATH}${invisibleModelModification.media[0].path}`)
				if (response.ok) {
					sheet.addImage(workbook.addImage({
						buffer: await response.arrayBuffer(),
						extension
					}), {
						tl: { col: 0, row: dataRow.number - 1 },
						ext: { width: 120, height: 120 }
					})
				}
			} catch (e) {
				console.warn('Failed to load image:', invisibleModelModification.media[0].path)
			}
		}

		const totalRow = sheet.addRow(['Итого', null, null, null, null])
		totalRow.getCell(4).value = { formula: `SUM(D${headerRow.number + 1}:D${totalRow.number - 1})` }
		totalRow.getCell(5).value = { formula: `SUM(E${headerRow.number + 1}:E${totalRow.number - 1})` }
		totalRow.font = { bold: true }
		totalRow.border = tableBorderStyles

		return new NextResponse(await workbook.xlsx.writeBuffer(), {
			status: 200,
			headers: {
				'Content-Disposition': `attachment; filename*=UTF-8''${encodeURIComponent(`${title}.xlsx`)}`,
				'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
			}
		})
	} catch (e) {
		if (e instanceof Error) {
			console.error(e)
			return new Response(e.message, { status: 400 })
		}
	}
}
import type { Data, DataSearchCondition } from '$lib/types'

const data: Data[] = []

;(function createData() {
	const units = ['piece', 'ton', 'litre']
	let year = 2020
	let month = 1
	for (let i = 0; i < 200; i++) {
		data.push({
			title: `${year}年${month}月入荷分データ`,
			year: year,
			month: month,
			quantity: Math.floor(Math.random() * 10000),
			unit: units[Math.floor(Math.random() * 3)],
			memo: '全品チェック済み',
		})
		month++
		if (month > 12) {
			month = 1
			year++
		}
	}
})()

export function selectAll(searchCondition: DataSearchCondition, page: number, limit: number) {
	const rows = data.filter((row) => {
		if (searchCondition.title && !row.title.includes(searchCondition.title)) {
			return false
		}
		if (searchCondition.year && row.year !== searchCondition.year) {
			return false
		}
		if (searchCondition.quantity) {
			if (searchCondition.condition === 'ge' && row.quantity < searchCondition.quantity) {
				return false
			}
			if (searchCondition.condition === 'le' && row.quantity > searchCondition.quantity) {
				return false
			}
		}
		return true
	})

	const start = page * limit
	const end = start + limit
	return {
		count: rows.length,
		rows: rows.slice(start, end),
	}
}

export function insert(row: Data) {
	data.unshift(row)
}

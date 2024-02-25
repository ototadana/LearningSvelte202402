import { selectAll } from '$lib/database.js'
import { DataSearchCondition } from '$lib/types'
import { json } from '@sveltejs/kit'

function getAsInt(url: URL, name: string, defaultValue: number): number {
	const value = url.searchParams.get(name)
	if (!value) {
		return defaultValue
	}
	const result = parseInt(value, 10)
	return isNaN(result) ? defaultValue : result
}

export async function GET({ url }) {
	await new Promise((fulfil) => setTimeout(fulfil, 200))

	const page = getAsInt(url, 'page', 0)
	const limit = getAsInt(url, 'limit', 10)

	const title = url.searchParams.get('title')
	const year = getAsInt(url, 'year', 0)
	const quantity = getAsInt(url, 'quantity', 0)
	const condition = quantity == 0 ? 'ge' : url.searchParams.get('condition') || 'ge'

	const searchCondition = new DataSearchCondition(title, year, quantity, condition)
	const data = selectAll(searchCondition, page, limit)
	return json(data, { status: 200 })
}

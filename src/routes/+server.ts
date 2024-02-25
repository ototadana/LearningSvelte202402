import { json } from '@sveltejs/kit'
import { Data, Field, Result } from '$lib/types.js'
import { insert } from '$lib/database.js'

function checkRequiredField(name: string, displayName: string, value: unknown, result: Result) {
	if (!value) {
		result.fields.push(new Field(name, `${displayName}を入力してください`))
		result.error = true
	}
}

function validateFields(data: Data): Result {
	const result = new Result()
	checkRequiredField('title', '件名', data.title, result)
	checkRequiredField('quantity', '数量', data.quantity, result)
	if (result.error) {
		result.message = '入力内容にエラーがあります'
	}
	return result
}

export async function POST({ request }) {
	const data = await request.json()
	const result = validateFields(data)
	if (!result.error) {
		await new Promise((fulfil) => setTimeout(fulfil, 1000))
		insert(data)
	}

	return json(result, { status: result.error ? 400 : 201 })
}

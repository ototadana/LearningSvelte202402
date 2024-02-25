import { type ToastStore } from '@skeletonlabs/skeleton'
import { Result, Field } from '$lib/types'
import { running } from '$lib/stores'

export function formDataToJson(formData: FormData): string {
	const object: { [key: string]: unknown } = {}
	formData.forEach((value, key) => (object[key] = value))
	return JSON.stringify(object)
}

export function showMessage(toastStore: ToastStore, result: Result) {
	const background = result.error ? 'variant-filled-error' : 'variant-filled-success'
	toastStore.trigger({ message: result.message, background: background })
}

export function clearFieldMessage(form: HTMLFormElement) {
	for (const messageElement of form.querySelectorAll('.field-message')) {
		messageElement.textContent = '\u00A0'
	}
}

function fallback(field: Field) {
	console.log(`${field.name}, ${field.message}`) // eslint-disable-line no-console
}

export async function handleResponse(response: Response, form: HTMLFormElement): Promise<Result> {
	const result = (await response.json()) as Result
	if (result.error) {
		for (const field of result.fields) {
			const input = form.elements.namedItem(field.name) as HTMLInputElement
			if (!input) {
				fallback(field)
				continue
			}

			const fieldElement = input.closest('.field')
			if (!fieldElement) {
				fallback(field)
				continue
			}

			const messageElement = fieldElement.querySelector('.field-message')
			if (!messageElement) {
				fallback(field)
				continue
			}
			messageElement.textContent = field.message
		}
	}
	return result
}

export async function submit(
	form: HTMLFormElement,
	path: string,
	method: string = 'POST',
): Promise<Result> {
	clearFieldMessage(form)
	running.set(true)
	const data = new FormData(form)
	try {
		const response = await fetch(path, {
			method,
			body: formDataToJson(data),
			headers: {
				'Content-Type': 'application/json',
			},
		})
		return await handleResponse(response, form)
	} catch (e) {
		return new Result('想定外エラーが発生しました', true)
	} finally {
		running.set(false)
	}
}

type Any = any // eslint-disable-line @typescript-eslint/no-explicit-any
export async function get(path: string, params: { [key: string]: unknown }): Promise<Any> {
	running.set(true)

	const urlSearchParams = new URLSearchParams()
	Object.entries(params).forEach(([key, value]) => {
		if (value) {
			urlSearchParams.append(key, value.toString())
		}
	})

	const pathWithParams = `${path}?${urlSearchParams.toString()}`

	try {
		const response = await fetch(pathWithParams, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		})
		return await response.json()
	} catch (e) {
		return new Result('想定外エラーが発生しました', true)
	} finally {
		running.set(false)
	}
}

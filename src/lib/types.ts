export class Field {
	name: string
	message: string

	constructor(name: string, message: string) {
		this.name = name
		this.message = message
	}
}

export class Result {
	error: boolean
	message: string
	fields: Field[] = []

	constructor(message: string = '正常に登録できました', error: boolean = false) {
		this.error = error
		this.message = message
	}
}

export class Data {
	title: string = ''
	year: number = 2020
	month: number = 1
	quantity: number = 0
	unit: string = 'piece'
	memo: string = ''
}

export class DataSearchCondition {
	title: string | null | undefined = ''
	year: number = 0
	quantity: number = 0
	condition: string = 'ge'

	constructor(title: string | null | undefined, year: number, quantity: number, condition: string) {
		this.title = title
		this.year = year
		this.quantity = quantity
		this.condition = condition
	}
}

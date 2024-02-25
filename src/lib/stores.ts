import { get, writable } from 'svelte/store'
import { localStorageStore } from '@skeletonlabs/skeleton'

export const running = writable(false)

export const theme = (() => {
	const { subscribe, set, update } = localStorageStore('selectedTheme', 'gold-nouveau')
	return {
		subscribe,
		set,
		update,
		apply: () => {
			document.body.setAttribute('data-theme', get(theme))
		},
	}
})()

export const darkMode = (() => {
	const { subscribe, set, update } = localStorageStore('isDarkMode', false)
	return {
		subscribe,
		set,
		update,
		apply: () => {
			if (get(darkMode)) {
				document.documentElement.classList.add('dark')
			} else {
				document.documentElement.classList.remove('dark')
			}
		},
	}
})()

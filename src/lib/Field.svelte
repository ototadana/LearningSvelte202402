<script lang="ts">
	import { onMount } from 'svelte'
	import LabelText from './LabelText.svelte'
	export let label = ''

	let thisElement: HTMLLabelElement
	onMount(() => {
		const elements = thisElement.querySelectorAll('input, textarea, select')
		elements.forEach(
			(element: { addEventListener: (arg0: string, arg1: (event: Event) => void) => void }) => {
				element.addEventListener('change', () => {
					const fieldMessageElement = thisElement?.querySelector('.field-message')
					if (fieldMessageElement) {
						fieldMessageElement.textContent = '\u00A0'
					}
				})
			},
		)
	})
</script>

<label bind:this={thisElement} class="field label w-full">
	<div class="text-sm"><LabelText>{label}</LabelText></div>
	<div><slot /></div>
	<div class="field-message text-xs text-error-500 font-bold">{'\u00A0'}</div>
</label>

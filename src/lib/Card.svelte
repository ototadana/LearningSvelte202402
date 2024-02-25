<script lang="ts">
	import LabelText from './LabelText.svelte'

	export let label = ''
	export let cols = 'grid-cols-1 md:grid-cols-1'
</script>

<div class="flex flex-col">
	<LabelText bold={true}>{label}</LabelText>

	<div class="card w-full px-10 py-4">
		{#if $$slots.header}
			<header class="mt-4 mb-6">
				<slot name="header" />
			</header>
		{/if}

		<div class="grid {cols} gap-4 justify-items-start">
			<slot />
		</div>

		<footer class="flex flex-row justify-end">
			<slot name="footer" />
		</footer>
	</div>
</div>

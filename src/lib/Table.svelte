<script lang="ts">
	import { Paginator } from '@skeletonlabs/skeleton'
	import { createEventDispatcher } from 'svelte'
	import Card from './Card.svelte'

	const dispatch = createEventDispatcher()
	export let label = ''
	export let paginationSettings = { page: 0, limit: 10, size: 0, amounts: [5, 10, 50] }

	function onPageChange(e: CustomEvent) {
		paginationSettings.page = e.detail
		dispatch('fetch', e.detail)
	}

	async function onAmountChange(e: CustomEvent) {
		paginationSettings.limit = e.detail
		dispatch('fetch', e.detail)
	}
</script>

<Card {label}>
	<div slot="header">
		<Paginator
			bind:settings={paginationSettings}
			showNumerals
			maxNumerals={1}
			amountText="件分"
			select="select min-w-[150px] border-surface-200-700-token"
			regionControl="btn-group border border-surface-200-700-token rounded"
			controlVariant="variant-filled bg-surface-200-700-token text-gray-600 dark:text-gray-300"
			active="variant-filled bg-surface-300-600-token"
			on:page={onPageChange}
			on:amount={onAmountChange}
		/>
	</div>
	<div class="table-container">
		<table class="table table-hover">
			<slot />
		</table>
	</div>
	<div slot="footer">
		<div class="mt-2 text-gray-500">
			{paginationSettings.size} 件中 {paginationSettings.page * paginationSettings.limit + 1} 件目から
			{Math.min((paginationSettings.page + 1) * paginationSettings.limit, paginationSettings.size)} 件目までを表示
		</div>
	</div>
</Card>

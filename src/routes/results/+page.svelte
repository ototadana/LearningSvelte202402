<script lang="ts">
	import Card from '$lib/Card.svelte'
	import { onMount } from 'svelte'
	import { get } from '$lib'
	import { Data } from '$lib/types'
	import { Accordion, AccordionItem, type PaginationSettings } from '@skeletonlabs/skeleton'
	import Table from '$lib/Table.svelte'
	import Field from '$lib/Field.svelte'
	import Year from '$lib/Year.svelte'

	let results = { count: 0, rows: [] as Data[] }
	let settings: PaginationSettings

	let title: string
	let year: number | null
	let quantity: number | null
	let condition: string

	async function fetchResults() {
		results = await get('/results', {
			page: settings.page,
			limit: settings.limit,
			title,
			year,
			quantity,
			condition,
		})
		settings.size = results.count
	}

	function clear() {
		title = ''
		year = null
		quantity = null
		condition = 'ge'
	}

	onMount(async () => {
		await fetchResults()
	})
</script>

<div class="flex flex-col gap-4 w-full">
	<Accordion>
		<AccordionItem>
			<svelte:fragment slot="summary">
				<div class="hover:underline">条件を指定して絞り込む場合はここをクリック</div>
			</svelte:fragment>
			<svelte:fragment slot="content">
				<Card cols="grid-cols-1 md:grid-cols-3">
					<Field label="件名">
						<input name="title" class="input" type="text" bind:value={title} />
					</Field>

					<Field label="入荷年">
						<Year optional bind:year />
					</Field>

					<Field label="入荷数量">
						<div class="input-group input-group-divider grid-cols-[1fr_auto]">
							<input type="number" name="quantity" bind:value={quantity} />
							<select name="condition" bind:value={condition}>
								<option value="ge">以上</option>
								<option value="le">以下</option>
							</select>
						</div>
					</Field>

					<div slot="footer">
						<button class="btn variant-filled-tertiary" on:click={clear}>クリア</button>
						<button class="btn variant-filled-primary" on:click={fetchResults}>検索</button>
					</div>
				</Card>
			</svelte:fragment>
		</AccordionItem>
	</Accordion>

	<Table bind:paginationSettings={settings} on:fetch={fetchResults}>
		<thead>
			<tr>
				<th>件名</th>
				<th class="max-w-12">入荷年月</th>
				<th class="max-w-12 text-right">入荷数量</th>
				<th>備考</th>
			</tr>
		</thead>
		<tbody>
			{#each results.rows as row}
				<tr>
					<td>{row.title}</td>
					<td>{row.year}-{String(row.month).padStart(2, '0')}</td>
					<td class="text-right">{row.quantity.toLocaleString()}</td>
					<td>{row.memo}</td>
				</tr>
			{/each}
		</tbody>
	</Table>
</div>

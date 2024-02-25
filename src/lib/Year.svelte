<script lang="ts">
	const today = new Date()
	const thisYear = today.getFullYear()
	const nextYear = new Date(thisYear + 1, 0).getFullYear()
	const lastYear = new Date(thisYear - 1, 0).getFullYear()

	export let optional = false
	export let years = [lastYear, thisYear, nextYear]
	export let year: number | null = thisYear
	export let fieldName = 'year'

	$: if (optional) {
		year = null
	}
</script>

<div class="flex flex-row items-end gap-1">
	<select class="select h-10" bind:value={year} name={fieldName}>
		{#if optional}
			<option value=""></option>
		{/if}
		{#each years as year}
			<option value={year}>{year}</option>
		{/each}
	</select>
	年
</div>

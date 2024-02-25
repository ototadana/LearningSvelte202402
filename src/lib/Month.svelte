<script lang="ts">
	const today = new Date()
	let months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
	export let month = today.getMonth() + 1
	export let fieldName = 'month'
</script>

<div class="flex flex-row items-end gap-1">
	<select class="select h-10" bind:value={month} name={fieldName}>
		{#each months as month}
			<option value={month}>{month}</option>
		{/each}
	</select>
	月
</div>

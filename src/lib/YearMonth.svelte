<script lang="ts">
	import Month from './Month.svelte'
	import Year from './Year.svelte'

	export let yearFieldName = 'year'
	export let monthFieldName = 'month'

	const today = new Date()
	const nextMonth = new Date(today.getFullYear(), today.getMonth() + 2)
	export let year = nextMonth.getFullYear()
	export let month = nextMonth.getMonth()
</script>

<div class="flex flex-row gap-2">
	<Year {year} fieldName={yearFieldName} />
	<Month {month} fieldName={monthFieldName} />
</div>

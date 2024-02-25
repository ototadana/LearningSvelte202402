<script lang="ts">
	export let bold = false
</script>

<span class={'text-gray-500 dark:text-gray-400' + (bold ? ' font-bold' : '')}><slot /></span>

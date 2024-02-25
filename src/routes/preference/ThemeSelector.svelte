<script lang="ts">
	import { theme } from '$lib/stores'
</script>

<select class="select" bind:value={$theme} on:change={theme.apply}>
	<option value="gold-nouveau"
		><span>💫</span> <span class="flex-auto text-left">Gold Nouveau</span></option
	>
	<option value="wintry"><span>🌨️</span> <span class="flex-auto text-left">Wintry</span></option>
	<option value="rocket"><span>🚀</span> <span class="flex-auto text-left">Rocket</span></option>
	<option value="skeleton"><span>💀</span> <span class="flex-auto text-left">Skeleton</span></option
	>
</select>

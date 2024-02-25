<script lang="ts">
	import Card from '$lib/Card.svelte'
	import Field from '$lib/Field.svelte'
	import YearMonth from '$lib/YearMonth.svelte'
	import { submit, showMessage } from '$lib'
	import { running } from '$lib/stores'
	import { getToastStore } from '@skeletonlabs/skeleton'

	let entryForm: HTMLFormElement
	let toastStore = getToastStore()

	async function handleSubmit() {
		const result = await submit(entryForm, '/')
		showMessage(toastStore, result)
	}
</script>

<div class="w-full max-w-2xl">
	<form id="entryForm" bind:this={entryForm} on:submit|preventDefault>
		<Card>
			<div slot="header">
				<p>必要な情報を入力して登録してください</p>
			</div>

			<Field label="件名*">
				<input name="title" class="input" type="text" placeholder="件名は必須です" />
			</Field>

			<Field label="入荷年月">
				<YearMonth />
			</Field>

			<Field label="入荷数量*">
				<div class="input-group input-group-divider grid-cols-[1fr_auto]">
					<input type="number" placeholder="数量は必須です" name="quantity" />
					<select name="unit">
						<option value="piece">個</option>
						<option value="litre">ℓ</option>
						<option value="ton">t</option>
					</select>
				</div>
			</Field>

			<Field label="備考">
				<textarea
					class="textarea"
					rows="4"
					placeholder="必要に応じて記述してください"
					name="memo"
				/>
			</Field>

			<div slot="footer">
				<button class="btn variant-filled-primary" on:click={handleSubmit} disabled={$running}
					>登録</button
				>
			</div>
		</Card>
	</form>
</div>

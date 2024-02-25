<script lang="ts">
	import { LightSwitch } from '@skeletonlabs/skeleton'
	import Card from '$lib/Card.svelte'
	import Field from '$lib/Field.svelte'
	import ThemeSelector from './ThemeSelector.svelte'
	import { darkMode } from '$lib/stores'

	function onChangeLightSwitch() {
		darkMode.set(document.documentElement.classList.contains('dark'))
	}
</script>

<div class="flex flex-col gap-4 w-full max-w-2xl">
	<Card label="パスワード変更">
		<Field label="旧パスワード">
			<input
				name="current_password"
				class="input"
				type="password"
				placeholder="現在のパスワードを入力してください"
				required
			/>
		</Field>

		<Field label="新パスワード">
			<input
				name="new_password"
				class="input"
				type="password"
				placeholder="新しいパスワードを入力してください"
				required
			/>
		</Field>

		<Field label="新パスワード (確認)">
			<input
				name="confirm_new_password"
				class="input"
				type="password"
				placeholder="念のため新しいパスワードを再度入力してください"
				required
			/>
		</Field>

		<div slot="footer">
			<button class="btn variant-filled-primary">変更</button>
		</div>
	</Card>

	<Card label="見た目の変更">
		<Field label={$darkMode ? 'ライトモードに切り替え' : 'ダークモードに切り替え'}>
			<LightSwitch
				title="ダークモード / ライトモードを切り替えます"
				on:click={onChangeLightSwitch}
			/>
		</Field>
		<Field label="テーマ変更">
			<ThemeSelector />
		</Field>
	</Card>
</div>

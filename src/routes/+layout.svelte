<script lang="ts">
	import '../app.postcss'
	import { AppShell, ProgressBar, Toast } from '@skeletonlabs/skeleton'
	import { AppBar } from '@skeletonlabs/skeleton'
	import { AppRail, AppRailAnchor } from '@skeletonlabs/skeleton'
	import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome'
	import {
		faChartLine,
		faUser,
		faRightFromBracket,
		faCalculator,
		faTable,
	} from '@fortawesome/free-solid-svg-icons'
	import { page } from '$app/stores'
	import { onMount } from 'svelte'
	import { initializeStores } from '@skeletonlabs/skeleton'
	import { running, darkMode, theme } from '$lib/stores'

	import { config } from '@fortawesome/fontawesome-svg-core'
	import '@fortawesome/fontawesome-svg-core/styles.css'

	config.autoAddCss = false

	initializeStores()

	let progress: number | undefined = undefined
	$: progress = $running ? undefined : 0

	onMount(() => {
		theme.apply()
		darkMode.apply()
	})
</script>

<Toast />
<AppShell>
	<svelte:fragment slot="header">
		<AppBar class="pb-3">
			<svelte:fragment slot="lead">
				<div class="flex items-end">
					<FontAwesomeIcon icon={faChartLine} class="text-4xl text-primary-400" />
					<h2 class="ml-6 text-2xl text-primary-500">入荷管理システム</h2>
				</div>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<a href="/preference" class="btn-icon variant-soft" title="利用者設定">
					<FontAwesomeIcon icon={faUser} class="text-xl" />
				</a>
				<button class="btn-icon variant-soft" title="ログアウト">
					<FontAwesomeIcon icon={faRightFromBracket} class="text-xl" />
				</button>
			</svelte:fragment>
		</AppBar>
		<ProgressBar
			class="bg-surface-100-800-token"
			transition=""
			meter="bg-primary-500"
			track="bg-primary-30"
			value={progress}
		/>
	</svelte:fragment>

	<svelte:fragment slot="sidebarLeft">
		<AppRail>
			<AppRailAnchor href="/" selected={$page.url.pathname === '/'}>
				<svelte:fragment slot="lead"><FontAwesomeIcon icon={faCalculator} /></svelte:fragment>
				<span>実行</span>
			</AppRailAnchor>

			<AppRailAnchor href="/results" selected={$page.url.pathname === '/results'}>
				<svelte:fragment slot="lead"><FontAwesomeIcon icon={faTable} /></svelte:fragment>
				<span>結果確認</span>
			</AppRailAnchor>
		</AppRail>
	</svelte:fragment>

	<div class="container p-4 mx-auto flex justify-start items-start">
		<slot />
	</div>
</AppShell>

<script>
	import { activeSidebarModule, setActiveSidebarUrl } from './store';
	import { ArrowIcon } from '$lib/components/icons';
	import { COLORS } from '$lib/constants/colors';
	import { goto } from '$app/navigation';
	import { SIDEBAR_URL } from '$lib/test';
	import { SecondSidebarItem, SidebarItem } from '.';
	import { page } from '$app/stores';

	$: console.log($page.url.pathname);
	$: console.log($activeSidebarModule);
	$: setActiveSidebarUrl($page.url.pathname, SIDEBAR_URL);
</script>

<aside id="lms-sidebar" class="absolute bottom-0 left-0 top-0 hidden h-screen w-[260px] lg:block">
	<div class="pl-[60px] pt-[13px]">
		<img src="images/layout/logo.png" alt="Logo" class="h-[44px] w-[122px]" />
	</div>
	{#if $activeSidebarModule?.child?.length < 1}
		<div id="sidebar-wrapper" class="max-h-[80vh] overflow-y-auto overflow-x-hidden">
			<div class="pt-10 text-center"></div>
			<SidebarItem sidebarList={SIDEBAR_URL} />
		</div>
	{:else}
		<button
			class="mt-[33px] flex items-center gap-x-4 py-[10px] pl-10 text-body-2 font-bold text-primary hover:text-danger-dark"
			on:click={() => {
				goto('/').then(() => {
					$activeSidebarModule = {
						module: null,
						label: '',
						url: '',
						icon: '',
						child: []
					};
				});
			}}
		>
			<ArrowIcon fill={COLORS.PRIMARY_COLOR} width={24} height={24} />
			<span>GO TO MAIN MENU</span>
		</button>
		<div id="sidebar-wrapper" class="max-h-[75vh] overflow-y-auto overflow-x-hidden">
			<SecondSidebarItem sidebarList={$activeSidebarModule.child} />
		</div>
	{/if}
</aside>

<style>
	:global(#lms-sidebar:has(.sidebar-list.active) .highlight) {
		display: block;
	}

	#sidebar-wrapper {
		-ms-overflow-style: none; /* Internet Explorer 10+ */
		scrollbar-width: none; /* Firefox */
	}

	#sidebar-wrapper::-webkit-scrollbar {
		display: none;
	}
</style>

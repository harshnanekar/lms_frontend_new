<script>
	import { activeSidebarModule, setActiveSidebarUrl } from './store';
	import { ArrowIcon } from '$lib/components/icons';
	import { COLORS } from '$lib/constants/colors';
	import { goto } from '$app/navigation';
	import { SIDEBAR_URL } from '$lib/test';
	import { SecondSidebarItem, SidebarItem } from '.';
	import { page } from '$app/stores';

	$: setActiveSidebarUrl($page.url.href.split('/').pop(), SIDEBAR_URL);
</script>

<aside id="lms-sidebar" class="hidden lg:block absolute left-0 top-0 bottom-0 h-screen w-[260px]">
	<div class="pl-[60px] pt-[13px]">
		<img src="images/layout/logo.png" alt="Logo" class="w-[122px] h-[44px]" />
	</div>
	{#if $activeSidebarModule?.child?.length  < 1}
		<div class="text-center pt-10"></div>
		<SidebarItem sidebarList={SIDEBAR_URL} />
	{:else}
		<button
			class="flex gap-x-4 items-center text-primary hover:text-danger-dark font-bold pl-10 py-[10px] mt-[33px] text-body-2"
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
		<SecondSidebarItem sidebarList={$activeSidebarModule.child} />
	{/if}
</aside>

<style>
	:global(#lms-sidebar:has(.sidebar-list.active) .highlight) {
		display: block;
	}
</style>

<script lang="ts">
	import { activeSidebarModule, isSidebarOverlayOpen, setActiveSidebarUrl } from './store';
	import { ArrowIcon, MenuBarIcon } from '$lib/components/icons';
	import { COLORS } from '$lib/constants/colors';
	import { goto } from '$app/navigation';
	import { SIDEBAR_URL } from '$lib/test';
	import { SecondSidebarItem, SidebarItem } from '.';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	$: setActiveSidebarUrl($page.url.pathname, SIDEBAR_URL);

	const handleOutsideClick = (e: MouseEvent) => {
    if (!(e.target as HTMLElement)?.closest('#lms-sidebar') ) {
      isSidebarOverlayOpen.set(false);
    }
  };

  onMount(() => {
    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  });
</script>
<aside id="lms-sidebar" class:overlay={$isSidebarOverlayOpen} class="no-scrollbar transition-all absolute bottom-0 left-0 top-0 hidden opacity-0 md:opacity-100 h-screen md:w-[62px] lg:w-[260px] md:block">
	<div class="logo-wrapper hidden lg:block pl-[60px] pt-[13px]">
		<img src="images/layout/logo.png" alt="Logo" class="h-[44px] w-[122px]" />
	</div>
	<button on:click|stopPropagation={() => $isSidebarOverlayOpen = !$isSidebarOverlayOpen} class="hidden md:flex lg:hidden w-full h-[62px] justify-center items-center">
		<MenuBarIcon />
	</button>
	{#if $activeSidebarModule?.child?.length < 1}
		<div id="sidebar-wrapper" class="max-h-[80vh] overflow-y-auto overflow-x-hidden">
			<div class="pt-10 text-center"></div>
			<SidebarItem sidebarList={SIDEBAR_URL} />
		</div>
	{:else}
		<button
			class="mt-[33px] flex items-center gap-x-4 py-[10px] md:pl-4 lg:pl-10 text-body-2 font-bold text-primary hover:text-danger-dark"
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
			<span class="sidebar-action-msg hidden lg:inline">GO TO MAIN MENU</span>
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
</style>
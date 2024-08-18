<script lang="ts">
	import { activeSidebarModule, isSidebarOverlayOpen, setActiveSidebarUrl } from './store';
	import { ArrowIcon, MenuBarIcon } from '$lib/components/icons';
	import { COLORS } from '$lib/constants/colors';
	import { goto } from '$app/navigation';
	import { SIDEBAR_URL,ADMIN_SIDEBAR,CHRONICLE_SIDEBAR,VC_SIDEBAR } from '$lib/test';
	import { SecondSidebarItem, SidebarItem } from '.';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { PUBLIC_API_BASE_URL, PUBLIC_BASE_URL } from '$env/static/public';
	import { error } from '@sveltejs/kit';
	import { fetchApi } from '$lib/utils/fetcher';

	export let role: string = '';

	let role_vies_sideBar:any = '';
	$:console.log("ROLEEEEEEEEEEEEEEEEEEEEEEEEEEEEE",role);
	
	$: if (role === 'role_faculty') {
		role_vies_sideBar = SIDEBAR_URL;
		console.log("role_faculty:::::::::::::::::::::::",role_vies_sideBar);
	}else if(role === 'role_chronicle'){
		role_vies_sideBar = CHRONICLE_SIDEBAR;
	}else if(role === 'VChancellor'){
		role_vies_sideBar = VC_SIDEBAR;
	}
	else {
		role_vies_sideBar = ADMIN_SIDEBAR
		console.log("role_Admin:::::::::::::::::::::::",role_vies_sideBar);
	}

	$: setActiveSidebarUrl($page.url.pathname, role_vies_sideBar);

	console.log('TTTTTTTT',SIDEBAR_URL);
	

	const handleOutsideClick = (e: MouseEvent) => {
		if (!(e.target as HTMLElement)?.closest('#lms-sidebar')) {
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

<div
	class="close-layer fixed {$isSidebarOverlayOpen
		? 'block'
		: 'hidden'} inset-0 z-50 h-screen bg-[#576173] bg-opacity-40 md:hidden"
></div>
<aside
	id="lms-sidebar"
	class:overlay={$isSidebarOverlayOpen}
	class="no-scrollbar fixed bottom-0 left-0 top-0 h-screen w-[260px] transition-all md:w-[62px] lg:w-[260px]"
>
	<div class="logo-wrapper hidden pl-[60px] pt-[13px] lg:block">
		<img src="/images/layout/logo.png" alt="Logo" class="h-[44px] w-[122px]" />
	</div>
	<button
		on:click|stopPropagation={() => ($isSidebarOverlayOpen = !$isSidebarOverlayOpen)}
		class="hidden h-[62px] w-full items-center justify-center md:flex lg:hidden"
	>
		<MenuBarIcon />
	</button>
	{#if $activeSidebarModule?.child?.length < 1}
		<div id="sidebar-wrapper" class="max-h-[80vh] no-scrollbar overflow-y-auto overflow-x-hidden">
			<div class="pt-10 text-center"></div>
			<SidebarItem sidebarList={role_vies_sideBar} />
		</div>
	{:else}
		<button
			class="mt-[33px] flex items-center gap-x-4 py-[10px] text-body-2 font-bold text-primary hover:text-danger-dark md:pl-4 lg:pl-10"
			on:click={() => {
				goto(`${PUBLIC_BASE_URL}dashboard`).then(() => {
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
		<div id="sidebar-wrapper" class="no-scrollbar max-h-[75vh] overflow-y-auto overflow-x-hidden">
			<SecondSidebarItem sidebarList={$activeSidebarModule.child} />
		</div>
	{/if}
</aside>

<style>
	:global(#lms-sidebar:has(.sidebar-list.active) .highlight) {
		display: block;
	}
</style>

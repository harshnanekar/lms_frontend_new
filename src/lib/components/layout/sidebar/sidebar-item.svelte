<script lang="ts">
	import { page } from '$app/stores';
	import { COLORS } from '$lib/constants/colors';
	import { SIDEBAR_ICON } from '$lib/types/modules/research/research-types';
	import SidebarList from './sidebar-list.svelte';
	import type { SidebarListType } from './types';

	export let sidebarList: SidebarListType[] = [];
</script>

<ul class="pt-[43px] ">
	{#each sidebarList as item, i}
		{@const isactive = $page.url.pathname === item.url}
		<SidebarList index={i} {item} {isactive} />

	
	{/each}
	<div class="highlight"></div>
</ul>


<style>
	ul {
		position: relative;
	}

	.highlight {
		position: absolute;
		top: 43px;
		left: 0;
		width: 100%; /* Adjust width to account for padding */
		height: 48px; /* Adjust this height to match the height of your list items */
		background-color: #ffffff; /* Match the highlight color */
		border-radius: 15px 0 0 15px;
		transition: transform 0.3s ease;
		pointer-events: none;
		z-index: -1; /* Ensure the highlight stays behind the links */
		margin-left: 20px;
		transform: translateY(calc(51px * var(--active-index, 0)));
		display: none;
	}
</style>

<script lang="ts">
	import { COLORS } from '$lib/constants/colors';
	import { DashboardIcon } from '$lib/components/icons';
	import type { SidebarListType } from './types';
	import { tooltip } from '@svelte-plugins/tooltips';

	// TODO: add types properly
	export let item: SidebarListType;
	export let isactive: boolean;
</script>

<li
	class="pl-[20px] sidebar-list"
	class:text-primary={isactive}
	class:active={isactive}
>
	<a
		href={item.url}
		class="w-full h-full flex items-center space-x-[10px] gap-4 py-[15px] px-[20px] sidebar-link"
		class:active={isactive}
	>
		<DashboardIcon
			fill={isactive ? COLORS.PRIMARY_COLOR : COLORS.ICON_DEFAULT_COLOR}
			width={20}
			height={20}
		/>
		<span class="text-[#333333] text-[14px] font-semibold !m-0 max-w-56 truncate">{item.label}</span
		>
	</a>
</li>

<style>
	:global(li:nth-child(1).active ~ .highlight) {
		transform: translateY(calc(51px * 0));
	}

	:global(li:nth-child(2).active ~ .highlight) {
		transform: translateY(calc(51px * 1));
	}

	:global(li:nth-child(3).active ~ .highlight) {
		transform: translateY(calc(51px * 2));
	}

	:global(li:nth-child(4).active ~ .highlight) {
		transform: translateY(calc(51px * 3));
	}

	:global(li:nth-child(5).active ~ .highlight) {
		transform: translateY(calc(51px * 4));
	}

	.sidebar-link.active {
		border-radius: 15px 0 0 15px;
		position: relative;
		-webkit-transition-property: none;
		transition-property: none;
		transition: all 0ms ease-in-out;
		background-color: #ffffff;
	}

	.sidebar-link.active span {
		color: var(--lms--color-primary);
	}

	.sidebar-link.active::before {
		content: '';
		position: absolute;
		width: 20px;
		height: 20px;
		top: -20px;
		right: 0px;
		border-bottom-right-radius: 20px;
		box-shadow: 5px 5px 0 5px #ffffff;
	}

	.sidebar-link.active::after {
		content: '';
		position: absolute;
		width: 20px;
		height: 20px;
		bottom: -20px;
		right: 0;
		border-top-right-radius: 20px;
		box-shadow: 5px -5px 0 5px #ffffff;
	}
</style>

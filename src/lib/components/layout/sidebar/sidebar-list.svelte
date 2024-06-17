<script lang="ts">
	import { COLORS } from '$lib/constants/colors';
	import { DashboardIcon } from '$lib/components/icons';
	import type { SidebarListType } from './types';
	import { tooltip } from '$lib/utils/tooltip';

	// TODO: add types properly
	export let item: SidebarListType;
	export let isactive: boolean;
	export let index: number;
</script>

<li
	class="sidebar-list pl-3 lg:pl-[20px]"
	style="--active-index: {index}"
	class:text-primary={isactive}
	class:active={isactive}
>
	<a
		href={item.url}
		class="sidebar-link flex h-full w-full items-center gap-4 space-x-[10px] px-2 py-[15px] lg:px-5"
		class:active={isactive}
	>
		<DashboardIcon
			fill={isactive ? COLORS.PRIMARY_COLOR : COLORS.ICON_DEFAULT_COLOR}
			width={20}
			height={20}
		/>
		<span
			class="sidebar-label !m-0 hidden max-w-56 truncate text-[14px] font-semibold text-[#333333] lg:inline"
			>{item.label}</span
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

	:global(li:nth-child(6).active ~ .highlight) {
		transform: translateY(calc(51px * 5));
	}

	:global(li:nth-child(7).active ~ .highlight) {
		transform: translateY(calc(51px * 6));
	}

	:global(li:nth-child(8).active ~ .highlight) {
		transform: translateY(calc(51px * 7));
	}

	:global(li:nth-child(9).active ~ .highlight) {
		transform: translateY(calc(51px * 8));
	}

	:global(li:nth-child(10).active ~ .highlight) {
		transform: translateY(calc(51px * 9));
	}

	:global(li:nth-child(11).active ~ .highlight) {
		transform: translateY(calc(51px * 10));
	}

	:global(li:nth-child(12).active ~ .highlight) {
		transform: translateY(calc(51px * 11));
	}

	:global(li:nth-child(13).active ~ .highlight) {
		transform: translateY(calc(51px * 12));
	}

	:global(li:nth-child(14).active ~ .highlight) {
		transform: translateY(calc(51px * 13));
	}

	:global(li:nth-child(15).active ~ .highlight) {
		transform: translateY(calc(51px * 14));
	}

	:global(li:nth-child(16).active ~ .highlight) {
		transform: translateY(calc(51px * 15));
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

<script>
	import { DashboardIcon } from '$lib/components/icons';
	import { COLORS } from '$lib/constants/colors';
	import { page } from '$app/stores';
	import { SIDEBAR_URL } from '$lib/test';
</script>

<aside id="lms-sidebar" class="absolute left-0 top-0 bottom-0 h-screen w-[260px]">
	<div class="pl-[60px] pt-[13px]">
		<img src="images/layout/logo.png" alt="Logo" class="w-[122px] h-[44px]" />
	</div>
	<div class="text-center pt-10"></div>
	<ul class="pt-[43px]">
		{#each SIDEBAR_URL as item, i}
			{@const isactive = $page.url.href.split('/').pop() === item.url}
			<li class="pl-[20px] list" class:text-primary={isactive} class:active={isactive}>
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
					<span class="text-[#333333] text-[14px] font-semibold !m-0">{item.label}</span>
				</a>
			</li>
		{/each}
        <div class="highlight"></div>
	</ul>
</aside>

<style>
	#lms-sidebar ul {
		position: relative;
	}

	#lms-sidebar .highlight {
		position: absolute;
		top: 43px;
		left: 0;
		width: calc(100% - 40px); /* Adjust width to account for padding */
		height: 48px; /* Adjust this height to match the height of your list items */
		background-color: #ffffff; /* Match the highlight color */
		border-radius: 15px 0 0 15px;
		transition: transform 0.3s ease;
		pointer-events: none;
		z-index: -1; /* Ensure the highlight stays behind the links */
        margin-left: 20px;
	}

	li:nth-child(1).active ~ .highlight {
		transform: translateY(calc(51px * 0));
	}

	li:nth-child(2).active ~ .highlight {
		transform: translateY(calc(51px * 1));
	}

	li:nth-child(3).active ~ .highlight {
		transform: translateY(calc(51px * 2));
	}

	li:nth-child(4).active ~ .highlight {
		transform: translateY(calc(51px * 3));
	}

	li:nth-child(5).active ~ .highlight {
		transform: translateY(calc(51px * 4));
	}

	#lms-sidebar .sidebar-link.active {
		background-color: #ffffff;
		border-radius: 15px 0 0 15px;
		position: relative;
	}

	#lms-sidebar .sidebar-link.active span {
		color: var(--lms--color-primary);
	}

	#lms-sidebar .sidebar-link.active::before {
		content: '';
		position: absolute;
		width: 20px;
		height: 20px;
		top: -20px;
		right: 0px;
		border-bottom-right-radius: 20px;
		box-shadow: 5px 5px 0 5px #ffffff;
	}

	#lms-sidebar .sidebar-link.active::after {
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

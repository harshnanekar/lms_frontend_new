<script>
	import { Header, Sidebar } from '$lib/components/layout';
	import '../app.css';
</script>

<head>
	<title>LMS</title>
</head>

<Sidebar />
<main class="lg:ml-[260px]">
	<Header />
	<main
		id="lms-main-wrapper"
		class="relative overflow-y-auto overflow-x-hidden bg-white px-[13px] py-[22px] md:px-[30px] lg:rounded-tl-[20px]"
	>
		<slot />
	</main>
</main>

<style>
	#lms-main-wrapper {
		height: calc(100vh - 60px);
	}

	#lms-main-wrapper::-webkit-scrollbar-track {
		-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
		border-radius: 10px;
		background-color: #f5f5f5;
	}

	#lms-main-wrapper::-webkit-scrollbar {
		width: 5px;
		height: 10px;
		background-color: #f5f5f5;
	}

	#lms-main-wrapper::-webkit-scrollbar-thumb {
		border-radius: 10px;
		-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
		background-color: #777171;
	}

	:global([data-tooltip]) {
		position: relative;
	}

	/* Default (top) tooltip */
	:global([data-tooltip]:hover::before) {
		content: attr(data-tooltip);
		position: absolute;
		left: 50%;
		transform: translate(-50%, -100%);
		background: #000000;
		color: #ffffff;
		padding: 8px 12px;
		border-radius: 8px;
		max-width: 250px;
		z-index: 999999999999;
	}

	:global([data-tooltip]:hover::after) {
		content: '';
		position: absolute;
		left: 46%;
		transform: translateX(-50%);
		top: 0px; /* Adjust this value to control the distance of the arrow from the tooltip */
		border-width: 8px;
		border-style: solid;
		border-color: #000000 transparent transparent transparent;
	}
	/* Tooltip bottom */
	:global([data-tooltip][data-tooltip-position='bottom']:hover::before) {
		transform: translate(-50%, 0%);
		top: 100%;
	}

	:global([data-tooltip][data-tooltip-position='bottom']:hover::after) {
		top: auto;
		bottom: 0px; /* Adjust this value to control the distance of the arrow from the tooltip */
		border-color: transparent transparent #000000 transparent;
	}
</style>

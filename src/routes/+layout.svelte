<script>
	import { navigating } from '$app/stores';
	import { Header, Sidebar } from '$lib/components/layout';
	import { Circle3 } from 'svelte-loading-spinners';
	import '../app.css';
</script>

<head>
	<title>LMS</title>
</head>

{#if $navigating}
	 <div class="z-[9999999999] bg-[#576173] bg-opacity-40 fixed flex justify-center items-center w-screen h-screen inset-0">
			<Circle3 size="100" unit="px" />
	 </div>
{/if}

<Sidebar />
<main class="transition-all md:ml-[62px] lg:ml-[260px]">
	<Header />
	<main
		id="lms-main-wrapper"
		class="relative overflow-y-auto overflow-x-hidden bg-white px-[13px] py-[22px] md:rounded-tl-[20px] md:p-[30px]"
	>
		<slot />
	</main>
</main>

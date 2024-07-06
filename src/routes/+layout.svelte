<script lang="ts">
	import { Popup } from '$lib/components/ui/popup';
	import { navigating } from '$app/stores';
	import { Header, Sidebar } from '$lib/components/layout';
	import { Toaster } from '$lib/components/ui/sonner';
	import { Circle3 } from 'svelte-loading-spinners';
	import '../app.css';
</script>

<head>
	<title>Research</title>
</head>

{#if $navigating}
	<div
		class="fixed inset-0 z-[9999999999] flex h-screen w-screen items-center justify-center bg-[#576173] bg-opacity-40"
	>
		<Circle3 size="100" unit="px" />
	</div>
{/if}


<Popup />

<Toaster
	richColors
	theme="light"
	closeButton
	toastOptions={{
		cancelButtonStyle: '!bg-white',
		classes: {
			description: 'md:!text-body-2',
			title: 'md:!text-xl'
		}
	}}
/>
<Sidebar />
<main class="transition-all md:ml-[62px] lg:ml-[260px]">
	<Header />
	<main
		id="lms-main-wrapper"
		class="small-scrollbar relative overflow-y-auto overflow-x-hidden bg-white px-[13px] py-[22px] md:rounded-tl-[20px] md:p-[30px]"
	>
		<slot />
	</main>
</main>

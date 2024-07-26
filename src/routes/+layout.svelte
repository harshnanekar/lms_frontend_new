<script lang="ts">
	import '../app.css';
	import { Popup } from '$lib/components/ui/popup';
	import { navigating } from '$app/stores';
	import { Toaster } from '$lib/components/ui/sonner';
	import { Circle3 } from 'svelte-loading-spinners';
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
<slot/>
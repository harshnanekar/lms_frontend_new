<script lang="ts">
	// import { conferenceDetails } from 'types/research.types';
	import { ActionIcon, DeleteIcon, EyeIcon, PenIcon } from '$lib/components/icons';
	import { Modal } from '$lib/components/ui';

	// import { bookPublication } from '$lib/schemas/modules/research/master-validations';
	import type { ConferenceRender } from '$lib/types/modules/research/research-types';
	// import type { SubjectMeetingDetail } from '$lib/types/modules/mpc/master-form';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import type { ModalSizes } from '$lib/components/ui/modal/helper.modal';
	import { Popup } from '$lib/components/ui/popup';
	import { fetchApi } from '$lib/utils/fetcher';
	import { PUBLIC_API_BASE_URL, PUBLIC_BASE_URL } from '$env/static/public';
	import { toast } from 'svelte-sonner';
	import { goto } from '$app/navigation';
	import { paginateUrl } from '$lib/stores/modules/research/master.store';
	import { confirmStore, actionStore } from '$lib/stores/modules/research/master.store';
	import { showConfirmation } from '$lib/components/ui/popup';

	export let actionData: ConferenceRender;

	const showMenu = writable<boolean>(false);
	const menuPosition = writable<{ top: number; left: number }>({ top: 0, left: 0 });

	let buttonElement: HTMLButtonElement;
	let menuElement: HTMLDivElement;

	const toggleMenu = () => {
		showMenu.update((value) => !value);
	};

	$: if ($showMenu && menuElement) {
		const rect = buttonElement.getBoundingClientRect();
		const menuRect = menuElement.getBoundingClientRect();

		let top = rect.bottom + window.scrollY;
		let left = rect.left + window.scrollX;

		// Check for available space below the button
		if (window.innerHeight - rect.bottom < menuRect.height) {
			top = rect.top + window.scrollY - menuRect.height;
		}

		// Check for available space to the right of the button
		if (window.innerWidth - rect.left < menuRect.width) {
			left = rect.right + window.scrollX - menuRect.width;
		}

		// Check for available space to the left of the button
		if (rect.left < menuRect.width) {
			left = rect.left + window.scrollX;
		}

		menuPosition.set({ top, left });
	}

	const handleClickOutside = (event: MouseEvent) => {
		if (
			!buttonElement.contains(event.target as Node) &&
			(!menuElement || !menuElement.contains(event.target as Node))
		) {
			showMenu.set(false);
		}
	};

	onMount(() => {
		document.addEventListener('click', handleClickOutside);
		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	});

	$: console.log('ACTIONDATA Conference Details >>>>>>>>>>>', actionData);
	const isOpen = writable(false);
	let modalwidthPercent: ModalSizes = 'md';
	let conferenceId: number;

	const openModal = async () => {
		conferenceId = actionData.id;
		console.log('click called');

		const message = 'Are you sure you want to delete this?';
		confirmStore.set({
			isVisible: true,
			confirmText: message
		});

		actionStore.set({
			callback: handleDelete
		});
	};

	const closeModal = () => {
		isOpen.set(false);
	};

	async function handleDelete() {
		console.log('delete button clicked', conferenceId);
		isOpen.set(false);



		const { error, json } = await fetchApi({
			url: `${PUBLIC_API_BASE_URL}/conference-delete?id=${conferenceId}`,
			method: 'GET'
		});

		if (error) {

			toast.error(error.message || 'Something went wrong!', {
				description: error.errorId ? `ERROR-ID: ${error.errorId}` : ''
			});
			return;
		}

		if(json.status == 200){
			
		toast.success('Deleted Successfully !');
		let url: URL = new URL(`${PUBLIC_API_BASE_URL}/conference-paginate`);
		paginateUrl.set(url);

		}else{
			toast.error(json.message);
		}



	}
</script>

<div>
	<button class="action-button" bind:this={buttonElement} on:click={toggleMenu}>
		<ActionIcon />
	</button>
	{#if $showMenu}
		<div role="presentation" class="backdrop" on:click={handleClickOutside}></div>
		<div
			bind:this={menuElement}
			class="fixed-menu mt-2 w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5"
			style="top: {$menuPosition.top}px; left: {$menuPosition.left}px;"
		>
			<div class="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
				<a
					href="{PUBLIC_BASE_URL}conference/view/{actionData.id}"
					class="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex gap-2 items-center"
					role="menuitem"><EyeIcon fill="black"/>View</a
				>
				{#if actionData.status == 're'}
				<a
					href="{PUBLIC_BASE_URL}conference/edit/{actionData.id}"
					class="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex gap-2 items-center"
					role="menuitem"><PenIcon fill="black"/>Edit</a
				>
				<button
					on:click={openModal}
					class="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex gap-2 items-center"
					role="menuitem"><DeleteIcon fill="black"/>Delete</button
				>
				{/if}
			</div>
		</div>
	{/if}
</div>
<!-- <Popup /> -->

<Modal bind:isOpen={$isOpen} size={modalwidthPercent} on:close={closeModal}>
	<!-- <div slot="header">
			<div class="border-b p-4">
				<h2 class="text-lg font-semibold">Custom Modal Title</h2>
			</div>
		</div> -->
	<svalte:fragment slot="body">
		<div class=" flex min-h-[10vh] flex-col justify-center p-4">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				color="currentColor"
				class="mx-auto mb-4 h-12 w-12 shrink-0 text-gray-400 dark:text-gray-200"
				role="img"
				aria-label="exclamation circle outline"
				viewBox="0 0 24 24"
				><path
					stroke="currentColor"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M12 13V8m0 8h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
				></path></svg
			>
			<h3 class="mb-5 ml-4 text-lg font-normal text-gray-500 dark:text-gray-400">
				Are you sure you want to delete this?
			</h3>
		</div>
	</svalte:fragment>
	<div slot="footer">
		<div class="flex flex-row justify-center gap-4 border-t p-4">
			<button
				type="button"
				class="me-2 inline-flex items-center justify-center rounded-lg bg-red-700 px-5 py-2.5 text-center text-sm font-medium text-white focus-within:outline-none focus-within:ring-4 focus-within:ring-red-300 hover:bg-red-800 dark:bg-red-600 dark:focus-within:ring-red-900 dark:hover:bg-red-700"
				on:click={handleDelete}>Yes, I'm sure</button
			>
			<button
				type="button"
				class="hover:text-primary-700 focus-within:text-primary-700 inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-center text-sm font-medium text-gray-900 focus-within:outline-none focus-within:ring-4 focus-within:ring-gray-200 hover:bg-gray-100 dark:border-gray-600 dark:bg-transparent dark:text-gray-400 dark:focus-within:text-white dark:focus-within:ring-gray-700 dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:hover:text-white"
				on:click={closeModal}>No, cancel</button
			>
		</div>
	</div>
</Modal>

<style>
	.fixed-menu {
		position: fixed;
		z-index: 90000000;
	}
	.backdrop {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.5);
		z-index: 1500;
		transition: background 5000ms ease;
	}
</style>

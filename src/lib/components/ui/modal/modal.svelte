<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { onMount } from 'svelte';
	import {
		modalPositionClasses,
		modalSizeMap,
		type ModalPositions,
		type ModalSizes
	} from './helper.modal';
	import { fly } from 'svelte/transition';

	export let isOpen: boolean = false;
	export let size: ModalSizes = 'md';
	export let position: ModalPositions = 'center-bottom';
	export let closeOnOutsideClick: boolean = true;

	const dispatch = createEventDispatcher();

	const closeModal = () => {
		isOpen = false;
		dispatch('close');
	};

	const handleOverlayClick = (event: MouseEvent) => {
		if (closeOnOutsideClick && event.target === event.currentTarget) {
			closeModal();
		}
	};

	onMount(() => {
		const handleEsc = (event: KeyboardEvent) => {
			if (closeOnOutsideClick && event.key === 'Escape') closeModal();
		};

		window.addEventListener('keydown', handleEsc);

		return () => {
			window.removeEventListener('keydown', handleEsc);
		};
	});
</script>

{#if isOpen}
	<div
		transition:fly|local
		class="no-scrollbar modal-overlay {modalPositionClasses[position]}"
		on:click={handleOverlayClick}
	>
		<div class="no-scrollbar modal-content {modalSizeMap[size]}">
			<slot name="header"></slot>
			<slot name="body"></slot>
			<slot name="footer"></slot>
		</div>
	</div>
{/if}

<style>
	.modal-overlay {
		@apply fixed inset-0 z-[999999] flex w-[100vw] justify-center bg-[#576173] bg-opacity-40;
	}
	.modal-content {
		@apply max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-modal;
	}
</style>

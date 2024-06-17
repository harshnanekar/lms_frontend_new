<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { onMount } from 'svelte';
	import { modalPositionClasses, modalSizeMap, type ModalPositions, type ModalSizes } from './types';
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
			if (event.key === 'Escape') closeModal();
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
		class="modal-overlay {modalPositionClasses[position]}"
		on:click={handleOverlayClick}
	>
		<div class="modal-content w-full {modalSizeMap[size]}">
			<slot name="header">
				<div class="relative border-b p-4">
					<h2 class="text-lg font-semibold">Modal Title</h2>
				</div>
			</slot>
			<slot name="body">
				<div class="p-4">
					<p>This is the modal body content.</p>
				</div>
			</slot>
			<slot name="footer"></slot>
		</div>
	</div>
{/if}

<style>
	.modal-overlay {
		@apply fixed inset-0 z-50 flex justify-center bg-[#576173] bg-opacity-40 lg:pt-6;
	}
	.modal-content {
		@apply overflow-hidden rounded-2xl bg-white shadow-modal;
	}
</style>

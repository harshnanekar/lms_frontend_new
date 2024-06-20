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
		class="modal-overlay {modalPositionClasses[position]}"
		on:click={handleOverlayClick}
	>
		<div class="modal-content {modalSizeMap[size]}">
			<slot name="header"></slot>
			<slot name="body"></slot>
			<slot name="footer"></slot>
		</div>
	</div>
{/if}

<style>
	.modal-overlay {
		@apply fixed inset-0 z-[999999] flex justify-center bg-[#576173] bg-opacity-40 lg:pt-6 w-[100vw];
	}
	.modal-content {
		@apply rounded-2xl bg-white shadow-modal overflow-y-auto;
	}
</style>

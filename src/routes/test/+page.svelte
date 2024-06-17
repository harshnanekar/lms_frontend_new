<script lang="ts">
	import { DynamicSelect, Modal } from '$lib/components/ui';
	import type { ModalSizes } from '$lib/components/ui/modal/types';

	import { writable } from 'svelte/store';

	const isOpen = writable(false);
	let modalwidthPercent: ModalSizes = 'md';

	const openModal = (size: ModalSizes) => {
		modalwidthPercent = size;
		isOpen.set(true);
	};

	const closeModal = () => {
		isOpen.set(false);
	};
</script>

<DynamicSelect />

<div class="flex h-[50vh] items-center justify-center">
	<div class="flex flex-wrap space-x-4">
		<button class="lms-btn lms-primary-btn" on:click={() => openModal('sm')}
			>Open Small Modal</button
		>
		<button class="lms-btn lms-primary-btn" on:click={() => openModal('md')}
			>Open Medium Modal</button
		>
		<button class="lms-btn lms-primary-btn" on:click={() => openModal('lg')}
			>Open Large Modal</button
		>
		<button class="lms-btn lms-primary-btn" on:click={() => openModal('xl')}
			>Open XLarge Modal</button
		>
		<button class="lms-btn lms-primary-btn" on:click={() => openModal('full')}
			>Open FUll Modal</button
		>
		<button class="lms-btn lms-primary-btn" on:click={() => openModal('fluid')}
			>Open Fluid Modal</button
		>
	</div>
</div>
<DynamicSelect />

<Modal bind:isOpen={$isOpen} size={modalwidthPercent} on:close={closeModal}>
	<div slot="header">
		<div class="border-b p-4">
			<h2 class="text-lg font-semibold">Custom Modal Title</h2>
		</div>
	</div>
	<svalte:fragment slot="body">
		<div class="p-4 min-h-[50vh]">
			<p>This is custom modal body content.</p>
			<DynamicSelect />
		</div>
	</svalte:fragment>
	<div slot="footer">
		<div class="border-t p-4">
			<button class="lms-btn lms-primary-btn" on:click={closeModal}>Close</button>
		</div>
	</div>
</Modal>

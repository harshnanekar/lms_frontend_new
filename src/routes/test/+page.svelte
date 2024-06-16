<script lang="ts">
	import { DynamicSelect, Modal } from '$lib/components/ui';

	import { writable } from 'svelte/store';

	const isOpen = writable(false);
	let modalwidthPercent: number = 40;

	const openModal = (width: number) => {
		modalwidthPercent = width;
		isOpen.set(true);
	};

	const closeModal = () => {
		isOpen.set(false);
	};
</script>

<DynamicSelect />

<div class="flex h-screen items-center justify-center">
	<div class="flex space-x-4">
		<button class="lms-btn lms-primary-btn" on:click={() => openModal(20)}>Open Small Modal</button>
		<button class="lms-btn lms-primary-btn" on:click={() => openModal(40)}>Open Medium Modal</button>
		<button class="lms-btn lms-primary-btn" on:click={() => openModal(60)}>Open Large Modal</button>
		<button class="lms-btn lms-primary-btn" on:click={() => openModal(80)}>Open XLarge Modal</button>
	</div>
</div>

<Modal bind:isOpen={$isOpen} widthPercentage={modalwidthPercent} on:close={closeModal}>
	<div slot="header">
		<div class="border-b p-4">
			<h2 class="text-lg font-semibold">Custom Modal Title</h2>
			<button class="absolute right-2 top-2" on:click={closeModal}>✕</button>
		</div>
	</div>
	<div slot="body">
		<div class="p-4">
			<p>This is custom modal body content.</p>
		</div>
	</div>
	<div slot="footer">
		<div class="border-t p-4">
			<button class="lms-btn lms-primary-btn" on:click={closeModal}>Close</button>
		</div>
	</div>
</Modal>


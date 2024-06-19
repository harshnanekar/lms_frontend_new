<script lang="ts">
	import { Card, DynamicSelect, Modal } from '$lib/components/ui';
	import DatePicket from '$lib/components/ui/date-picket.svelte';
	import type { ModalSizes } from '$lib/components/ui/modal/helper.modal';

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

	let selectedDateTime: Date | null;

	$: console.log('Selected Date and Time:', selectedDateTime);
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
		<div class="min-h-[50vh] p-4">
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

<Card title="Meeting Details">
	<div class="p-4">
		<p>This is the card body content.</p>
	</div>
</Card>

<DatePicket bind:selectedDateTime />

<div class="mb-10"></div>

<!----------input---------->
<div class="lms-input-container">
	<input id="firstname" class="lms-input" type="text" placeholder="" >
	<label for="firstname" class="lms-placeholder">First Name<span>*</span></label>
</div>

<div class="mb-10"></div>

<!----------input-error---------->
<div class="lms-input-container">
	<input id="firstname" class="lms-input-error" type="text" placeholder="" value="error">
	<div class="lms-cut-error"></div>
	<label for="firstname" class="lms-placeholder-error">First Name<span>*</span></label>
	<div>
		<span class="lms-error-msg">(i) Numeric characters are not allowed</span>
	</div>
</div>

<div class="mb-14"></div>

<!----------input-focus---------->
<div class="lms-input-container ">
	<input id="firstname" class="lms-input border-[1px] border-primary" type="text" placeholder="" value="focus">
	<!-- <div class="lms-cut-focus"></div> -->
	<label for="firstname" class="lms-placeholder">First Name<span>*</span> </label>
</div>

<div class="mt-14"></div>

<!----------input-hint---------->
<div class="lms-input-container">
	<input id="firstname" class="lms-input" type="text" placeholder="" value="hint">
	<!-- <div class="lms-cut-hint"></div> -->
	<label for="firstname" class="lms-placeholder">First Name<span>*</span> </label>
	<div>
		<span class="lms-hint-msg">(i) Hint text here</span>
	</div>
</div>

<div class="mt-14"></div>

<!----------input-disabled---------->
<div class="lms-input-container ">
	<input id="firstname" class="lms-input bg-base" type="text" placeholder="" value="disabled" disabled>
	<div class="lms-cut-disabled"></div>
	<label for="firstname" class="lms-placeholder">First Name</label>
</div>

<div class="mt-14"></div>
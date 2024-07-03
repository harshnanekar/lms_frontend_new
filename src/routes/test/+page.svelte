<script lang="ts">
	
import { Card, DynamicSelect, Modal } from '$lib/components/ui';
	import DatePicket from '$lib/components/ui/date-picker.svelte';
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

</script>

<div class="mb-[30px]">

	<div class="flex items-center justify-between mb-3 ">
		
		<div>
			<h1 class="text-lg font-bold md:text-xl mb-2">MBA - 8001 - Trimester III- Financial Analytics - 1 - 803AN2E001</h1>
			<p class="font-normal text-sm">Financial Analytics-I (803AN2E001)-52245092   •   Master Of Business Administration (8001) - 50300366</p>
		</div>
		
		<div class="flex justify-items-center gap-3">
			<button class="lms-btn lms-primary-btn fixed bottom-16 right-5 py-4 md:static md:py-2.5 z-10">
			</button>
			<span class="font-bold text-primary text-body-3">PDF</span>
		</div>

	</div>
	
	<div class="flex gap-2">
		<div class="bg-base px-[16px] py-[3px] rounded-[46px] gap-4 text-black text-sm font-normal leading-5 tracking-[0.30000001192092896px]">21 Mar’ 24  •  2:30 PM</div>
		<div class="bg-base px-[16px] py-[3px] rounded-[46px] gap-4 text-black text-sm font-normal leading-5 tracking-[0.30000001192092896px]">
			Trimester III, 2023
		</div>
	</div>

	
</div>


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
<div class="mt-10"></div>

<DatePicket bind:selectedDateTime />
<div class="mt-10"></div>
<DynamicSelect placeholder="select acad year" />

<div class="mb-10"></div>

<!----------input---------->
<div class="lms-input-container">
	<input id="firstname" class="lms-input error" type="text" placeholder="" />
	<label for="firstname" class="lms-placeholder">First Name<span>*</span></label>
</div>

<div class="mb-10"></div>

<!----------input-error---------->
<div class="lms-input-container">
	<input id="firstname" class="lms-input-error" type="text" placeholder="" value="error" />
	<div class="lms-cut-error"></div>
	<label for="firstname" class="lms-placeholder-error">First Name<span>*</span></label>
	<div>
		<span class="lms-error-msg">(i) Numeric characters are not allowed</span>
	</div>
</div>

<div class="mb-14"></div>

<!----------input-focus---------->
<div class="lms-input-container">
	<input
		id="firstname"
		class="lms-input border-[1px] border-primary"
		type="text"
		placeholder=""
		value="focus"
	/>
	<label for="firstname" class="lms-placeholder">First Name<span>*</span> </label>
</div>

<div class="mt-14"></div>

<!----------input-hint---------->
<div class="lms-input-container">
	<input id="firstname" class="lms-input" type="text" placeholder="" value="hint" />
	<label for="firstname" class="lms-placeholder">First Name<span>*</span> </label>
	<div>
		<span class="lms-hint-msg">(i) Hint text here</span>
	</div>
</div>

<div class="mt-14"></div>

<!----------input-disabled---------->
<div class="lms-input-container">
	<input
		id="firstname"
		class="lms-input bg-base"
		type="text"
		placeholder=""
		value="Disabled"
		disabled
	/>
	<label for="firstname" class="lms-placeholder">First Name</label>
</div>

<div class="mt-14"></div>

<script lang="ts">
	import { generateRandomUUID } from '$lib/utils/helper';
	import { Modal } from '$lib/components/ui';
	import type { ModalSizes } from '$lib/components/ui/modal/helper.modal';
	import { writable } from 'svelte/store';
	import { DeleteIcon, EyeIcon, CloseEyeIcon } from '$lib/components/icons';
	import { createEventDispatcher } from 'svelte';
	import { fileDataStore } from '$lib/stores/modules/research/master.store';

	const dispatch = createEventDispatcher();
	const isOpen = writable(false);
	const isPreviewOpen = writable(false);
	const isEyeIconChange = writable(false);
	let modalwidthPercent: ModalSizes = 'md';
	let fileUrl = '';
	let files: any = [];
	export let isView: boolean = false;
	export let isEdit: boolean = false;

	$: selectedFileUrl = fileUrl;
	$: fileData = $fileDataStore;

	function previewFile() {
		isOpen.set(true);
		isEyeIconChange.set(true);
	}

	function previewParticularFile(url: string) {
		fileUrl = url;
		console.log('url ', fileUrl);
		isPreviewOpen.set(true);
		isOpen.set(false);
	}

	const closeModal = () => {
		isOpen.set(false);
		isEyeIconChange.set(false);
	};

	const closePreviewModal = () => {
		isPreviewOpen.set(false);
		isEyeIconChange.set(false);
	};

	$: console.log('filename ', fileData);

	function handleFileUpload(event: Event) {
		const input: any = event.target as HTMLInputElement;
		const fileData = Array.from(input.files || []);

		if (!isEdit) {
			files = fileData.map((file: any) => ({
				file,
				name: file.name,
				url: URL.createObjectURL(file),
				id: generateRandomUUID()
			}));
		} else {
			const storedFiles = $fileDataStore;
			files = [
				...storedFiles,
				...fileData.map((file: any) => ({
					file,
					name: file.name,
					url: URL.createObjectURL(file),
					id: generateRandomUUID()
				}))
			];
		}

		fileDataStore.set(files);
		dispatch('filesSelected', files);
	}

	function handleDelete(file: any) {
		files = files.filter((f: any) => f.id !== file);
		console.log('files display ', files);
		fileDataStore.update((files) => files.filter((f: any) => f.id !== file));
		dispatch('deletedFiles', files);
	}
</script>

<div class="flex items-center">
	<div
		class="md:rounded-1 flex items-center justify-center rounded-[6px] border-2 border-red-200 sm:h-5 sm:w-full sm:py-6 md:h-5 md:w-24 md:px-16 md:py-4 lg:h-3 lg:w-36 lg:px-14 lg:py-5"
	>
		<label class="flex cursor-pointer items-center justify-center">
			<div class="flex items-center justify-center gap-4">
				<svg
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M11.9726 21.9974H6.95913C4.66748 21.9935 3.01508 20.3962 3.00302 18.1701C2.99899 17.3929 2.99899 16.6158 3.00302 15.8386C3.00704 15.038 3.50557 14.5225 4.27347 14.5186C5.04138 14.5147 5.54393 15.0302 5.55197 15.8308C5.55599 16.6197 5.54795 17.4125 5.55599 18.2052C5.56404 19.0332 6.06257 19.5175 6.92294 19.5175H17.0826C17.939 19.5175 18.4415 19.0332 18.4495 18.2052C18.4536 17.4164 18.4455 16.6236 18.4536 15.8308C18.4576 15.0302 18.9601 14.5186 19.728 14.5186C20.496 14.5186 21.0025 15.0341 20.9945 15.8386C20.9864 16.8501 21.0427 17.8733 20.9141 18.8692C20.6728 20.6969 19.0727 21.9856 17.167 21.9935C15.4302 22.0052 13.7014 21.9974 11.9726 21.9974Z"
						fill="#D2232A"
					/>
					<path
						d="M10.7192 6.27052C10.5262 6.44626 10.4096 6.5439 10.3051 6.64544C9.4889 7.44604 8.68079 8.25055 7.86062 9.04334C7.27766 9.60961 6.46955 9.64867 5.94689 9.15659C5.42424 8.66451 5.44434 7.8522 6.01524 7.28982C7.6797 5.66519 9.34819 4.04446 11.0207 2.42764C11.6117 1.85745 12.3796 1.85745 12.9666 2.42764C14.6511 4.05227 16.3277 5.68081 18.0002 7.31716C18.551 7.8561 18.555 8.66842 18.0404 9.15269C17.5258 9.63695 16.7136 9.61352 16.1548 9.07458C15.3226 8.27007 14.5064 7.45385 13.6822 6.64544C13.5777 6.53999 13.4611 6.44236 13.2922 6.29005C13.2802 6.51266 13.2681 6.65715 13.2681 6.80556C13.2681 9.35967 13.2721 11.9177 13.2641 14.4718C13.2601 15.4325 12.3957 16.0027 11.4911 15.659C10.9925 15.4716 10.7192 15.0498 10.7192 14.4327C10.7151 11.906 10.7151 9.3792 10.7192 6.84852V6.27052Z"
						fill="#D2232A"
					/>
				</svg>
				<span class="font-semibold md:text-lg lg:text-lg">Upload</span>
				<input type="file" class="hidden" multiple on:change={handleFileUpload} />
			</div>
		</label>
	</div>

	<div class="ml-2 mt-2">
		<button on:click={previewFile}>
			{#if $isEyeIconChange}
				<CloseEyeIcon />
			{:else}
				<EyeIcon />
			{/if}
		</button>
	</div>
</div>

<Modal bind:isOpen={$isOpen} size={modalwidthPercent} on:close={closeModal}>
	<div slot="header">
		<div class="border-b p-4">
			<h2 class="text-lg font-semibold">Preview Files</h2>
		</div>
	</div>
	<svalte:fragment slot="body">
		<div class="lms-table-wrapper rounded-2xl p-4">
			<table class="lms-table">
				<thead>
					<th class="!text-[15px]">Sr.No</th>
					<th class="!text-[15px]">Filename</th>
					<th class="!text-[15px]">Action</th>
				</thead>
				<tbody>
					{#if fileData.length > 0}
						{#each fileData as file, index}
							<tr>
								<td class="!text-[15px]">{index + 1}</td>
								<td class="!text-[15px]">{file.name}</td>
								<td class="flex items-center gap-2 !text-[15px]">
									{#if !isView}
										<button on:click={() => handleDelete(file.id)}><DeleteIcon /></button>
									{/if}
									<button on:click={() => previewParticularFile(file.url)}
										><EyeIcon width="20" height="20" /></button
									>
								</td>
							</tr>
						{/each}
					{:else}
						<tr><td colspan="3" class="py-4 text-center !text-[15px]">No Files Found!</td></tr>
					{/if}
				</tbody>
			</table>
		</div>
	</svalte:fragment>
	<div slot="footer">
		<button class="lms-btn lms-primary-btn m-4" on:click={closeModal}>Close</button>
	</div>
</Modal>

<Modal bind:isOpen={$isPreviewOpen} size="xl" on:close={closePreviewModal}>
	<div slot="header">
		<div class="border-b p-4">
			<h2 class="text-lg font-semibold">File Preview</h2>
		</div>
	</div>

	<svalte:fragment slot="body">
		<div>
			<iframe src={selectedFileUrl} class="scroll small-scroll min-h-[80vh] w-[100%]"></iframe>
		</div>
	</svalte:fragment>
	<div slot="footer">
		<button class="lms-btn lms-primary-btn m-4" on:click={closePreviewModal}>Close</button>
	</div>
</Modal>

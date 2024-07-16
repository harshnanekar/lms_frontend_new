<script lang="ts">
	import { Modal } from '$lib/components/ui';
	import type { ModalSizes } from '$lib/components/ui/modal/helper.modal';
	import { writable } from 'svelte/store';
	import { DeleteIcon } from '$lib/components/icons';

	const isOpen = writable(false);
	let modalwidthPercent: ModalSizes = 'md';

	let fileData: any = [];
	$: files = fileData;

	function previewFile() {
		isOpen.set(true);
	}

	const closeModal = () => {
		isOpen.set(false);
	};

	function handleFiles() {}
</script>

<div class="flex items-center">
	<div
		class="md:rounded-1 flex items-center justify-center rounded-[6px] border-2 border-red-200 sm:h-5 sm:w-full sm:py-6 md:h-5 md:w-24 md:px-16 md:py-4 lg:h-3 lg:w-36 lg:px-14 lg:py-6"
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
				<span class="font-bold md:text-lg lg:text-lg">Upload</span>
				<input type="file" class="hidden" multiple on:change={handleFiles} />
			</div>
		</label>
	</div>

	<div class="ml-2 mt-2">
		<button on:click={previewFile}>
			<svg
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M12.0001 14.7106C13.8403 14.7106 15.3322 13.2733 15.3322 11.5003C15.3322 9.72733 13.8403 8.29004 12.0001 8.29004C10.1598 8.29004 8.66797 9.72733 8.66797 11.5003C8.66797 13.2733 10.1598 14.7106 12.0001 14.7106Z"
					fill="#D2232A"
				/>
				<path
					d="M21.389 9.42857C20.097 7.40128 17.1581 4 12 4C6.84191 4 3.903 7.40128 2.61098 9.42857C2.21157 10.051 2 10.7683 2 11.5C2 12.2317 2.21157 12.949 2.61098 13.5714C3.903 15.5987 6.84191 19 12 19C17.1581 19 20.097 15.5987 21.389 13.5714C21.7884 12.949 22 12.2317 22 11.5C22 10.7683 21.7884 10.051 21.389 9.42857ZM12 16.3154C11.0115 16.3154 10.0451 16.033 9.22318 15.5039C8.40124 14.9747 7.76061 14.2227 7.38231 13.3428C7.00401 12.4629 6.90503 11.4947 7.09789 10.5606C7.29074 9.62646 7.76677 8.76844 8.46578 8.09499C9.16478 7.42154 10.0554 6.96292 11.0249 6.77712C11.9945 6.59131 12.9994 6.68668 13.9127 7.05114C14.826 7.41561 15.6066 8.03281 16.1558 8.8247C16.705 9.61659 16.9981 10.5476 16.9981 11.5C16.9968 12.7767 16.4698 14.0008 15.5328 14.9036C14.5957 15.8064 13.3252 16.3141 12 16.3154Z"
					fill="#D2232A"
				/>
			</svg>
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
					<th>Sr.No</th>
					<th>Filename</th>
					<th>Action</th>
				</thead>
				<tbody>
					{#if files.length > 0}
						{#each files as file, index}
							<tr>
								<td>{index}</td>
								<td>file</td>
								<td>
									<DeleteIcon />
								</td>
							</tr>
						{/each}
					{:else}
						<tr><td class="col-span-3">No Files Found !</td></tr>
					{/if}
				</tbody>
			</table>
		</div>
	</svalte:fragment>
	<div slot="footer">
		<button class="lms-btn lms-primary-btn m-4" on:click={closeModal}>Close</button>
	</div>
</Modal>

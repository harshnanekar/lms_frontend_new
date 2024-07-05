<script lang="ts">
	import { onMount } from 'svelte';
	let files: FileList | null = null;

	function handleFiles(event: Event) {
		const input = event.target as HTMLInputElement;
		if (input.files) {
			files = input.files;
		}
	}

	function removeMultiUpload() {
		files = null;
	}

	let multiUploadInput: HTMLInputElement | null = null;

	onMount(() => {
		if (multiUploadInput) {
			multiUploadInput.value = '';
		}
	});
</script>

<div class="h-screen w-full bg-white">
	<div class="container mx-auto flex h-full flex-col items-center justify-center">
		<div
			id="images-container"
			class="grid w-full gap-4 {files && files.length > 0
				? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
				: ''}"
		>
			{#if files}
				{#each Array.from(files) as file (file.name)}
					<div class="image-div" style="background-image: url({URL.createObjectURL(file)})"></div>
				{/each}
			{/if}
		</div>
		<div class="flex w-full justify-center">
			<div
				id="multi-upload-button"
				class="inline-flex cursor-pointer items-center rounded-l border border-gray-600 bg-gray-600 px-4 py-2 text-sm font-semibold tracking-widest text-white transition hover:bg-gray-500 focus:border-gray-900 focus:outline-none focus:ring focus:ring-gray-300 active:bg-gray-900 disabled:opacity-25"
				on:click={() => multiUploadInput?.click()}
			>
				Click to browse
			</div>
			<div
				class="flex w-4/12 items-center justify-between rounded-r-md border border-gray-300 lg:w-3/12"
			>
				<span id="multi-upload-text" class="p-2">
					{files ? `${files.length} files selected` : ''}
				</span>
				<button id="multi-upload-delete" class:hidden={!files} on:click={removeMultiUpload}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-3 w-3 fill-current text-red-700"
						viewBox="0 0 320 512"
					>
						<path
							d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z"
						/>
					</svg>
				</button>
			</div>
		</div>
		<input
			type="file"
			id="multi-upload-input"
			class="hidden"
			multiple
			bind:this={multiUploadInput}
			on:change={handleFiles}
		/>
	</div>
</div>

<style>
	.image-div {
		height: 16rem;
		margin-bottom: 0.75rem;
		width: 100%;
		padding: 0.75rem;
		border-radius: 0.375rem;
		background-size: cover;
		background-position: center;
	}
</style>

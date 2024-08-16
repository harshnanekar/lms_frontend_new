<script lang="ts">
	import { File } from '$lib/components/ui';

	let isVisible = true;

	function closeAlert() {
		isVisible = false;
	}
</script>

<File />

<div class="grid grid-cols-1 gap-8 p-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
	<select
		class="border-slate-250 inline-flex w-full items-center
		justify-between rounded-lg border bg-white px-5 py-3.5 text-left text-xs font-medium
		text-slate-100 shadow-sm hover:bg-slate-50 focus:outline-none"
		name=""
		id=""
		placeholder="enter data"
	>
		<option class="py-2 text-sm" value="value1">Nmims School</option>
		<option class="py-2 text-sm" value="value2">value2</option>
		<option class="py-2 text-sm" value="value3">value3</option>
		<option class="py-2 text-sm" value="value4">value4</option>
		<option class="py-2 text-sm" value="value5">value5</option>
	</select>

	<select
		class="border-slate-250 inline-flex w-full items-center
		justify-between rounded-lg border bg-white px-5 py-3.5 text-left text-xs font-medium
		text-slate-100 shadow-sm hover:bg-slate-50 focus:outline-none"
		name=""
		id=""
	>
		<option class="py-2 text-sm" value="value1">Nmims School</option>
		<option class="py-2 text-sm" value="value2">value2</option>
		<option class="py-2 text-sm" value="value3">value3</option>
		<option class="py-2 text-sm" value="value4">value4</option>
		<option class="py-2 text-sm" value="value5">value5</option>
	</select>

	<select
		class="custom-select border-slate-250 inline-flex w-full items-center
		justify-between rounded-lg border bg-white px-5 py-3.5 text-left text-xs font-medium
		text-slate-100 shadow-sm hover:bg-slate-50 focus:outline-none"
		name=""
		id=""
	>
		<option class="py-2" value="value1">Nmims School</option>
		<option class="py-2" value="value2">value2</option>
		<option class="py-2" value="value3">value3</option>
		<option class="py-2" value="value4">value4</option>
		<option class="py-2" value="value5">value5</option>
	</select>
</div>

<!-- <div
	class="relative rounded border border-yellow-400 bg-yellow-100 px-4 py-3 text-yellow-700"
	role="alert"
>
	<strong class="font-bold">Holy guacamole!</strong>
	<span class="block sm:inline">You should check in on some of those fields below.</span>
	<button
		class="absolute bottom-0 right-0 top-0 px-4 py-3"
		type="button"
		aria-label="Close"
		on:click="this.parentElement.style.display='none';"
	>
		<svg
			class="h-6 w-6 fill-current text-yellow-700"
			role="button"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 20 20"
		>
			<title>Close</title>
			<path
				d="M14.348 14.849a1 1 0 01-1.414 0L10 11.414 7.066 14.349a1 1 0 11-1.414-1.414l2.933-2.935-2.933-2.935a1 1 0 011.414-1.414L10 8.586l2.934-2.935a1 1 0 011.414 1.414l-2.934 2.935 2.934 2.935a1 1 0 010 1.414z"
			/>
		</svg>
	</button>
</div> -->

{#if isVisible}
	<div
		class="relative rounded border border-yellow-400 bg-yellow-100 px-4 py-3 text-yellow-700"
		role="alert"
	>
		<strong class="font-bold">Holy guacamole!</strong>
		<span class="block sm:inline">You should check in on some of those fields below.</span>
		<button
			class="absolute bottom-0 right-0 top-0 px-4 py-3"
			type="button"
			aria-label="Close"
			on:click={closeAlert}
		>
			<svg
				class="h-6 w-6 fill-current text-yellow-700"
				role="button"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 20 20"
			>
				<title>Close</title>
				<path
					d="M14.348 14.849a1 1 0 01-1.414 0L10 11.414 7.066 14.349a1 1 0 11-1.414-1.414l2.933-2.935-2.933-2.935a1 1 0 011.414-1.414L10 8.586l2.934-2.935a1 1 0 011.414 1.414l-2.934 2.935 2.934 2.935a1 1 0 010 1.414z"
				/>
			</svg>
		</button>
	</div>
{/if}

<style>
	select {
		-webkit-appearance: none;
		-moz-appearance: none;
		appearance: none;
		margin: 10px;

		/* Add custom arrow using CSS */
		background-image: url('/images/layout/dropdownarrow.svg');
		background-repeat: no-repeat;
		background-position: right 20px center;
		background-size: 10px 10px;
	}

	option {
		color: black;
		font-weight: 600;
		font-size: 14px;
	}

	/* Rotate the arrow when select is focused or active */
	/*.custom-select:focus::after,
	.custom-select:active::after {
		transform: translateY(-50%) rotate(180deg);
	}*/
</style>

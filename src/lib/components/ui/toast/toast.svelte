<script lang="ts">

	let isVisible = true;

	function closeAlert() {
		isVisible = false;
	}
    export let header = '';
    export let content = '';
</script>

{#if isVisible}
	<div
		class="relative rounded border border-yellow-400 bg-yellow-100 px-4 py-3 text-yellow-700"
		role="alert"
	>
		<strong class="font-bold">{header}</strong>
		<span class="block sm:inline">{content}</span>
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

<script lang="ts">
	import { generateRandomUUID } from '$lib/utils/helper';
	import type { HTMLInputTypeAttribute } from 'svelte/elements';

	export let value: string;
	export let placeholder = '';
	export let isRequired = true;
	export let error: string = '';
	export let disabled = false;
	export let type: HTMLInputTypeAttribute = 'text';
	export let inputClass : string = '';

	const id = generateRandomUUID();
	const typeWorkaround = (node: HTMLInputElement) => {
		node.type = type;
	};
</script>

<div class="lms-input-container">
	<input
		{id}
		class="lms-input {inputClass}"
		class:error={error && error.length > 0}
		placeholder=""
		use:typeWorkaround
		bind:value
		{disabled}
	/>
	<label for={id} class="lms-placeholder"
		>{placeholder}
		{#if isRequired}
			<span>*</span>
		{/if}
	</label>
	{#if error && error.length > 0}
		<div>
			<span class="lms-error-msg">(i) {error}</span>
		</div>
	{/if}
</div>

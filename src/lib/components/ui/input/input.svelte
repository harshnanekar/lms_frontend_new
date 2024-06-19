<script lang="ts">
	import { generateRandomUUID } from '$lib/utils/helper';
	import type { HTMLInputTypeAttribute } from 'svelte/elements';

	export let value: string;
	export let placeholder = '';
	export let isRequired = true;
	export let error = false;
	export let type: HTMLInputTypeAttribute = 'text';

	const id = generateRandomUUID()
  const typeWorkaround = (node: HTMLInputElement) => { node.type = type }
</script>

<div class="lms-input-container">
	<input {id} class="lms-input" placeholder="" use:typeWorkaround bind:value={value} />
	<label for={id} class="lms-placeholder"
		>{placeholder}
		{#if isRequired}
			<span>*</span>
		{/if}
	</label>
	{#if error}
		<div>
			<span class="lms-error-msg">(i) Numeric characters are not allowed</span>
		</div>
	{/if}
</div>

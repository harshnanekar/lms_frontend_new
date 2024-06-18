<script lang="ts">
	import type { HTMLInputTypeAttribute } from 'svelte/elements';

	export let value: string;
	export let placeholder = '';
	export let isRequired = true;
	export let error = false;
	export let type: HTMLInputTypeAttribute = 'text';

  const typeWorkaround = (node: HTMLInputElement) => { node.type = type }
</script>

<div class="lms-input-container">
	<input class="lms-input-error" placeholder="" use:typeWorkaround bind:value={value} />
	<div class="lms-cut-error"></div>
	<label for="firstname" class="lms-placeholder-error"
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

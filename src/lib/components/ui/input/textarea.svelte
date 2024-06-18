<script lang="ts">
	import { generateRandomUUID } from '$lib/utils/helper';

	export let value: string;
	export let placeholder = '';
	export let isRequired = true;
	export let error = false;
  export let rows = 1;

	const id = generateRandomUUID();
</script>

<div class="lms-input-container h-fit">
	<textarea {id} class="lms-input-error" rows={rows} bind:value />
	<div class="lms-cut-error"></div>
	<label for={id} class="lms-placeholder-error"
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

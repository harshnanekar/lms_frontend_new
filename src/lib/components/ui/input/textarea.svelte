<script lang="ts">
	import { generateRandomUUID } from '$lib/utils/helper';

	export let value: string;
	export let placeholder = '';
	export let isRequired = true;
	export let error = '';
	export let rows = 1;

	const id = generateRandomUUID();
</script>

<div class="lms-input-container h-fit">
	<textarea
		{id}
		class="lms-input"
		placeholder={''}
		class:error={error && error.length > 0}
		{rows}
		bind:value
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

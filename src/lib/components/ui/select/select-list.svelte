<!-- <script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { CustomOptions } from './helper.select';

	export let isLoading: boolean;
	export let errorMsg: string;
	export let options: CustomOptions[];

	const dispatch = createEventDispatcher();

	function handleSelectClick(option: CustomOptions) {
		dispatch('select', option);
	}
</script>

<ul class="small-scrollbar min-h-16 max-h-48 divide-y-2 divide-slate-200 overflow-y-auto px-2">
	{#if isLoading}
		<div class="spinner"></div>
	{:else}
		{#if !errorMsg && errorMsg.length === 0}
			{#each options as option}
				<li
					class="block w-[98%] cursor-pointer break-words rounded-lg text-label-md text-gray-700 hover:bg-warning-300"
				>
					<button on:click={() => handleSelectClick(option)} class="w-full px-4 py-2 text-left">
						{option.label}
					</button>
				</li>
			{:else}
				<p class="block py-2 text-sm text-gray-700">No options found</p>
			{/each}
		{:else}
			<p class="block py-2 text-sm text-gray-700">{errorMsg}</p>
		{/if}
		<li class="scroll-anchor py-2 text-center"></li>
	{/if}
</ul>
 
<style>
	.spinner {
		border: 4px solid rgba(0, 0, 0, 0.1);
		border-left-color: #4a90e2;
		border-radius: 50%;
		width: 24px;
		height: 24px;
		animation: spin 1s linear infinite;
		margin: 0 auto;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}
</style> -->


<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import type { CustomOptions } from './helper.select';

    export let isLoading: boolean;
    export let errorMsg: string;
    export let options: CustomOptions[];
    export let selectedOptions: CustomOptions[];
    export let isMultiSelect: boolean;

    const dispatch = createEventDispatcher();

    function handleSelectClick(option: CustomOptions) {
        dispatch('select', option);
    }

    function isSelected(option: CustomOptions) {
        return selectedOptions.some(selectedOption => selectedOption.value === option.value);
    }
</script>

<ul class="small-scrollbar min-h-16 max-h-48 divide-y-2 divide-slate-200 overflow-y-auto px-2">
    {#if isLoading}
        <div class="spinner"></div>
    {:else}
        {#if !errorMsg && errorMsg.length === 0}
            {#each options as option}
                <li
                    class:selected={isSelected(option)}
                    class="block w-[98%] cursor-pointer break-words rounded-lg text-label-md text-gray-700 hover:bg-warning-300"
                >
                    <button on:click={() => handleSelectClick(option)} class="w-full px-4 py-2 text-left">
                        {option.label}
                        {#if isMultiSelect && isSelected(option)}
                            <span class="selected-mark">✔</span>
                        {/if}
                    </button>
                </li>
            {:else}
                <p class="block py-2 text-sm text-gray-700">No options found</p>
            {/each}
        {:else}
            <p class="block py-2 text-sm text-gray-700">{errorMsg}</p>
        {/if}
        <li class="scroll-anchor py-2 text-center"></li>
    {/if}
</ul>

<style>
    .spinner {
        border: 4px solid rgba(0, 0, 0, 0.1);
        border-left-color: #4a90e2;
        border-radius: 50%;
        width: 24px;
        height: 24px;
        animation: spin 1s linear infinite;
        margin: 0 auto;
    }

    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }

    .selected {
        background-color: #d1d5db;
    }

    .selected-mark {
        float: right;
    }
</style>

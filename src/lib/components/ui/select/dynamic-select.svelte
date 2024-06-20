<script lang="ts">
	import { ArrowIcon, SearchIcon } from '$lib/components/icons';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { writable } from 'svelte/store';
	import type { CustomOptions } from './helper.select';
	import { fetchOptions } from './helper.select';
	import type { Filter } from '$lib/types/request.types';

	export let placeholder = 'Select an Option';
	export let isRequired = true;
	export let options: CustomOptions[] = [];
	export let url = '';
	export let dependsOn: Filter[] = [];
	export let selectedOption: CustomOptions | null = null;

	let dropdownRef: HTMLElement;
	let buttonRef: HTMLElement;
	let searchInputRef: HTMLInputElement;

	$: $isOpen && searchInputRef?.focus();

	$: $searchQuery, filterOptions($searchQuery);

	// Recalculate position on mount and resize
	onMount(() => {
		window.addEventListener('resize', () => setPosition());
		document.getElementById('lms-main-wrapper')?.addEventListener('scroll', () => setPosition());

		// Close dropdown on outside click
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef &&
				!dropdownRef.contains(event.target as Node) &&
				buttonRef &&
				!buttonRef.contains(event.target as Node)
			) {
				closeDropdown();
			}
		};

		window.addEventListener('click', handleClickOutside);

		return () => {
			window.removeEventListener('resize', () => setPosition());
			document
				.getElementById('lms-main-wrapper')
				?.removeEventListener('scroll', () => setPosition());
			window.removeEventListener('click', handleClickOutside);
		};
	});

	const isOpen = writable(false);
	const searchQuery = writable('');
	const filteredOptions = writable(options);
	const isLoading = writable(false);
	const errorMsg = writable<string>('');

	let dropdownPositionStyle = ''; // Inline style for dropdown position

	async function toggleDropdown(setPosition: () => void) {
		$isLoading = true;
		isOpen.update((n) => !n);
		setTimeout(setPosition, 10); // Set position after the dropdown is rendered

		if ($isOpen && url) {
			const res = await fetchOptions(url, dependsOn);

			if (res.json) {
				options = res.json.data;
			}
		}
		$isLoading = false;
	}

	$: console.log('options changed>>>>>>>', options);
	$: console.log('errorMsg>>>>>>', $errorMsg);

	function closeDropdown() {
		isOpen.set(false);
	}

	function filterOptions(searchQueryValue: string) {
		filteredOptions.set(
			options.filter((option) =>
				option.toString().toLowerCase().includes(searchQueryValue.toLowerCase())
			)
		);
	}

	function setPosition() {
		if (!dropdownRef || !buttonRef) return;
		const buttonRect = buttonRef.getBoundingClientRect();
		const viewportHeight = window.innerHeight;

		const spaceBelow = viewportHeight - buttonRect.bottom;
		const spaceAbove = buttonRect.top;

		// Calculate total space needed for dropdown (dropdown height + button height)
		const dropdownSpaceNeeded = dropdownRef.clientHeight + buttonRef.clientHeight;

		// Determine the position based on available space
		if (spaceBelow >= dropdownSpaceNeeded) {
			dropdownPositionStyle = `top: ${buttonRect.bottom}px;`; // Place dropdown below the button
		} else if (spaceAbove >= dropdownSpaceNeeded) {
			dropdownPositionStyle = `bottom: ${viewportHeight - buttonRect.top}px;`; // Place dropdown above the button
		} else {
			// Default to placing where there is more space
			dropdownPositionStyle =
				spaceAbove > spaceBelow
					? `bottom: ${viewportHeight - buttonRect.top}px;`
					: `top: ${buttonRect.bottom}px;`;
		}

		dropdownPositionStyle += `left: ${buttonRect.left}px;`;
		dropdownPositionStyle += `width: ${buttonRect.width}px;`;
	}

	function selectOption(option: CustomOptions) {
		selectedOption = option;
		closeDropdown();
	}

	$: disabled = dependsOn.some((filter) => !filter.value);
</script>

<div class="relative inline-block lms-custom-select-wrapper">
	<div>
		<button
			{disabled}
			type="button"
			class="lms-custom-select-trigger inline-flex w-full items-center justify-between rounded-lg border border-slate-250 bg-white px-5 py-3.5 text-xs font-medium text-slate-100 shadow-sm hover:bg-slate-50 focus:outline-none text-left"
			class:text-gray-400={!selectedOption}
			on:click={() => toggleDropdown(() => setPosition())}
			bind:this={buttonRef}
		>
			{selectedOption?.label || placeholder}
			<div class="placeholder" class:active={selectedOption}>
				{placeholder}
				{#if isRequired}
					<span class="required">*</span>
				{/if}
			</div>
			<div class="transition-all" style="rotate: {$isOpen ? '90' : '-90'}deg;">
				<ArrowIcon />
			</div>
		</button>
	</div>

	{#if $isOpen}
		<div
			class="dropdown-content fixed left-0 z-[9999] mt-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5"
			style="{dropdownPositionStyle}; left: {buttonRef.getBoundingClientRect().left}px;"
			bind:this={dropdownRef}
			transition:fade={{
				duration: 200
			}}
		>
			<div class="p-2">
				<div class="relative">
					{#if dropdownPositionStyle.includes('bottom')}
						<ul class="small-scrollbar max-h-48 divide-y-2 divide-slate-200 overflow-y-auto px-2">
							{#each $filteredOptions as option}
								<li
									class="block w-[98%] cursor-pointer break-words rounded-lg text-label-md text-gray-700 hover:bg-warning-300"
								>
									<button on:click={() => selectOption(option)} class="px-4 py-2 text-left w-full">
										{option.label}
									</button>
								</li>
							{:else}
								<p class="block py-2 text-sm text-gray-700">No options found</p>
							{/each}
						</ul>
						<input
							type="text"
							class="mt-2 h-10 w-full rounded-lg border-2 bg-white px-5 pr-10 text-sm focus:outline-none"
							placeholder="Search..."
							bind:value={$searchQuery}
							bind:this={searchInputRef}
						/>
						<button type="submit" class="absolute bottom-0 right-0 mb-2 mr-4">
							<SearchIcon />
						</button>
					{:else}
						<input
							type="text"
							class="mb-2 h-10 w-full rounded-lg border-2 bg-white px-5 pr-10 text-sm focus:outline-none"
							placeholder="Search..."
							bind:value={$searchQuery}
							bind:this={searchInputRef}
						/>
						<button type="submit" class="absolute right-0 top-0 mr-4 mt-2">
							<SearchIcon />
						</button>
						<ul class="small-scrollbar max-h-48 divide-y-2 divide-slate-200 overflow-y-auto px-2">
							{#if !$errorMsg && $errorMsg.length === 0}
								{#each options as option}
									<li
										class="block w-[98%] cursor-pointer break-words rounded-lg text-label-md text-gray-700 hover:bg-warning-300"
									>
										<button
											on:click={() => selectOption(option)}
											class="px-4 py-2 text-left w-full"
										>
											{option.label}
										</button>
									</li>
								{:else}
									<p class="block py-2 text-sm text-gray-700">No options found</p>
								{/each}
							{:else}
								<p class="block py-2 text-sm text-gray-700">{errorMsg}</p>
							{/if}
						</ul>
					{/if}
				</div>
			</div>
		</div>
	{/if}
</div>

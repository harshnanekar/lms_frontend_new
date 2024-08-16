<script lang="ts">
	import { browser } from '$app/environment';

	import { SearchIcon } from '$lib/components/icons';

	import type { InfiniteScrollResult } from '$lib/types/request.types';

	import { debounce } from '$lib/utils/debounce';

	import { fetchApi } from '$lib/utils/fetcher';

	import { onMount } from 'svelte';

	import { writable } from 'svelte/store';

	// import { AnimationPlayer } from '..';

	type FilterOption = {
		name: string;

		options: Array<{ value: string; label: string }>;
	};

	export let url: URL;

	export let filterOptions: FilterOption[] = [];

	export let showSearch = true;

	export let addLimit = true;

	export let data: InfiniteScrollResult<any> = {
		data: [],

		total: 0,

		nextCursor: null
	};

	const page = writable(1);

	const limit = writable(10);

	const filters = writable<{ [key: string]: string }>({});

	const searchQuery = writable('');

	const isLoading = writable(false);

	const error = writable<string | null>(null);

	async function fetchData(isScroll: boolean = false, isSearch: boolean = false) {
		if ($isLoading) return;

		if (data.data.length > 0 && !data.nextCursor && !isSearch) return;

		isLoading.set(true);

		error.set(null);

		try {
			const filterParams = new URLSearchParams($filters).toString();

			url.searchParams.set('page', $page.toString());

			if (addLimit) url.searchParams.set('limit', $limit.toString());

			if (filterParams) url.searchParams.set('filter', filterParams);

			if (data.nextCursor) url.searchParams.set('cursor', data.nextCursor);

			if ($searchQuery) {
				url.searchParams.set('search', $searchQuery);
			} else {
				url.searchParams.delete('search');
			}

			const response = await fetchApi<InfiniteScrollResult<any>>({
				url: url.href,

				method: 'GET'
			});

			if (response.error) {
				error.set(response.error.message || 'An unknown error occurred');

				return;
			}

			const result = response.json;

			data = {
				data: isScroll ? data.data.concat(result?.data || []) : result?.data || [],

				total: result?.total || 0,

				nextCursor: result?.nextCursor || null
			};
		} catch (err) {
			error.set(err instanceof Error ? err.message : 'An unknown error occurred');
		} finally {
			isLoading.set(false);
		}
	}

	$: {
		if (browser && url) {
			fetchData(true);
		}
	}

	function setSearchQuery(query: string) {
		searchQuery.set(query.trim());

		data = {
			data: [],

			total: 0,

			nextCursor: null
		};

		fetchData(false, true);
	}

	const handleInput = debounce(
		(e: Event) => setSearchQuery((e.target as HTMLInputElement).value),

		1000
	);

	const handleChange = (e: Event, filter: FilterOption) => {
		const target = e.target as HTMLSelectElement;

		filters.update((currentFilters) => ({ ...currentFilters, [filter.name]: target.value }));

		data = {
			data: [],

			total: 0,

			nextCursor: null
		};

		fetchData(false, true);
	};

	let sentinel: HTMLDivElement | null = null;

	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					fetchData(true);
				}
			},

			{
				threshold: 1.0
			}
		);

		if (sentinel) {
			observer.observe(sentinel);
		}

		return () => {
			if (sentinel) {
				observer.unobserve(sentinel);
			}
		};
	});
</script>

<div>
	<div class="filters">
		{#if showSearch}
			<div class="relative w-full md:w-2/3 lg:w-1/2">
				<input
					type="text"
					placeholder="Search here..."
					on:input={handleInput}
					class="w-full rounded-full border py-2 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-slate-200"
				/>

				<div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
					<SearchIcon />
				</div>
			</div>
		{/if}

		{#each filterOptions as filter}
			<div class="filter">
				<label for={filter.name}>{filter.name}</label>

				<select id={filter.name} on:change={(e) => handleChange(e, filter)}>
					<option value="">All</option>

					{#each filter.options as option}
						<option value={option.value}>{option.label}</option>
					{/each}
				</select>
			</div>
		{/each}
	</div>

	{#if data.data}
		<div class="lms-infinite-scroll-wrapper">
			{#if !$error && !$isLoading && data.data.length === 0}
				<div class="flex h-[30vh] flex-col items-center justify-center">
					<div>
						<!-- <AnimationPlayer src="/json/no-data-found.json" width={220} height={220} /> -->
					</div>

					<h2 class="text-2xl font-medium">No Data Found</h2>
				</div>
			{/if}

			<slot isLoading={$isLoading} />

			<div bind:this={sentinel}></div>
		</div>
	{/if}

	{#if $error}
		<p>{$error}</p>
	{:else if $isLoading}
		<div class="flex h-[30vh] items-center justify-center">
			<!-- <AnimationPlayer width={70} height={70} /> -->
		</div>
	{/if}
</div>

<style>
	.filters {
		display: flex;

		gap: 1rem;

		margin-bottom: 1rem;
	}

	.filter {
		display: flex;

		flex-direction: column;
	}
</style>

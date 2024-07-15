<script lang="ts">
	import { browser } from '$app/environment';
	import { SortArrowIcon } from '$lib/components/icons';
	import type { TableHeaders } from '$lib/types/layout/table';
	import { debounce } from '$lib/utils/debounce';
	import { writable } from 'svelte/store';
	import ResearchAction from '$lib/components/modules/mpc/research-action.svelte';

	interface FilterOption {
		name: string;
		options: Array<{ value: string; label: string }>;
	}

	export let url: URL;
	export let header: TableHeaders<any>[];
	export let filterOptions: FilterOption[] = [];
	export let tableData: any[] = [];
	export let showSearch = true;
	export let showPagination = true;
	export let addLimit = true;

	const page = writable(1);
	const limit = writable(10);
	const filters = writable<{ [key: string]: string }>({});
	const sort = writable<{ column: string; order: string }>({ column: '', order: 'asc' });
	const searchQuery = writable('');

	const data = writable<{ items: any[]; total: number }>({ items: [], total: 0 });
	const isLoading = writable(false);
	const error = writable<string | null>(null);


	// Fetch data function
	async function fetchData() {
		if ($isLoading === true) return;
		isLoading.set(true);
		error.set(null);
		try {
			const filterParams = new URLSearchParams($filters).toString();

			url.searchParams.set('page', $page.toString());
			addLimit && url.searchParams.set('limit', $limit.toString());
			if (filterParams) {
				url.searchParams.set('filter', filterParams);
			}

			if ($sort.column) {
				url.searchParams.set('sort', $sort.column);
				url.searchParams.set('order', $sort.order);
			}

			if ($searchQuery) {
				url.searchParams.set('search', $searchQuery);
			} else {
				url.searchParams.delete('search');
			}

			const response = await fetch(url);
			if (!response.ok) {
				// check if message key in json else default message
				const result = await response.json();
				error.set(result.message || 'An unknown error occurred');
				return;
			}
			const result = await response.json();
			// data.set({
			// 	items: result.data,
			// 	total: result.totat
			// });
			data.set({
				items: result.data,
				total: result.total
			});
			tableData = result.data;
		} catch (err) {
			error.set(err instanceof Error && err.message ? err.message : 'An unknown error occurred');
		} finally {
			isLoading.set(false);
		}
	}

	// Watchers to fetch data on state change
	$: {
		$filters, $sort, $searchQuery, url, $page, browser && fetchData();
	}

	function setPage(newPage: number) {
		page.set(newPage);
	}

	function setSort(column: string) {
		sort.update((s) => {
			if (s.column === column) {
				return { column, order: s.order === 'asc' ? 'desc' : 'asc' };
			} else {
				return { column, order: 'asc' };
			}
		});
	}

	function setSearchQuery(query: string) {
		searchQuery.set(query.trim());
		setPage(1); // Reset to the first page on search change
	}

	const handleInput = debounce(
		(e: Event) => setSearchQuery((e.target as HTMLInputElement).value),
		500
	);

	const handleChange = (e: Event, filter: FilterOption) => {
		const target = e.target as HTMLSelectElement;
		filters.update((currentFilters) => ({ ...currentFilters, [filter.name]: target.value }));
	};

	function getPageNumbers() {
		const totalPages = Math.ceil($data.total / $limit);
		const currentPage = $page;
		const pageNumbers = [];

		if (totalPages <= 5) {
			for (let i = 1; i <= totalPages; i++) {
				pageNumbers.push(i);
			}
		} else {
			if (currentPage <= 3) {
				pageNumbers.push(1, 2, 3, 4, '...', totalPages);
			} else if (currentPage >= totalPages - 2) {
				pageNumbers.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
			} else {
				pageNumbers.push(
					1,
					'...',
					currentPage - 1,
					currentPage,
					currentPage + 1,
					'...',
					totalPages
				);
			}
		}

		return pageNumbers;
	}
	function handleCustomEvent(event) {
    console.log('Received custom event:', event.detail);
    }
</script>

<div>
	<div class="filters">
		{#if showSearch}
			<input type="text" placeholder="Search..." on:input={handleInput} />
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

	{#if $isLoading}
		<p>Loading...</p>
	{:else if $error}
		<p>{$error}</p>
	{:else}
		<div class="lms-table-wrapper">
			<table class="lms-table">
				<thead>
					<tr>
						{#each header as column}
							<th>
								{column.label}
								{#if column.sortable}
									{@const sortOrder =
										$sort.column === column.key ? ($sort.order === 'asc' ? 'asc' : 'desc') : 'none'}
									<button on:click={() => setSort(column.key.toString())}>
										<SortArrowIcon {sortOrder} />
									</button>
								{/if}
							</th>
						{/each}
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{#each $data.items as item (item.id)}
						<tr>
							{#each header as column}
								<td class={column.classes}>{item[column.key]}</td>
							{/each}
							<td>
								<slot actionData={item} />
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
		{#if showPagination}
			<div
				class="pagination mt-4 flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between"
			>
				<div>
					<span class="text-sm text-gray-500">
						Showing
						<span class="font-medium">{($page - 1) * $limit + 1}</span>
						to
						<span class="font-medium">{Math.min($page * $limit, $data.total)}</span>
						of
						<span class="font-medium">{$data.total}</span>
						results
					</span>
				</div>
				<div class="text-cta-sm lg:text-cta-md">
					<button
						class="hover:bg-primary-light rounded border px-4 py-2 disabled:opacity-50"
						on:click={() => setPage($page - 1)}
						disabled={$page === 1}>Previous</button
					>
					{#each getPageNumbers() as pageNum}
						{#if pageNum === '...' || typeof pageNum === 'string'}
							<span class="px-4 py-2">...</span>
						{:else}
							<button
								class="rounded border px-4 py-2 {pageNum === $page
									? 'bg-primary text-white'
									: 'hover:bg-primary-light'}"
								on:click={() => setPage(pageNum)}
							>
								{pageNum}
							</button>
						{/if}
					{/each}
					<button
						class="hover:bg-primary-light rounded border px-4 py-2 disabled:opacity-50"
						on:click={() => setPage($page + 1)}
						disabled={$page >= Math.ceil($data.total / $limit)}>Next</button
					>
				</div>
			</div>
		{/if}
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
	.pagination {
		display: flex;
		justify-content: space-between;
		margin-top: 1rem;
	}
	th button {
		background: none;
		border: none;
		cursor: pointer;
	}
</style>

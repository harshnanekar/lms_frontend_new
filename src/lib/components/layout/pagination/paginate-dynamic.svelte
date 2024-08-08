<script lang="ts">
	import { browser } from '$app/environment';
	import { SortArrowIcon } from '$lib/components/icons';
	import type { TableHeaders } from '$lib/types/layout/table';
	import { debounce } from '$lib/utils/debounce';
	import { writable } from 'svelte/store';
	import ResearchAction from '$lib/components/modules/mpc/research-action.svelte';
	import { goto } from '$app/navigation';
	import { fetchApi } from '$lib/utils/fetcher';
	import type { PaginationResult } from '$lib/types/request.types';
	import SearchIcon from '$lib/components/icons/base/search-icon.svelte';
	import { FormStatus, Modal } from '$lib/components/ui';
	import type { ModalSizes } from '$lib/components/ui/modal/helper.modal';

const isOpen = writable(false);
let modalwidthPercent: ModalSizes = 'md';

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

			// const response = await fetch(url);
			const {error : responseErr,json} = await fetchApi<PaginationResult<any>>({
				url : url.href,
				method : 'GET'
			});

			if(responseErr){
				console.log('error in paginate ',responseErr)
				error.set(responseErr.message || 'An unknown error occurred');
				return;
			}


			// if (!response.ok) {
				// check if message key in json else default message
				// const result = await response.json();
				// console.log('result paginate ',result)

				// if(result.status === 401){
				// 	goto('/login');
				// }
				
				// error.set(result.message || 'An unknown error occurred');
				// return;
			// }

			// const result = await response.json();
			// data.set({
			// 	items: result.data,
			// 	total: result.totat
			// });
			data.set({
				items: json.data,
				total: json.total
			});

			tableData = json.data;
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

	let remarks : string;
	$: remarkText = remarks

	const openModal = (size: ModalSizes,facultyRemarks : string) => {
			console.log('faculty object ',JSON.stringify(facultyRemarks))
			modalwidthPercent = size;
			remarks = facultyRemarks
			isOpen.set(true);
		};

		const closeModal = () => {
			isOpen.set(false);
		};
</script>

<div>
	<div class="filters">
		{#if showSearch}
		<!-- <div class="relative w-1/2"> -->
			<!-- <input
				class="lms-input h-6.5 mt-4 w-[25%]"
				type="text"
				placeholder="Search..."
				on:input={handleInput}
			/> -->
			<!-- <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
				<SearchIcon />
			</div> -->
		<!-- </div> -->
		<div class="relative w-[25%]">
			<div class="flex items-center">
				<input
					class="lms-input h-10 mt-4 w-full pr-10"
					type="text"
					placeholder="Search..."
					on:input="{handleInput}"
				/>
				<div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 h-10 mt-4">
					<SearchIcon/>
				</div>
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
							<th class="!text-[14px]">
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
						<th class="!text-[14px]">Actions</th>
					</tr>
				</thead>
				<tbody>
					{#each $data.items as item (item.id)}
						<tr>
							{#each header as column}
							    {#if column.key === 'status'}
								<td><FormStatus status={item[column.key]}/></td>
								{:else if column.key === 'remarks'}
								<td><button class="lms-btn lms-secondary-btn" on:click={() => openModal('md',item[column.key])}>Remarks</button></td>
								{:else}
								<td class={column.classes}>{item[column.key]}</td>
								{/if}
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

<Modal bind:isOpen={$isOpen} size={modalwidthPercent} on:close={closeModal}>
	<div slot="header">
		<div class="border-b p-4">
			<h2 class="text-lg font-semibold">Remarks</h2>
		</div>
	</div>
	<svalte:fragment slot="body">
		<div class="flex flex-col min-h-[50vh] p-4">
			<textarea class="lms-input flex-grow resize-none" 
			value = {remarkText} disabled={true}></textarea>
		</div>
	</svalte:fragment>
	<div slot="footer">
		<div class="border-t flex md:flex-row gap-4 p-4">
			<button class="lms-btn lms-primary-btn" on:click={closeModal}>Close</button>
			<!-- <button class="lms-btn lms-primary-btn" on:click={(e) => updateFacultyStatus($facultyObj.form_id, e?.target?.value,'remarks')}>Add</button> -->
		</div>
	</div>
</Modal>

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

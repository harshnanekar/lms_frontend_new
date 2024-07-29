<script lang="ts">
    import { browser } from '$app/environment';
    import { SearchIcon } from '$lib/components/icons';
	import { DynamicSelect } from '$lib/components/ui';
    import type { InfiniteScrollResult } from '$lib/types/request.types';
    import { debounce } from '$lib/utils/debounce';
    import { fetchApi } from '$lib/utils/fetcher';
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';

    type FilterOption = {
        name: string;
        label: string;
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
            
            for(const key in $filters) {
                if(key && $filters[key]) {
                    url.searchParams.set(key, $filters[key]);
                }
            }

            url.searchParams.set('page', $page.toString());
            if (addLimit) url.searchParams.set('limit', $limit.toString());
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

            if (response.error || !response.json) {
                error.set(response.error?.message || 'An unknown error occurred');
                return;
            }

            const result = response.json;

            data = {
                data: isScroll ? data.data.concat(result.data || []) : result.data || [],
                total: result.total || 0,
                nextCursor: result.nextCursor || null
            };
        } catch (err) {
            error.set(err instanceof Error ? err.message : 'An unknown error occurred');
        } finally {
            isLoading.set(false);
        }
    }

    $: {
        if (browser) {
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
            <!-- <div class="relative w-full">
                <input
                    type="text"
                    placeholder="Search here..."
                    on:input={handleInput}
                    class="w-1/2 rounded-full border py-2 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-slate-200"
                />
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    <SearchIcon />
                </div>
            </div> -->

            <div class="relative text-gray-600 flex items-center ml-4">
                <input
                    type="text"
                    placeholder="Search here..."
                    on:input={handleInput}
                    class="bg-white h-10 px-5 pr-10 rounded-full text-sm focus:outline-none border"
                />
                <div class="absolute right-0 top-0 mt-3 mr-4 ">
                    <SearchIcon />
                </div>
            </div>
        {/if}
        {#if filterOptions.length > 0}
        {#each filterOptions as filter}
            <div class="filter space-y-2">
                <label class="lms-label" for={filter.name}>{filter.label}</label>
                <select id={filter.name} on:change={(e) => handleChange(e, filter)} class="dynamicSelect border border-gray-300 rounded-2xl text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none">
                    <option value="All">All</option>
                    {#each filter.options as option}
                        <option value={option.value}>{option.label}</option>
                    {/each}
                </select>

                <DynamicSelect 
                on:change = {(e) => handleChange(e,filter)}
                />

            </div>
        {/each}
        {:else}
         <p>No Data Found</p>
        {/if}
    </div>

    {#if data.data}
        <div class="lms-infinite-scroll-wrapper">
            <slot />
            <div bind:this={sentinel}></div>
        </div>
    {/if}
    {#if $error}
        <p>{$error}</p>
    {:else if $isLoading}
        loading...
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
    .dynamicSelect {
    border: 1px solid #d1d5db;
    border-radius: 1.25rem;
    color: #4b5563;
    height: 2.5rem;
    padding-left: 1.25rem;
    padding-right: 2.5rem;
    background-color: #ffffff;
    cursor: pointer;
}

</style>
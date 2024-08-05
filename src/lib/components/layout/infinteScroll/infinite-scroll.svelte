<script lang="ts">
    import { browser } from '$app/environment';
    import { SearchIcon } from '$lib/components/icons';
	import { DynamicSelect } from '$lib/components/ui';
    import type { InfiniteScrollResult } from '$lib/types/request.types';
    import { debounce } from '$lib/utils/debounce';
    import { fetchApi } from '$lib/utils/fetcher';
	import { getDynamicDropdown } from '$lib/utils/select.helper';
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
        console.log("INSIDE REACTIVE STATEMENT>>>>>>>>>");
        
        if (browser) {
            fetchData(true);
        }
    }

    $: {
        if(url) {
            data.nextCursor = null
            fetchData(false, true)
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

    // const handleChange = (e: Event, filter: FilterOption) => {
    //     const target = e.target as HTMLSelectElement;
    //     console.log('target ',target,filter)
    //     filters.update((currentFilters) => ({ ...currentFilters, [filter.name]: target.value }));
    //     data = {
    //         data: [],
    //         total: 0,
    //         nextCursor: null
    //     };
    //     fetchData(false, true);
    // };


const handleChange = (e: any, filter: FilterOption) => {
        const target = e?.detail?.value ;
        console.log('target ',e?.detail?.value,filter)
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
    <div class="filters space-x-10">
        {#if showSearch}
        
            <div class="relative text-gray-600 flex items-center ml-4 w-[50%]">
                <input
                    type="text"
                    placeholder="Search here..."
                    on:input={handleInput}
                    class="bg-white h-10 px-5 pr-10 rounded-full text-sm focus:outline-none border w-full"
                />
                <div class="absolute right-0 top-0 mt-2 mr-4">
                    <SearchIcon />
                </div>
            </div>
        {/if}
        <!-- {#if filterOptions.length > 0} -->
        {#each filterOptions as filter}
        {@const filterData = filter.options}
            <div class="mt-2 w-full filter gap-2 grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4">
            
                <!-- {JSON.stringify(filter.options)} -->
                <DynamicSelect
                isMultiSelect={false}
                placeholder={filter.label}
                options={getDynamicDropdown(filterData)}
                on:change={(e) => handleChange(e,filter)}
                bind:selectedOptions = {filter.options[0]}
               />

            </div>
        {/each}
        <!-- {:else}
         <p>No Data Found</p>
        {/if} -->
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
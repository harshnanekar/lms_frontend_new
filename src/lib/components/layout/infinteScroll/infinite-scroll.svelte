<script lang="ts">
    import { browser } from '$app/environment';
    import { SearchIcon } from '$lib/components/icons';
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

    const handleChange = (e: Event, filter: FilterOption) => {
        const target = e.target as HTMLSelectElement;
        console.log('target ',target,filter)
        filters.update((currentFilters) => ({ ...currentFilters, [filter.name]: target.value }));
        data = {
            data: [],
            total: 0,
            nextCursor: null
        };
        fetchData(false, true);
    };


// const handleChange = (e: any, filter: FilterOption) => {
//         const target = e?.detail?.value ;
//         console.log('target ',e?.detail?.value,filter)
//         filters.update((currentFilters) => ({ ...currentFilters, [filter.name]: target.value }));
//         data = {
//             data: [],
//             total: 0,
//             nextCursor: null
//         };
//         fetchData(false, true);
//     };


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
    <div class="filters flex flex-col">
    
        <!-- {#if filterOptions.length > 0} -->
        <div class="flex items-center gap-4 p-4">
        {#each filterOptions as filter}
            <div class="mt-2 w-full filter gap-2 grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4">
            
                <!-- {JSON.stringify(filter.options)} -->
                <!-- svelte-ignore a11y-label-has-associated-control -->
                  <label class="lms-label">{filter.label}</label>
                  <select
                        class="border-slate-250 inline-flex w-full items-center
                        justify-between rounded-lg border bg-white px-5 py-3.5 text-left text-xs font-medium
                        text-slate-100 shadow-sm hover:bg-slate-50 focus:outline-none"
                        name=""
                        id=""
                        placeholder="enter data"
                        on:change={(e) => handleChange(e, filter)}
                    >
                    {#each filter.options as fs}
                        <option class="py-2 text-sm" value={fs.value}>{fs.label}</option>
                    {/each} 
                    </select>

            </div>
        {/each}
    </div>

    {#if showSearch}
        
            <div class="relative text-gray-600 flex items-center ml-4 w-[30%] top-4">
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
        Loading...
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

/* select {
  display:flex;
  flex-direction: column;
  position:relative;
  width:250px;
  height:40px;
} */

 /* option {
	font-family: var(--lms--font-family);
    color : gray; */
  /* padding:0 30px 0 10px;
  min-height:40px;
  display:flex;
  align-items:center;

  position:absolute;
  top:0;
  width: 100%;
  pointer-events:none;
  order:2;
  z-index:1;
  transition:background .4s ease-in-out;
  box-sizing:border-box;
  overflow:hidden;
  white-space:nowrap; */
  

</style>
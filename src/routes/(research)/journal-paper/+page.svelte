<script lang="ts">
	import { goto } from '$app/navigation';
	import { Header } from '$lib/components/researchHeader';
	import { PlusIcon } from '$lib/components/icons';
	import { writable } from 'svelte/store';
	import type { JournalView } from '$lib/types/modules/research/research-types';
	import { PaginateDynamic } from '$lib/components/layout/pagination';
	import { paginationHeaders } from '$lib/test';
    import { ResearchAction } from '$lib/components/modules/mpc';
	import { paginateUrl } from '$lib/stores/modules/research/master.store';
	import { PUBLIC_API_BASE_URL, PUBLIC_BASE_URL } from '$env/static/public';

	let dynamicUrl = `${PUBLIC_API_BASE_URL}/journal-paginate`;
	const url = new URL(dynamicUrl);
	paginateUrl.set(url);

	const label = 'Journal Articles Published';

	function navigateToCreate() {
		goto(`${PUBLIC_BASE_URL}journal-paper/create`);
	}

	let actionData: JournalView;
	
</script>

<div class="flex items-center justify-between">
	
	<Header header={label} />
	<button
		on:click={navigateToCreate}
		class="lms-btn lms-primary-btn fixed bottom-16 right-5 z-10 py-4 md:static md:py-2.5"
	>
		<PlusIcon />
		<span class="hidden md:block">Add</span>
	</button>
</div>

<div class="shadow-card mt-[5%] rounded-2xl border-[1px] border-[#E5E9F1] p-2.5 !pt-0 sm:p-6">
	<PaginateDynamic url={$paginateUrl} header={paginationHeaders} let:actionData>
		<ResearchAction {actionData} />
	</PaginateDynamic>
</div>

<script lang="ts">
	import { goto } from '$app/navigation';
	import { Header } from '$lib/components/researchHeader';
	import { PlusIcon } from '$lib/components/icons';
	import { writable } from 'svelte/store';
	import type { ResearchSeminarView } from '$lib/types/modules/research/research-types';
	import { PaginateDynamic } from '$lib/components/layout/pagination';
	import { researchSeminarHeaders } from '$lib/test';
	import { ResearchAction } from '$lib/components/modules/mpc';
	import { paginateUrl } from '$lib/stores/modules/mpc/master.store';

	let dynamicUrl = 'http://localhost:9090/research/research-seminar-paginate';
	const url = new URL(dynamicUrl);
	paginateUrl.set(url);

	const label = 'Research Seminars';

	function navigateToCreate() {
		goto('/research-seminars/create');
	}

	let actionData: ResearchSeminarView;
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
	<PaginateDynamic url={$paginateUrl} header={researchSeminarHeaders} let:actionData>
		<ResearchAction {actionData} />
	</PaginateDynamic>
</div>

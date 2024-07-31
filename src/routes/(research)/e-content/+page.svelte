<script lang="ts">
	import { goto } from '$app/navigation';
	import { Header } from '$lib/components/researchHeader';
	import { PlusIcon } from '$lib/components/icons';
	import { writable } from 'svelte/store';
	import type { EContentView } from '$lib/types/modules/research/research-types';
	import { PaginateDynamic } from '$lib/components/layout/pagination';
	import { econtentHeaders } from '$lib/test';
	import { EContent } from '$lib/components/modules/mpc';
	import { paginateUrl } from '$lib/stores/modules/research/master.store';

	let dynamicUrl = 'http://localhost:9090/research/e-content-paginate';
	const url = new URL(dynamicUrl);
	paginateUrl.set(url);

	const label = 'E-Content Development';

	function navigateToCreate() {
		goto('/e-content/create');
	}

	let actionData: EContentView;
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
	<PaginateDynamic url={$paginateUrl} header={econtentHeaders} let:actionData>
		<EContent {actionData} />
	</PaginateDynamic>
</div>

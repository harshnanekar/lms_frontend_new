<script lang="ts">
	import { goto } from '$app/navigation';
	import ResearchTable from '$lib/components/modules/mpc/main-table/research-table.svelte';
	import { activeSidebarModule } from '$lib/components/layout/sidebar/store';
	import { Input } from '$lib/components/ui';
	import { Header } from '$lib/components/researchHeader';
	import { PlusIcon } from '$lib/components/icons';
	import { Card, DynamicSelect, Modal } from '$lib/components/ui';
	import type { ModalSizes } from '$lib/components/ui/modal/helper.modal';
	import { writable } from 'svelte/store';
	import type { JournalView } from '$lib/types/modules/research/research-types';
	import type { TableHeaders } from '$lib/types/layout/table';
	import { PaginateDynamic } from '$lib/components/layout/pagination';
	import { paginationHeaders } from '$lib/test';
	import ResearchAction from '$lib/components/modules/mpc/research-action.svelte';
	import { paginateUrl } from '$lib/stores/modules/mpc/master.store';

	let dynamicUrl = 'http://localhost:9090/research/journal-paginate';
	const url = new URL(dynamicUrl);
	paginateUrl.set(url);

	const label = 'Journal Articles Published';

	let title: string = '';

	// export let masterFormList: MeetingListItem[] | null;
	export let researchFormList: JournalView[] | null;
	researchFormList = [
		{
			nmims_school: ['KPMSOL'],
			nmims_campus: ['MPSTME', 'Shirpur'],
			publish_year: 2024,
			policy_cadre: ['Policy'],
			total_authors: 1,
			journal_name: 'journal',
			publisher: 'Publisher',
			impact_factor: 24
		}
	];

	function navigateToCreate() {
		goto('/journal-paper/create');
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

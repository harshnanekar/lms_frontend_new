<script lang="ts">
	import { goto } from '$app/navigation';

	import IprTable from '$lib/components/modules/mpc/main-table/ipr-table.svelte';

	import { activeSidebarModule } from '$lib/components/layout/sidebar/store';

	import { Input } from '$lib/components/ui';

	import { Header } from '$lib/components/researchHeader';

	import { PlusIcon } from '$lib/components/icons';

	import { Card, DynamicSelect, Modal } from '$lib/components/ui';

	import type { ModalSizes } from '$lib/components/ui/modal/helper.modal';

	import { writable } from 'svelte/store';

	import type { ResearchProjectRender } from '$lib/types/modules/research/research-types';

	import type { TableHeaders } from '$lib/types/layout/table';

	import { PaginateDynamic } from '$lib/components/layout/pagination';

	import { ResearchProjectHeaders } from '$lib/test';

	import ResearchProjectAction from '$lib/components/modules/mpc/research-project-action.svelte';

	import { paginateUrl } from '$lib/stores/modules/research/master.store';
	import { PUBLIC_API_BASE_URL, PUBLIC_BASE_URL } from '$env/static/public';

	let dynamicUrl = `${PUBLIC_API_BASE_URL}/research-project-paginate`;

	const url = new URL(dynamicUrl);

	paginateUrl.set(url);

	const label = 'Research Project';

	let title: string = '';

	function navigateToCreate() {
		goto(`${PUBLIC_BASE_URL}research-project/create`);
	}

	let actionData: ResearchProjectRender;
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
	<PaginateDynamic url={$paginateUrl} header={ResearchProjectHeaders} let:actionData>
		<ResearchProjectAction {actionData} />
	</PaginateDynamic>
</div>

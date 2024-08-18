<script lang="ts">
	import { Header } from '$lib/components/researchHeader';
	import type { ChronicleApprovalView } from '$lib/types/modules/research/research-types';
	import { PaginateDynamic } from '$lib/components/layout/pagination';
	import { ChronicleApprovalHeaders } from '$lib/test';
    import { ResearchAction } from '$lib/components/modules/mpc';
	import { paginateUrl } from '$lib/stores/modules/research/master.store';
	import { PUBLIC_API_BASE_URL, PUBLIC_BASE_URL } from '$env/static/public';

	let dynamicUrl = `${PUBLIC_API_BASE_URL}/chronicle-approval-paginate`;
	const url = new URL(dynamicUrl);
	paginateUrl.set(url);

	const label = 'Chronicle Details';

	let actionData: ChronicleApprovalView;
	
</script>

<div class="flex items-center justify-between">
	<Header header={label} />
</div>

<div class="shadow-card mt-[5%] rounded-2xl border-[1px] border-[#E5E9F1] p-2.5 !pt-0 sm:p-6">
	<PaginateDynamic url={$paginateUrl} header={ChronicleApprovalHeaders} let:actionData showActions={false}>
		<!-- <ResearchAction {actionData} /> -->
	</PaginateDynamic>
</div>

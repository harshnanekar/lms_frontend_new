
<script lang="ts">
	import  { Card }  from '$lib/components/ui';
    import {EyeIcon,PenIcon,DeleteIcon,PlusIcon} from '$lib/components/icons/base';
	import type { ChronicleActionView, ChronicleView } from '$lib/types/modules/research/research-types';
	import { PUBLIC_API_BASE_URL, PUBLIC_BASE_URL } from '$env/static/public';
    import { PaginateDynamic } from '$lib/components/layout/pagination';
	import { ChronicleHeaders } from '$lib/test';
    import { ChroniclesAction } from '$lib/components/modules/mpc';
	import { paginateUrl } from '$lib/stores/modules/research/master.store';
	import { Header } from '$lib/components/researchHeader';


    let actionData : ChronicleActionView

    let label = 'Research Chronicle'
	let dynamicUrl = `${PUBLIC_API_BASE_URL}/chronicle-list-paginate?id=2`;
	const url = new URL(dynamicUrl);
	paginateUrl.set(url);

</script>

<div class="flex items-center justify-between">
    <Header header={label} />
    <a href="{PUBLIC_BASE_URL}chronicle-research/create">
        <button class="lms-btn lms-primary-btn" ><PlusIcon />Add</button>
    </a>
</div>
<div class="shadow-card mt-[5%] rounded-2xl border-[1px] border-[#E5E9F1] p-2.5 !pt-0 sm:p-6">
	<PaginateDynamic url={$paginateUrl} header={ChronicleHeaders} let:actionData>
		<ChroniclesAction {actionData} />
	</PaginateDynamic>
</div>

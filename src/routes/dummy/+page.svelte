<script lang="ts">
	import { goto } from '$app/navigation';
	import { Header } from '$lib/components/researchHeader';
	import { PlusIcon } from '$lib/components/icons';
	import { PaginateDynamic } from '$lib/components/layout/pagination';
	import { teachingHeaders, meetingHeaders, brandingHeaders } from '$lib/test';
	import {
		ResearchAction,
		MeetingStakHolderAction,
		BrandingAction,
		TeachingAction
	} from '$lib/components/modules/mpc';
	import {
		paginateUrl,
		optionStore,
		meetPaginateUrl,
		brandPaginateUrl
	} from '$lib/stores/modules/mpc/master.store';
	import { Accordion, AccordionItem, DynamicSelect } from '$lib/components/ui';
	import { Card } from '$lib/components/ui';

	import { getInputFields } from '$lib/utils/select.helper';

	export let data: any;


	$: dynamicUrl = new URL(`http://localhost:9090/research/teaching-paginate`);
	$: paginateUrl.set(dynamicUrl);

	$: meetUrl = new URL(`http://localhost:9090/research/meeting-paginate`);
	$: meetPaginateUrl.set(meetUrl);

	$: brandUrl = new URL(`http://localhost:9090/research/branding-paginate`);
	$: brandPaginateUrl.set(brandUrl);

	function navigateToCreate() {
		goto('/teaching-meeting-branding/create');
	}
</script>

<button
	on:click={navigateToCreate}
	class="lms-btn lms-primary-btn fixed bottom-16 right-5 z-10 float-right mb-[50px] py-4 md:static md:py-2.5"
>
	<PlusIcon />
	<span class="hidden md:block">Add</span>
</button>

<div class="space-y-8">
	<!-- svelte-ignore missing-declaration -->
	<Accordion collapse spaceBetween>
		<AccordionItem>
			<svelte:fragment slot="title">
				<div class="flex flex-row gap-4 p-2.5">
					<i class="fa-solid fa-graduation-cap text-[30px]"></i>
					<h1 class="text-lg font-semibold">Teaching Excellance</h1>
				</div>
			</svelte:fragment>
			<svelte:fragment slot="content" let:open>
				<PaginateDynamic url={$paginateUrl} header={teachingHeaders} let:actionData>
					<TeachingAction {actionData} />
				</PaginateDynamic>
			</svelte:fragment>
		</AccordionItem>
	</Accordion>

	<Accordion collapse spaceBetween>
		<AccordionItem>
			<svelte:fragment slot="title">
				<div class="flex flex-row gap-4 p-2.5">
					<i class="fa-solid fa-people-arrows text-[30px]"></i>
					<h1 class="text-lg font-semibold">Meeting Stakeholders</h1>
				</div>
			</svelte:fragment>
			<svelte:fragment slot="content" let:open>
				<PaginateDynamic url={$meetPaginateUrl} header={meetingHeaders} let:actionData>
					<MeetingStakHolderAction {actionData} />
				</PaginateDynamic>
			</svelte:fragment>
		</AccordionItem>
	</Accordion>

	<Accordion collapse spaceBetween>
		<AccordionItem>
			<svelte:fragment slot="title">
				<div class="flex flex-row gap-4 p-2.5">
					<i class="fa-solid fa-bullhorn text-[30px]"></i>
					<h1 class="text-lg font-semibold">Branding & Advertisement</h1>
				</div>
			</svelte:fragment>
			<svelte:fragment slot="content" let:open>
				<PaginateDynamic url={$brandPaginateUrl} header={brandingHeaders} let:actionData>
					<BrandingAction {actionData} />
				</PaginateDynamic>
			</svelte:fragment>
		</AccordionItem>
	</Accordion>
</div>

<!-- <script lang="ts">
	import { goto } from '$app/navigation';
    import { Header } from '$lib/components/researchHeader';
	import { PlusIcon } from '$lib/components/icons';
    import { PaginateDynamic } from '$lib/components/layout/pagination';
	import { teachingHeaders,meetingHeaders,brandingHeaders } from '$lib/test';
	import {ResearchAction,MeetingStakHolderAction,BrandingAction,TeachingAction} from '$lib/components/modules/mpc';
	import { paginateUrl,optionStore } from '$lib/stores/modules/mpc/master.store';
    import { DynamicSelect } from '$lib/components/ui';
    import {
		getInputFields
	} from '$lib/utils/select.helper';

    export let data : any;
    let inputArr = data.inputData.message;

    
    let inputSelected = {
      value : inputArr[0].url,
      label : inputArr[0].name
    };


    $: dynamicLabel = inputSelected.label;
    $: dynamicHeaders = inputSelected.label === 'Teaching Excellance' ? teachingHeaders :
    inputSelected.label === 'Meeting Stakeholders' ? meetingHeaders : brandingHeaders;

    $: dynamicUrl = new URL(`http://localhost:9090/research${inputSelected.value}`);
    $: paginateUrl.set(dynamicUrl);    

	function navigateToCreate() {
		goto('/teaching-meeting-branding/create');
	}


</script>

<div class="flex items-center justify-between">
	<Header header={dynamicLabel} />
	<button
		on:click={navigateToCreate}
		class="lms-btn lms-primary-btn fixed bottom-16 right-5 z-10 py-4 md:static md:py-2.5"
	>
		<PlusIcon />
		<span class="hidden md:block">Add</span>
	</button>
</div>

<div class="mt-[50px]">
    <DynamicSelect
	isRequired={false}
    placeholder = "Select Module Type"
	options={getInputFields(inputArr)}
	bind:selectedOptions={inputSelected}
	isMultiSelect={false}
/> 

</div>

<div class="shadow-card mt-[5%] rounded-2xl border-[1px] border-[#E5E9F1] p-2.5 !pt-0 sm:p-6">

		<PaginateDynamic url={$paginateUrl} header={dynamicHeaders} let:actionData>
         {#if dynamicLabel === 'Teaching Excellance'}
          <TeachingAction {actionData} />
		 {:else if  dynamicLabel === 'Meeting Stakeholders'}
          <MeetingStakHolderAction {actionData} />
		 {:else}
          <BrandingAction {actionData} />
		 {/if}
		</PaginateDynamic>

</div> -->

<script lang="ts">
	import { goto } from '$app/navigation';
	import { PlusIcon } from '$lib/components/icons';
	import { PaginateDynamic } from '$lib/components/layout/pagination';
	import { teachingHeaders, meetingHeaders, brandingHeaders } from '$lib/test';
	import {
		MeetingStakHolderAction,
		BrandingAction,
		TeachingAction
	} from '$lib/components/modules/mpc';
	import {
		paginateUrl,
		optionStore,
		meetPaginateUrl,
		brandPaginateUrl
	} from '$lib/stores/modules/research/master.store';
	import { Accordion, AccordionItem, DynamicSelect } from '$lib/components/ui';
	import { Card } from '$lib/components/ui';

	import { getInputFields } from '$lib/utils/select.helper';
	import MeetingStakeholderIcon from '$lib/components/icons/layout/meeting-stakeholder-icon.svelte';
	import TeachingIcon from '$lib/components/icons/layout/teaching-icon.svelte';
	import BrandingIcon from '$lib/components/icons/layout/branding-icon.svelte';
	import { PUBLIC_API_BASE_URL, PUBLIC_BASE_URL } from '$env/static/public';

	$: dynamicUrl = new URL(`${PUBLIC_API_BASE_URL}/teaching-paginate`);
	$: paginateUrl.set(dynamicUrl);

	$: meetUrl = new URL(`${PUBLIC_API_BASE_URL}/meeting-paginate`);
	$: meetPaginateUrl.set(meetUrl);

	$: brandUrl = new URL(`${PUBLIC_API_BASE_URL}/branding-paginate`);
	$: brandPaginateUrl.set(brandUrl);

	function navigateToCreate() {
		goto(`${PUBLIC_BASE_URL}teaching-meeting-branding/create`);
	}
	let open = true;
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
				<div class="flex gap-4 p-2.5 md:flex-row">
					<!-- <i class="fa-solid fa-graduation-cap xs:text-[30px] sm:text-[30px] md:text-[30px]"></i> -->
					<TeachingIcon />
					<h1 class="xs:text-lg font-semibold sm:text-lg md:text-lg">Teaching Excellance</h1>
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
				<div class="flex gap-4 p-2.5 md:flex-row">
					<!-- <i class="fa-solid fa-people-arrows xs:text-[30px] sm:text-[30px] md:text-[30px]"></i> -->
					 <MeetingStakeholderIcon fill="black" width="36" height="32"/>
					<h1 class="xs:text-lg font-semibold sm:text-lg md:text-lg">Meeting Stakeholders</h1>
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
				<div class="flex gap-4 p-2.5 md:flex-row">
					<!-- <i class="fa-solid fa-bullhorn xs:text-[30px] sm:text-[30px] md:text-[30px]"></i> -->
					<BrandingIcon fill="black" width="36" height="32" />
					<h1 class="xs:text-lg font-semibold sm:text-lg md:text-lg">Branding & Advertisement</h1>
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

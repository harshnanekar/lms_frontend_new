<script lang="ts">
	import { goto } from '$app/navigation';
    import { Header } from '$lib/components/researchHeader';
	import { PlusIcon } from '$lib/components/icons';
    import { PaginateDynamic } from '$lib/components/layout/pagination';
	import { teachingHeaders,meetingHeaders,brandingHeaders } from '$lib/test';
	import ResearchAction from '$lib/components/modules/mpc/research-action.svelte';
	import { paginateUrl } from '$lib/stores/modules/mpc/master.store';
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
			<ResearchAction {actionData}  />
		</PaginateDynamic>

</div>
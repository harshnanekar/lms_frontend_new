<script lang="ts">
import { goto } from '$app/navigation';
import ResearchTable from '$lib/components/modules/mpc/main-table/research-table.svelte';
import { activeSidebarModule } from "$lib/components/layout/sidebar/store";
import { Input } from '$lib/components/ui';
import { Header } from "$lib/components/researchHeader";
import { PlusIcon } from '$lib/components/icons';
import { Card, DynamicSelect, Modal } from '$lib/components/ui';
import type { ModalSizes } from '$lib/components/ui/modal/helper.modal';
import { writable } from 'svelte/store';
import type { JournalView } from '$lib/types/modules/research/research-types';

const label = 'Journal Articles Published';
const isOpen = writable(false);
let modalwidthPercent: ModalSizes = 'md';
let operationFlag : string = '';

$: optFlag = operationFlag;

const openModal = (size: ModalSizes) => {
	modalwidthPercent = size;
	isOpen.set(true);
};

	
const closeModal = () => {
		isOpen.set(false);
};    


let title : string = '';
let campus : string = '';
let scopusIndex : boolean;
function insertForm(){
    console.log('title ',title)
}

	// export let masterFormList: MeetingListItem[] | null;
	export let researchFormList: JournalView[] | null;
    researchFormList = [
   {
	 nmims_school : ["KPMSOL"],
	 nmims_campus : ["MPSTME","Shirpur"],
	 publish_year :  2024,
	 policy_cadre : ["Policy"],
	 total_authors : 1,
	 journal_name : "journal",
	 publisher : "Publisher",
	 impact_factor : 24 
   }
   ]

   function navigateToCreate(){
     goto('/journal-paper/create');
   }
</script>

<div class="flex items-center justify-between">
   <Header header={label} />
    <button on:click={navigateToCreate} class="lms-btn lms-primary-btn fixed bottom-16 right-5 z-10 py-4 md:static md:py-2.5">
        <PlusIcon />
        <span class="hidden md:block">Add</span>
    </button>
</div>

<!-- <Modal bind:isOpen={$isOpen} size={modalwidthPercent} on:close={closeModal} position="top-bottom">
	<div slot="header">
		<div class="border-b p-4">
			<h2 class="text-lg font-semibold">{optFlag}</h2>
		</div>
	</div>
	<svalte:fragment slot="body">
        <div class="min-h-[50vh] p-4">
		<div class="flex flex-row gap-[20px] p-4">
		<Input inputClass="error"  type="text" placeholder="Nmims School" bind:value ={title}/>
        <Input type="text" placeholder="Nmims Campus" bind:value ={campus}/>
        <Input type="number" placeholder="Publishing Year" bind:value ={campus}/>
		</div>
        <div class="flex flex-row gap-[20px] p-4">
		<Input type="text" placeholder="Policy Cadre" bind:value ={title}/>
        <Input type="text" placeholder="Name Of All Authors" bind:value ={campus}/>
        <Input type="number" placeholder="Total No. Of Authors" bind:value ={campus}/>
		</div>
        <div class="flex flex-row gap-[20px] p-4">
		<Input type="text" placeholder="Name Of Nmims Authors" bind:value ={title}/>
        <Input type="text" placeholder="No. Of Nmims Authors" bind:value ={campus}/>
        <Input type="text" placeholder="Journal Name" bind:value ={campus}/>
		</div>
        <div class="flex flex-row gap-[20px] p-4">
		<Input type="text" placeholder="UID" bind:value ={title}/>
        <Input type="text" placeholder="Publisher" bind:value ={campus}/>
        <Input type="text" placeholder="Names Of Other-Authors" bind:value ={campus}/>
		</div>
        <div class="flex flex-row gap-[20px] p-4">
		<Input type="text" placeholder="Vol,Issue,Page No." bind:value ={title}/>
        <Input type="text" placeholder="ISSN No." bind:value ={campus}/>
        <Input type="number" placeholder="Scopus Site Score" bind:value ={campus}/>
		</div>
        <div class="flex flex-row gap-[20px] p-4">
		<Input type="text" placeholder="Impact factor by Clarivate Analytics" bind:value ={title}/>
        <Input type="text" placeholder="WebLink /DOI No." bind:value ={campus}/>
        <Input type="text" placeholder="Title Of Paper" bind:value ={campus}/>
		</div>
        <div class="flex flex-row gap-[20px] p-4">
		<Input type="text" placeholder="GS Indexed" bind:value ={title}/>
        <Input type="text" placeholder="GS Indexed" bind:value ={campus}/>
        <Input type="text" placeholder="International/National Journal" bind:value ={campus}/>
		</div>
        <div class="flex flex-row gap-[20px] p-4">
		<Input type="text" placeholder="Wos Indexed" bind:value ={title}/>
        <Input type="text" placeholder="Abdc Indexed" bind:value ={campus}/>
        <Input type="text" placeholder="UGC Indexed" bind:value ={campus}/>
		</div>

        <div class="flex flex-row gap-[20px] p-4">
		<Input type="number" placeholder="No. Of Foreign Authors" bind:value ={title}/>
        <Input type="text" placeholder="Names Of Foreign Authors" bind:value ={campus}/>
        <Input type="text" placeholder="UGC Indexed" bind:value ={campus}/>
		</div>

        <div class="flex flex-row gap-[20px] p-4">
		<Input type="number" placeholder="No. Of Foreign Authors" bind:value ={title}/>
        <Input type="text" placeholder="Names Of Foreign Authors" bind:value ={campus}/>
        <div>
            <label for="html" class="lms-label">Unselected</label><br>
            <input type="radio" id="html" class="lms-input-radio" name="radio-button-text">
            <input type="radio" id="html" class="lms-input-radio" name="radio-button-text">
        </div>
		</div>

        <div class="flex flex-row gap-[20px] p-4">
	
		</div>
        </div>
	</svalte:fragment>
	<div slot="footer">
		<div class="flex flex-row gap-[10px] border-t p-4">
			<button class="lms-btn lms-secondary-btn" on:click={closeModal}>Close</button>
            <button class="lms-btn lms-primary-btn" on:click = {insertForm} >Submit</button>
		</div>
	</div>
</Modal> -->

<div class="rounded-2xl border-[1px] border-[#E5E9F1] p-2.5 !pt-0 shadow-card sm:p-6 mt-[5%]">
{#if researchFormList}
<ResearchTable />
{:else}
<p>No Data found</p>
{/if}
</div>
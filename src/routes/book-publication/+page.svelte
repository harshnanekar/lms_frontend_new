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
    import type { BookPublicationRender } from '$lib/types/modules/research/research-types';
    import type { TableHeaders } from '$lib/types/layout/table';
    import { PaginateDynamic } from '$lib/components/layout/pagination';
    import {BookPublicationHeaders} from "$lib/test";
    import ResearchAction from '$lib/components/modules/mpc/book-publication-action.svelte';
    
    const url  =  new URL("http://localhost:9090/research/book-publication-paginate");
    
    const label = 'Book Publications';
    
    
    let title : string = '';
    
    
    // export let masterFormList: MeetingListItem[] | null;
    export let researchFormList: BookPublicationRender[] | null;
        researchFormList = [
       { all_authors : ['Ankit Mishra'],
         nmims_school : ["KPMSOL"],
         nmims_campus : ["MPSTME","Shirpur"],
         publish_year :  2024,
         title : "Data Structure",
         isbn_no : "isbn_no-123",
         publisher : "Publisher"    }
       ]
    
       function navigateToCreate(){
         goto('/book-publication/create');
       }
    
       let actionData: BookPublicationRender;
    </script>
    
    <div class="flex items-center justify-between">
       <Header header={label} />
        <button on:click={navigateToCreate} class="lms-btn lms-primary-btn fixed bottom-16 right-5 z-10 py-4 md:static md:py-2.5">
            <PlusIcon />
            <span class="hidden md:block">Add</span>
        </button>
    </div>
    
    
    <div class="rounded-2xl border-[1px] border-[#E5E9F1] p-2.5 !pt-0 shadow-card sm:p-6 mt-[5%]">
    {#if researchFormList}
    <!-- <ResearchTable /> -->
     <PaginateDynamic url={url} header={BookPublicationHeaders} let:actionData  >
        <ResearchAction actionData={actionData}  />
     </PaginateDynamic>
    {:else}
    <p>No Data found</p>
    {/if}
    </div>
<script lang="ts">
import { goto } from '$app/navigation';
import { Header } from "$lib/components/researchHeader";
import { PlusIcon } from '$lib/components/icons';
import type { EditedBookPublicationView } from '$lib/types/modules/research/research-types';
import type { TableHeaders } from '$lib/types/layout/table';
import { PaginateDynamic } from '$lib/components/layout/pagination';
import {EditedBookPublicationHeader} from "$lib/test";
import EditedBookAction from '$lib/components/modules/mpc/edited-book-action.svelte';
import { paginateUrl } from '$lib/stores/modules/research/master.store';
import { PUBLIC_API_BASE_URL, PUBLIC_BASE_URL } from '$env/static/public';

const url  =  new URL(`${PUBLIC_API_BASE_URL}/edited-book-publication-paginate`);
paginateUrl.set(url);
const label = 'Edited Book Publication';



function navigateToCreate(){
     goto(`${PUBLIC_BASE_URL}edited-book-publication/create`);
   }

</script>

<div class="flex items-center justify-between">
    <Header header={label} />
     <button on:click={navigateToCreate} class="lms-btn lms-primary-btn fixed bottom-16 right-5 z-10 py-4 md:static md:py-2.5">
         <PlusIcon />
         <span class="hidden md:block">Add</span>
     </button>
 </div>

 <div class="rounded-2xl border-[1px] border-[#E5E9F1] p-2.5 !pt-0 shadow-card sm:p-6 mt-[5%]">
    <!-- <ResearchTable /> -->
     <PaginateDynamic url={$paginateUrl} header={EditedBookPublicationHeader} let:actionData  >
        <EditedBookAction actionData={actionData}  />
     </PaginateDynamic>
    </div>
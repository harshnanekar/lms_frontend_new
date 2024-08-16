<script lang="ts">
	import { goto } from '$app/navigation';
	import { PUBLIC_BASE_URL } from '$env/static/public';
	import {EyeIcon} from '$lib/components/icons/base';
	import { ChroniclesAction } from "$lib/components/modules/mpc";
	import { any } from 'zod';

export let data : any;
console.log('data from all chronicles ',JSON.stringify(data))

async function viewChronicle(){
 goto(`${PUBLIC_BASE_URL}chronicle-view`)
}
</script>

<div class="lms-table-wrapper rounded-2xl p-4">
    <table class="lms-table border !border-[#e5e9f1]">
        <thead class="!bg-[#e5e9f1]">
            <tr>
                <th class="!text-[15px]">Sr.No</th>
                <th class="!text-[15px]">Chronicle Names</th>
                <th class="!text-[15px]">Start Date</th>
                <th class="!text-[15px]">End Date</th>
                <th class="!text-[15px]">Actions</th>
            </tr>
        </thead>
        <tbody>
            {#each data.chronicleData as chro,index}
            {@const chronicleName = [ 
                ...chro.vc_chronicle.map(item => item.chronicle_name),
                ...chro.research_chronicle.map(item => item.chronicle_name),
                ...chro.meeting_chronicle.map(item => item.chronicle_name),
                ...chro.news_chronicle.map(item => item.chronicle_name)
                ]}
            {@const chronicles = chronicleName.join(", ")}    
            <tr>
            <td>{index + 1}</td>
            <td>{chronicles}</td>
            <td>{chro.start_date}</td>
            <td>{chro.end_date}</td>
            <td><a href="{PUBLIC_BASE_URL}chronicle-view/{chro.start_date}/{chro.end_date}"><EyeIcon fill="black"/></a></td>
            </tr>
            {/each}
        </tbody>
        </table>
</div>

<script lang="ts">
	import  { Card }  from '$lib/components/ui';
    import {EyeIcon,PenIcon,DeleteIcon,PlusIcon} from '$lib/components/icons/base';
	import type { ChronicleView } from '$lib/types/modules/research/research-types';

    export let data : ChronicleView;
    let chronicleList = data.chronicleData.length > 0 ? data.chronicleData : []
    console.log('chronicle data ',JSON.stringify(data.chronicleData))
</script>

<div class="flex justify-end py-4">
    <a href="/vc-chronicle/create">
        <button class="lms-btn lms-primary-btn" ><PlusIcon />Add</button>
    </a>
</div>
<Card title="VC Office Editor">
    <div class="lms-table-wrapper rounded-2xl p-4">
        <table class="lms-table">
            <thead>
                <th class="!text-[15px]">Id</th>
                <th class="!text-[15px]">Name</th>
                <th class="!text-[15px]">Start Date</th>
                <th class="!text-[15px]">End Date</th>
                <th class="!text-[15px]">Actions</th>
            </thead>
            <tbody>
                {#if chronicleList.length > 0}
                    {#each chronicleList as chro}
                        <tr>
                            <td class="!text-[15px]">{chro.chronicle_modules_lid}</td>
                            <td class="!text-[15px]">{chro.name}</td>
                            <td class="!text-[15px]">{chro.start_date}</td>
                            <td class="!text-[15px]">{chro.end_date}</td>
                            <td class="flex items-center">
                            <EyeIcon fill="black"/><PenIcon fill="black"/><DeleteIcon fill="black"/>
                            </td>
                        </tr>
                    {/each}
                {:else}
                    <td>No Data Found!</td>
                {/if}
            </tbody>
        </table>
    </div>
</Card>
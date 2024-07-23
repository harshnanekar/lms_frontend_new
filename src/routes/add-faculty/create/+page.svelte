<script lang="ts">
    import { InfiniteScroll } from '$lib/components/layout';
    import { fetchApi } from '$lib/utils/fetcher';
    import { onMount } from 'svelte';
    import { toast } from 'svelte-sonner';
    import {
		getFacultyType,
	} from '$lib/utils/select.helper';
	import type { InfiniteFacultyView } from '$lib/types/modules/research/research-types';
    import type { InfiniteScrollResult } from '$lib/types/request.types';
	import { PUBLIC_API_BASE_URL } from '$env/static/public';
	import { DynamicSelect, Input } from '$lib/components/ui';
   
    const url: URL = new URL(`${PUBLIC_API_BASE_URL}/faculty-scroll-paginate`);
    export let data;
    console.log('JSON ',JSON.stringify(data))

    let obj = {
        faculty_type : null
    }

    let responseData: InfiniteScrollResult<InfiniteFacultyView> = {
      data: [],
      total: 0,
      nextCursor: null
    };   

    let facultyData = data.facultyData
    console.log('faculty data',facultyData)

    let facultyObj : [{first_name:string,last_name:string,username:string,institute : string,address:string,faculty_type : number | null}];

   responseData.data.forEach(data => {
     facultyObj.push(   
      facultyObj.first_name = data.first_name,
      facultyObj.last_name = data.last_name,
      facultyObj.username = data.username,
      facultyObj.institute = '',
      facultyObj.address = '',
      facultyObj.faculty_type = null
    )
   })


    $: console.log(responseData.data)
    $: console.log('faculty object ',JSON.stringify(facultyObj))

    function updateFacultyType(index: number, type: number) {
          console.log('type ',type);
          facultyObj[index].faculty_type = type;
    }

</script>
<!-- <button class="lms-btn lms-primary-btn">Add</button> -->

   <InfiniteScroll {url} showSearch bind:data={responseData}>
    <div class="lms-table-wrapper rounded-2xl p-4">
        <table class="lms-table !border-[#e5e9f1] border">
            <thead class="!bg-[#e5e9f1]">
                <th class="!text-[15px]">Sr.No</th>
                <th class="!text-[15px]">Firstname</th>
                <th class="!text-[15px]">Lastname</th>
                <th class="!text-[15px]">Username</th>
                <th class="!text-[15px]">Institute</th>
                <th class="!text-[15px]">Address</th>
                <th class="!text-[15px]">Faculty Type</th>
            </thead>
            <tbody>
                {#if responseData.data.length > 0}
                 {#each facultyObj as faculty,index}
                  <tr class="!border-[#e5e9f1] border">
                    <td>{index + 1}</td>
                    <td>
                        <Input 
                        isRequired={false}
                        bind:value={faculty.first_name}
                        disabled={true}
                        />
                    </td>
                    <td> 
                        <Input 
                        isRequired={false}
                        bind:value={faculty.last_name}
                        disabled={true}
                        />
                    </td>
                    <td> 
                        <Input 
                        isRequired={false}
                        bind:value={faculty.username}
                        disabled={true}
                        />
                    </td>
                    <td> 
                        <Input 
                        isRequired={false}
                        bind:value={faculty.username}
                        disabled={false}
                        />
                    </td>
                    <td> 
                        <Input 
                        isRequired={false}
                        bind:value={faculty.username}
                        disabled={false}
                        />
                    </td>
                    <td>
                        <div class="mt-2.5 flex flex-row gap-[20px]">
                            <div class="flex flex-row">
                                <input
                                    type="radio"
                                    class="lms-input-radio w-4"
                                    name="{faculty.faculty_type}"
                                    on:change={() => updateFacultyType(index, 1)}
                                    value={1}
                                />
                                <span class="text-sm text-[#888888]">Internal</span>
                            </div>
                            <div class="flex flex-row">
                                <input
                                    type="radio"
                                    class="lms-input-radio w-4"
                                    name="{faculty.faculty_type}"
                                    on:change={() => updateFacultyType(index, 2)}
                                    value={2}
                                />
                                <span class="text-sm text-[#888888]">External</span>
                            </div>
                        </div>
                    </td>
                  </tr>
                 {/each}
                {:else}
                <tr><td>No Data Found !</td></tr>  
                {/if}
            </tbody>
        </table>
    </div>
   </InfiniteScroll>

   


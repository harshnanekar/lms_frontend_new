<script lang="ts">
    import { InfiniteScroll } from '$lib/components/layout';
    import { toast } from 'svelte-sonner';
    import type { InfiniteAdminView } from '$lib/types/modules/research/research-types';
    import type { InfiniteScrollResult } from '$lib/types/request.types';
	import { PUBLIC_API_BASE_URL } from '$env/static/public';
	import { DynamicSelect } from '$lib/components/ui';
	import { getFormLevel } from '$lib/utils/select.helper';
    
    
    export let data : any;
    console.log('adimn data ',JSON.stringify(data.adminData.level));

    let level = data.adminData && data.adminData.level.length > 0 ? data.adminData.level : [];
    const url: URL = new URL(`${PUBLIC_API_BASE_URL}/admin-paginate`);

    let responseData: InfiniteScrollResult<InfiniteAdminView> = {
        data: [],
        total: 0,
        nextCursor: null
    };

    let school = data.adminData && data.adminData.school.length > 0 ? data.adminData.school  : [];
    let campus = data.adminData && data.adminData.campus.length > 0 ? data.adminData.campus  : [];
    console.log('nmims school ',JSON.stringify(school))

    let filters = [{
	name: 'school',
    label : 'Select School',
	options: school.map((data : any) => {
      return {value : data.id,label : data.organization_name}
    })
    },
    {
	name: 'campus',
    label : 'Select Campus',
	options: campus.map((data : any) => {
      return {value : data.id,label : data.campus_name}
    })
    }];

    let facultyData: any = [];

    $: facultyData = responseData.data.map((item) => ({
        ...item,
    }));

    $: console.log('faculty data ',JSON.stringify(facultyData))

    let obj = {
        level : null,
    }
</script>

<InfiniteScroll {url} showSearch bind:data={responseData} filterOptions={filters}>
    <div class="lms-table-wrapper rounded-2xl p-4">
        <table class="lms-table !border-[#e5e9f1] border">
            <thead class="!bg-[#e5e9f1]">
                <tr>
                    <th class="!text-[15px]">Sr.No</th>
                    <th class="!text-[15px]">Firstname</th>
                    <th class="!text-[15px]">Lastname</th>
                    <th class="!text-[15px]">Username</th>
                    <th class="!text-[15px]">Select Status</th>
                    <!-- <th class="!text-[15px]">Institute</th>
                    <th class="!text-[15px]">Address</th>
                    <th class="!text-[15px]">Designation</th>
                    <th class="!text-[15px]">Faculty Type</th> -->
                </tr>
            </thead>
            <tbody>
             {#each facultyData as faculty,index}
             <tr class="!border-[#e5e9f1] border">
              <td>{index + 1}</td>
              <td>{faculty.first_name}</td>
              <td>{faculty.last_name}</td>
              <td>{faculty.username}</td>
              <td>
              <DynamicSelect
				isRequired={true}
				placeholder="Status"
				options={getFormLevel(level)}
                inputClass='w-full'
				bind:selectedOptions={obj.level}
				isMultiSelect={false}
			/>
             </td>
             </tr>
              {/each}
            </tbody>
        </table>
    </div>
</InfiniteScroll>
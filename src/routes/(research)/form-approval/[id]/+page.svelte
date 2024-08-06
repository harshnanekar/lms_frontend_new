<script lang="ts">
    import { InfiniteScroll } from '$lib/components/layout';
    import { toast } from 'svelte-sonner';
    import type { InfiniteAdminView } from '$lib/types/modules/research/research-types';
    import type { InfiniteScrollResult } from '$lib/types/request.types';
	import { PUBLIC_API_BASE_URL } from '$env/static/public';
	import { DynamicSelect } from '$lib/components/ui';
	import { getFormLevel , getFormModules} from '$lib/utils/select.helper';
	import { writable } from 'svelte/store';
	import { facultyApprovalObj, type facultyObjReq } from '$lib/schemas/modules/research/master-validations';
	import { fetchApi } from '$lib/utils/fetcher';
	import { validateWithZod } from '$lib/utils/validations';
    import { FormStatus } from '$lib/components/ui'
    
    export let data : any;

    let level = data.adminData && data.adminData.level.length > 0 ? [{id:'All',status:'All'},...data.adminData.level] : [];
    let modules = data.adminData && data.adminData.modules.length > 0 ? data.adminData.modules[0].url : '';
    let db_url = data.adminData && data.adminData.modules.length > 0 ? data.adminData.modules[0].db_url : '';
    let formLevel = data.adminData && data.adminData.approvalLevel.length > 0 ? data.adminData.approvalLevel[0].level : null;
    let tableId = data.adminData && data.adminData.modules.length > 0 ? data.adminData.modules[0].id : 0;;

    console.log("MODELLLLLLLLLLLLLLLLLLLLLLL>>>>>>>>>>>>>>>>>>>>>",tableId);
    
    let dynamicUrl = new URL(`${PUBLIC_API_BASE_URL}/journal-form-infinite?tableId=${tableId}`);

    console.log('form level ',formLevel)

    let responseData: InfiniteScrollResult<InfiniteAdminView> = {
        data: [],
        total: 0,
        nextCursor: null
    };

    let school = data.adminData && data.adminData.school.length > 0 ? [{id:'All',organization_name:'All'},...data.adminData.school]  : [];
    let campus = data.adminData && data.adminData.campus.length > 0 ? [{id:'All',campus_name:'All'},...data.adminData.campus] : [];
    console.log('nmims school ',JSON.stringify(data.adminData.modules))

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
    },
    {
	name: 'status',
    label : 'Select Status',
	options: level.map((data : any) => {
      return {value : data.id,label : data.status}
    })
    }
];

    let facultyData: any = [];

    $: facultyData = responseData.data.map((item : any) => ({
        ...item,
        form_status : null
    }));

    
	function updateFacultyStatus(form_lid: any,value : any,field : string): void {
        console.log('form status value ',value)
        facultyData = facultyData.map((item: { research_form_id: number; }) =>
            item.research_form_id === form_lid ? { ...item, [field]: value} : item
        );
        // console.log('faculty object ',JSON.stringify(facultyData))
    }


    async function handleSubmit(){

     const facultyObj : facultyObjReq = facultyData.filter((data:any) => data.form_status != null).map((dt:any) => 
     {
       return {form_lid : Number(dt.research_form_id),form_status : Number(dt.form_status)}
     });
     console.log('zod faculty ',facultyObj)

     const result = validateWithZod(facultyApprovalObj,facultyObj);
        if (result.errors) {
			console.log(result.errors);
			const [firstPath, firstMessage] = Object.entries(result.errors)[0];
			toast.error('ALERT!', {
				description: firstMessage
			});
			return;
		}
		console.log('validated data', JSON.stringify(result.data));

        const { error, json } = await fetchApi({
			url: `${PUBLIC_API_BASE_URL}/approve-reject?tableId=${tableId}`,
			method: 'POST',
			body: {
               approval_data : result.data 
            }
		});

		if (error) {
			toast.error(error.message || 'Something went wrong!', {
				description: error.errorId ? `ERROR-ID: ${error.errorId}` : ''
			});
			return;
		}
        toast.success('Status Updated Successfully !');
        dynamicUrl =  dynamicUrl;
    }

  $: console.log('response data url ',responseData.data)
</script>

<button class="lms-btn lms-primary-btn ml-auto" on:click={handleSubmit}>Submit</button>
<InfiniteScroll bind:url={dynamicUrl} showSearch bind:data={responseData} filterOptions={filters}>
    <div class="lms-table-wrapper rounded-2xl p-4">
        <table class="lms-table !border-[#e5e9f1] border">
            <thead class="!bg-[#e5e9f1]">
                <tr>
                    <th class="!text-[15px]">Sr.No</th>
                    <th class="!text-[15px]">Firstname</th>
                    <th class="!text-[15px]">Lastname</th>
                    <th class="!text-[15px]">Username</th>
                    <!-- <th class="!text-[15px]">Form Name</th> -->
                    <th class="!text-[15px]">Select Status</th>
                </tr>
            </thead>
            <tbody>
             {#each facultyData as faculty,index}
             <tr class="!border-[#e5e9f1] border">
              <td>{index + 1}</td>
              <td>{faculty.first_name}</td>
              <td>{faculty.last_name}</td>
              <td>{faculty.username}</td>
              <!-- <td>{faculty.form_name}</td> -->
              <td>
               
              {#if faculty.status === 'pd'}  
                <div class="mt-2.5 flex flex-row gap-[20px]">
                    <div class="flex flex-row">
                        <input
                            type="radio"
                            class="lms-input-radio w-4"
                            name="{faculty.research_form_id}"
                            on:change={() => updateFacultyStatus(faculty.research_form_id, 2,'form_status')}
                            value={2}
                        />
                        <span class="text-sm text-[#888888]">Approve</span>
                    </div>
                    <div class="flex flex-row">
                        <input
                            type="radio"
                            class="lms-input-radio w-4"
                            name="{faculty.research_form_id}"
                            on:change={() => updateFacultyStatus(faculty.research_form_id, 3,'form_status')}
                            value={3}
                        />
                        <span class="text-sm text-[#888888]">Reject</span>
                    </div>
                </div> 
               {:else}
               <FormStatus status={faculty.status} />
               {/if}
              </td>
              </tr>
              {/each}
            </tbody>
        </table>
    </div>
</InfiniteScroll>
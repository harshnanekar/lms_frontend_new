<script lang="ts">
	import { goto } from '$app/navigation';
	import { PUBLIC_API_BASE_URL, PUBLIC_BASE_URL } from '$env/static/public';
	import { Input } from '$lib/components/ui';
	import { Card } from '$lib/components/ui';
	import { type facultyUpdReq, facultyUpd } from '$lib/schemas/modules/research/master-validations';
	import { fetchApi } from '$lib/utils/fetcher';
	import { validateWithZod } from '$lib/utils/validations';
	import { toast } from 'svelte-sonner';

    export let data : any;
    
    let title = 'Faculty Details'
    let checkData = data.facultyData.length > 0 ? true : false;

    let obj = {
      faculty_id : checkData && data.facultyData[0].id ?  data.facultyData[0].id : null,
      faculty_name : checkData && data.facultyData[0].faculty_name ?  data.facultyData[0].faculty_name : '',
      institute : checkData && data.facultyData[0].institute_name ?  data.facultyData[0].institute_name : '',
      address : checkData && data.facultyData[0].address ?  data.facultyData[0].address : '',
      designation : checkData && data.facultyData[0].designation ?  data.facultyData[0].designation : '',
      faculty_type : checkData && data.facultyData[0].faculty_type ?  Number(data.facultyData[0].faculty_type) : 0,
    }

    async function handleSubmit() {
    
        let faculty : facultyUpdReq = {
        faculty_id : Number(obj.faculty_id),
        faculty_name : obj.faculty_name,
        institute : obj.institute,
        address : obj.address,
        designation : obj.designation,
        faculty_type : obj.faculty_type,
        }

        const result = validateWithZod(facultyUpd,faculty);
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
			url: `${PUBLIC_API_BASE_URL}/faculty-update`,
			method: 'POST',
			body: {
               faculty_data : result.data 
            }
		});

		if (error) {
			toast.error(error.message || 'Something went wrong!', {
				description: error.errorId ? `ERROR-ID: ${error.errorId}` : ''
			});
			return;
		}
        toast.success('Updated Successfully !');
        goto(`${PUBLIC_BASE_URL}add-faculty`);


    }

   

</script>    

{#if checkData}
<Card {title} >
    <div class="modal-content p-4">
		<div class="grid grid-cols-1 gap-8 p-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
            <Input type="text" placeholder="Name Of Faculty" bind:value={obj.faculty_name} />
			<Input type="text" placeholder="Institute" bind:value={obj.institute} />
            <Input type="text" placeholder="Designation" bind:value={obj.designation} />
        </div>
        <div class="grid grid-cols-1 items-center gap-8 p-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
			<Input type="text" placeholder="Address" bind:value={obj.address} />

            <div class="ml-2">
				<label class="text-sm text-[#888888]">Faculty Type<span>*</span></label>
            <div class="mt-2.5 flex flex-row gap-[40px]">
                <div class="flex flex-row">
                    <input
                        type="radio"
                        class="lms-input-radio w-4"
                        name="faculty-type"
                        bind:group={obj.faculty_type}
                        value={1}
                        checked={obj.faculty_type === 1}
                    />
                    <span class="text-sm text-[#888888]">Internal</span>
                </div>
                <div class="flex flex-row">
                    <input
                        type="radio"
                        class="lms-input-radio w-4"
                        name="faculty-type"
                        bind:group={obj.faculty_type}
                        value={2}
                        checked={obj.faculty_type === 2}
                    />
                    <span class="text-sm text-[#888888]">External</span>
                 </div>
              </div> 
        </div>
        </div>
    </div>
    <div class="flex flex-col gap-4 p-4 md:flex-row">
		<button class="lms-btn lms-primary-btn" on:click={handleSubmit}>Update</button>
	</div>
</Card>
{:else}
<p>No Data Found !</p>
{/if}
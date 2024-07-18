<script lang="ts">

    import { Input, DatePicker, DynamicSelect } from '$lib/components/ui';

    import { SelectDateIcon, XIcon } from '$lib/components/icons';

    import { formatDateTimeShort, formatDate } from '$lib/utils/date-formatter';

    import { tooltip } from '$lib/utils/tooltip';

    import { fly } from 'svelte/transition';

    import { Card } from '$lib/components/ui';
    import { toast } from 'svelte-sonner';
    import { PUBLIC_API_BASE_URL } from '$env/static/public';
  


    export let data: any;

    // let isRequired = false;
    let disabled: boolean = true;
    let title = 'Research Project';
	let checkData = data.researchProjectDataList.length > 0 ? true : false;

    console.log('data in view comming from backend ===>>>>', JSON.stringify(data));
    console.log('render researchProjectDataList', data.researchProjectDataList);
   

    





    let obj: any = {
        research_project_id: parseInt(
			data.researchProjectDataList[0].research_project_id
		),
        nmims_school:  data.researchProjectDataList[0].nmims_school ? data.researchProjectDataList[0].nmims_school : '',
        nmims_campus:  data.researchProjectDataList[0].nmims_campus ? data.researchProjectDataList[0].nmims_campus : '',
        research_status:  data.researchProjectDataList[0].research_status ? data.researchProjectDataList[0].research_status : '',
        title: data.researchProjectDataList[0].title? data.researchProjectDataList[0].title : '',
        thrust_area:  data.researchProjectDataList[0].appln_no? data.researchProjectDataList[0].thrust_area : '',
        grant_proposal:  data.researchProjectDataList[0].grant_proposal? Number(data.researchProjectDataList[0].grant_proposal) : '',
        grant_type:  data.researchProjectDataList[0].grant_type? Number(data.researchProjectDataList[0].grant_type) : '',
        funding_amount:  data.researchProjectDataList[0].funding_amount? data.researchProjectDataList[0].funding_amount : '',
        funding_agency:  data.researchProjectDataList[0].funding_agency? data.researchProjectDataList[0].funding_agency : '',
        scheme:  data.researchProjectDataList[0].scheme? data.researchProjectDataList[0].scheme : '',
        received_amount:  data.researchProjectDataList[0].received_amount? data.researchProjectDataList[0].received_amount : '',
        duration:  data.researchProjectDataList[0].duration? data.researchProjectDataList[0].duration : '',
        external_faculty_details:  data.researchProjectDataList[0].external_faculty_details? data.researchProjectDataList[0].external_faculty_details : '',
        internal_faculty_details:  data.researchProjectDataList[0].internal_faculty_details? data.researchProjectDataList[0].internal_faculty_details : '',
        filename : data.researchProjectDataList[0].supporting_documents ? data.researchProjectDataList[0].supporting_documents : '',
        grant_date:  data.researchProjectDataList[0].grant_date? new Date(data.researchProjectDataList[0].grant_date): null,
        payment_date:  data.researchProjectDataList[0].payment_date? new Date(data.researchProjectDataList[0].payment_date): null,

};




let grantDate: Date | null = new Date();
grantDate = obj.grant_date;
$: grantformattedDate = grantDate; 

let paymentDate: Date | null = new Date();
paymentDate = obj.payment_date;
$:paymentFormattedDate = paymentDate;

	







async function downLoadFiles() {
		fetch(`${PUBLIC_API_BASE_URL}/research-project-download-files?id=${obj.research_project_id}`)
			.then((response) => {
				if (response.ok) {
					return response.blob();
				}
				throw new Error('Network response was not ok.');
			})
			.then((blob) => {
				const url = window.URL.createObjectURL(blob);
				const a = document.createElement('a');
				a.style.display = 'none';
				a.href = url;
				a.download = 'research_project_document.zip';
				document.body.appendChild(a);
				a.click();
				window.URL.revokeObjectURL(url);
			})
			.catch((error) => {
				toast.error(error.message || 'Something went wrong!', {
					description: error.errorId ? `ERROR-ID: ${error.errorId}` : ''
				});
			});
	}


</script>

{#if checkData}
<Card {title}>
    <div class="min-h-[50vh] overflow-auto scroll modal-content max-h-[70vh]"> <!-- Adjust max-height as needed -->
      <div class="grid grid-cols-3 gap-[40px] p-4">
        <Input type="text" placeholder="Nmims School" value={obj.nmims_school} {disabled} />
        <Input type="text" placeholder="Nmims Campus" value={obj.nmims_campus} {disabled} />
        <Input type="text" placeholder="Patent Status" value ={obj.research_status} {disabled}/>


      </div>
      <div class="grid grid-cols-3 gap-[40px] p-4">
        <Input type="text" placeholder="Title of Project" value={obj.title} {disabled}/>
        <Input type="text" placeholder="Thrust area of Research" value={obj.thrust_area} {disabled}/>
        <div class="ml-2">
            <!-- svelte-ignore a11y-label-has-associated-control -->
            <label class="text-sm text-[#888888]">
                Grant Proposal<span class="text-danger text-sm">*</span>
            </label>
            <div class="mt-2.5 flex flex-row gap-[20px]">
                <div class="flex flex-row">
                    <input
                        type="radio"
                        class="lms-input-radio w-4"
                        name="grant-proposal"
                        checked={obj.grant_proposal === 1}
                        value={1}
                        {disabled}/>
                    <span class="text-sm text-[#888888]">
                        Goverment</span>
                </div>
                <div class="flex flex-row">
                    <input
                        type="radio"
                        class="lms-input-radio w-4"
                        name="grant-proposal"
                        checked={obj.grant_proposal === 2}
                        value={2} {disabled}
                    />
                    <span class="text-sm text-[#888888]">
                        Industry</span>
                </div>
            </div>
        </div> 
      </div>
      <div class="grid grid-cols-3 gap-[40px] p-4">
    
        <div class="ml-2">
            <!-- svelte-ignore a11y-label-has-associated-control -->
            <label class="text-sm text-[#888888]"
                >Type of Grant<span class="text-danger text-sm">*</span>
            </label>
            <div class="mt-2.5 flex flex-row gap-[20px]">
                <div class="flex flex-row">
                    <input
                        type="radio"
                        class="lms-input-radio w-4"
                        name="grant-type"
                        value={1} {disabled}
                        checked={obj.grant_type === 1}
                    />
                    <span class="text-sm text-[#888888]">Research Project</span>
                </div>
                <div class="flex flex-row">
                    <input
                        type="radio"
                        class="lms-input-radio w-4"
                        name="grant-type"
                        {disabled}
                        value={2}
                        checked={obj.grant_type === 2}
                    />
                    <span class="text-sm text-[#888888]"> Consultancy
                    </span>
                </div> 
                <div class="flex flex-row">
                    <input
                        type="radio"
                        class="lms-input-radio w-4"
                        name="grant-type"
                        value={3} {disabled}
                        checked={obj.grant_type === 3}
                    />
                    <span class="text-sm text-[#888888]">Capacity Building </span>
                </div>
            </div>
        </div>            
        <Input type="number" placeholder="Funding Amount" value={obj.funding_amount} {disabled}/>
        <Input type="text" placeholder="Name of Funding Agency " value={obj.funding_agency} {disabled}/>
      </div>
      <div class="grid grid-cols-3 gap-[40px] p-4">
        <Input type="text" placeholder="Duration Of Project In Months" value={obj.duration} {disabled}/>
        <Input type="text" placeholder="Scheme" value={obj.scheme} {disabled}/>
        <Input type="number" placeholder="Amount Received" value={obj.received_amount} {disabled}/>

      </div>
      <div class="grid grid-cols-3 gap-[40px] p-4">
        
        <Input type="text" placeholder="Names Of  Internal  Inventors" value={obj.internal_faculty_details} {disabled} />
        <Input type="text" placeholder="Names Of External Inventors" value={obj.external_faculty_details} {disabled} />
        <div class="lms-input-container flex flex-row gap-2">
            <input
                id="documents"
                class="lms-input"
                placeholder=""
                value={obj.filename}
                {disabled}
            />
            <label for="documents" class="lms-placeholder"
                >Supporting Documents
                <span>*</span>
            </label>
            <button class="lms-btn lms-primary-btn" on:click={downLoadFiles}
                ><i class="fa-solid fa-download text-lg"></i></button
            >
        </div>

      </div>

      <div class="grid grid-cols-4 gap-[40px] p-4">
     

        <div class="text-primary hover:bg-base flex items-center gap-x-3 rounded-lg px-3 py-2">
            <SelectDateIcon />
            <span class="text-body-2 font-bold">Patent Grant Date</span>
        </div>
        {#if grantformattedDate}
            {@const formattedDate = formatDateTimeShort(new Date(grantformattedDate))}
            <div
                class="bg-base text-label-md md:text-body-2 mr-3 flex items-center gap-x-4 rounded-3xl px-4 py-1 font-medium text-black md:py-3"
                in:fly={{ x: -100, duration: 300 }}
                out:fly={{ x: 100, duration: 300 }}
            >
                <p class="m-0 p-0">{formattedDate}</p>
                <button
                    use:tooltip={{
                        content: `<b class="text-primary">REMOVE</b> ${formattedDate}`
                    }}
                >
                </button>
            </div>
        {/if} 

        <div class="text-primary hover:bg-base flex items-center gap-x-3 rounded-lg px-3 py-2">
            <SelectDateIcon />
            <span class="text-body-2 font-bold">Patent /Invention Published Date</span>
        </div>
        {#if paymentFormattedDate}
            {@const formattedDate = formatDateTimeShort(new Date(paymentFormattedDate))}
            <div
                class="bg-base text-label-md md:text-body-2 mr-3 flex items-center gap-x-4 rounded-3xl px-4 py-1 font-medium text-black md:py-3"
                in:fly={{ x: -100, duration: 300 }}
                out:fly={{ x: 100, duration: 300 }}
            >
                <p class="m-0 p-0">{formattedDate}</p>
                <button
                    use:tooltip={{
                        content: `<b class="text-primary">REMOVE</b> ${formattedDate}`
                    }}
                >
                </button>
            </div>
        {/if}
      </div>
  
</Card>
{:else}
	<p>No Data Found</p>
{/if}






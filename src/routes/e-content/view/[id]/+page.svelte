<script lang="ts">
	import { Input, DatePicker } from '$lib/components/ui';
	import { SelectDateIcon, XIcon } from '$lib/components/icons';
	import { formatDateTimeShort, formatDate } from '$lib/utils/date-formatter';
	import { tooltip } from '$lib/utils/tooltip';
	import { fly } from 'svelte/transition';
	import { Card } from '$lib/components/ui';

    export let data : any;
    
    let disabled : boolean =  true;
    let title = 'E-Content Development'
    let checkData = data.eContentData.length > 0 ? true : false;



    let publicationDate: Date | null = new Date();
	publicationDate = data.eContentData[0].launching_date != null ? new Date( data.eContentData[0].launching_date) : null;
	$: publicationFormattedDate = publicationDate;
	function handleDateChange(e: CustomEvent<any>) {
		if (!publicationDate) return;
		publicationFormattedDate = publicationDate;
	}


    let obj = {
      faculty_name : checkData && data.eContentData[0].faculty_name ?  data.eContentData[0].faculty_name : '',
      module : checkData && data.eContentData[0].module ?  data.eContentData[0].module : '',
      module_platform : checkData && data.eContentData[0].module_platform ?  data.eContentData[0].module_platform : '',
      document_link : checkData && data.eContentData[0].document_link ?  data.eContentData[0].document_link : '',
      media_link : checkData && data.eContentData[0].media_link ?  data.eContentData[0].media_link : '',
      facility_list : checkData && data.eContentData[0].facility_list ?  data.eContentData[0].facility_list : '',
    }

   

</script>    

{#if checkData}
<Card {title} >
    <div class="modal-content p-4">
		<div class="grid grid-cols-1 gap-8 p-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
            <Input type="text" placeholder="Name Of Faculty" value={obj.faculty_name} {disabled}/>
			<Input type="text" placeholder="Name of the module developed" value={obj.module} {disabled}/>
			<Input type="text" placeholder="Platform on which module is developed" value={obj.module_platform} {disabled}/>
        </div>
        <div class="grid grid-cols-1 gap-8 p-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
			<Input type="text" placeholder="Link to relevant document and facility available in institution" value={obj.document_link} {disabled}/>
			<Input type="text" placeholder="List of the e-content development facility available" value={obj.facility_list} {disabled}/>
			<Input type="text" placeholder="Provide link to videos of media centre and recording facility" value={obj.media_link} {disabled}/>
        </div>
        <div class="flex md:flex-row gap-4 mt-4">
            <div class="text-primary hover:bg-base flex items-center gap-x-3 rounded-lg px-3 py-2">
                <SelectDateIcon />
                <span class="text-body-2 font-bold">Launching Date</span>
            </div>
            {#if publicationFormattedDate}
                {@const formattedDate = formatDateTimeShort(new Date(publicationFormattedDate))}
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
    </div>
</Card>
{:else}
<p>No Data Found !</p>
{/if}
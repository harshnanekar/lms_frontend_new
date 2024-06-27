<script lang="ts">
import { Input,DatePicker  } from '$lib/components/ui';
import { SelectDateIcon, XIcon } from '$lib/components/icons';
import { formatDateTimeShort } from '$lib/utils/date-formatter';
import { tooltip } from '$lib/utils/tooltip';
import { fly } from 'svelte/transition';

let title : string = '';
let campus : string = '';

let publicationDate: Date | null = new Date();
$: publicationFormattedDate = publicationDate;
	function handleDateChange(e: CustomEvent<any>) {
		if (!publicationDate) return;
        publicationFormattedDate = publicationDate;
		console.log('publication date ',publicationDate);
	}
</script>

<div class="rounded-2xl border-[1px] border-[#E5E9F1] p-2.5 !pt-0 shadow-card sm:p-6">
  <div class="min-h-[50vh] overflow-auto no-scrollbar modal-content max-h-[70vh]"> <!-- Adjust max-height as needed -->
    <div class="grid grid-cols-3 gap-[40px] p-4">
      <Input type="text" placeholder="Nmims School" bind:value ={title}/>
      <Input type="text" placeholder="Nmims Campus" bind:value ={campus}/>
      <Input type="number" placeholder="Publishing Year" bind:value ={campus}/>
    </div>
    <div class="grid grid-cols-3 gap-[40px] p-4">
      <Input type="text" placeholder="Policy Cadre" bind:value ={title}/>
      <Input type="text" placeholder="Name Of All Authors" bind:value ={campus}/>
      <Input type="number" placeholder="Total No. Of Authors" bind:value ={campus}/>
    </div>
    <div class="grid grid-cols-3 gap-[40px] p-4">
      <Input type="text" placeholder="Name Of Nmims Authors" bind:value ={title}/>
      <Input type="text" placeholder="No. Of Nmims Authors" bind:value ={campus}/>
      <Input type="text" placeholder="Journal Name" bind:value ={campus}/>
    </div>
    <div class="grid grid-cols-3 gap-[40px] p-4">
      <Input type="text" placeholder="UID" bind:value ={title}/>
      <Input type="text" placeholder="Publisher" bind:value ={campus}/>
      <Input type="text" placeholder="Names Of Other-Authors" bind:value ={campus}/>
    </div>
    <div class="grid grid-cols-3 gap-[40px] p-4">
      <Input type="text" placeholder="Vol,Issue,Page No." bind:value ={title}/>
      <Input type="text" placeholder="ISSN No." bind:value ={campus}/>
      <Input type="number" placeholder="Scopus Site Score" bind:value ={campus}/>
    </div>
    <div class="grid grid-cols-3 gap-[40px] p-4">
      <Input type="number" placeholder="Impact factor by Clarivate Analytics" bind:value ={title}/>
      <Input type="text" placeholder="WebLink /DOI No." bind:value ={campus}/>
      <Input type="text" placeholder="Title Of Paper" bind:value ={campus}/>
    </div>
    <div class="grid grid-cols-3 gap-[40px] p-4">
      <Input type="text" placeholder="GS Indexed" bind:value ={title}/>
      <div class="ml-2">
        <label class="text-[#888888] text-sm">International/National Journal<span class="text-danger text-sm">*</span></label>
        <div class="flex flex-row gap-[20px] mt-2">
          <div class="flex flex-row">
            <input type="radio" id="html" class="lms-input-radio w-4" name="radio-button-text" checked>
            <span class="text-[#888888] text-sm">International</span>
          </div>
          <div class="flex flex-row">
            <input type="radio" id="html" class="lms-input-radio w-4" name="radio-button-text">
            <span class="text-[#888888] text-sm">National</span>
          </div>
        </div>
      </div>
      <div class="ml-2">
        <label class="text-[#888888] text-sm">Wos Indexed<span class="text-danger text-sm">*</span></label>
        <div class="flex flex-row gap-[20px] mt-2">
          <div class="flex flex-row">
            <input type="radio" id="html" class="lms-input-radio w-4" name="radio-button-text" checked>
            <span class="text-[#888888] text-sm">Yes</span>
          </div>
          <div class="flex flex-row">
            <input type="radio" id="html" class="lms-input-radio w-4" name="radio-button-text">
            <span class="text-[#888888] text-sm">No</span>
          </div>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-3 gap-[40px] p-4">
      <Input type="text" placeholder="Abdc Indexed" bind:value ={campus}/>
      <div class="ml-2">
        <label class="text-[#888888] text-sm">UGC Indexed<span class="text-danger text-sm">*</span></label>
        <div class="flex flex-row gap-[20px] mt-2">
          <div class="flex flex-row">
            <input type="radio" id="html" class="lms-input-radio w-4" name="radio-button-text" checked>
            <span class="text-[#888888] text-sm">Yes</span>
          </div>
          <div class="flex flex-row">
            <input type="radio" id="html" class="lms-input-radio w-4" name="radio-button-text">
            <span class="text-[#888888] text-sm">No</span>
          </div>
        </div>
      </div>
      <Input type="number" placeholder="Paper Type" bind:value ={title}/>
    </div>

    <div class="grid grid-cols-3 gap-[40px] p-4">
      <Input type="text" placeholder="Names Of Foreign Authors" bind:value ={campus}/>
      <Input type="number" placeholder="No. Of Foreign Authors" bind:value ={title}/>  
      <Input type="text" placeholder="Names Of Student Authors" bind:value ={campus}/>  
    </div>

    <div class="grid grid-cols-3 gap-[40px] p-4">
      <Input type="text" placeholder="No. Of Student Authors" bind:value ={campus}/>    
      <div class="ml-2">
        <label class="text-[#888888] text-sm">Scopus Site Indexed<span class="text-danger text-sm">*</span></label>
        <div class="flex flex-row gap-[20px] mt-2">
          <div class="flex flex-row">
            <input type="radio" id="html" class="lms-input-radio w-4" name="radio-button-text" checked>
            <span class="text-[#888888] text-sm">Yes</span>
          </div>
          <div class="flex flex-row">
            <input type="radio" id="html" class="lms-input-radio w-4" name="radio-button-text">
            <span class="text-[#888888] text-sm">No</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="grid grid-cols-3 gap-[40px] p-4">
    <DatePicker
	 on:change={handleDateChange}
	 bind:selectedDateTime={publicationDate}
	disabled={(publicationDate) => publicationDate.getTime() < new Date().setHours(0, 0, 0, 0)}
   >
	<div class="text-primary hover:bg-base flex items-center gap-x-3 rounded-lg px-3 py-2">
	<SelectDateIcon />
	<span class="text-body-2 font-bold">Add Publication Date</span>
    </div>
    </DatePicker>
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
						on:click={() => {
								// remove the current date
								publicationFormattedDate = '';
							}}
						>
							<XIcon />
						</button>
					</div>
   {/if}                 
  </div>

  <div class="flex flex-row gap-[20px] p-4">
    <button class="lms-btn lms-secondary-btn">Clear Form</button>
    <button class="lms-btn lms-primary-btn">Submit</button>
  </div>
</div>

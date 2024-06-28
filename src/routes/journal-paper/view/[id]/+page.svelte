<script lang="ts">
import { Card } from '$lib/components/ui';
import type { JournalPaper } from '$lib/types/modules/research/research-types.ts';
import { Input } from '$lib/components/ui';
import { SelectDateIcon, XIcon } from '$lib/components/icons';
import { formatDateTimeShort } from '$lib/utils/date-formatter';
import { tooltip } from '$lib/utils/tooltip';
import { fly } from 'svelte/transition';

let campus : string = '';
let disabled :boolean = true;

let obj : JournalPaper = {
        "journal_name": "Journal of Testing",
        "title": "A Study on Testing",
        "publish_year": 2023,
        "total_authors": 3,
        "nmims_author_count": 2,
        "uid": "UID12345",
        "doi_no": "10.1234/testing.2023",
        "publisher": "Testing Publisher",
        "publication_date": new Date("2023-04-20"),
        "issn_no": "1234-5678",
        "scopus_site_score": 5,
        "gs_indexed": "1",
        "journal_type": 1,
        "ugc_indexed":true,
        "scs_indexed": true,
        "wos_indexed": true,
        "foreign_authors_count": 1,
        "student_authors_count": 1,
        "impact_factor": 2.5,
		"page_no" : "3",
        "paper_type": 1,							  
        "nmims_school": ["School of Science", "School of Engineering"],
        "nmims_campus": ["Mumbai", "Bangalore"],
        "abdc_indexed": 1,
        "policy_cadre": [1,2],
        "all_authors": [1,2],
        "nmims_authors": [1,2],
        "foreign_authors": [1,2],
        "other_authors": [5,6],
	    "student_authors":[3,4],
        "supporting_documents": ["doc1.pdf", "doc2.pdf"]
}

let publicationDate: Date | null = new Date();
publicationDate = obj.publication_date;
$: publicationFormattedDate = publicationDate;

    let title = 'Journal Article Details'


</script>

<Card title={title}>
	<div class="p-4">
	  <div class="min-h-[50vh] overflow-auto no-scrollbar modal-content max-h-[70vh]"> <!-- Adjust max-height as needed -->
    <div class="grid grid-cols-3 gap-[40px] p-4">
      <Input type="text" placeholder="Nmims Campus" bind:value ={obj.nmims_school} {disabled}/>
      <Input type="text" placeholder="Nmims Campus" bind:value ={obj.nmims_campus} {disabled}/>
      <Input type="number" placeholder="Publishing Year" bind:value ={obj.publish_year} {disabled}/>
    </div>
    <div class="grid grid-cols-3 gap-[40px] p-4">
      <Input type="text" placeholder="Policy Cadre" bind:value ={obj.policy_cadre} {disabled}/>
      <Input type="text" placeholder="Name Of All Authors" bind:value ={obj.all_authors} {disabled}/>
      <Input type="number" placeholder="Total No. Of Authors" bind:value ={obj.total_authors} {disabled}/>
    </div>
    <div class="grid grid-cols-3 gap-[40px] p-4">
      <Input type="text" placeholder="Name Of Nmims Authors" bind:value ={obj.nmims_authors} {disabled}/>
      <Input type="text" placeholder="No. Of Nmims Authors" bind:value ={obj.nmims_author_count} {disabled}/>
      <Input type="text" placeholder="Journal Name" bind:value ={obj.journal_name} {disabled}/>
    </div>
    <div class="grid grid-cols-3 gap-[40px] p-4">
      <Input type="text" placeholder="UID" bind:value ={obj.uid} {disabled}/>
      <Input type="text" placeholder="Publisher" bind:value ={obj.publisher} {disabled}/>
      <Input type="text" placeholder="Names Of Other-Authors" bind:value ={obj.other_authors} {disabled}/>
    </div>
    <div class="grid grid-cols-3 gap-[40px] p-4">
      <Input type="text" placeholder="Vol,Issue,Page No." bind:value ={obj.page_no} {disabled}/>
      <Input type="text" placeholder="ISSN No." bind:value ={obj.issn_no} {disabled}/>
      <Input type="number" placeholder="Scopus Site Score" bind:value ={obj.scopus_site_score} {disabled}/>
    </div>
    <div class="grid grid-cols-3 gap-[40px] p-4">
      <Input type="number" placeholder="Impact factor by Clarivate Analytics" bind:value ={obj.impact_factor} {disabled}/>
      <Input type="text" placeholder="WebLink /DOI No." bind:value ={obj.doi_no} {disabled}/>
      <Input type="text" placeholder="Title Of Paper" bind:value ={obj.title} {disabled}/>
    </div>
    <div class="grid grid-cols-3 gap-[40px] p-4">
      <Input type="text" placeholder="GS Indexed" bind:value ={obj.gs_indexed} {disabled}/>
      <div class="ml-2">
        <label class="text-[#888888] text-sm">International/National Journal<span class="text-danger text-sm">*</span></label>
        <div class="flex flex-row gap-[20px] mt-2.5">
          <div class="flex flex-row">
            <input type="radio" id="html" class="lms-input-radio w-4" name="radio-button-text" bind:group={obj.nationality_type} value={1} checked={obj.nationality_type == 1} {disabled}>
            <span class="text-[#888888] text-sm">International</span>
          </div>
          <div class="flex flex-row">
            <input type="radio" id="html" class="lms-input-radio w-4" bind:group={obj.nationality_type} value={2} checked={obj.nationality_type == 2} name="radio-button-text" {disabled}>
            <span class="text-[#888888] text-sm">National</span>
          </div>
        </div>
      </div>
      <div class="ml-2">
        <label class="text-[#888888] text-sm">Wos Indexed<span class="text-danger text-sm">*</span></label>
        <div class="flex flex-row gap-[20px] mt-2">
          <div class="flex flex-row">
            <input type="radio" id="wosHtml" class="lms-input-radio w-4" name="radio-button-text" bind:group={obj.wos_indexed} value={true} checked={obj.wos_indexed === true}>
            <span class="text-[#888888] text-sm">Yes</span>
          </div>
          <div class="flex flex-row">
            <input type="radio" id="wosHtml" class="lms-input-radio w-4" name="radio-button-text" bind:group={obj.wos_indexed} value={false} checked={obj.wos_indexed === true}>
            <span class="text-[#888888] text-sm">No</span>
          </div>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-3 gap-[40px] p-4">
      <Input type="text" placeholder="Abdc Indexed" bind:value ={obj.abdc_indexed}/>
      <div class="ml-2">
        <label class="text-[#888888] text-sm">UGC Indexed<span class="text-danger text-sm">*</span></label>
        <div class="flex flex-row gap-[20px] mt-2">
          <div class="flex flex-row">
            <input type="radio" id="ugchtml" class="lms-input-radio w-4" name="radio-button-text" bind:group={obj.ugc_indexed} value={true} checked={obj.ugc_indexed === true}>
            <span class="text-[#888888] text-sm">Yes</span>
          </div>
          <div class="flex flex-row">
            <input type="radio" id="ugchtml" class="lms-input-radio w-4" name="radio-button-text" value={false} checked={obj.ugc_indexed === true}>
            <span class="text-[#888888] text-sm">No</span>
          </div>
        </div>
      </div>
      <Input type="number" placeholder="Paper Type" bind:value ={obj.paper_type}/>
    </div>

    <div class="grid grid-cols-3 gap-[40px] p-4">
      <Input type="text" placeholder="Names Of Foreign Authors" bind:value ={obj.foreign_authors}/>
      <Input type="number" placeholder="No. Of Foreign Authors" bind:value ={obj.foreign_authors_count}/>  
      <Input type="text" placeholder="Names Of Student Authors" bind:value ={obj.student_authors}/>  
    </div>

    <div class="grid grid-cols-3 gap-[40px] p-4">
      <Input type="text" placeholder="No. Of Student Authors" bind:value ={obj.student_authors_count}/>    
      <div class="ml-2">
        <label class="text-[#888888] text-sm">Scopus Site Indexed<span class="text-danger text-sm">*</span></label>
        <div class="flex flex-row gap-[20px] mt-2">
          <div class="flex flex-row">
            <input type="radio" id="html" class="lms-input-radio w-4" name="radio-button-text"  bind:group={obj.scs_indexed} value={true} checked={obj.scs_indexed === true}>
            <span class="text-[#888888] text-sm">Yes</span>
          </div>
          <div class="flex flex-row">
            <input type="radio" id="html" class="lms-input-radio w-4" name="radio-button-text" bind:group={obj.scs_indexed} value={false} checked={obj.scs_indexed === true}>
            <span class="text-[#888888] text-sm">No</span>
          </div>
        </div>
      </div>
    </div>

    <div class="flex flex-row gap-[40px] p-4">
    
    <div class="text-primary hover:bg-base flex items-center gap-x-3 rounded-lg px-3 py-2">
    <SelectDateIcon />
    <span class="text-body-2 font-bold">Publication Date</span>
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

</div>
</Card>
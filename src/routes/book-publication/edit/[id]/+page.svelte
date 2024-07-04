<script lang="ts">
    import type { BookPublicationDetails } from '$lib/types/modules/research/research-types.ts';
    import { Input,DatePicker  } from '$lib/components/ui';
    import { SelectDateIcon, XIcon } from '$lib/components/icons';
    import { formatDateTimeShort } from '$lib/utils/date-formatter';
    import { tooltip } from '$lib/utils/tooltip';
    import { fly } from 'svelte/transition';
    
    let campus : string = '';
    let title = 'Book Publication';
    let label= 'Book Publication';
    let files: any = [];
    function handleSubmit(){
    console.log('journal title ');

    }
 

    let obj : BookPublicationDetails = {
    title: "A Comprehensive Guide to Testing",
    edition: "1st",
    publish_year: 2023,
    volume_no: "Vol. 1",
    publisher: "Quality Testing Publisher",
    web_link: "https://example.com/testing-book",
    doi_no: "10.1234/testing.book.2023",
    publication_place: "New York",
    isbn_no: "978-3-16-148410-0",
    nmims_authors_count: 2,
    publisher_category: 1,
    nmims_school: ["School of Science", "School of Engineering"],
    nmims_campus: ["Mumbai", "Bangalore"],
    all_authors: [1, 2],
    nmims_authors: [1, 2]
};
    
     


    </script>
    
    <div class="rounded-2xl border-[1px] border-[#E5E9F1] p-4 !pt-0 shadow-card sm:p-6">
      <div class="min-h-[50vh] overflow-auto scroll modal-content max-h-[70vh]"> <!-- Adjust max-height as needed -->
        <div class="grid grid-cols-3 gap-[40px] p-4">
          <Input type="text" placeholder="Nmims School" bind:value ={obj.nmims_school}/>
          <Input type="text" placeholder="Nmims Campus" bind:value ={obj.nmims_campus}/>
          <Input type="text" placeholder="All Authors Names" bind:value ={obj.all_authors}/>
        </div>
        <div class="grid grid-cols-3 gap-[40px] p-4">
          <Input type="text" placeholder="Name Of NMIMS Authors" bind:value ={obj.nmims_authors}/>
          <Input type="text" placeholder="Title Of Book" bind:value ={obj.title}/>
          <Input type="number" placeholder="No. Of NMIMS Authors" bind:value ={obj.nmims_authors_count}/>
        </div>
        <div class="grid grid-cols-3 gap-[40px] p-4">
          <Input type="text" placeholder="Title Of Book" bind:value ={obj.title}/>
          <Input type="text" placeholder="Volume Number" bind:value ={obj.volume_no}/>
          <div class="ml-2">
            <label class="text-[#888888] text-sm">Publisher Category<span class="text-danger text-sm">*</span></label>
            <div class="flex flex-row gap-[20px] mt-2.5">
              <div class="flex flex-row">
                <input type="radio" id="html" class="lms-input-radio w-4" name="radio-button-text" bind:group={obj.publisher_category} value={1} checked={obj.publisher_category == 1}>
                <span class="text-[#888888] text-sm">International</span>
              </div>
              <div class="flex flex-row">
                <input type="radio" id="html" class="lms-input-radio w-4" bind:group={obj.publisher_category} value={2} checked={obj.publisher_category == 2} name="radio-button-text">
                <span class="text-[#888888] text-sm">National</span>
              </div>
            </div>
          </div>

        </div>
        <div class="grid grid-cols-3 gap-[40px] p-4">
            
          <Input type="number" placeholder="Publication Year" bind:value ={obj.publish_year}/>
          <Input type="text" placeholder="Publisher Name" bind:value ={obj.publisher}/>
          <Input type="text" placeholder="Website link" bind:value ={obj.web_link}/>

        </div>
        <div class="grid grid-cols-3 gap-[40px] p-4">
          <Input type="text" placeholder="ISBN Number" bind:value ={obj.isbn_no}/>
          <Input type="text" placeholder="WebLink /DOI No." bind:value ={obj.doi_no}/>
          <Input type="text" placeholder="Place Of Publication" bind:value ={obj.publication_place}/>

        </div>

        <div class="grid grid-cols-3 gap-[40px] p-4">
          <input type="file" bind:files multiple />       
        </div>
      </div>
    

    
      <div class="flex flex-row gap-[20px] p-4">
        <button on:click={handleSubmit} class="lms-btn lms-primary-btn">Update</button>
      </div>
    </div> 

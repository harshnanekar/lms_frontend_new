<script lang="ts">
    import type { BookPublicationDetails } from '$lib/types/modules/research/research-types.ts';
    import { Input,DatePicker,DynamicSelect } from '$lib/components/ui';
    import { SelectDateIcon, XIcon } from '$lib/components/icons';
    import { formatDateTimeShort } from '$lib/utils/date-formatter';
    import { tooltip } from '$lib/utils/tooltip';
    import { fly } from 'svelte/transition';

    import {
		getSchool,
		getCampus,
		getAllAuthor,
		getNmimsAuthor
	} from '$lib/utils/select.helper';
    
    let campus : string = '';
    let title = 'Book Publication';
    let label= 'Book Publication';
    let files: any = [];
    function handleSubmit(){
    console.log('journal title ');

    }

    export let data;

    console.log('data in side edit view ===>>>', data);
    console.log('data in side edit view ankit mishra ===>>>', data.bookPublicationData[0]);

   

    


    let nmimsSchool = data?.bookPublicationData?.school?.message;
	let nmimsCampus = data?.bookPublicationData?.campus?.message;
    let nmimsAuthors = data?.bookPublicationData?.nmimsAuthors?.message;
    let allAuthors = data?.bookPublicationData?.allAuthors?.message;

    $: nmimsAuth = nmimsAuthors;
	$: allAuth = allAuthors;
	$: school = nmimsSchool;
	$: campus = nmimsCampus;

    let isChecked: boolean = false;
	$: checkVal = isChecked;
	console.log('checkbox check ',checkVal);
 

    let obj = {
    title: data.bookPublicationData[0].title,
    edition: data.bookPublicationData[0].edition,
    publish_year: data.bookPublicationData[0].publish_year,
    volume_no: data.bookPublicationData[0].volume_no,
    publisher: data.bookPublicationData[0].publisher,
    web_link: data.bookPublicationData[0].web_link,
    doi_no: data.bookPublicationData[0].doi_no,
    publication_place: data.bookPublicationData[0].publication_place,
    isbn_no: data.bookPublicationData[0].isbn_no,
    nmims_authors_count: data.bookPublicationData[0].nmims_authors_count,
    publisher_category: 1,
    nmims_school: data.bookPublicationData[0].nmims_school.map((dt: any) => {
          return { value: dt, label: dt };
        }),
    nmims_campus: ["Mumbai", "Bangalore"],
    all_authors: [1, 2],
    nmims_authors: [1, 2]
};
    
     


    </script>
    
    <div class="rounded-2xl border-[1px] border-[#E5E9F1] p-4 !pt-0 shadow-card sm:p-6">
      <div class="min-h-[50vh] overflow-auto scroll modal-content max-h-[70vh]">
        <div class="grid grid-cols-3 gap-[40px] p-4">
            <DynamicSelect
            isRequired={true}
            placeholder="Nmims School"
            options={getSchool(school)}
            bind:selectedOptions={obj.nmims_school}
            isMultiSelect={true}
           />          
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

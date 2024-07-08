<script lang="ts">
    import { Input, DatePicker, DynamicSelect } from '$lib/components/ui';
 import { SelectDateIcon, XIcon } from '$lib/components/icons';
 import { formatDateTimeShort, formatDate } from '$lib/utils/date-formatter';
 import { tooltip } from '$lib/utils/tooltip';
 import { fly } from 'svelte/transition';
 import { Card } from '$lib/components/ui';

 import {
		getSchool,
		getCampus,
		getAllAuthor,
		getNmimsAuthor,
        getEditors
	} from '$lib/utils/select.helper';

 import { validateWithZod } from '$lib/utils/validations';
 import {
    bookChapterPublication,
     type bookChapterPublicationReq
 } from '$lib/schemas/modules/research/master-validations';
 import { type FileReq, fileSchema } from '$lib/schemas/modules/research/master-validations';
 import { toast } from 'svelte-sonner';
 import { fetchApi, fetchFormApi } from '$lib/utils/fetcher';
 import { PUBLIC_API_BASE_URL } from '$env/static/public';
 import type { any } from 'zod';

 
 
 let campus : string = '';
 let title = 'Book Chapter Publication';
 let files: any = [];

let disabled: boolean = true;

 export let data;

 console.log('data in side edit view ===>>>', data);
 console.log('data in side edit view ankit mishra ===>>>', data.bookChapterPublicationData.bookChapterPublicationData[0]);


 let nmimsSchool = data?.bookChapterPublicationData?.school?.message;
 let nmimsCampus = data?.bookChapterPublicationData?.campus?.message;
 let nmimsAuthors = data?.bookChapterPublicationData?.nmimsAuthors?.message;
 let allAuthors = data?.bookChapterPublicationData?.allAuthors?.message;
 let allEditors = data?.bookChapterPublicationData?.editor?.message;
 console.log('nmimsSchool ankit mishra ===>>>>>', nmimsSchool)

 $: school = nmimsSchool;
 $: nmimsAuth = nmimsAuthors;
 $: allAuth = allAuthors;
 $: campus = nmimsCampus;
 $: editors = allEditors;
 
 console.log("JSON.stringify(school)", JSON.stringify(school));
 let isChecked: boolean = false;
 $: checkVal = isChecked;
 console.log('checkbox check ',checkVal);


 let obj  = {
    book_chapter_id: parseInt(data.bookChapterPublicationData.bookChapterPublicationData[0].book_chapter_id),
     nmims_school: data.bookChapterPublicationData.bookChapterPublicationData[0].nmims_school,
     nmims_campus: data.bookChapterPublicationData.bookChapterPublicationData[0].nmims_campus,
     all_authors: data.bookChapterPublicationData.bookChapterPublicationData[0].all_authors ? data.bookChapterPublicationData.bookChapterPublicationData[0].all_authors.faculty_name : '',

     nmims_authors: data.bookChapterPublicationData.bookChapterPublicationData[0].nmims_authors.length > 0
             ? data.bookChapterPublicationData.bookChapterPublicationData[0].nmims_authors.map((dt: any) => {
                     return { value: dt.id, label: dt.faculty_name };
                 })
             : [],
    book_editors: data.bookChapterPublicationData.bookChapterPublicationData[0].book_editors.length > 0
             ? data.bookChapterPublicationData.bookChapterPublicationData[0].book_editors.map((dt: any) => {
                     return { value: dt.id, label: dt.editor_name };
                 })
             : [],
         book_title: data.bookChapterPublicationData.bookChapterPublicationData[0].book_title,
         chapter_title: data.bookChapterPublicationData.bookChapterPublicationData[0].chapter_title,
         edition: data.bookChapterPublicationData.bookChapterPublicationData[0].edition,
         publish_year: data.bookChapterPublicationData.bookChapterPublicationData[0].publish_year,
         volume_no: data.bookChapterPublicationData.bookChapterPublicationData[0].volume_no,
         chapter_page_no: data.bookChapterPublicationData.bookChapterPublicationData[0].chapter_page_no,
         publisher: data.bookChapterPublicationData.bookChapterPublicationData[0].publisher,
         web_link: data.bookChapterPublicationData.bookChapterPublicationData[0].web_link,
         doi_no: data.bookChapterPublicationData.bookChapterPublicationData[0].doi_no,
         publication_place: data.bookChapterPublicationData.bookChapterPublicationData[0].publication_place,
         isbn_no: data.bookChapterPublicationData.bookChapterPublicationData[0].isbn_no,
         nmims_authors_count: data.bookChapterPublicationData.bookChapterPublicationData[0].nmims_authors_count,
         publisher_category: Number(data.bookChapterPublicationData.bookChapterPublicationData[0].publisher_category),


};





 </script>
 
 <div class="rounded-2xl border-[1px] border-[#E5E9F1] p-4 !pt-0 shadow-card sm:p-6">
        <div class="scroll modal-content max-h-[70vh] min-h-[50vh] overflow-auto p-4">
            <!-- Adjust max-height as needed -->
            <div class="grid grid-cols-3 gap-[40px] p-4">
                <Input type="text" placeholder="Nmims School" value={obj.nmims_school} {disabled} />
                <Input type="text" placeholder="Nmims Campus" value={obj.nmims_campus} {disabled} />
                <Input type="text" placeholder="Name Of All Authors" value={obj.all_authors} {disabled} />
    
            </div>
    
            <div class="grid grid-cols-3 gap-[40px] p-4">
                <DynamicSelect
                    isRequired={true}
                    placeholder="Name Of NMIMS Authors"
                    options={getNmimsAuthor(nmimsAuth)}
                    bind:selectedOptions={obj.nmims_authors}
                    isMultiSelect={true}
                />
                <DynamicSelect
                isRequired={true}
                placeholder="Editor(s) Of The Book"
                options={getEditors(editors)}
                bind:selectedOptions={obj.book_editors}
                isMultiSelect={true}
            />
                <Input type="text" placeholder="Title Of Chapter" bind:value={obj.chapter_title} />
           
            </div>
            <div class="grid grid-cols-3 gap-[40px] p-4">
                <Input type="text" placeholder="Title Of The Book" bind:value={obj.book_title} />
                <Input type="text" placeholder="Edition (if it isn't the first) " bind:value={obj.edition} />
                <Input type="text" placeholder="Page Numbers Of The Chapter " bind:value={obj.chapter_page_no} />
            
    
            </div>
            <div class="grid grid-cols-3 gap-[40px] p-4">
                <Input type="text" placeholder="Volume Number" bind:value={obj.volume_no} />
                <div class="ml-2">
                    <label class="text-sm text-[#888888]">Publisher Category<span class="text-danger text-sm">*</span>
                    </label>
                    <div class="mt-2.5 flex flex-row gap-[20px]">
                        <div class="flex flex-row">
                            <input
                                type="radio"
                                id="html"
                                class="lms-input-radio w-4"
                                name="radio-button-national"
                                bind:group={obj.publisher_category}
                                checked={obj.publisher_category == 1}
                                value={1}
                            />
                            <span class="text-sm text-[#888888]">International</span>
                        </div>
                        <div class="flex flex-row">
                            <input
                                type="radio"
                                id="html"
                                class="lms-input-radio w-4"
                                name="radio-button-national"
                                bind:group={obj.publisher_category}
                                checked={obj.publisher_category == 1}
                                value={2}
                            />
                            <span class="text-sm text-[#888888]">National</span>
                        </div>
                    </div>
                </div>
                <Input type="text" placeholder="Publication Year" bind:value={obj.publish_year} />
            
            </div>
            <div class="grid grid-cols-3 gap-[40px] p-4">
                <Input type="text" placeholder="Publisher Name " bind:value={obj.publisher} />
                <Input type="text" placeholder="Weblink Of the Book" bind:value={obj.web_link} />
                <Input type="text" placeholder="ISBN Number" bind:value={obj.isbn_no} />
                
            </div>
            <div class="grid grid-cols-3 gap-[40px] p-4">
                <Input type="text" placeholder="WebLink /DOI No." bind:value={obj.doi_no} />
    
                <Input
                    type="text"
                    placeholder="Place Of Publication"
                    bind:value={obj.publication_place}
                />
                <Input type="number" placeholder="No. Of NMIMS Authors" bind:value={obj.nmims_authors_count} />
                <input type="file" bind:files multiple />       
            </div>
    
    
        </div>
 
   <div class="flex flex-row gap-[20px] p-4">
     <button on:click={handleSubmit} class="lms-btn lms-primary-btn">Update</button>
   </div>
 </div> 

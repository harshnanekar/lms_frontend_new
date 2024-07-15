<script lang="ts">
	import { Card } from '$lib/components/ui';
	import type { JournalPaper } from '$lib/types/modules/research/research-types.ts';
	import { Input } from '$lib/components/ui';
	import { SelectDateIcon, XIcon } from '$lib/components/icons';
	import { formatDateTimeShort } from '$lib/utils/date-formatter';
	import { tooltip } from '$lib/utils/tooltip';
	import { fly } from 'svelte/transition';
	import { fetchApi } from '$lib/utils/fetcher';
	import { PUBLIC_API_BASE_URL } from '$env/static/public';
	import { toast } from 'svelte-sonner';
	import { Toaster } from '$lib/components/ui/sonner';
	import { json } from '@sveltejs/kit';

	export let data: any;
	let campus: string = '';
	let disabled: boolean = true;
	let checkData = data.bookPublicationData.length > 0 ? true : false;

    console.log('data in view comming from backend ===>>>>', JSON.stringify(data));

    let obj  = {
            book_pulication_id: parseInt(data.bookPublicationData[0].book_publication_id),
            nmims_school: data.bookPublicationData[0].nmims_school ? data.bookPublicationData[0].nmims_school : '',
            nmims_campus: data.bookPublicationData[0].nmims_campus ? data.bookPublicationData[0].nmims_campus : '',
            all_authors: data.bookPublicationData[0].all_authors ? data.bookPublicationData[0].all_authors : '',
            nmims_authors: data.bookPublicationData[0].nmims_authors ? data.bookPublicationData[0].nmims_authors : '',
            title: data.bookPublicationData[0].title ?  data.bookPublicationData[0].title : '',
            edition: data.bookPublicationData[0].edition ? data.bookPublicationData[0].edition : '',
            publish_year: data.bookPublicationData[0].publish_year ? data.bookPublicationData[0].publish_year : '',
            volume_no: data.bookPublicationData[0].volume_no ? data.bookPublicationData[0].volume_no : '',
            publisher: data.bookPublicationData[0].publisher ? data.bookPublicationData[0].publisher : '',
            web_link: data.bookPublicationData[0].web_link ? data.bookPublicationData[0].web_link : '',
            doi_no: data.bookPublicationData[0].doi_no ? data.bookPublicationData[0].doi_no : '',
            publication_place: data.bookPublicationData[0].publication_place ? data.bookPublicationData[0].publication_place : '',
            isbn_no: data.bookPublicationData[0].isbn_no ? data.bookPublicationData[0].isbn_no : '',
            nmims_authors_count: data.bookPublicationData[0].nmims_authors_count ? data.bookPublicationData[0].nmims_authors_count : '',
            publisher_category:  Number(data.bookPublicationData[0].publisher_category),
            filename : data.bookPublicationData[0].supporting_documents ? data.bookPublicationData[0].supporting_documents : ''
   
};


	let title = 'Book Publication ';

    console.log('tile ===>>>>?', title);
    console.log('data.bookPublicationData[0].nmims_school', JSON.stringify(obj.book_pulication_id));
    console.log('bject ===>>>>>', obj)

    async function downLoadFiles() {
		fetch(`${PUBLIC_API_BASE_URL}/book-publication-download-file?id=${obj.book_pulication_id}`)
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
				a.download = 'book_publication_documents.zip';
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
        <Input type="text" placeholder="Name Of All Authors" value={obj.all_authors} {disabled} />

      </div>
      <div class="grid grid-cols-3 gap-[40px] p-4">
        <Input
			type="text"
			placeholder="Name Of Nmims Authors"
			value={obj.nmims_authors}
			{disabled}/>
        <Input type="text" placeholder="Title Of Book" bind:value ={obj.title} {disabled}/>
        <Input type="number" placeholder="No. Of NMIMS Authors" bind:value ={obj.nmims_authors_count} {disabled}/>
      </div>
      <div class="grid grid-cols-3 gap-[40px] p-4">
        <Input type="text" placeholder="Title Of Book" bind:value ={obj.title} {disabled}/>
        <Input type="text" placeholder="Volume Number" bind:value ={obj.volume_no} {disabled}/>
        <div class="ml-2">
          <label class="text-[#888888] text-sm">Publisher Category<span class="text-danger text-sm">*</span></label>
          <div class="flex flex-row gap-[20px] mt-2.5">
            <div class="flex flex-row">
              <input type="radio" id="html" class="lms-input-radio w-4" name="radio-button-text" bind:group={obj.publisher_category} value={1} checked={obj.publisher_category === 1} {disabled}>
              <span class="text-[#888888] text-sm">International</span>
            </div>
            <div class="flex flex-row">
              <input type="radio" id="html" class="lms-input-radio w-4" bind:group={obj.publisher_category} value={2} checked={obj.publisher_category === 2} name="radio-button-text" {disabled}>
              <span class="text-[#888888] text-sm">National</span>
            </div>
          </div>
        </div>

      </div>
      <div class="grid grid-cols-3 gap-[40px] p-4">
          
        <Input type="number" placeholder="Publication Year" bind:value ={obj.publish_year} {disabled}/>
        <Input type="text" placeholder="Publisher Name" bind:value ={obj.publisher} {disabled}/>
        <Input type="text" placeholder="Website link" bind:value ={obj.web_link} {disabled}/>

      </div>
      <div class="grid grid-cols-3 gap-[40px] p-4">
        <Input type="text" placeholder="ISBN Number" bind:value ={obj.isbn_no} {disabled}/>
        <Input type="text" placeholder="WebLink /DOI No." bind:value ={obj.doi_no} {disabled}/>
        <Input type="text" placeholder="Place Of Publication" bind:value ={obj.publication_place} {disabled}/>
      </div>
      <div class="grid grid-cols-3 gap-[40px] p-4">
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
      
      
    </div>
</Card>
{:else}
	<p>No Data Found</p>
{/if}

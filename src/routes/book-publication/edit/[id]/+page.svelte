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
		getNmimsAuthor
	} from '$lib/utils/select.helper';

    import { validateWithZod } from '$lib/utils/validations';
	import {
		bookPublication,
		type bookPublicationReq
	} from '$lib/schemas/modules/research/master-validations';
	import { type FileReq, fileSchema } from '$lib/schemas/modules/research/master-validations';
	import { toast } from 'svelte-sonner';
	import { fetchApi, fetchFormApi } from '$lib/utils/fetcher';
	import { PUBLIC_API_BASE_URL } from '$env/static/public';
	import type { any } from 'zod';
	import { goto } from '$app/navigation';
    
    let campus : string = '';
    let title = 'Book Publication';
    let files: any = [];

	export let data : any;


    console.log('data in side edit view ===>>>', data);
    console.log('data in side edit view ankit mishra ===>>>', data.bookPublicationData.bookPublicationData[0]);


	let nmimsSchool = data?.bookPublicationData?.school?.message;
	let nmimsCampus = data?.bookPublicationData?.campus?.message;
    let nmimsAuthors = data?.bookPublicationData?.nmimsAuthors?.message;
    let allAuthors = data?.bookPublicationData?.allAuthors?.message;
    console.log('nmimsSchool ankit mishra ===>>>>>', nmimsSchool)

    $: school = nmimsSchool;
    $: nmimsAuth = nmimsAuthors;
	$: allAuth = allAuthors;
	$: campus = nmimsCampus;

    
	console.log("JSON.stringify(school)", JSON.stringify(school));
    let isChecked: boolean = false;
	$: checkVal = isChecked;
	console.log('checkbox check ',checkVal);
 

    let obj : any   = {
        book_publication_id: parseInt(data.bookPublicationData.bookPublicationData[0].book_pulication_id),
        nmims_school: data.bookPublicationData.bookPublicationData[0].nmims_school.length > 0
				? data.bookPublicationData.bookPublicationData[0].nmims_school.map((dt: any) => {
						return { value: dt, label: dt };
					})
				: [],
        nmims_campus: data.bookPublicationData.bookPublicationData[0].nmims_campus.length > 0
				? data.bookPublicationData.bookPublicationData[0].nmims_campus.map((dt: any) => {
						return { value: dt, label: dt };
					})
				: [],
        all_authors: data.bookPublicationData.bookPublicationData[0].all_authors.length > 0
				? data.bookPublicationData.bookPublicationData[0].all_authors.map((dt: any) => {
						return { value: dt.id, label: dt.faculty_name };
					})
				: [],

        nmims_authors: data.bookPublicationData.bookPublicationData[0].nmims_authors.length > 0
				? data.bookPublicationData.bookPublicationData[0].nmims_authors.map((dt: any) => {
						return { value: dt.id, label: dt.faculty_name };
					})
				: [],
            title: data.bookPublicationData.bookPublicationData[0].title,
            edition: data.bookPublicationData.bookPublicationData[0].edition,
            publish_year: data.bookPublicationData.bookPublicationData[0].publish_year,
            volume_no: data.bookPublicationData.bookPublicationData[0].volume_no,
            publisher: data.bookPublicationData.bookPublicationData[0].publisher,
            web_link: data.bookPublicationData.bookPublicationData[0].web_link,
            doi_no: data.bookPublicationData.bookPublicationData[0].doi_no,
            publication_place: data.bookPublicationData.bookPublicationData[0].publication_place,
            isbn_no: data.bookPublicationData.bookPublicationData[0].isbn_no,
            nmims_authors_count: data.bookPublicationData.bookPublicationData[0].nmims_authors_count,
            publisher_category: Number(data.bookPublicationData.bookPublicationData[0].publisher_category),
 
   
};


interface FileReq {
    documents: File[];
}
async function handleSubmit() {
		const bookPublicationObj: bookPublicationReq = {
			nmims_school:
				obj.nmims_school != null ? obj.nmims_school.map((data: { value: any }) => data.value) : [],
			nmims_campus:
				obj.nmims_campus != null ? obj.nmims_campus.map((data: { value: any }) => data.value) : [],
			all_authors: obj.all_authors != null
					? obj.all_authors.map((data: { value: any }) => Number(data.value))
					: [],
			nmims_authors: obj.nmims_authors != null
				? obj.nmims_authors.map((data: { value: any }) => Number(data.value))
				: [],
            
			publish_year: Number(obj.publish_year),
			title: obj.title,
            edition: obj.edition,
            web_link: obj.web_link,
			publisher: obj.publisher,
			volume_no: obj.volume_no,
			isbn_no: obj.isbn_no,
            publication_place: obj.publication_place,
			nmims_authors_count: Number(obj.nmims_authors_count),
			doi_no: obj.doi_no,
            publisher_category: Number(obj.publisher_category)

			
		};

		if (checkVal) {
			const fileObject: FileReq = {
				documents: Array.from(files)
			};
			const fileresult = validateWithZod(fileSchema, fileObject);
			if (fileresult.errors) {
				console.log(fileresult.errors);
				const [firstPath, firstMessage] = Object.entries(fileresult.errors)[0];
				toast.error('ALERT!', {
					description: firstMessage
				});
				return;
			}
		}

		const formData = new FormData();

        console.log('obj.book_publication_id ===>>>>', obj.book_publication_id)
		formData.append('update_book_publication', JSON.stringify(bookPublicationObj));
		formData.append('book_publication_id', JSON.stringify(obj.book_publication_id));

		// Append each file to the FormData
		Array.from(files).forEach((file : any) => {
			formData.append('supporting_documents', file);
		});

		for (let [key, value] of formData.entries()) {
			console.log(`${key}: ${value}`);
		}

		console.log(JSON.stringify(bookPublicationObj));
		const result = validateWithZod(bookPublication, bookPublicationObj);

		if (result.errors) {
			console.log(result.errors);
			const [firstPath, firstMessage] = Object.entries(result.errors)[0];
			toast.error('ALERT!', {
				description: firstMessage
			});
			return;
		}

		console.log('validated data', JSON.stringify(result.data));

		const { error, json } = await fetchFormApi({
			url: `${PUBLIC_API_BASE_URL}/book-publication-update`,
			method: 'POST',
			body: formData
		});

		if (error) {
			toast.error(error.message || 'Something went wrong!', {
				description: error.errorId ? `ERROR-ID: ${error.errorId}` : ''
			});
			return;
		}

		if (json[0].upsert_book_publication.status == 403) {
			toast.error('ALERT!', {
				description: json[0].upsert_book_publication.message
			});
		} else {
			toast.success('Updated Successfully');
			files = [];
			isChecked = false;
			goto('/book-publication')
		}
	}

	function clearForm() {
		obj =  {
			nmims_school: null,
			nmims_campus: null,
			all_authors: null,
			nmims_authors: null,
			title: '',
			edition: '',
			volume_no: '',
			publisher: '',
			publisher_category: 1,
			publish_year: null,
			web_link: '',
			isbn_no: '',
			doi_no: '',
			publication_place: '',
			nmims_authors_count: '' 
			};
			files = [];
	}

	async function downLoadFiles() {
		fetch(`${PUBLIC_API_BASE_URL}/book-publication-download-file?id=${obj.book_publication_id}`)
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
    
    <div class="rounded-2xl border-[1px] border-[#E5E9F1] p-4 !pt-0 shadow-card sm:p-6">
      <div class="min-h-[50vh] overflow-auto scroll modal-content max-h-[70vh]"> <!-- Adjust max-height as needed -->
        <div class="grid grid-cols-3 gap-[40px] p-4">
            <DynamicSelect
            isRequired={true}
            placeholder="Nmims School"
            options={getSchool(school)}
            bind:selectedOptions={obj.nmims_school}
            isMultiSelect={true}
        />
        <DynamicSelect
        isRequired={true}
        placeholder="Nmims Campus"
        options={getCampus(campus)}
        bind:selectedOptions={obj.nmims_campus}
        isMultiSelect={true}
    /> 
    
        <DynamicSelect
        isRequired={true}
        placeholder="All Authors"
        options={getAllAuthor(allAuth)}
        bind:selectedOptions={obj.all_authors}
        isMultiSelect={true}
    /> 
        </div>
        <div class="grid grid-cols-3 gap-[40px] p-4">
            <DynamicSelect
            isRequired={true}
            placeholder="Nmims Authors"
            options={getNmimsAuthor(nmimsAuth)}
            bind:selectedOptions={obj.nmims_authors}
            isMultiSelect={true}
        />  
            <Input type="text" placeholder="Title Of Book" bind:value ={obj.title}/>
            <Input type="text" placeholder="Edition (if it isn't the first) " bind:value ={obj.edition}/>
    </div>
        <div class="grid grid-cols-3 gap-[40px] p-4">
        <Input type="number" placeholder="No. Of NMIMS Authors" bind:value ={obj.nmims_authors_count}/>
          <Input type="text" placeholder="Volume Number" bind:value ={obj.volume_no}/>
          <div class="ml-2">
            <label class="text-[#888888] text-sm">Publisher Category<span class="text-danger text-sm">*</span></label>
            <div class="flex flex-row gap-[20px] mt-2.5">
              <div class="flex flex-row">
                <input type="radio" id="html" class="lms-input-radio w-4" name="radio-button-text" bind:group={obj.publisher_category} value={1} checked={obj.publisher_category === 1}>
                <span class="text-[#888888] text-sm">International</span>
              </div>
              <div class="flex flex-row">
                <input type="radio" id="html" class="lms-input-radio w-4" bind:group={obj.publisher_category} value={2} checked={obj.publisher_category === 2} name="radio-button-text">
                <span class="text-[#888888] text-sm">National</span>
              </div>
            </div>
          </div>

        </div>
        <div class="grid grid-cols-3 gap-[40px] p-4">
            
          <Input type="number" placeholder="Publication Year" bind:value={obj.publish_year} />
          <Input type="text" placeholder="Publisher Name" bind:value ={obj.publisher}/>
          <Input type="text" placeholder="Website link" bind:value ={obj.web_link}/>

        </div>
        <div class="grid grid-cols-3 gap-[40px] p-4">
          <Input type="text" placeholder="ISBN Number" bind:value ={obj.isbn_no}/>
          <Input type="text" placeholder="WebLink /DOI No." bind:value ={obj.doi_no}/>
          <Input type="text" placeholder="Place Of Publication" bind:value ={obj.publication_place}/>

        </div>

        <div class="grid grid-cols-3 gap-[40px] p-4">
			<div>
				<label for="supporting-documents"
					>Upload Supporting Documents <i style="color: red;">*</i><br /></label
				>
				<label>Click To Upload New File <input type="checkbox" bind:checked={isChecked} /></label>
				{#if checkVal}
					<input type="file" bind:files multiple />
				{:else}
					<button class="lms-primary-btn mt-2" on:click={downLoadFiles}><i class="fa-solid fa-download text-lg"></i></button>
				{/if}
			</div>        
		</div>
      </div>
    

    
      <div class="flex flex-row gap-[20px] p-4">
        <button on:click={handleSubmit} class="lms-btn lms-primary-btn">Update</button>
      </div>
    </div> 

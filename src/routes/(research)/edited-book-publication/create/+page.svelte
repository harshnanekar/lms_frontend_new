<script lang="ts">
    import { Card } from '$lib/components/ui';
    import { Input, DynamicSelect, File } from '$lib/components/ui'
    import { getAllAuthor, getSchool, getCampus, getNmimsAuthor, getEditors } from '$lib/utils/select.helper';
    import { editedBookPublication, type editedBookPublicationReq, type FileReq, fileSchema } from '$lib/schemas/modules/research/master-validations'
    import { validateWithZod } from '$lib/utils/validations';
    import { fetchApi, fetchFormApi } from '$lib/utils/fetcher';
    import { PUBLIC_API_BASE_URL } from '$env/static/public';
    import { toast } from 'svelte-sonner';
	import { goto } from '$app/navigation';

        export let data : any;
        const title = 'Edited Book Publication'

        let allAuthorData = data?.editedBookData?.authorData?.message;
        let nmimsAuthorData = data?.editedBookData?.nmimsAuthorData?.message;
        let campuseData = data?.editedBookData?.campusData?.message;
        let schoolData = data?.editedBookData?.schoolData?.message;
        let editorsData = data?.editedBookData?.editorsData?.message;

        $: allAuthors = allAuthorData
        $: campuses = campuseData;
        $: schools = schoolData;
        $: nmimsAuthors = nmimsAuthorData;
        $: editors = editorsData;
       
        let obj = {
            nmimsAuthors: null,
            authors: null,
            book_title: '',
            campuses: null,
            schools: null,
            book_editer: null,
            edition: '',
            publisher: '',
            publish_year : '',
            publisher_category: 1,
            isbn_no: '',
            doi_no: '',
            web_link: '',
            publication_place: '',
            nmims_authors_count: '',
            nmims_authors: null,
        }

        let files: any = [];

        function handleFiles(event: CustomEvent<File[]>) {
		files = event.detail;
		console.log('files details', files);
	}

	function handleDeleteFiles(event: CustomEvent) {
		files = event.detail;
	}

       async function handleSubmit() {
            const editedBookSubmit: editedBookPublicationReq = {
            nmims_school:
				obj.schools != null ? obj.schools.map((data: { value: any }) => data.value) : [],
			nmims_campus:
				obj.campuses != null ? obj.campuses.map((data: { value: any }) => data.value) : [],
            all_authors:
				obj.authors != null ? obj.authors.map((data: { value: any }) => Number(data.value)) : [],
            book_editors:
				obj.book_editer != null ? obj.book_editer.map((data: { value: any }) => Number(data.value)) : [],
            title: obj.book_title,
            web_link: obj.web_link,
			publish_year: Number(obj.publish_year), 
            edition: obj.edition,
            publisher: obj.publisher,
            publisher_category: Number(obj.publisher_category),
            isbn_no: Number(obj.isbn_no),
            doi_no: obj.doi_no,
            publication_place: obj.publication_place,
            nmims_authors_count: Number(obj.nmims_authors_count),
            nmims_authors: obj.nmimsAuthors != null ? obj.nmimsAuthors.map((data: { value: any }) => Number(data.value)) : [],
        }
        
        const fileObject: FileReq = {
			documents: files.map((f: any) => {
				return f.file;
			})
		};

        const fileresult = validateWithZod(fileSchema, fileObject);
        
        if (fileresult.errors) {
            console.log('file', fileresult.errors);
			const [firstPath, firstMessage] = Object.entries(fileresult.errors)[0];
			toast.error('ALERT!', {
				description: firstMessage
			});
			return;
        }

        const formData = new FormData();
        formData.append('edited_book_publication', JSON.stringify(editedBookSubmit));

		// Append each file to the FormData
		Array.from(files).forEach((file : any) => {
			formData.append('supporting_documents', file.file);
		});

        	for (let [key, value] of formData.entries()) {
			console.log(`${key}: ${value}`);
		}
        
        const result = validateWithZod(editedBookPublication, editedBookSubmit);

        if (result.errors) {
			console.log(result.errors);
			const [firstPath, firstMessage] = Object.entries(result.errors)[0];
			toast.error('ALERT!', {
				description: firstMessage
			});
			return;
		}


        const { error, json } = await fetchFormApi({
			url: `${PUBLIC_API_BASE_URL}/edited-book-publication-insert`,
			method: 'POST',
			body: formData
		});


        if (error) {
			toast.error(error.message || 'Something went wrong!', {
				description: error.errorId ? `ERROR-ID: ${error.errorId}` : ''
			});
			return;
		}

		if (json[0].insert_edited_publications.status == 403) {
			toast.error('ALERT!', {
				description: json[0].insert_edited_publications.message
			});
		} else {
			toast.success('Inserted Successfully');
			clearForm();
			goto('/edited-book-publication');
		}
    }

        function clearForm() {
            obj = { 
            authors: null,
            book_title: '',
            campuses: null,
            schools: null,
            edition: '',
            publisher: '',
            publish_year : '',
            publisher_category: 1,
            isbn_no: '',
            doi_no: '',
            web_link: '',
            publication_place: '',
            nmims_authors_count: '',
            nmims_authors: null,
            book_editer: null,
        }

    }
        
</script>

<Card title={title}>
    <div class="modal-content p-4">

        <div class="grid grid-cols-1 gap-8 p-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
			<DynamicSelect
				isRequired={true}
				placeholder="Nmims School"
                bind:selectedOptions={obj.schools}
				options={getSchool(schools)}
				isMultiSelect={true}
			/>

            <DynamicSelect
				isRequired={true}
				placeholder="Nmims Campus"
                bind:selectedOptions={obj.campuses}
				options={getCampus(campuses)}
				isMultiSelect={true}
			/>

            <DynamicSelect
            isRequired={true}
            placeholder="All Authors Name"
            bind:selectedOptions={obj.authors}
            options={getAllAuthor(allAuthors)}
            isMultiSelect={true}
        />
    </div>    

    <div class="grid grid-cols-1 gap-8 p-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
        <DynamicSelect
        isRequired={true}
        placeholder="Nmims Authors Name"
        bind:selectedOptions={obj.nmimsAuthors}
        options={getNmimsAuthor(nmimsAuthors)}
        isMultiSelect={true}
    />
        <DynamicSelect
        isRequired={true}
        placeholder="Editor(s) Of The Book"
        bind:selectedOptions={obj.book_editer}
        options={getEditors(editors)}
        isMultiSelect={true}
    />
        <Input type="text" placeholder="Title of the book" bind:value={obj.book_title} />
        
    </div>

    <div class="grid grid-cols-1 gap-8 p-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
        <Input type="text" placeholder="Edition (if it isn't the first)" bind:value={obj.edition} />
        <Input type="text" placeholder="Publisher Name" bind:value={obj.publisher} />

        <div class="ml-2">
            <label class="text-sm text-[#888888]"
                >Publisher Category</label
            >
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
                        value={2}
                    />
                    <span class="text-sm text-[#888888]">National</span>
                </div>
            </div>
        </div>

    </div>

    <div class="grid grid-cols-1 gap-8 p-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
        <Input type="number" placeholder="Publication Year" bind:value={obj.publish_year} />
        <Input type="number" placeholder="ISBN Number" bind:value={obj.isbn_no} />
        <Input type="text" placeholder="DOI ID/ WebLink" bind:value={obj.doi_no} />

    </div>  

    <div class="grid grid-cols-1 gap-8 p-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
        <Input type="text" placeholder="Web Link" bind:value={obj.web_link} />
        <Input type="text" placeholder="Place Of Publication" bind:value={obj.publication_place} />
        <Input type="number" placeholder="No. Of NMIMS Authors" bind:value={obj.nmims_authors_count} />
    </div>
    <div class="grid grid-cols-1 gap-8 p-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
        <div class="space-y-2">
            <!-- svelte-ignore a11y-label-has-associated-control -->
            <label class="lms-label item-center">Upload Supporting Documents<span class="text-primary">*</span></label
            >
            <File on:filesSelected={handleFiles} on:deletedFiles={handleDeleteFiles} isView={false} />
        </div>	
    </div>

    <div class="flex flex-row gap-[20px] p-4">
		<button class="lms-btn lms-secondary-btn" on:click={clearForm}>Clear Form</button>
		<button class="lms-btn lms-primary-btn" on:click={handleSubmit}>Submit</button>
	</div>

</Card>


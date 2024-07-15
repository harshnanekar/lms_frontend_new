<script lang="ts">
    import { Card } from '$lib/components/ui';
    import { Input, DynamicSelect } from '$lib/components/ui'
    import { getAllAuthor, getSchool, getCampus } from '$lib/utils/select.helper';
    import { editedBookPublication, type editedBookPublicationReq, type FileReq, fileSchema } from '$lib/schemas/modules/research/master-validations'
    import { validateWithZod } from '$lib/utils/validations';
    import { toast } from 'svelte-sonner';

        export let data : any;
        const title = 'Edited Book Publication'

        let allAuthorData = data?.editedBookData?.authorData?.message;
        let campuseData = data?.editedBookData?.campusData?.message;
        let schoolData = data?.editedBookData?.schoolData?.message;

        $: allAuthors = allAuthorData
        $: campuses = campuseData;
        $: schools = schoolData;
       
        let obj = {
            authors: null,
            title: null,
            campuses: null,
            schools: null,
            edition: '',
            publisher: '',
            publish_year : '',
            publisher_category: '',
            isbn_no: '',
            doi_no: '',
            web_link: '',
            publication_place: '',
            nmims_authors_count: '',
            nmims_authors: null,
            book_editer: ''
        }

        let files: any = [];

        function handleSubmit() {
            const editedBookSubmit: editedBookPublicationReq = {
                nmims_school:
				obj.schools != null ? obj.schools.map((data: { value: any }) => data.value) : [],
			nmims_campus:
				obj.campuses != null ? obj.campuses.map((data: { value: any }) => data.value) : [],
                all_authors:
				obj.authors != null ? obj.authors.map((data: { value: any }) => Number(data.value)) : [],
                book_editors: obj.book_editer,
			publish_year: Number(obj.publish_year), 
            edition: obj.edition,
            publisher: obj.publisher,
            publisher_category: Number(obj.publisher_category),
            isbn_no: Number(obj.isbn_no),
            doi_no: obj.doi_no,
            publication_place: obj.publication_place,
            nmims_author_count: Number(obj.nmims_authors_count),
            nmims_authors: obj.nmims_authors
        }
        
        const fileObject: FileReq = {
            documents: Array.from(files)
        }

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
		Array.from(files).forEach((file) => {
			formData.append('supporting_documents', file);
		});
        
        const result = validateWithZod(editedBookPublication, editedBookSubmit);

        if (result.errors) {
			console.log(result.errors);
			const [firstPath, firstMessage] = Object.entries(result.errors)[0];
			toast.error('ALERT!', {
				description: firstMessage
			});
			return;
		}


    }

        function clearForm() {
            obj = { 
            authors: null,
            title: null,
            campuses: null,
            schools: null,
            edition: '',
            publisher: '',
            publish_year : '',
            publisher_category: '',
            isbn_no: '',
            doi_no: '',
            web_link: '',
            publication_place: '',
            nmims_authors_count: '',
            nmims_authors: [],
            book_editer: []
        }

    }
        
</script>

<Card title={title}>
    <div class="scroll small-scrollbar modal-content max-h-[70vh] min-h-[50vh] overflow-auto p-4">

        <div class="grid grid-cols-3 gap-[40px] p-4">
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

    <div class="grid grid-cols-3 gap-[40px] p-4">
        <Input type="text" placeholder="Title of the book" bind:value={obj.title} />
        <Input type="text" placeholder="Edition (if it isn't the first)" bind:value={obj.edition} />
        <Input type="text" placeholder="Editor(s) Of The Book" bind:value={obj.book_editer} />
    </div>

    <div class="grid grid-cols-3 gap-[40px] p-4">
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
                        checked
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

        <Input type="number" placeholder="Publication Year" bind:value={obj.publish_year} />
    </div>

    <div class="grid grid-cols-3 gap-[40px] p-4">

        <Input type="number" placeholder="ISBN Number" bind:value={obj.isbn_no} />
        <Input type="text" placeholder="DOI ID/ WebLink" bind:value={obj.doi_no} />
        <Input type="text" placeholder="Web Link" bind:value={obj.web_link} />

    </div>  

    <div class="grid grid-cols-3 gap-[40px] p-4">
        <Input type="text" placeholder="Place Of Publication" bind:value={obj.publication_place} />
        <Input type="number" placeholder="No. Of NMIMS Authors" bind:value={obj.nmims_authors_count} />
        <Input type="text" placeholder="Name Of NMIMS Authors" bind:value={obj.nmims_authors} />
        <input type="file" bind:files multiple />
    </div>

    <div class="flex flex-row gap-[20px] p-4">
		<button class="lms-btn lms-secondary-btn" on:click={clearForm}>Clear Form</button>
		<button class="lms-btn lms-primary-btn" on:click={handleSubmit}>Submit</button>
	</div>

</Card>


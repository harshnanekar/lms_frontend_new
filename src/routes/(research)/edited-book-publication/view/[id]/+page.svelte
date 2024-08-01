<script lang="ts">
    import { Input, File } from '$lib/components/ui'; 
    import { PUBLIC_API_BASE_URL } from '$env/static/public';
	import { toast } from 'svelte-sonner';
	import Card from '$lib/components/ui/card/card.svelte';

    let title  = 'Edited Book Publication'

	import { createFileUrl } from '$lib/utils/helper';
	import { fileDataStore } from '$lib/stores/modules/research/master.store';

    let disabled: boolean = true;

    export let data: any;
	console.log('data ===>>>', data)

    let checkData = data.editedBookPublicationData.editedBookPublicationData.length > 0 ? true : false;

    let isChecked: boolean = false;
    $: checkVal = isChecked;

    console.log('checkbox check ', checkVal);
	let files = data.editedBookPublicationData.editedBookPublicationData.length > 0 ? createFileUrl(data.editedBookPublicationData.files) : [];
	fileDataStore.set(files)

	console.log('files ',data.editedBookPublicationData.files)
    
    let obj: any = {
        edited_book_id: parseInt(data.editedBookPublicationData.editedBookPublicationData[0].edited_book_id),
        nmims_school: data.editedBookPublicationData.editedBookPublicationData[0].nmims_school
             ? data.editedBookPublicationData.editedBookPublicationData[0].nmims_school
             : '',
        nmims_campus: data.editedBookPublicationData.editedBookPublicationData[0].nmims_campus
             ? data.editedBookPublicationData.editedBookPublicationData[0].nmims_campus
             : '',
        all_authors: data.editedBookPublicationData.editedBookPublicationData[0].all_authors
             ? data.editedBookPublicationData.editedBookPublicationData[0].all_authors
             : '',
        book_editors: data.editedBookPublicationData.editedBookPublicationData[0].book_editors
             ? data.editedBookPublicationData.editedBookPublicationData[0].book_editors
             : '',
        nmims_authors: data.editedBookPublicationData.editedBookPublicationData[0].nmims_authors
			? data.editedBookPublicationData.editedBookPublicationData[0].nmims_authors
			: '',
        book_title: data.editedBookPublicationData.editedBookPublicationData[0].title
			? data.editedBookPublicationData.editedBookPublicationData[0].title
			: '',
        edition: data.editedBookPublicationData.editedBookPublicationData[0].edition
			? data.editedBookPublicationData.editedBookPublicationData[0].edition
			: '',
        publish_year: data.editedBookPublicationData.editedBookPublicationData[0].publish_year
			? data.editedBookPublicationData.editedBookPublicationData[0].publish_year
			: '',
        web_link: data.editedBookPublicationData.editedBookPublicationData[0].web_link
			? data.editedBookPublicationData.editedBookPublicationData[0].web_link
			: '',
        doi_no: data.editedBookPublicationData.editedBookPublicationData[0].doi_no
			? data.editedBookPublicationData.editedBookPublicationData[0].doi_no
			: '',
        publication_place: data.editedBookPublicationData.editedBookPublicationData[0].publication_place
			? data.editedBookPublicationData.editedBookPublicationData[0].publication_place
			: '',
        isbn_no: data.editedBookPublicationData.editedBookPublicationData[0].isbn_no
			? data.editedBookPublicationData.editedBookPublicationData[0].isbn_no
			: '',
        publisher: data.editedBookPublicationData.editedBookPublicationData[0].publisher
			? data.editedBookPublicationData.editedBookPublicationData[0].publisher
			: '',
        nmims_authors_count: data.editedBookPublicationData.editedBookPublicationData[0].nmims_authors_count
			? data.editedBookPublicationData.editedBookPublicationData[0].nmims_authors_count
			: '',
        publisher_category: Number(data.editedBookPublicationData.editedBookPublicationData[0].publisher_category),
        filename: data.editedBookPublicationData.editedBookPublicationData[0].supporting_documents
			? data.editedBookPublicationData.editedBookPublicationData[0].supporting_documents
			: '',
    };

    async function downLoadFiles() {
        fetch(`${PUBLIC_API_BASE_URL}/edited-book-publication-download-file?id=${obj.edited_book_id}`)
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
				a.download = 'edited_book_publication_documents.zip';
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
    <Card title={title}>
        <div class="modal-content p-4">
			<!-- Adjust max-height as needed -->
			<div class="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
				<Input type="text" placeholder="Nmims School" value={obj.nmims_school} {disabled} />
				<Input type="text" placeholder="Nmims Campus" value={obj.nmims_campus} {disabled} />
				<Input type="text" placeholder="Name Of All Authors" value={obj.all_authors} {disabled} />
			</div>

            <div class="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
                <Input
					type="text"
					placeholder="Name Of NMIMS Authors"
					value={obj.nmims_authors}
					{disabled}
				/>
				<Input
					type="text"
					placeholder="Editor(s) Of The Book"
					value={obj.book_editors}
					{disabled}
				/>

                <Input type="text" placeholder="Title Of The Book" bind:value={obj.book_title} {disabled} />
            </div>

            <div class="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">

                <Input
					type="text"
					placeholder="Edition (if it isn't the first) "
					bind:value={obj.edition}
					{disabled}
				/>
                <div class="ml-2">
					<label class="text-sm text-[#888888]"
						>Publisher Category<span class="text-danger text-sm">*</span></label
					>
					<div class="mt-2.5 flex flex-row gap-[20px]">
						<div class="flex flex-row">
							<input
								type="radio"
								id="html"
								class="lms-input-radio w-4"
								name="radio-button-text"
								bind:group={obj.publisher_category}
								value={1}
								checked={obj.publisher_category === 1}
								{disabled}
							/>
							<span class="text-sm text-[#888888]">International</span>
						</div>
						<div class="flex flex-row">
							<input
								type="radio"
								id="html"
								class="lms-input-radio w-4"
								bind:group={obj.publisher_category}
								value={2}
								checked={obj.publisher_category === 2}
								name="radio-button-text"
								{disabled}
							/>
							<span class="text-sm text-[#888888]">National</span>
						</div>
					</div>
				</div>
				<Input
					type="text"
					placeholder="Publication Year"
					bind:value={obj.publish_year}
					{disabled}
				/>
            </div>

            <div class="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
                <Input type="text" placeholder="Publisher Name " bind:value={obj.publisher} {disabled} />
				<Input type="text" placeholder="Weblink Of the Book" bind:value={obj.web_link} {disabled} />
				<Input type="text" placeholder="ISBN Number" bind:value={obj.isbn_no} {disabled} />
            </div>

            <div class="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
                <Input type="text" placeholder="WebLink /DOI No." bind:value={obj.doi_no} {disabled} />
				<Input type="text" placeholder="Place Of Publication" bind:value={obj.publication_place} />
				<Input
					type="number"
					placeholder="No. Of NMIMS Authors"
					bind:value={obj.nmims_authors_count}
					{disabled}
				/>
            </div>

            <div class="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
				<div class="space-y-2">
					<label for="documents" class="lms-label"
						>Download Supporting Documents
						<span>*</span>
					</label>
					<div class="flex items-center gap-2">
					<!-- svelte-ignore missing-declaration -->
					<File isView={true} />	
					<button class="lms-btn lms-primary-btn" on:click={downLoadFiles}
						><i class="fa-solid fa-download text-lg"></i></button
					>
					</div>
				</div>
			</div>
        </div>

    </Card>
   {:else}
   <p>No Data Found!</p>
   {/if}
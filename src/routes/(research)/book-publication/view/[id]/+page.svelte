<script lang="ts">
	import { Card } from '$lib/components/ui';
	import { Input , File} from '$lib/components/ui';
	import { PUBLIC_API_BASE_URL } from '$env/static/public';
	import { toast } from 'svelte-sonner';
	import { createFileUrl } from '$lib/utils/helper';
	import { fileDataStore } from '$lib/stores/modules/research/master.store';

	export let data: any;

	let disabled: boolean = true;
	let checkData = data.bookPublicationData.bookPublicationData.length > 0 ? true : false;
	let files = data.bookPublicationData.files.length > 0 ? createFileUrl(data.bookPublicationData.files) : [];
    fileDataStore.set(files);

	let obj = {
		book_pulication_id:
		checkData
				? parseInt(data.bookPublicationData.bookPublicationData[0].book_publication_id)
				: null,
		nmims_school:
		checkData && data.bookPublicationData.bookPublicationData[0].nmims_school != null
				? data.bookPublicationData.bookPublicationData[0].nmims_school
				: '',
		nmims_campus:
		checkData && data.bookPublicationData.bookPublicationData[0].nmims_campus != null
				? data.bookPublicationData.bookPublicationData[0].nmims_campus
				: '',
		all_authors:
		checkData && data.bookPublicationData.bookPublicationData[0].all_authors != null
				? data.bookPublicationData.bookPublicationData[0].all_authors
				: '',
		nmims_authors:
		checkData && data.bookPublicationData.bookPublicationData[0].nmims_authors != null
				? data.bookPublicationData.bookPublicationData[0].nmims_authors
				: '',
		title:
		checkData && data.bookPublicationData.bookPublicationData[0].title
				? data.bookPublicationData.bookPublicationData[0].title
				: '',
		edition:
		checkData && data.bookPublicationData.bookPublicationData[0].edition
				? data.bookPublicationData.bookPublicationData[0].edition
				: '',
		publish_year:
		checkData && data.bookPublicationData.bookPublicationData[0].publish_year
				? data.bookPublicationData.bookPublicationData[0].publish_year
				: '',
		volume_no:
		checkData && data.bookPublicationData.bookPublicationData[0].volume_no
				? data.bookPublicationData.bookPublicationData[0].volume_no
				: '',
		publisher:
		checkData && data.bookPublicationData.bookPublicationData[0].publisher
				? data.bookPublicationData.bookPublicationData[0].publisher
				: '',
		web_link:
		checkData && data.bookPublicationData.bookPublicationData[0].web_link
				? data.bookPublicationData.bookPublicationData[0].web_link
				: '',
		doi_no:
		checkData && data.bookPublicationData.bookPublicationData[0].doi_no
				? data.bookPublicationData.bookPublicationData[0].doi_no
				: '',
		publication_place:
		checkData && data.bookPublicationData.bookPublicationData[0].publication_place
				? data.bookPublicationData.bookPublicationData[0].publication_place
				: '',
		isbn_no:
		checkData && data.bookPublicationData.bookPublicationData[0].isbn_no
				? data.bookPublicationData.bookPublicationData[0].isbn_no
				: '',
		nmims_authors_count:
		checkData && data.bookPublicationData.bookPublicationData[0].nmims_authors_count
				? data.bookPublicationData.bookPublicationData[0].nmims_authors_count
				: '',
		publisher_category:
		checkData
				? Number(data.bookPublicationData.bookPublicationData[0].publisher_category)
				: null,
		filename:
		checkData && data.bookPublicationData.bookPublicationData[0].supporting_documents
				? data.bookPublicationData.bookPublicationData[0].supporting_documents
				: ''
	};

	let title = 'Book Publication ';

	console.log('tile ===>>>>?', title);
	console.log('data.bookPublicationData[0].nmims_school', JSON.stringify(obj.book_pulication_id));
	console.log('bject ===>>>>>', obj);

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
		<div class="modal-content p-4">
			<!-- Adjust max-height as needed -->
			<div class="grid grid-cols-1 gap-8 p-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
				<Input type="text" placeholder="Nmims School" value={obj.nmims_school} {disabled} />
				<Input type="text" placeholder="Nmims Campus" value={obj.nmims_campus} {disabled} />
				<Input type="text" placeholder="Name Of All Authors" value={obj.all_authors} {disabled} />
			</div>
			<div class="grid grid-cols-1 gap-8 p-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
				<Input
					type="text"
					placeholder="Name Of Nmims Authors"
					value={obj.nmims_authors}
					{disabled}
				/>
				<Input type="text" placeholder="Title Of Book" bind:value={obj.title} {disabled} />
				<Input
					type="number"
					placeholder="No. Of NMIMS Authors"
					bind:value={obj.nmims_authors_count}
					{disabled}
				/>
			</div>
			<div class="grid grid-cols-1 gap-8 p-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
				<Input type="text" placeholder="Title Of Book" bind:value={obj.title} {disabled} />
				<Input type="text" placeholder="Volume Number" bind:value={obj.volume_no} {disabled} />
				<div class="ml-2">
					<!-- svelte-ignore a11y-label-has-associated-control -->
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
			</div>
			<div class="grid grid-cols-1 gap-8 p-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
				<Input
					type="number"
					placeholder="Publication Year"
					bind:value={obj.publish_year}
					{disabled}
				/>
				<Input type="text" placeholder="Publisher Name" bind:value={obj.publisher} {disabled} />
				<Input type="text" placeholder="Website link" bind:value={obj.web_link} {disabled} />
			</div>
			<div class="grid grid-cols-1 gap-8 p-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
				<Input type="text" placeholder="ISBN Number" bind:value={obj.isbn_no} {disabled} />
				<Input type="text" placeholder="WebLink /DOI No." bind:value={obj.doi_no} {disabled} />
				<Input
					type="text"
					placeholder="Place Of Publication"
					bind:value={obj.publication_place}
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
	<p>No Data Found</p>
{/if}
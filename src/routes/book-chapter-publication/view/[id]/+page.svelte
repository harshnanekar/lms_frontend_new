<script lang="ts">
	import { Input } from '$lib/components/ui';
	import { Card } from '$lib/components/ui';
	import { toast } from 'svelte-sonner';
	import { fetchApi, fetchFormApi } from '$lib/utils/fetcher';
	import { PUBLIC_API_BASE_URL } from '$env/static/public';
	import type { any } from 'zod';

	let title = 'Book Chapter Publication';

	let disabled: boolean = true;

	export let data: any;

	let checkData = data.bookChapterPublicationData.length > 0 ? true : false;

	console.log(
		'data in view comming from backend ===>>>>',
		JSON.stringify(data.bookChapterPublicationData[0])
	);

	let isChecked: boolean = false;
	$: checkVal = isChecked;
	console.log('checkbox check ', checkVal);

	let obj: any = {
		book_chapter_id:
		checkData
				? parseInt(data.bookChapterPublicationData[0].book_chapter_id)
				: null,
		nmims_school:
		checkData && data.bookChapterPublicationData[0].nmims_school != null
				? data.bookChapterPublicationData[0].nmims_school
				: '',
		nmims_campus:
		checkData &&
			data.bookChapterPublicationData[0].nmims_campus != null
				? data.bookChapterPublicationData[0].nmims_campus
				: '',
		all_authors:
		checkData &&
			data.bookChapterPublicationData[0].all_authors != null
				? data.bookChapterPublicationData[0].all_authors
				: '',
		nmims_authors:
		checkData &&
			data.bookChapterPublicationData[0].nmims_authors != null
				? data.bookChapterPublicationData[0].nmims_authors
				: '',
		book_editors:
		checkData &&
			data.bookChapterPublicationData[0].book_editors != null
				? data.bookChapterPublicationData[0].book_editors
				: '',
		book_title:
			checkData && data.bookChapterPublicationData[0].book_title
				? data.bookChapterPublicationData[0].book_title
				: '',
		chapter_title:
		checkData && data.bookChapterPublicationData[0].chapter_title
				? data.bookChapterPublicationData[0].chapter_title
				: '',
		edition:
		checkData && data.bookChapterPublicationData[0].edition
				? data.bookChapterPublicationData[0].edition
				: '',
		publish_year:
		checkData && data.bookChapterPublicationData[0].publish_year
				? data.bookChapterPublicationData[0].publish_year
				: '',
		volume_no:
		checkData && data.bookChapterPublicationData[0].volume_no
				? data.bookChapterPublicationData[0].volume_no
				: '',
		chapter_page_no:
		checkData &&
			data.bookChapterPublicationData[0].chapter_page_no
				? data.bookChapterPublicationData[0].chapter_page_no
				: '',
		publisher:
		checkData && data.bookChapterPublicationData[0].publisher
				? data.bookChapterPublicationData[0].publisher
				: '',
		web_link:
		checkData && data.bookChapterPublicationData[0].web_link
				? data.bookChapterPublicationData[0].web_link
				: '',
		doi_no:
		checkData && data.bookChapterPublicationData[0].doi_no
				? data.bookChapterPublicationData[0].doi_no
				: '',
		publication_place:
		checkData &&
			data.bookChapterPublicationData[0].publication_place
				? data.bookChapterPublicationData[0].publication_place
				: '',
		isbn_no:
		checkData && data.bookChapterPublicationData[0].isbn_no
				? data.bookChapterPublicationData[0].isbn_no
				: '',
		nmims_authors_count:
		checkData &&
			data.bookChapterPublicationData[0].nmims_authors_count
				? data.bookChapterPublicationData[0].nmims_authors_count
				: '',
		publisher_category:
		checkData
				? Number(data.bookChapterPublicationData[0].publisher_category)
				: null,
		filename:
		checkData &&
			data.bookChapterPublicationData[0].supporting_documents
				? data.bookChapterPublicationData[0].supporting_documents
				: ''
	};

	async function downLoadFiles() {
		fetch(`${PUBLIC_API_BASE_URL}/book-chapter-publication-download-file?id=${obj.book_chapter_id}`)
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
				a.download = 'book_chapter_publication_documents.zip';
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
		<div class=" modal-content p-4">
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
				<Input
					type="text"
					placeholder="Title Of Chapter"
					bind:value={obj.chapter_title}
					{disabled}
				/>
			</div>
			<div class="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
				<Input type="text" placeholder="Title Of The Book" bind:value={obj.book_title} {disabled} />
				<Input
					type="text"
					placeholder="Edition (if it isn't the first) "
					bind:value={obj.edition}
					{disabled}
				/>
				<Input
					type="text"
					placeholder="Page Numbers Of The Chapter "
					bind:value={obj.chapter_page_no}
					{disabled}
				/>
			</div>
			<div class="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
				<Input type="text" placeholder="Volume Number" bind:value={obj.volume_no} {disabled} />
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
				<div class="lms-input-container flex flex-row gap-2">
					<input id="documents" class="lms-input" placeholder="" value={obj.filename} {disabled} />
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

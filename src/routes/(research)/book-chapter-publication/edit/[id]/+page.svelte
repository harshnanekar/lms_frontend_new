<script lang="ts">
	import { Input, DatePicker, DynamicSelect, File } from '$lib/components/ui';
	import { SelectDateIcon, XIcon } from '$lib/components/icons';
	import { formatDateTimeShort, formatDate } from '$lib/utils/date-formatter';
	import { tooltip } from '$lib/utils/tooltip';
	import { fly } from 'svelte/transition';
	import { Card } from '$lib/components/ui';

	import {
		getSchool,
		getCampus,
		getMasterAllAuthors,
		getMasterNmimsAuthors,
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
	import { PUBLIC_API_BASE_URL, PUBLIC_BASE_URL } from '$env/static/public';
	import type { any } from 'zod';
	import { goto } from '$app/navigation';
	import { fileDataStore } from '$lib/stores/modules/research/master.store';
	import type { updateBookChapterStatus } from '$lib/types/modules/research/research-types';

	let campus: string = '';
	let title = 'Book Chapter Publication';
	let files: any = [];
	fileDataStore.set(files);

	export let data: any;

	console.log('data in side edit view ===>>>', data);
	console.log(
		'data in side edit view ankit mishra ===>>>',
		data.bookChapterPublicationData.bookChapterPublicationData[0]
	);

	let nmimsSchool = data?.bookChapterPublicationData?.school?.message;
	let nmimsCampus = data?.bookChapterPublicationData?.campus?.message;
	let nmimsAuthors = data?.bookChapterPublicationData?.nmimsAuthors?.message;
	let allAuthors = data?.bookChapterPublicationData?.allAuthors?.message;
	let allEditors = data?.bookChapterPublicationData?.editor?.message;
	console.log('nmimsSchool ankit mishra ===>>>>>', nmimsSchool);

	$: school = nmimsSchool;
	$: nmimsAuth = nmimsAuthors;
	$: allAuth = allAuthors;
	$: campus = nmimsCampus;
	$: editors = allEditors;

	console.log('JSON.stringify(school)', JSON.stringify(school));
	let isChecked: boolean = false;
	$: checkVal = isChecked;
	console.log('checkbox check ', checkVal);

	interface FileReq {
		documents: File[];
	}

	let checkData =
		data.bookChapterPublicationData.bookChapterPublicationData.length > 0 ? true : false;

	let obj: any = {
		book_chapter_id: checkData
			? parseInt(data.bookChapterPublicationData.bookChapterPublicationData[0].book_chapter_id)
			: null,
		nmims_school:
			checkData &&
			data.bookChapterPublicationData.bookChapterPublicationData[0].nmims_school != null
				? data.bookChapterPublicationData.bookChapterPublicationData[0].nmims_school.map(
						(dt: any) => {
							return { value: dt, label: dt };
						}
					)
				: [],
		nmims_campus:
			checkData &&
			data.bookChapterPublicationData.bookChapterPublicationData[0].nmims_campus != null
				? data.bookChapterPublicationData.bookChapterPublicationData[0].nmims_campus.map(
						(dt: any) => {
							return { value: dt, label: dt };
						}
					)
				: [],
		all_authors:
			checkData && data.bookChapterPublicationData.bookChapterPublicationData[0].all_authors != null
				? data.bookChapterPublicationData.bookChapterPublicationData[0].all_authors.map(
						(dt: any) => {
							return { value: dt.id, label: dt.name };
						}
					)
				: [],

		nmims_authors:
			checkData &&
			data.bookChapterPublicationData.bookChapterPublicationData[0].nmims_authors != null
				? data.bookChapterPublicationData.bookChapterPublicationData[0].nmims_authors.map(
						(dt: any) => {
							return { value: dt.id, label: dt.name };
						}
					)
				: [],
		book_editors:
			checkData &&
			data.bookChapterPublicationData.bookChapterPublicationData[0].book_editors != null
				? data.bookChapterPublicationData.bookChapterPublicationData[0].book_editors.map(
						(dt: any) => {
							return { value: dt.id, label: dt.editor_name };
						}
					)
				: [],
		book_title: checkData
			? data.bookChapterPublicationData.bookChapterPublicationData[0].book_title
			: '',
		chapter_title: checkData
			? data.bookChapterPublicationData.bookChapterPublicationData[0].chapter_title
			: '',
		edition: checkData ? data.bookChapterPublicationData.bookChapterPublicationData[0].edition : '',
		publish_year: checkData
			? data.bookChapterPublicationData.bookChapterPublicationData[0].publish_year
			: null,
		volume_no: checkData
			? data.bookChapterPublicationData.bookChapterPublicationData[0].volume_no
			: '',
		chapter_page_no: checkData
			? data.bookChapterPublicationData.bookChapterPublicationData[0].chapter_page_no
			: '',
		publisher: checkData
			? data.bookChapterPublicationData.bookChapterPublicationData[0].publisher
			: '',
		web_link: checkData
			? data.bookChapterPublicationData.bookChapterPublicationData[0].web_link
			: '',
		doi_no: checkData ? data.bookChapterPublicationData.bookChapterPublicationData[0].doi_no : '',
		publication_place: checkData
			? data.bookChapterPublicationData.bookChapterPublicationData[0].publication_place
			: '',
		isbn_no: checkData ? data.bookChapterPublicationData.bookChapterPublicationData[0].isbn_no : '',
		nmims_authors_count: checkData
			? data.bookChapterPublicationData.bookChapterPublicationData[0].nmims_authors_count
			: null,
		publisher_category: checkData
			? Number(data.bookChapterPublicationData.bookChapterPublicationData[0].publisher_category)
			: null
	};

	async function handleSubmit() {
		const bookChapterObj: bookChapterPublicationReq = {
			nmims_school:
				obj.nmims_school != null ? obj.nmims_school.map((data: { value: any }) => data.value) : [],
			nmims_campus:
				obj.nmims_campus != null ? obj.nmims_campus.map((data: { value: any }) => data.value) : [],
			all_authors:
				obj.all_authors != null
					? obj.all_authors.map((data: { value: any }) => Number(data.value))
					: [],
			nmims_authors:
				obj.nmims_authors != null
					? obj.nmims_authors.map((data: { value: any }) => Number(data.value))
					: [],
			book_editors:
				obj.book_editors != null
					? obj.book_editors.map((data: { value: any }) => Number(data.value))
					: [],
			book_title: obj.book_title,
			chapter_title: obj.chapter_title,
			edition: obj.edition,
			chapter_page_no: obj.chapter_page_no,
			volume_no: obj.volume_no,
			publisher_category: Number(obj.publisher_category),
			publish_year: Number(obj.publish_year),
			web_link: obj.web_link,
			publisher: obj.publisher,
			isbn_no: obj.isbn_no,
			doi_no: obj.doi_no,
			publication_place: obj.publication_place,
			nmims_authors_count: Number(obj.nmims_authors_count)
		};

		if (checkVal) {
			const fileObject: FileReq = {
				documents: files.map((f: any) => {
					return f.file;
				})
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

		console.log('obj.book_chapter_id ===>>>>', obj.book_chapter_id);
		formData.append('update_book_chapter', JSON.stringify(bookChapterObj));
		formData.append('book_chapter_id', JSON.stringify(obj.book_chapter_id));

		// Append each file to the FormData
		Array.from(files).forEach((file: any) => {
			formData.append('supporting_documents', file.file);
		});

		for (let [key, value] of formData.entries()) {
			console.log(`${key}: ${value}`);
		}

		console.log(JSON.stringify(bookChapterObj));
		const result = validateWithZod(bookChapterPublication, bookChapterObj);

		if (result.errors) {
			console.log(result.errors);
			const [firstPath, firstMessage] = Object.entries(result.errors)[0];
			toast.error('ALERT!', {
				description: firstMessage
			});
			return;
		}

		console.log('validated data', JSON.stringify(result.data));

		const { error, json } = await fetchFormApi<updateBookChapterStatus[]>({
			url: `${PUBLIC_API_BASE_URL}/book-chapter-publication-update`,
			method: 'POST',
			body: formData
		});

		if (error) {
			toast.error(error.message || 'Something went wrong!', {
				description: error.errorId ? `ERROR-ID: ${error.errorId}` : ''
			});
			return;
		}
		if (json && json.length > 0) {
			if (json[0].upsert_book_chapter.status == 403) {
				toast.error('ALERT!', {
					description: json[0].upsert_book_chapter.message
				});
			} else {
				toast.success('Updated Successfully');
				files = [];
				fileDataStore.set(files);
				isChecked = false;
				goto(`${PUBLIC_BASE_URL}book-chapter-publication`);
			}
		} else {
			toast.error('No response data received');
		}
	}

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

	function handleFiles(event: CustomEvent<File[]>) {
		files = event.detail;
		console.log('files details', files);
	}

	function handleDeleteFiles(event: CustomEvent) {
		files = event.detail;
	}
</script>

<Card {title}>
	<!-- Adjust max-height as needed -->
	<div class="modal-content p-4">
		<div class="grid grid-cols-1 gap-8 p-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
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
				placeholder="All Authors Names"
				options={getMasterAllAuthors(allAuth)}
				bind:selectedOptions={obj.all_authors}
				isMultiSelect={true}
			/>
		</div>

		<div class="grid grid-cols-1 gap-8 p-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
			<DynamicSelect
				isRequired={true}
				placeholder="Name Of NMIMS Authors"
				options={getMasterNmimsAuthors(nmimsAuth)}
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
		<div class="grid grid-cols-1 gap-8 p-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
			<Input type="text" placeholder="Title Of The Book" bind:value={obj.book_title} />
			<Input type="text" placeholder="Edition (if it isn't the first) " bind:value={obj.edition} />
			<Input
				type="text"
				placeholder="Page Numbers Of The Chapter "
				bind:value={obj.chapter_page_no}
			/>
		</div>
		<div class="grid grid-cols-1 gap-8 p-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
			<Input type="text" placeholder="Volume Number" bind:value={obj.volume_no} />
			<div class="ml-2">
				<!-- svelte-ignore a11y-label-has-associated-control -->
				<label class="text-sm text-[#888888]"
					>Publisher Category<span class="text-danger text-sm">*</span>
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
			<Input type="number" placeholder="Publication Year" bind:value={obj.publish_year} />
		</div>
		<div class="grid grid-cols-1 gap-8 p-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
			<Input type="text" placeholder="Publisher Name " bind:value={obj.publisher} />
			<Input type="text" placeholder="Weblink Of the Book" bind:value={obj.web_link} />
			<Input type="text" placeholder="ISBN Number" bind:value={obj.isbn_no} />
		</div>
		<div class="grid grid-cols-1 gap-8 p-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
			<Input type="text" placeholder="WebLink /DOI No." bind:value={obj.doi_no} />

			<Input type="text" placeholder="Place Of Publication" bind:value={obj.publication_place} />
			<Input
				type="number"
				placeholder="No. Of NMIMS Authors"
				bind:value={obj.nmims_authors_count}
			/>
		</div>

		<div
			class="grid grid-cols-1 items-center gap-4 p-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3"
		>
			<div class="space-y-4">
				<label for="supporting-documents" class="lms-label"
					>Upload Supporting Documents <i style="color: red;">*</i><br /></label
				>
				<label class="lms-label"
					>Click To Upload New File <input
						type="checkbox"
						bind:checked={isChecked}
						class="accent-primary"
					/></label
				>
				{#if checkVal}
					<File on:filesSelected={handleFiles} on:deletedFiles={handleDeleteFiles} isView={false} />
					{#if files.length > 0}
				      <p class="lms-label">{$fileDataStore.length} Files Uploaded</p>
				    {/if}
				{:else}
					<button class="lms-primary-btn mt-2" on:click={downLoadFiles}
						><i class="fa-solid fa-download text-md"></i></button
					>
				{/if}
			</div>
		</div>

		<div class="flex flex-col gap-4 p-4 md:flex-row">
			<button on:click={handleSubmit} class="lms-btn lms-primary-btn">Update</button>
		</div>
	</div>
</Card>



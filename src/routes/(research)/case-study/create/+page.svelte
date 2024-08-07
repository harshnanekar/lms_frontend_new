<script lang="ts">
	import { Input,File,DynamicSelect } from '$lib/components/ui';
	import { Card } from '$lib/components/ui';

	import {
		getSchool,
		getCampus,
		getMasterAllAuthors,
		getMasterNmimsAuthors
	} from '$lib/utils/select.helper';
	import { validateWithZod } from '$lib/utils/validations';
	import {
		caseStudy,
		type caseStudyReq,
	} from '$lib/schemas/modules/research/master-validations';
	import { type FileReq, fileSchema } from '$lib/schemas/modules/research/master-validations';
	import { toast } from 'svelte-sonner';
	import { fetchApi, fetchFormApi } from '$lib/utils/fetcher';
	import { PUBLIC_API_BASE_URL, PUBLIC_BASE_URL } from '$env/static/public';
	import type { any } from 'zod';
	import { goto } from '$app/navigation';
	import { fileDataStore } from '$lib/stores/modules/research/master.store';

	export let data: any;
	let isRequired = false;
	let title = 'Case Study';

	let nmimsAuthors = data?.caseData?.nmims_authors.message.length > 0 ? data?.caseData?.nmims_authors?.message : [];
	let allAuthors = data?.caseData?.all_authors.message.length > 0 ? data?.caseData?.all_authors?.message : [];
	let nmimsSchool = data?.caseData?.nmims_school.message.length > 0 ? data?.caseData?.nmims_school?.message : [];
	let nmimsCampus = data?.caseData?.nmims_campus.message.length > 0 ? data?.caseData?.nmims_campus?.message : [];

	// let isRequired = false;

	$: nmimsAuth = nmimsAuthors;
	$: allAuth = allAuthors;
	$: school = nmimsSchool;
	$: campus = nmimsCampus;

	let obj : any = {
		nmims_school: null,
		nmims_campus: null,
		publish_year: null,
		all_authors: null,
		nmims_authors: null,
		nmims_authors_count: null,
		publisher: '',
		publisher_category: 1,
		edition: '',
		page_no: '',
		volume_no: '',
		title: '',
		url: ''
	};

	let files: any = [];
	fileDataStore.set(files);

	async function handleSubmit() {
		const caseStudyObject: caseStudyReq = {
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
			title: obj.title,
			edition: obj.edition,
			page_no: obj.page_no,
			volume_no: obj.volume_no,
			publisher: obj.publisher,
			publish_year: Number(obj.publish_year),
			publisher_category: Number(obj.publisher_category),
			url: obj.url,
			nmims_authors_count: Number(obj.nmims_authors_count)
		};

		const fileObject: FileReq = {
			documents: files.map((f: any) => {
				return f.file;
			})
		};

		console.log('files object ', files);
		const fileresult = validateWithZod(fileSchema, fileObject);
		if (fileresult.errors) {
			console.log(fileresult.errors);
			const [firstPath, firstMessage] = Object.entries(fileresult.errors)[0];
			toast.error('ALERT!', {
				description: firstMessage
			});
			return;
		}

		const formData = new FormData();

		// Append each file to the FormData
		Array.from(files).forEach((file : any) => {
			formData.append('supporting_documents', file.file);
		});

		for (let [key, value] of formData.entries()) {
			console.log(`${key}: ${value}`);
		}

		console.log(JSON.stringify(caseStudyObject));
		const result = validateWithZod(caseStudy, caseStudyObject);

		if (result.errors) {
			console.log(result.errors);
			const [firstPath, firstMessage] = Object.entries(result.errors)[0];
			toast.error('ALERT!', {
				description: firstMessage
			});
			return;
		}

		console.log('validated data', JSON.stringify(result.data));
		formData.append('case_study', JSON.stringify(result.data));

		const { error, json } = await fetchFormApi({
			url: `${PUBLIC_API_BASE_URL}/case-study-insert`,
			method: 'POST',
			body: formData
		});

		if (error) {
			toast.error(error.message || 'Something went wrong!', {
				description: error.errorId ? `ERROR-ID: ${error.errorId}` : ''
			});
			return;
		}

		if (json[0].insert_case_study.status == 200) {
			toast.success('Inserted Successfully');
			clearForm();
			goto(`${PUBLIC_BASE_URL}case-study`);
		}
	}

	function clearForm() {
		obj = {
			nmims_school: null,
			nmims_campus: null,
			publish_year: null,
			all_authors: null,
			nmims_authors: null,
			nmims_authors_count: null,
			publisher: '',
			publisher_category: 1,
			edition: '',
			page_no: '',
			volume_no: '',
			title: '',
			url: ''
		};

		files = [];
		fileDataStore.set(files);
	}

	
	function handleFiles(event: CustomEvent<File[]>) {
		files = event.detail;
		console.log('files details', files);
	}

	function handleDeleteFiles(event: CustomEvent) {
		files = event.detail;
	}

</script>

<!-- <div class="shadow-card rounded-2xl border-[1px] border-[#E5E9F1] p-4 !pt-0 sm:p-6"> -->
<Card {title}>
	<div class="modal-content p-4">
		<!-- Adjust max-height as needed -->
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
				placeholder="All Authors"
				options={getMasterAllAuthors(allAuth)}
				bind:selectedOptions={obj.all_authors}
				isMultiSelect={true}
			/>
		</div>

		<div class="grid grid-cols-1 gap-8 p-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
			<DynamicSelect
				isRequired={true}
				placeholder="Nmims Authors"
				options={getMasterNmimsAuthors(nmimsAuth)}
				bind:selectedOptions={obj.nmims_authors}
				isMultiSelect={true}
			/>
			<Input type="text" placeholder="Title Of Case Study" bind:value={obj.title} />
			<Input type="text" {isRequired} placeholder="Edition" bind:value={obj.edition} />
		</div>

		<div class="grid grid-cols-1 gap-8 p-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
			<Input type="text" {isRequired} placeholder="Page No." bind:value={obj.page_no} />
			<Input type="text" placeholder="Volume No." bind:value={obj.volume_no} />
			<Input type="text" placeholder="Publisher" bind:value={obj.publisher} />
		</div>

		<div class="grid grid-cols-1 gap-8 p-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
			<Input type="number" placeholder="Publication Year" bind:value={obj.publish_year} />
			<div class="ml-2">
				<label class="text-sm text-[#888888]">
					Publisher Category<span class="text-danger text-sm">*</span>
				</label>
				<div class="mt-2.5 flex flex-row gap-[20px]">
					<div class="flex items-center">
						<input
							type="radio"
							id="international"
							class="lms-input-radio mr-2 w-4"
							name="publisher_category"
							bind:group={obj.publisher_category}
							value={1}
							checked
						/>
						<span class="text-sm text-[#888888]">International</span>
					</div>
					<div class="flex items-center">
						<input
							type="radio"
							id="national"
							class="lms-input-radio mr-2 w-4"
							name="publisher_category"
							bind:group={obj.publisher_category}
							value={2}
						/>
						<span class="text-sm text-[#888888]">National</span>
					</div>
				</div>
			</div>
			<Input type="text" placeholder="Url" bind:value={obj.url} />
		</div>

		<div class="grid grid-cols-1 items-center gap-8 p-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
			<Input
				type="number"
				placeholder="No. Of Nmims Authors"
				bind:value={obj.nmims_authors_count}
			/>
			<div class="space-y-2">
				<label class="lms-label"
					>Upload Supporting Documents<span class="text-primary">*</span></label
				>
				<File on:filesSelected={handleFiles} on:deletedFiles={handleDeleteFiles} isView={false} />
				{#if files.length > 0}
				{@const fileString = files.length > 1 ? 'Files' : 'File' }
				      <p class="lms-label">{files.length} {fileString} Uploaded</p>
				{/if}
			</div>	
		</div>
		<div class="flex flex-col gap-4 p-4 md:flex-row">
			<button class="lms-btn lms-secondary-btn" on:click={clearForm}>Clear Form</button>
			<button class="lms-btn lms-primary-btn" on:click={handleSubmit}>Submit</button>
		</div>
	</div></Card
>

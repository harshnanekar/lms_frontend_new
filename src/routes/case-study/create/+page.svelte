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
		getMasterAllAuthors,
		getMasterNmimsAuthors
	} from '$lib/utils/select.helper';
	import { validateWithZod } from '$lib/utils/validations';
	import {
		caseStudy,
		journalPaper,
		type caseStudyReq,
		type JournalPaperReq
	} from '$lib/schemas/modules/research/master-validations';
	import { type FileReq, fileSchema } from '$lib/schemas/modules/research/master-validations';
	import { toast } from 'svelte-sonner';
	import { fetchApi, fetchFormApi } from '$lib/utils/fetcher';
	import { PUBLIC_API_BASE_URL } from '$env/static/public';
	import type { any } from 'zod';
	import { goto } from '$app/navigation';

	export let data: any;
	let isRequired = false;
	let title = 'Case Study';

	let nmimsAuthors = data?.caseData?.nmims_authors?.message;
	let allAuthors = data?.caseData?.all_authors?.message;
	let nmimsSchool = data?.caseData?.nmims_school?.message;
	let nmimsCampus = data?.caseData?.nmims_campus?.message;

	// let isRequired = false;

	$: nmimsAuth = nmimsAuthors;
	$: allAuth = allAuthors;
	$: school = nmimsSchool;
	$: campus = nmimsCampus;

	let obj = {
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
			documents: Array.from(files)
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
		Array.from(files).forEach((file) => {
			formData.append('supporting_documents', file);
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
			goto('/case-study');
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
	}
</script>

<!-- <div class="shadow-card rounded-2xl border-[1px] border-[#E5E9F1] p-4 !pt-0 sm:p-6"> -->
<Card {title}>
	<div class="modal-content p-4">
		<!-- Adjust max-height as needed -->
		<div class="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
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

		<div class="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
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

		<div class="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
			<Input type="text" {isRequired} placeholder="Page No." bind:value={obj.page_no} />
			<Input type="text" placeholder="Volume No." bind:value={obj.volume_no} />
			<Input type="text" placeholder="Publisher" bind:value={obj.publisher} />
		</div>

		<div class="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
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

		<div class="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
			<Input
				type="number"
				placeholder="No. Of Nmims Authors"
				bind:value={obj.nmims_authors_count}
			/>
			<input type="file" bind:files multiple />
		</div>
		<div class="flex flex-col gap-4 p-4 md:flex-row">
			<button class="lms-btn lms-secondary-btn" on:click={clearForm}>Clear Form</button>
			<button class="lms-btn lms-primary-btn" on:click={handleSubmit}>Submit</button>
		</div>
	</div></Card
>

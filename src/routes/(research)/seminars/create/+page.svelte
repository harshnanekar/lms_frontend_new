<script lang="ts">
	import { Input, DatePicker, DynamicSelect,File } from '$lib/components/ui';
	import { SelectDateIcon, XIcon } from '$lib/components/icons';
	import { formatDateTimeShort, formatDate } from '$lib/utils/date-formatter';
	import { tooltip } from '$lib/utils/tooltip';
	import { fly } from 'svelte/transition';
	import { Card } from '$lib/components/ui';
	import { fileDataStore } from '$lib/stores/modules/research/master.store';

	import {
		getAbdcIndexed,
		getSchool,
		getCampus,
		getMasterNmimsAuthors
	} from '$lib/utils/select.helper';
	import { validateWithZod } from '$lib/utils/validations';
	import {
		researchSeminarObj,
		type ResearchSeminarReq
	} from '$lib/schemas/modules/research/master-validations';
	import { type FileReq, fileSchema } from '$lib/schemas/modules/research/master-validations';
	import { toast } from 'svelte-sonner';
	import { fetchApi, fetchFormApi } from '$lib/utils/fetcher';
	import { PUBLIC_API_BASE_URL, PUBLIC_BASE_URL } from '$env/static/public';
	import type { any } from 'zod';
	import { goto } from '$app/navigation';

	export let data: any;
	let isRequired = false;
	let title = 'Research Seminars';

	console.log('data received ', JSON.stringify(data));

	let nmimsAuthors = data?.researchSeminar?.nmims_authors?.message;
	let abdcIndexed = data?.researchSeminar?.abdcIndexed?.message;
	let nmimsSchool = data?.researchSeminar?.nmims_school?.message;
	let nmimsCampus = data?.researchSeminar?.nmims_campus?.message;

	$: abdcTypes = abdcIndexed;
	$: nmimsAuth = nmimsAuthors;
	$: school = nmimsSchool;
	$: campus = nmimsCampus;

	let publicationDate: Date | null = new Date();
	publicationDate = null;
	$: publicationFormattedDate = publicationDate;
	function handleDateChange(e: CustomEvent<any>) {
		if (!publicationDate) return;
		publicationFormattedDate = publicationDate;
		console.log('publication date ', publicationDate);
	}

	let researchDate: Date | null = new Date();
	researchDate = null;
	$: researchFormattedDate = researchDate;
	function handleResearchDateChange(e: CustomEvent<any>) {
		if (!researchDate) return;
		researchFormattedDate = researchDate;
	}

	let obj = {
		nmims_school: null,
		nmims_campus: null,
		topic: '',
		nmims_authors: null,
		journal_name: '',
		uid: '',
		publisher: '',
		resource_person: '',
		volume_no: '',
		issn_no: '',
		doi_no: null,
		scopus_site_score: '',
		impact_factor: null,
		paper_title: '',
		gs_indexed: '',
		wos_indexed: true,
		abdc_indexed: null,
		ugc_indexed: true,
		scs_indexed: '',
		publisher_category: 1
	};

	let files: any = [];
	fileDataStore.set(files);

	async function handleSubmit() {
		const researchSeminar: ResearchSeminarReq = {
			nmims_school:
				obj.nmims_school != null ? obj.nmims_school.map((data: { value: any }) => data.value) : [],
			nmims_campus:
				obj.nmims_campus != null ? obj.nmims_campus.map((data: { value: any }) => data.value) : [],
			topic: obj.topic,
			resource_person: obj.resource_person,
			nmims_authors:
				obj.nmims_authors != null
					? obj.nmims_authors.map((data: { value: any }) => Number(data.value))
					: [],
			paper_title: obj.paper_title,
			journal_name: obj.journal_name,
			publisher: obj.publisher,
			publisher_category: Number(obj.publisher_category),
			volume_no: obj.volume_no,
			issn_no: obj.issn_no,
			scopus_site_score: obj.scopus_site_score,
			impact_factor: Number(obj.impact_factor),
			scs_indexed: obj.scs_indexed,
			wos_indexed: obj.wos_indexed,
			gs_indexed: obj.gs_indexed,
			abdc_indexed: obj.abdc_indexed != null ? Number(obj.abdc_indexed.value) : null,
			ugc_indexed: obj.ugc_indexed,
			doi_no: obj.doi_no != null ? obj.doi_no : null,
			uid: obj.uid,
			publication_date:
				publicationFormattedDate != null ? formatDate(publicationFormattedDate) : '',
			research_date: researchFormattedDate != null ? formatDate(researchFormattedDate) : ''
		};

		const fileObject: FileReq = {
			documents:  files.map((f: any) => {
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
		Array.from(files).forEach((file) => {
			formData.append('supporting_documents', file.file);
		});

		for (let [key, value] of formData.entries()) {
			console.log(`${key}: ${value}`);
		}

		console.log(JSON.stringify(researchSeminar));
		const result = validateWithZod(researchSeminarObj, researchSeminar);

		if (result.errors) {
			console.log(result.errors);
			const [firstPath, firstMessage] = Object.entries(result.errors)[0];
			toast.error('ALERT!', {
				description: firstMessage
			});
			return;
		}

		formData.append('research_seminar', JSON.stringify(result.data));
		console.log('validated data', JSON.stringify(result.data));

		const { error, json } = await fetchFormApi({
			url: `${PUBLIC_API_BASE_URL}/research-seminar-insert`,
			method: 'POST',
			body: formData
		});

		if (error) {
			toast.error(error.message || 'Something went wrong!', {
				description: error.errorId ? `ERROR-ID: ${error.errorId}` : ''
			});
			return;
		}

		if (json[0].insert_research_seminar.status == 403) {
			toast.error('ALERT!', {
				description: json[0].insert_research_seminar.message
			});
		} else {
			toast.success('Inserted Successfully');
			publicationFormattedDate = null;
			clearForm();
			goto(`${PUBLIC_BASE_URL}seminars`);
		}
	}

	function clearForm() {
		obj = {
			nmims_school: null,
			nmims_campus: null,
			topic: '',
			nmims_authors: null,
			journal_name: '',
			uid: '',
			publisher: '',
			resource_person: '',
			volume_no: '',
			issn_no: '',
			doi_no: null,
			scopus_site_score: '',
			impact_factor: null,
			paper_title: '',
			gs_indexed: '',
			wos_indexed: true,
			abdc_indexed: null,
			ugc_indexed: true,
			scs_indexed: '',
			publisher_category: 1
		};

		publicationDate = null;
		researchDate = null;
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
			<Input type="text" placeholder="Topic Of Research Seminar" bind:value={obj.topic} />
		</div>

		<div class="grid grid-cols-1 gap-8 p-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
			<Input
				type="text"
				placeholder="Resource Person"
				{isRequired}
				bind:value={obj.resource_person}
			/>
			<DynamicSelect
				isRequired={true}
				placeholder="Nmims Authors"
				options={getMasterNmimsAuthors(nmimsAuth)}
				bind:selectedOptions={obj.nmims_authors}
				isMultiSelect={true}
			/>
			<Input type="text" placeholder="Title Of Paper" bind:value={obj.paper_title} />
		</div>

		<div class="grid grid-cols-1 gap-8 p-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
			<Input type="text" placeholder="Journal Name" bind:value={obj.journal_name} />
			<Input type="text" placeholder="Publisher" bind:value={obj.publisher} />
			<div class="ml-2">
				<label class="text-sm text-[#888888]">Publisher Category<span>*</span></label>
				<div class="mt-2.5 flex flex-row gap-[20px]">
					<div class="flex flex-row">
						<input
							type="radio"
							id="html"
							class="lms-input-radio w-4"
							name="radio-button-national"
							bind:group={obj.publisher_category}
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
			<Input type="text" {isRequired} placeholder="Vol,Issue,Page No." bind:value={obj.page_no} />
			<Input type="text" {isRequired} placeholder="ISSN No." bind:value={obj.issn_no} />
			<Input
				type="text"
				{isRequired}
				placeholder="Scopus Site Score"
				bind:value={obj.scopus_site_score}
			/>
		</div>

		<div class="grid grid-cols-1 gap-8 p-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
			<Input
				type="number"
				{isRequired}
				placeholder="Impact factor by Clarivate Analytics"
				bind:value={obj.impact_factor}
			/>
			<div class="ml-2">
				<label class="text-sm text-[#888888]">WOS Indexed<span>*</span></label>
				<div class="mt-2 flex flex-row gap-[20px]">
					<div class="flex flex-row">
						<input
							type="radio"
							id="html"
							class="lms-input-radio w-4"
							name="radio-button-wos"
							bind:group={obj.wos_indexed}
							value={true}
						/>
						<span class="text-sm text-[#888888]">Yes</span>
					</div>
					<div class="flex flex-row">
						<input
							type="radio"
							id="html"
							class="lms-input-radio w-4"
							name="radio-button-wos"
							bind:group={obj.wos_indexed}
							value={false}
						/>
						<span class="text-sm text-[#888888]">No</span>
					</div>
				</div>
			</div>
			<Input type="text" {isRequired} placeholder="Scopus Indexed" bind:value={obj.scs_indexed} />
		</div>

		<div class="grid grid-cols-1 gap-8 p-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
			<Input type="text" {isRequired} placeholder="GS Indexed" bind:value={obj.gs_indexed} />
			<DynamicSelect
				isRequired={true}
				placeholder="ABDC Indexed"
				options={getAbdcIndexed(abdcTypes)}
				bind:selectedOptions={obj.abdc_indexed}
				isMultiSelect={false}
			/>
			<div class="ml-2">
				<label class="text-sm text-[#888888]">UGC Indexed<span>*</span></label>
				<div class="mt-2 flex flex-row gap-[20px]">
					<div class="flex flex-row">
						<input
							type="radio"
							id="html"
							class="lms-input-radio w-4"
							name="radio-button-ugc"
							bind:group={obj.ugc_indexed}
							value={true}
						/>
						<span class="text-sm text-[#888888]">Yes</span>
					</div>
					<div class="flex flex-row">
						<input
							type="radio"
							id="html"
							class="lms-input-radio w-4"
							name="radio-button-ugc"
							bind:group={obj.ugc_indexed}
							value={false}
						/>
						<span class="text-sm text-[#888888]">No</span>
					</div>
				</div>
			</div>
		</div>

		<div class="grid grid-cols-1 items-center gap-8 p-4 md:grid-cols-2 lg:grid-cols-3">
			<Input type="text" {isRequired} placeholder="Weblink/DOI NO." bind:value={obj.doi_no} />
			<Input type="text" placeholder="UID" bind:value={obj.uid} />
			<div class="space-y-2">
				<label class="lms-label"
					>Upload Supporting Documents<span class="text-primary">*</span></label
				>
				<File on:filesSelected={handleFiles} on:deletedFiles={handleDeleteFiles} isView={false} />
			</div>	
		</div>

		<div class="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-2">
			<div class="flex gap-4 md:flex-row">
				<DatePicker
					on:change={handleResearchDateChange}
					bind:selectedDateTime={researchDate}
					disabled={(researchDate) => researchDate.getTime() < new Date().setHours(0, 0, 0, 0)}
				>
					<div class="text-primary hover:bg-base flex items-center gap-x-3 rounded-lg px-3 py-2">
						<SelectDateIcon />
						<span class="text-body-2 font-bold">Add Research Seminar Date</span>
					</div>
				</DatePicker>
				{#if researchFormattedDate}
					{@const formattedDate = formatDateTimeShort(new Date(researchFormattedDate))}
					<div
						class="bg-base text-label-md md:text-body-2 mr-3 flex items-center gap-x-4 rounded-3xl px-4 py-1 font-medium text-black md:py-3"
						in:fly={{ x: -100, duration: 300 }}
						out:fly={{ x: 100, duration: 300 }}
					>
						<p class="m-0 p-0">{formattedDate}</p>
						<button
							use:tooltip={{
								content: `<b class="text-primary">REMOVE</b> ${formattedDate}`
							}}
							on:click={() => {
								// remove the current date
								researchFormattedDate = null;
							}}
						>
							<XIcon />
						</button>
					</div>
				{/if}
			</div>

			<div class="flex gap-4 md:flex-row">
				<DatePicker
					on:change={handleDateChange}
					bind:selectedDateTime={publicationDate}
					disabled={(publicationDate) =>
						publicationDate.getTime() < new Date().setHours(0, 0, 0, 0)}
				>
					<div class="text-primary hover:bg-base flex items-center gap-x-3 rounded-lg px-3 py-2">
						<SelectDateIcon />
						<span class="text-body-2 font-bold">Add Publication Date</span>
					</div>
				</DatePicker>
				{#if publicationFormattedDate}
					{@const formattedDate = formatDateTimeShort(new Date(publicationFormattedDate))}
					<div
						class="bg-base text-label-md md:text-body-2 mr-3 flex items-center gap-x-4 rounded-3xl px-4 py-1 font-medium text-black md:py-3"
						in:fly={{ x: -100, duration: 300 }}
						out:fly={{ x: 100, duration: 300 }}
					>
						<p class="m-0 p-0">{formattedDate}</p>
						<button
							use:tooltip={{
								content: `<b class="text-primary">REMOVE</b> ${formattedDate}`
							}}
							on:click={() => {
								// remove the current date
								publicationFormattedDate = null;
							}}
						>
							<XIcon />
						</button>
					</div>
				{/if}
			</div>
		</div>
	</div>
	<div class="flex flex-col gap-4 p-4 md:flex-row">
		<button class="lms-btn lms-secondary-btn" on:click={clearForm}>Clear Form</button>
		<button class="lms-btn lms-primary-btn" on:click={handleSubmit}>Submit</button>
	</div>
</Card>

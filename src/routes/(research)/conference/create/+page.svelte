<script lang="ts">
	import { Input, DatePicker, DynamicSelect, File } from '$lib/components/ui';
	import { SelectDateIcon, XIcon } from '$lib/components/icons';
	import { formatDateTimeShort, formatDate } from '$lib/utils/date-formatter';
	import { tooltip } from '$lib/utils/tooltip';
	import { fly } from 'svelte/transition';
	import { Card } from '$lib/components/ui';
	import { fileDataStore } from '$lib/stores/modules/research/master.store';

	import {
		getSchool,
		getCampus,
		getMasterAllAuthors,
		getExternalAuthors,
		getEnternalAuthors
	} from '$lib/utils/select.helper';
	import { validateWithZod } from '$lib/utils/validations';
	import {
		conferenceData,
		type conferenceReq
	} from '$lib/schemas/modules/research/master-validations';
	import { type FileReq, fileSchema } from '$lib/schemas/modules/research/master-validations';
	import { toast } from 'svelte-sonner';
	import { fetchApi, fetchFormApi } from '$lib/utils/fetcher';
	import { PUBLIC_API_BASE_URL, PUBLIC_BASE_URL } from '$env/static/public';
	import type { any } from 'zod';
	import { goto } from '$app/navigation';
	import type { conferenceStatus } from '$lib/types/modules/research/research-types';

	export let data: any;
	let isRequired = false;
	let title = 'Conference';

	type FileReq = {
		documents: [File, ...File[]];
	};

	console.log('data ===>>>>>', data)
	let nmimsSchool = data?.conferenceDetails?.school.message.length > 0 ? data?.conferenceDetails?.school?.message : [];
	let nmimsCampus = data?.conferenceDetails?.campus.message.length > 0 ? data?.conferenceDetails?.campus?.message : [];
	let masterAllAuthors = data?.conferenceDetails?.masterAllAuthors.message.length > 0 ? data?.conferenceDetails?.masterAllAuthors?.message : [];
	let externalAuthors = data?.conferenceDetails?.externalAuthors.message.length > 0 ? data?.conferenceDetails?.externalAuthors?.message : [];
	let enternalAuthors = data?.conferenceDetails?.enternalAuthors.message.length > 0 ? data?.conferenceDetails?.enternalAuthors?.message : [];
	let conferenceDocumentAbbr = data?.conferenceDetails?.conferenceDocumentAbbr;
	
	let conference_abbr = conferenceDocumentAbbr
		.filter((data: { abbr: string }) => data.abbr === 'cd')
		.map((dt: { id: any }) => Number(dt.id))[0];
	let award_abbr = conferenceDocumentAbbr
		.filter((data: { abbr: string }) => data.abbr === 'ad')
		.map((dt: { id: any }) => Number(dt.id))[0];
	console.log('conference abbr ', conference_abbr, award_abbr);

	console.log(
		' aconferenceDetails ===>>>>>',
		JSON.stringify(data?.conferenceDetails?.conferenceDocumentAbbr)
	);
	console.log('nmimsSchool ankit mishra ===>>>>>', nmimsSchool);

	$: school = nmimsSchool;
	// $: allAuth = masterAllAuthors;
	$: allAuth = masterAllAuthors;
	$: campus = nmimsCampus;
	$: external = externalAuthors;
	$: internal = enternalAuthors;

	console.log('external ===>>>>>>', external);
	console.log('internal ===>>>>>>', internal);
	console.log('campus ===>>>>>>', campus);

	let publicationDate: Date | null = new Date();
	publicationDate = null;
	$: publicationFormattedDate = publicationDate ? formatDate(publicationDate) : null;

	function handleDateChange(e: CustomEvent<any>) {
		if (!publicationDate) return;
		publicationFormattedDate = formatDate(publicationDate);
		console.log('publication date ', publicationDate);
	}

	console.log('JSON.stringify(school)', JSON.stringify(school));

	let obj: any = {
		nmims_school: null,
		nmims_campus: null,
		paper_title: '',
		conference_name: '',
		all_authors: null,
		place: '',
		proceeding_published: true,
		conference_type: 1,
		presenting_author: '',
		organizing_body: '',
		volume_no: '',
		issn_no: '',
		publication_date: '',
		sponsored: 1,
		doi_no: '',
		internal_authors: null,
		external_authors: null
	};

	
	let conferenceFiles: any = [];
	let awardFiles: any = [];

	$: console.log('conference file ', conferenceFiles, awardFiles);

	let showInternal = false;
	let showExternal = false;

	let fileArr: any = [];

	let selectedConferencePreviewFile: any = [];
	let selectedAwardPreviewFile: any = [];

	// function for preview file award and documents

	function previewConferenceFile() {
		selectedConferencePreviewFile = fileArr
			.filter((data: any) => data.abbr === 'cd')
			.map((dt: any) => dt.file)[0];
		fileDataStore.set(selectedConferencePreviewFile);
	}

	function previewAwardFile() {
		selectedAwardPreviewFile = fileArr
			.filter((data: any) => data.abbr === 'ad')
			.map((dt: any) => dt.file)[0];
		fileDataStore.set(selectedAwardPreviewFile);
	}

	export function updateFiles(newFiles: any, abbr: string) {
		newFiles = newFiles
			.filter((item: { abbr: string }) => item.abbr === abbr)
			.map((data: any) => data.file)[0];
		fileDataStore.set(newFiles);
	}

	// function for handling the file for conference and award
	function handleConferenceFiles(event: CustomEvent<File[]>, abbr: string) {
		conferenceFiles = event.detail;
		fileArr.push({ abbr: abbr, file: conferenceFiles });
		updateFiles(fileArr, abbr);
	}

	function handleAwardFiles(event: CustomEvent<File[]>, abbr: string) {
		console.log('award files called');
		awardFiles = event.detail;
		fileArr.push({ abbr: abbr, file: awardFiles });
		updateFiles(fileArr, abbr);
	}

	function handleDeleteFiles(event: CustomEvent<File[]>, abbr: string) {
		const updatedFiles = event.detail;
		fileArr = fileArr.map((item: { abbr: string }) =>
			item.abbr === abbr ? { ...item, file: updatedFiles } : item
		);
		updateFiles(fileArr, abbr);
	}

	async function handleSubmit() {
		const conferenceObj: conferenceReq = {
			nmims_school:
				obj.nmims_school != null ? obj.nmims_school.map((data: { value: any }) => data.value) : [],
			nmims_campus:
				obj.nmims_campus != null ? obj.nmims_campus.map((data: { value: any }) => data.value) : [],
			paper_title: obj.paper_title,
			conference_name: obj.conference_name,
			all_authors:
				obj.all_authors != null
					? obj.all_authors.map((data: { value: any }) => Number(data.value))
					: [],
			place: obj.place,
			proceeding_published: obj.proceeding_published,
			conference_type: Number(obj.conference_type),
			presenting_author: obj.presenting_author,
			organizing_body: obj.organizing_body,
			volume_no: obj.volume_no,
			issn_no: obj.issn_no,
			doi_no: obj.doi_no,
			publication_date: publicationFormattedDate != null ? publicationFormattedDate : '',
			sponsored: obj.sponsored,
			amount: obj.amount,
			internal_authors:
				obj.internal_authors != null
					? obj.internal_authors.map((data: { value: any }) => Number(data.value))
					: [],
			external_authors:
				obj.external_authors != null
					? obj.external_authors.map((data: { value: any }) => Number(data.value))
					: []
		};

		const result = validateWithZod(conferenceData, conferenceObj);

		if (result.errors) {
			console.log(result.errors);
			const [firstPath, firstMessage] = Object.entries(result.errors)[0];
			toast.error('ALERT!', {
				description: firstMessage as string
			});
			return;
		}

		console.log('validated data', JSON.stringify(result.data));

		const formData = new FormData();
		formData.append('conference_publication', JSON.stringify(conferenceObj));
		const conferenceFileObject = { documents: conferenceFiles.map((f: any) => f.file) };
		const conferenceFileResult = validateWithZod(fileSchema, conferenceFileObject);

		// Validate award files
		const awardFileObject = { documents: awardFiles.map((f: any) => f.file) };
		const awardFileResult = validateWithZod(fileSchema, awardFileObject);

		// Check for validation errors in conference files
		if (conferenceFileResult.errors) {
			const [firstPath, firstMessage] = Object.entries(conferenceFileResult.errors)[0];
			toast.error('ALERT!', {
				description: firstMessage as string
			});
			return;
		}

		// Check for validation errors in award files
		if (awardFileResult.errors) {
			const [firstPath, firstMessage] = Object.entries(awardFileResult.errors)[0];
			toast.error('ALERT!', {
				description: firstMessage as string
			});
			return;
		}

		// Check if both conference files and award files are present
		if (conferenceFiles.length === 0 || awardFiles.length === 0) {
			toast.error('ALERT!', {
				description: 'Both conference and award files must be provided.'
			});
			return;
		}

		// Append conference files to formData
		conferenceFiles.forEach((file: any) => {
			formData.append(conference_abbr, file.file);
		});

		// Append award files to formData
		awardFiles.forEach((file: any) => {
			formData.append(award_abbr, file.file);
		});

		for (let [key, value] of formData.entries()) {
			console.log(`${key}: ${value}`);
		}

		const { error, json }  = await fetchFormApi<conferenceStatus[]>({
			url: `${PUBLIC_API_BASE_URL}/conference-insert`,
			method: 'POST',
			body: formData
		});

		const conferenceStatus = json as conferenceStatus[];

		if (error) {
			toast.error(error.message || 'Something went wrong!', {
				description: error.errorId ? `ERROR-ID: ${error.errorId}` : ''
			});
			return;
		}

		if(json && validateWithZod.length > 0){
			if (json[0].insert_conference.status === 403) {
			toast.error('ALERT!', {
				description: conferenceStatus[0].insert_conference.message
			});
		} else {
			toast.success('Inserted Successfully');
			clearForm();
			goto(`${PUBLIC_BASE_URL}conference`);
		}	
		
	}

	function clearForm() {
		obj = {
			nmims_school: null,
			nmims_campus: null,
			paper_title: '',
			conference_name: '',
			all_authors: null,
			place: '',
			proceeding_published: true,
			conference_type: 1,
			presenting_author: '',
			organizing_body: '',
			volume_no: '',
			issn_no: '',
			publication_date: '',
			enternal: '',
			external: '',
			doi_no: '',
			sponsored: 1,
			amount: '',
			internal_authors: null,
			external_authors: null
		};
		conferenceFiles = [];
		awardFiles = [];
		fileDataStore.set([]);
		publicationFormattedDate = null;
		showExternal = false;
		showInternal = false;
	}
</script>

<!-- <div class="shadow-card rounded-2xl border-[1px] border-[#E5E9F1] p-4 !pt-0 sm:p-6"> -->
<Card {title}>
	<div class="p-4">
		<!-- Adjust max-height as needed -->
		<div class="grid grid-cols-1 gap-8 p-4 md:grid-cols-2 lg:grid-cols-3">
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
			<Input type="text" placeholder="Title Of The Paper" bind:value={obj.paper_title} />
		</div>

		<div class="grid grid-cols-1 gap-8 p-4 md:grid-cols-2 lg:grid-cols-3">
			<Input type="text" placeholder="Name of Conference" bind:value={obj.conference_name} />
			<DynamicSelect
				isRequired={true}
				placeholder="All Authors Names"
				options={getMasterAllAuthors(allAuth)}
				bind:selectedOptions={obj.all_authors}
				isMultiSelect={true}
			/>
			<Input type="text" placeholder="Place of Conference" bind:value={obj.place} />
		</div>
		<div class="grid grid-cols-1 gap-8 p-4 md:grid-cols-2 lg:grid-cols-3">
			<div class="ml-2">
				<!-- svelte-ignore a11y-label-has-associated-control -->
				<label class="text-sm text-[#888888]"
					>Proceedings published<span class="text-danger text-sm">*</span>
				</label>
				<div class="mt-2.5 flex flex-row gap-[20px]">
					<div class="flex flex-row">
						<input
							type="radio"
							class="lms-input-radio w-4"
							name="proceedings-published"
							bind:group={obj.proceeding_published}
							value={true}
						/>
						<span class="text-sm text-[#888888]">Yes</span>
					</div>
					<div class="flex flex-row">
						<input
							type="radio"
							class="lms-input-radio w-4"
							name="proceedings-published"
							bind:group={obj.proceeding_published}
							value={false}
						/>
						<span class="text-sm text-[#888888]">No</span>
					</div>
				</div>
			</div>

			<div class="ml-2">
				<!-- svelte-ignore a11y-label-has-associated-control -->
				<label class="text-sm text-[#888888]"
					>Type Of Conference<span class="text-danger text-sm">*</span>
				</label>
				<div class="mt-2.5 flex flex-row gap-[20px]">
					<div class="flex flex-row">
						<input
							type="radio"
							class="lms-input-radio w-4"
							name="conference-type"
							bind:group={obj.conference_type}
							value={1}
						/>
						<span class="text-sm text-[#888888]">International </span>
					</div>
					<div class="flex flex-row">
						<input
							type="radio"
							class="lms-input-radio w-4"
							name="conference-type"
							bind:group={obj.conference_type}
							value={2}
						/>
						<span class="text-sm text-[#888888]"> National</span>
					</div>
				</div>
			</div>
			<Input type="text" placeholder="Presenting Author " bind:value={obj.presenting_author} />
		</div>
		<div class="grid grid-cols-1 gap-8 p-4 md:grid-cols-2 lg:grid-cols-3">
			<Input type="text" placeholder="Organizing Body" bind:value={obj.organizing_body} />
			<Input type="text" placeholder="Vol and issue no [e.g 9 (12)]" bind:value={obj.volume_no} />
			<Input type="text" placeholder="ISSN/ISNB No." bind:value={obj.issn_no} />
		</div>
		<div class="grid grid-cols-1 gap-8 p-4 md:grid-cols-2 lg:grid-cols-3">
			<div class="ml-2">
				<!-- svelte-ignore a11y-label-has-associated-control -->
				<label class="text-sm text-[#888888]"
					>Sponsored By NMIMS/Other<span class="text-danger text-sm">*</span>
				</label>
				<div class="mt-2.5 flex flex-row gap-[20px]">
					<div class="flex flex-row">
						<input
							type="radio"
							id="html"
							class="lms-input-radio w-4"
							name="radio-button-national"
							bind:group={obj.sponsored}
							checked={obj.sponsored == 1}
							value={1}
						/>
						<span class="text-sm text-[#888888]">NMIMS </span>
					</div>
					<div class="flex flex-row">
						<input
							type="radio"
							id="html"
							class="lms-input-radio w-4"
							name="radio-button-national"
							bind:group={obj.sponsored}
							value={2}
						/>
						<span class="text-sm text-[#888888]"> Other</span>
					</div>
				</div>
			</div>
			<Input type="text" placeholder="WebLink /DOI No." bind:value={obj.doi_no} />
			<Input type="number" placeholder="Amount Spent In RS. By NMIMS" bind:value={obj.amount} />
		</div>
		<div class="grid grid-cols-1 p-4 lg:p-8 md:grid-cols-3 lg:grid-cols-3 gap-4 items-center">
			<div>
				<label class="text-sm text-[#888888]"
					>Name Of Co-Authors<span class="text-danger text-sm">*</span>
				</label>
				<div class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-8">
					<div>
						<div  class="flex items-center mb-2">
							<input
								id="internal-checkbox"
								type="checkbox"
								class="lms-input-radio w-4"
								bind:checked={showInternal}
							/>
							<label for="internal-checkbox" class="ml-2 text-sm font-medium text-gray-900"
								>Internal</label
							>
						</div>
						{#if showInternal}
							<DynamicSelect
								isRequired={true}
								placeholder="Internal Authors"
								options={getEnternalAuthors(internal)}
								bind:selectedOptions={obj.internal_authors}
								isMultiSelect={true}
							/>
						{/if}
					</div>
					<div>
						<div class="flex items-center mb-2">
							<input
							id="external-checkbox"
							type="checkbox"
							class="lms-input-radio w-4"
							bind:checked={showExternal}
							/>
							<label for="external-checkbox" class="ml-2 text-sm font-medium text-gray-900"
								>External</label
							>
						</div>
						{#if showExternal}
							<DynamicSelect
								isRequired={true}
								placeholder="External Authors"
								options={getExternalAuthors(external)}
								bind:selectedOptions={obj.external_authors}
								isMultiSelect={true}
							/>
						{/if}
					</div>
				</div>
			</div> 

			<div class="space-y-2">
				<label class="text-sm text-[#888888]"
					>Upload Award Documents<span class="text-danger text-sm">*</span>
				</label>
				<File
					isCombine={true}
					on:filesSelected={(event) => handleAwardFiles(event, 'ad')}
					on:deletedFiles={(event) => handleDeleteFiles(event, 'ad')}
					on:previewFile={previewAwardFile}
					isView={false}
				/>
				{#if awardFiles.length > 0}
    				{@const filesString = awardFiles.length > 1 ? 'Files' : 'File'}
				      <p class="lms-label">{awardFiles.length} {filesString} Uploaded</p>
				{/if}
			</div> 
			<div class="space-y-2 ">
				<!-- svelte-ignore a11y-label-has-associated-control -->
				<label class="text-sm text-[#888888]"
					>Upload Conference Documents<span class="text-danger text-sm">*</span>
				</label>

				<File
					isCombine={true}
					on:filesSelected={(event) => handleConferenceFiles(event, 'cd')}
					isView={false}
					on:deletedFiles={(event) => handleDeleteFiles(event, 'cd')}
					on:previewFile={previewConferenceFile}
				/>
				{#if conferenceFiles.length > 0}
				      {@const filesString = conferenceFiles.length > 1 ? 'Files' : 'File'}
				      <p class="lms-label">{conferenceFiles.length} {filesString} Uploaded</p>
				{/if}
			</div>

			
			

 

		</div>
		<div class="grid grid-cols-1 p-4 lg:p-8 md:grid-cols-3 lg:grid-cols-2 gap-4 items-center">
			
			
			<div class="flex flex-wrap">
				<DatePicker
					on:change={handleDateChange}
					bind:selectedDateTime={publicationDate}
					disabled={(publicationDate) => publicationDate.getTime() < new Date().setHours(0, 0, 0, 0)}
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
								publicationFormattedDate = '';
							}}
						>
							<XIcon />
						</button>
					</div>
				{/if}
			</div>

			

			


		</div>
		
	</div>
	<div class="flex flex-col gap-8 p-4 md:flex-row">
		<button class="lms-btn lms-secondary-btn" on:click={clearForm}>Clear Form</button>
		<button class="lms-btn lms-primary-btn" on:click={handleSubmit}>Submit</button>
	</div>
</Card>

<script lang="ts">
	import { Input, DatePicker, DynamicSelect, File } from '$lib/components/ui';

	import { SelectDateIcon, XIcon } from '$lib/components/icons';

	import { formatDateTimeShort, formatDate } from '$lib/utils/date-formatter';

	import { tooltip } from '$lib/utils/tooltip';

	import { fly } from 'svelte/transition';

	import { Card } from '$lib/components/ui';

	import {
		getEnternalAuthors,
		getExternalAuthors,
		getInventionType,
		getSdgGoals,
		getPatentStatus,
		getSchool,
		getCampus,
		getApplicantNames
	} from '$lib/utils/select.helper';

	import { validateWithZod } from '$lib/utils/validations';

	import { iprDetails, type iprDetailsReq } from '$lib/schemas/modules/research/master-validations';

	import { type FileReq, fileSchema } from '$lib/schemas/modules/research/master-validations';

	import { toast } from 'svelte-sonner';

	import { fetchApi, fetchFormApi } from '$lib/utils/fetcher';

	import { PUBLIC_API_BASE_URL } from '$env/static/public';

	import type { any } from 'zod';

	import { goto } from '$app/navigation';
	import type { iprStatus } from '$lib/types/modules/research/research-types';

	import { fileDataStore } from '$lib/stores/modules/research/master.store';

	export let data: any;

	let isRequired = false;

	let title = 'IPR';

	let nmimsSchool = data?.iprDataList?.school?.message;

	let nmimsCampus = data?.iprDataList?.campus?.message;

	let enternalAuthors = data?.iprDataList?.internalAuthors?.message;

	let externalAuthors = data?.iprDataList?.externalAuthors?.message;

	let sdgGoals = data?.iprDataList?.sdgGoals?.message;

	let patetntStatus = data?.iprDataList?.status?.message;

	let inventionType = data?.iprDataList?.inventionType?.message;
	let applicantNames = data?.iprDataList?.applicantNames?.message;

	// let isRequired = false;

	console.log('render iprDataList', data.iprDataList);

	$: school = nmimsSchool;

	$: campus = nmimsCampus;

	$: patetntStatus = patetntStatus;

	$: sdgGoals = sdgGoals;

	$: inventionType = inventionType;

	$: external = externalAuthors;
	$: internal = enternalAuthors;

	$: applicantNames = applicantNames;

	let obj = {
		nmims_school: null,
		nmims_campus: null,
		invention_type: null,
		sdg_goals: null,
		patent_status: null,
		title: '',
		appln_no: '',
		filed_date: '',
		grant_date: '',
		published_date: '',
		publication_no: '',
		granted_no: '',
		institute_affiliation: '',
		applicant_names: null,
		internal_authors: null,
		external_authors: null
	};

	let filedDate: Date | null = new Date();
	filedDate = null;
	$: publicationFormattedDate = filedDate ? formatDate(filedDate) : '';

	let grantDate: Date | null = new Date();
	grantDate = null;
	$: grantFormattedDate = grantDate ? formatDate(grantDate) : '';

	let publishedDate: Date | null = new Date();
	publishedDate = null;
	$: publishedFormattedDate = publishedDate ? formatDate(publishedDate) : '';

	function handleDateChange(e: CustomEvent<any>) {
		if (!filedDate) return;
		publicationFormattedDate = formatDate(filedDate);
		console.log('publication date ', filedDate);
	}

	function handleGrandDate(e: CustomEvent<any>) {
		if (!grantDate) return;
		grantFormattedDate = formatDate(grantDate);
		console.log('grantDate ', grantDate);
	}

	function handleDateChange2(e: CustomEvent<any>) {
		if (!publishedDate) return;
		publishedFormattedDate = formatDate(publishedDate);
		console.log('publishedDate ', publishedDate);
	}

	let files: any = [];
	fileDataStore.set(files);

	let showInternal = false;
	let showExternal = false;

	// for file view and delete

	function handleFiles(event: CustomEvent<File[]>) {
		files = event.detail;
		console.log('files details', files);
	}

	function handleDeleteFiles(event: CustomEvent) {
		files = event.detail;
	}

	//submit function for sending data

	async function handleSubmit() {
		const iprObject: iprDetailsReq = {
			nmims_school:
				obj.nmims_school != null
					? (obj.nmims_school as any).map((data: { value: any }) => data.value)
					: [],
			nmims_campus:
				obj.nmims_campus != null
					? (obj.nmims_campus as any).map((data: { value: any }) => data.value)
					: [],
			invention_type: obj.invention_type != null ? Number((obj.invention_type as any).value) : 0,
			sdg_goals:
				obj.sdg_goals != null
					? (obj.sdg_goals as any).map((data: { value: any }) => Number(data.value))
					: [],
			patent_status: obj.patent_status != null ? Number((obj.patent_status as any).value) : 0,
			title: obj.title,
			appln_no: Number(obj.appln_no),
			filed_date: publicationFormattedDate != null ? publicationFormattedDate : '',
			grant_date: grantFormattedDate != null ? grantFormattedDate : '',
			published_date: publishedFormattedDate != null ? publishedFormattedDate : '',
			publication_no: Number(obj.publication_no),
			granted_no: Number(obj.granted_no),
			institute_affiliation: obj.institute_affiliation,
			internal_authors:
				obj.internal_authors != null
					? (obj.internal_authors as any).map((data: { value: any }) => Number(data.value))
					: [],
			external_authors:
				obj.external_authors != null
					? (obj.external_authors as any).map((data: { value: any }) => Number(data.value))
					: [],
			applicant_names:
				obj.applicant_names != null
					? (obj.applicant_names as any).map((data: { value: any }) => Number(data.value))
					: []
		};

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

		const formData = new FormData();
		formData.append('ipr_data', JSON.stringify(iprObject));

		// Append each file to the FormData
		Array.from(files).forEach((file: any) => {
			formData.append('supporting_documents', file.file);
		});

		for (let [key, value] of formData.entries()) {
			console.log(`${key}: ${value}`);
		}

		console.log(JSON.stringify(iprObject));
		const result = validateWithZod(iprDetails, iprObject);

		if (result.errors) {
			console.log(result.errors);
			const [firstPath, firstMessage] = Object.entries(result.errors)[0];
			toast.error('ALERT!', { description: firstMessage });
			return;
		}

		console.log('validated data', JSON.stringify(result.data));

		const { error, json } = await fetchFormApi<iprStatus[]>({
			url: `${PUBLIC_API_BASE_URL}/ipr-insert`,
			method: 'POST',
			body: formData
		});

		if (error) {
			toast.error(error.message || 'Something went wrong!', {
				description: error.errorId ? `ERROR-ID: ${error.errorId}` : ''
			});
			return;
		}

		if (json[0].insert_ipr.status == 403) {
			toast.error('ALERT!', { description: json[0].insert_ipr.message });
		} else {
			toast.success('Inserted Successfully');
			clearForm();
			goto('/ipr');
		}
	}

	function clearForm() {
		obj = {
			nmims_school: null,

			nmims_campus: null,

			invention_type: null,

			sdg_goals: null,

			patent_status: null,

			title: '',

			appln_no: '',

			filed_date: '',

			grant_date: '',

			published_date: '',

			publication_no: '',

			granted_no: '',

			institute_affiliation: '',

			applicant_names: null,

			internal_authors: null,
			external_authors: null
		};
		files = [];
		fileDataStore.set(files);
	}
</script>

<Card {title}>
	<div class="modal-content p-4">
		<div class="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
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
				placeholder="Type of Invention(IPR) "
				options={getInventionType(inventionType)}
				bind:selectedOptions={obj.invention_type}
				isMultiSelect={false}
			/>
		</div>

		<div class="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
			<DynamicSelect
				isRequired={true}
				placeholder="Sustainable Development Goals (SDG)?"
				options={getSdgGoals(sdgGoals)}
				bind:selectedOptions={obj.sdg_goals}
				isMultiSelect={true}
			/>

			<DynamicSelect
				isRequired={true}
				placeholder="Patent Status"
				options={getPatentStatus(patetntStatus)}
				bind:selectedOptions={obj.patent_status}
				isMultiSelect={false}
			/>

			<Input type="text" placeholder="Title of Patent / Invention" bind:value={obj.title} />
		</div>

		<div class="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
			<Input
				type="number"
				placeholder="Patent/Invention Application Number"
				bind:value={obj.appln_no}
			/>
			<Input
				type="number"
				placeholder="Patent/Invention Publication Number"
				bind:value={obj.publication_no}
			/>
			<Input
				type="number"
				placeholder="Patent/Invention Granted Number"
				bind:value={obj.granted_no}
			/>
		</div>

		<div class="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
			<Input
				type="text"
				placeholder="Institute Affiliation"
				bind:value={obj.institute_affiliation}
			/>
			<DynamicSelect
				isRequired={true}
				placeholder="Applicants Names"
				options={getApplicantNames(applicantNames)}
				bind:selectedOptions={obj.applicant_names}
				isMultiSelect={true}
			/>
			<div class="space-y-2">
				<!-- svelte-ignore a11y-label-has-associated-control -->
				<label class="lms-label"
					>Upload Supporting Documents<span class="text-primary">*</span></label
				>
				<File on:filesSelected={handleFiles} on:deletedFiles={handleDeleteFiles} isView={false} />
			</div>
		</div>
		<div class="grid grid-cols-1 p-4 md:grid-cols-2 lg:grid-cols-2">
			<div class="ml-2">
				<!-- svelte-ignore a11y-label-has-associated-control -->
				<label class="text-sm text-[#888888]"
					>Details of Inventors<span class="text-danger text-sm">*</span>
				</label>
				<div class="mt-2.5 flex gap-5">
					<div class="flex items-center">
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
					<div class="flex items-center">
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
				</div>
				<div class="flex items-center gap-x-3">
					{#if showInternal}
						<DynamicSelect
							isRequired={true}
							placeholder="Internal Authors"
							options={getEnternalAuthors(internal)}
							bind:selectedOptions={obj.internal_authors}
							isMultiSelect={true}
						/>
					{/if}
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
			<div class="flex flex-row p-4">
				<DatePicker
					on:change={handleDateChange}
					bind:selectedDateTime={filedDate}
					disabled={(filedDate) => filedDate.getTime() < new Date().setHours(0, 0, 0, 0)}
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
								publicationFormattedDate = '';
							}}
						>
							<XIcon />
						</button>
					</div>
				{/if}
			</div>
		</div>

		<div class="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-2">
			<div class="flex flex-row p-4">
				<!-- svelte-ignore missing-declaration -->
				<DatePicker
					on:change={handleGrandDate}
					bind:selectedDateTime={grantDate}
					disabled={(grantDate) => grantDate.getTime() < new Date().setHours(0, 0, 0, 0)}
				>
					<div class="text-primary hover:bg-base flex items-center gap-x-3 rounded-lg px-3 py-2">
						<SelectDateIcon />
						<span class="text-body-2 font-bold">Add Patent Grant Date</span>
					</div>
				</DatePicker>
				{#if grantFormattedDate}
					{@const formattedDate = formatDateTimeShort(new Date(grantFormattedDate))}
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
								grantFormattedDate = '';
							}}
						>
							<XIcon />
						</button>
					</div>
				{/if}
			</div>

			<div class="flex flex-row p-4">
				<DatePicker
					on:change={handleDateChange2}
					bind:selectedDateTime={publishedDate}
					disabled={(publishedDate) => publishedDate.getTime() < new Date().setHours(0, 0, 0, 0)}
				>
					<div class="text-primary hover:bg-base flex items-center gap-x-3 rounded-lg px-3 py-2">
						<SelectDateIcon />
						<span class="text-body-2 font-bold">Add Invention Published Date</span>
					</div>
				</DatePicker>
				{#if publishedFormattedDate}
					{@const formattedDate = formatDateTimeShort(new Date(publishedFormattedDate))}
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
								publishedFormattedDate = '';
							}}
						>
							<XIcon />
						</button>
					</div>
				{/if}
			</div>
		</div>
	</div>

	<div class="flex flex-row gap-[20px] p-4">
		<button class="lms-btn lms-secondary-btn" on:click={clearForm}>Clear Form</button>
		<button class="lms-btn lms-primary-btn" on:click={handleSubmit}>Submit</button>
	</div>
</Card>

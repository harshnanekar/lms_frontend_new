<script lang="ts">
	import { Input, DatePicker, DynamicSelect, File } from '$lib/components/ui';

	import { SelectDateIcon, XIcon } from '$lib/components/icons';

	import { formatDateTimeShort, formatDate } from '$lib/utils/date-formatter';

	import { tooltip } from '$lib/utils/tooltip';

	import { fly } from 'svelte/transition';

	import { Card } from '$lib/components/ui';

	import { fileDataStore } from '$lib/stores/modules/research/master.store';

	import {
		getEnternalAuthors,
		getExternalAuthors,
		getResearchStatus,
		getSchool,
		getCampus
	} from '$lib/utils/select.helper';

	import { validateWithZod } from '$lib/utils/validations';

	import {
		researchProjectDetails,
		type ResearchProjectDetailsReq
	} from '$lib/schemas/modules/research/master-validations';

	import { type FileReq, fileSchema } from '$lib/schemas/modules/research/master-validations';

	import { toast } from 'svelte-sonner';

	import { fetchApi, fetchFormApi } from '$lib/utils/fetcher';

	import { PUBLIC_API_BASE_URL, PUBLIC_BASE_URL } from '$env/static/public';

	import type { any } from 'zod';

	import { goto } from '$app/navigation';
	import type { researchProjectStatus } from '$lib/types/modules/research/research-types';

	export let data: any;

	let isRequired = false;

	let title = 'Research Project';

	let nmimsSchool = data?.ResearchProjectDataList?.school?.message;

	let nmimsCampus = data?.ResearchProjectDataList?.campus?.message;

	let enternalAuthors = data?.ResearchProjectDataList?.internalAuthors?.message;

	let externalAuthors = data?.ResearchProjectDataList?.externalAuthors?.message;

	let researchStatus = data?.ResearchProjectDataList?.status?.message;

	// let isRequired = false;

	console.log('render ResearchProjectDataList', data.ResearchProjectDataList);

	$: school = nmimsSchool;

	$: campus = nmimsCampus;

	$: researchStatus = researchStatus;

	$: external = externalAuthors;
	$: internal = enternalAuthors;

	let obj = {
		nmims_school: null,
		nmims_campus: null,
		research_status: null,
		title: '',
		thrust_area: '',
		grant_proposal: 1,
		grant_type: 1,
		funding_amount: '',
		funding_agency: '',
		scheme: '',
		received_amount: '',
		grant_date: '',
		duration: '',
		payment_date: '',
		internal_authors: null,
		external_authors: null
	};

	let grantDate: Date | null = new Date();
	grantDate = null;
	$: grantFormattedDate = grantDate ? formatDate(grantDate) : '';

	let paymentDate: Date | null = new Date();
	paymentDate = null;
	$: paymentFormattedDate = paymentDate ? formatDate(paymentDate) : '';

	function handleDateChange1(e: CustomEvent<any>) {
		if (!grantDate) return;
		grantFormattedDate = formatDate(grantDate);
		console.log('grantDate ', grantDate);
	}

	function handleDateChange2(e: CustomEvent<any>) {
		if (!paymentDate) return;
		paymentFormattedDate = formatDate(paymentDate);
		console.log('paymentDate ', paymentDate);
	}

	let files: any = [];
	fileDataStore.set(files);

	let showInternal = false;
	let showExternal = false;

	function handleInternalChange(event: { target: { checked: boolean } }) {
		showInternal = event.target.checked;
	}

	function handleExternalChange(event: { target: { checked: boolean } }) {
		showExternal = event.target.checked;
	}

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
		const researchProjectObj: ResearchProjectDetailsReq = {
			nmims_school:
				obj.nmims_school != null
					? (obj.nmims_school as any).map((data: { value: any }) => data.value)
					: [],
			nmims_campus:
				obj.nmims_campus != null
					? (obj.nmims_campus as any).map((data: { value: any }) => data.value)
					: [],
			research_status: obj.research_status != null ? Number((obj.research_status as any).value) : 0,
			title: obj.title,
			thrust_area: obj.thrust_area,
			grant_proposal: Number(obj.grant_proposal),
			grant_type: Number(obj.grant_type),
			duration: obj.duration,
			funding_amount: Number(obj.funding_amount),
			funding_agency: obj.funding_agency,
			scheme: obj.scheme,
			received_amount: Number(obj.received_amount),
			grant_date: grantFormattedDate,
			payment_date: paymentFormattedDate,
			internal_authors:
				obj.internal_authors != null
					? (obj.internal_authors as any).map((data: { value: any }) => Number(data.value))
					: [],
			external_authors:
				obj.external_authors != null
					? (obj.external_authors as any).map((data: { value: any }) => Number(data.value))
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
		formData.append('ipr_data', JSON.stringify(researchProjectObj));

		// Append each file to the FormData
		Array.from(files).forEach((file: any) => {
			formData.append('supporting_documents', file.file);
		});

		for (let [key, value] of formData.entries()) {
			console.log(`${key}: ${value}`);
		}

		console.log(JSON.stringify(researchProjectObj));
		const result = validateWithZod(researchProjectDetails, researchProjectObj);

		if (result.errors) {
			console.log(result.errors);
			const [firstPath, firstMessage] = Object.entries(result.errors)[0];
			toast.error('ALERT!', { description: firstMessage });
			return;
		}

		console.log('validated data', JSON.stringify(result.data));

		const { error, json } = await fetchFormApi<researchProjectStatus[]>({
			url: `${PUBLIC_API_BASE_URL}/research-project-insert`,
			method: 'POST',
			body: formData
		});

		if (error) {
			toast.error(error.message || 'Something went wrong!', {
				description: error.errorId ? `ERROR-ID: ${error.errorId}` : ''
			});
			return;
		}
		if(json && json.length > 0){
			if (json[0].insert_research_project.status == 403) {
			toast.error('ALERT!', { description: json[0].insert_research_project.message });
		} else {
			toast.success('Inserted Successfully');
			clearForm();
			goto(`${PUBLIC_BASE_URL}research-project`);
		}
		} 
		else {
			toast.error('No response data received');
		}
	
	}

	function clearForm() {
		obj = {
			nmims_school: null,
			nmims_campus: null,
			research_status: null,
			title: '',
			thrust_area: '',
			grant_proposal: 1,
			grant_type: 1,
			funding_amount: '',
			funding_agency: '',
			scheme: '',
			received_amount: '',
			grant_date: '',
			duration: '',
			payment_date: '',
			internal_authors: null,
			external_authors: null
		};
		files = [];
		fileDataStore.set(files);
	}
</script>

<Card {title}>
	<div class="modal-content p-4">
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

			<DynamicSelect
				isRequired={true}
				placeholder="Research Status"
				options={getResearchStatus(researchStatus)}
				bind:selectedOptions={obj.research_status}
				isMultiSelect={false}
			/>
		</div>

		<div class="grid grid-cols-1 gap-8 p-4 md:grid-cols-2 lg:grid-cols-3">
			<Input type="text" placeholder="Title of Project" bind:value={obj.title} />
			<Input type="text" placeholder="Thrust area of Research" bind:value={obj.thrust_area} />
			<div class="ml-2">
				<!-- svelte-ignore a11y-label-has-associated-control -->
				<label class="text-sm text-[#888888]"
					>Type of Grant<span class="text-danger text-sm">*</span>
				</label>
				<div class="mt-2.5 flex flex-row gap-[20px]">
					<div class="flex flex-row">
						<input
							type="radio"
							class="lms-input-radio w-4"
							name="proceedings-published"
							bind:group={obj.grant_type}
							value={1}
						/>
						<span class="text-sm text-[#888888]"> Research Project </span>
					</div>
					<div class="flex flex-row">
						<input
							type="radio"
							class="lms-input-radio w-4"
							name="Type of Grant"
							bind:group={obj.grant_type}
							value={2}
						/>
						<span class="text-sm text-[#888888]">Consultancy</span>
					</div>

					<div class="flex flex-row">
						<input
							type="radio"
							class="lms-input-radio w-4"
							name="Type of Grant"
							bind:group={obj.grant_type}
							value={3}
						/>
						<span class="text-sm text-[#888888]">Capacity Building</span>
					</div>
				</div>
			</div>
		</div>

		<div class="grid grid-cols-1 gap-8 p-4 md:grid-cols-2 lg:grid-cols-3">
			<!-- svelte-ignore a11y-label-has-associated-control -->
			<div class="ml-2">
				<label class="text-sm text-[#888888]"
					>Grant Proposal<span class="text-danger text-sm">*</span>
				</label>
				<div class="mt-2.5 flex flex-row gap-[20px]">
					<div class="flex flex-row">
						<input
							type="radio"
							class="lms-input-radio w-4"
							name="grant-proposal"
							bind:group={obj.grant_proposal}
							value={1}
							checked={obj.grant_proposal == 1}
						/>
						<span class="text-sm text-[#888888]">Goverment</span>
					</div>
					<div class="flex flex-row">
						<input
							type="radio"
							class="lms-input-radio w-4"
							name="grant-proposal"
							bind:group={obj.grant_proposal}
							value={2}
						/>
						<span class="text-sm text-[#888888]">Industry</span>
					</div>
				</div>
			</div>
			<Input type="number" placeholder="Funding Amount" bind:value={obj.funding_amount} />
			<Input type="text" placeholder="Name of Funding Agency" bind:value={obj.funding_agency} />
		</div>

		<div class="grid grid-cols-1 gap-8 p-4 md:grid-cols-2 lg:grid-cols-3">
			<Input type="text" placeholder="Duration Of Project In Months" bind:value={obj.duration} />
			<Input type="text" placeholder="Scheme " bind:value={obj.scheme} />
			<Input type="number" placeholder="Amount Received" bind:value={obj.received_amount} />
		</div>
		<div class="grid grid-cols-1 gap-8 p-4 md:grid-cols-2 lg:grid-cols-3">
			<div class="space-y-2">
				<!-- svelte-ignore a11y-label-has-associated-control -->
				<label class="lms-label"
					>Upload Supporting Documents<span class="text-primary">*</span></label
				>
				<File on:filesSelected={handleFiles} on:deletedFiles={handleDeleteFiles} isView={false} />
			</div>

			<div class="ml-2">
				<!-- svelte-ignore a11y-label-has-associated-control -->
				<label class="text-sm text-[#888888]"
					>Details of Faculty<span class="text-danger text-sm">*</span>
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
		</div>
		<div class="grid grid-cols-1 gap-8 p-4 md:grid-cols-2 lg:grid-cols-2">
			<div class="flex gap-4 md:flex-row">
				<DatePicker
					on:change={handleDateChange1}
					bind:selectedDateTime={grantDate}
					disabled={(grantDate) => grantDate.getTime() < new Date().setHours(0, 0, 0, 0)}
				>
					<div class="text-primary hover:bg-base flex items-center gap-x-3 rounded-lg px-3 py-2">
						<SelectDateIcon />
						<span class="text-body-2 gap[10px] text-inline font-bold">Submission/Grant Date</span>
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
			<div class="gap[10px] flex md:flex-row">
				<DatePicker
					on:change={handleDateChange2}
					bind:selectedDateTime={paymentDate}
					disabled={(paymentDate) => paymentDate.getTime() < new Date().setHours(0, 0, 0, 0)}
				>
					<div class="text-primary hover:bg-base gap[10px] flex items-center rounded-lg px-3 py-2 gap-x-4">
						<SelectDateIcon />
						<span class="text-body-2 font-bold">Annual Payment Date</span>
					</div>
				</DatePicker>
				{#if paymentFormattedDate}
					{@const formattedDate = formatDateTimeShort(new Date(paymentFormattedDate))}
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
								paymentFormattedDate = '';
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

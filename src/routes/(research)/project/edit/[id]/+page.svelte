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
	import { fileDataStore } from '$lib/stores/modules/research/master.store';
	import type { any } from 'zod';
	import { goto } from '$app/navigation';
	import type { updatedResearchProjectStatus } from '$lib/types/modules/research/research-types';

	export let data: any;

	// let isRequired = false;
	let isChecked: boolean = false;
	$: checkVal = isChecked;

	let title = 'Research Project';

	let nmimsSchool = data?.ResearchProjectDataList?.school?.message.length > 0 ? data?.ResearchProjectDataList?.school?.message : [];
	let nmimsCampus = data?.ResearchProjectDataList?.campus?.message.length > 0 ? data?.ResearchProjectDataList?.campus?.message : [];
	let enternalAuthors = data?.ResearchProjectDataList?.internalAuthors?.message.length > 0 ? data?.ResearchProjectDataList?.internalAuthors?.message : [];
	let externalAuthors = data?.ResearchProjectDataList?.externalAuthors?.message.length > 0 ? data?.ResearchProjectDataList?.externalAuthors?.message : [];
	let researchStatus = data?.ResearchProjectDataList?.status?.message.length > 0 ? data?.ResearchProjectDataList?.status?.message : [];

	// let isRequired = false;

	console.log('ResearchProjectDataList ===>>>>>>>>', data.ResearchProjectDataList);

	$: school = nmimsSchool;
	$: campus = nmimsCampus;
	$: researchStatus = researchStatus;
	$: external = externalAuthors;
	$: internal = enternalAuthors;

	console.log(
		'data.ResearchProjectDataList.iprdata[0].research_project_id ==>>',
		data.ResearchProjectDataList.ResearchProjectDataList[0].research_project_id
	);

	let obj: any = {
		research_project_id: parseInt(
			data.ResearchProjectDataList.ResearchProjectDataList[0].research_project_id
		),
		nmims_school:
			data.ResearchProjectDataList.ResearchProjectDataList.length > 0 &&
			data.ResearchProjectDataList.ResearchProjectDataList[0].nmims_school != null
				? data.ResearchProjectDataList.ResearchProjectDataList[0].nmims_school.map((dt: any) => {
						return { value: dt, label: dt };
					})
				: [],
		nmims_campus:
			data.ResearchProjectDataList.ResearchProjectDataList.length > 0 &&
			data.ResearchProjectDataList.ResearchProjectDataList[0].nmims_campus != null
				? data.ResearchProjectDataList.ResearchProjectDataList[0].nmims_campus.map((dt: any) => {
						return { value: dt, label: dt };
					})
				: [],

		research_status:
			data.ResearchProjectDataList.ResearchProjectDataList.length > 0 &&
			data.ResearchProjectDataList.ResearchProjectDataList[0].research_status
				? {
						value: data.ResearchProjectDataList.ResearchProjectDataList[0].status_id,
						label: data.ResearchProjectDataList.ResearchProjectDataList[0].research_status
					}
				: null,
		title:
			data.ResearchProjectDataList.ResearchProjectDataList.length > 0 &&
			data.ResearchProjectDataList.ResearchProjectDataList[0].title
				? data.ResearchProjectDataList.ResearchProjectDataList[0].title
				: '',
		grant_proposal: Number(data.ResearchProjectDataList.ResearchProjectDataList[0].grant_proposal),
		grant_type: Number(data.ResearchProjectDataList.ResearchProjectDataList[0].grant_type),
		thrust_area:
			data.ResearchProjectDataList.ResearchProjectDataList.length > 0 &&
			data.ResearchProjectDataList.ResearchProjectDataList[0].thrust_area
				? data.ResearchProjectDataList.ResearchProjectDataList[0].thrust_area
				: '',
		funding_amount:
			data.ResearchProjectDataList.ResearchProjectDataList.length > 0 &&
			data.ResearchProjectDataList.ResearchProjectDataList[0].funding_amount
				? data.ResearchProjectDataList.ResearchProjectDataList[0].funding_amount
				: null,
		funding_agency:
			data.ResearchProjectDataList.ResearchProjectDataList.length > 0 &&
			data.ResearchProjectDataList.ResearchProjectDataList[0].funding_agency
				? data.ResearchProjectDataList.ResearchProjectDataList[0].funding_agency
				: '',
		duration:
			data.ResearchProjectDataList.ResearchProjectDataList.length > 0 &&
			data.ResearchProjectDataList.ResearchProjectDataList[0].duration
				? data.ResearchProjectDataList.ResearchProjectDataList[0].duration
				: '',
		scheme:
			data.ResearchProjectDataList.ResearchProjectDataList.length > 0 &&
			data.ResearchProjectDataList.ResearchProjectDataList[0].scheme
				? data.ResearchProjectDataList.ResearchProjectDataList[0].scheme
				: '',
		received_amount:
			data.ResearchProjectDataList.ResearchProjectDataList.length > 0 &&
			data.ResearchProjectDataList.ResearchProjectDataList[0].received_amount
				? data.ResearchProjectDataList.ResearchProjectDataList[0].received_amount
				: null,

		grant_date:
			data.ResearchProjectDataList.ResearchProjectDataList.length > 0 &&
			data.ResearchProjectDataList.ResearchProjectDataList[0].grant_date
				? data.ResearchProjectDataList.ResearchProjectDataList[0].grant_date
				: '',
		payment_date:
			data.ResearchProjectDataList.ResearchProjectDataList.length > 0 &&
			data.ResearchProjectDataList.ResearchProjectDataList[0].payment_date
				? data.ResearchProjectDataList.ResearchProjectDataList[0].payment_date
				: '',

		internal_authors:
			data.ResearchProjectDataList.ResearchProjectDataList[0].internal_faculty &&
			data.ResearchProjectDataList.ResearchProjectDataList[0].internal_faculty.length > 0
				? data.ResearchProjectDataList.ResearchProjectDataList[0].internal_faculty.map(
						(dt: any) => {
							return { value: dt.id, label: dt.faculty_name };
						}
					)
				: null,
		external_authors:
			data.ResearchProjectDataList.ResearchProjectDataList[0].external_faculty &&
			data.ResearchProjectDataList.ResearchProjectDataList[0].external_faculty.length > 0
				? data.ResearchProjectDataList.ResearchProjectDataList[0].external_faculty.map(
						(dt: any) => {
							return { value: dt.id, label: dt.faculty_name };
						}
					)
				: null
	};

	let grantDate: Date | null = new Date();
	grantDate =
		data.ResearchProjectDataList.ResearchProjectDataList.length > 0 &&
		data.ResearchProjectDataList.ResearchProjectDataList[0].grant_date != null
			? new Date(data.ResearchProjectDataList.ResearchProjectDataList[0].grant_date)
			: null;
	$: grantFormattedDate = grantDate ? formatDate(grantDate) : '';

	let paymentDate: Date | null = new Date();
	paymentDate =
		data.ResearchProjectDataList.ResearchProjectDataList.length > 0 &&
		data.ResearchProjectDataList.ResearchProjectDataList[0].payment_date != null
			? new Date(data.ResearchProjectDataList.ResearchProjectDataList[0].payment_date)
			: null;
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

	$: console.log('final obj ', JSON.stringify(obj));

	showInternal = obj.internal_authors != null ? true : false;
	showExternal = obj.external_authors != null ? true : false;

	$: showInternalFaculty = showInternal;
	$: showExternalFaculty = showExternal;

	//submit function for sending data
	console.log('obj.invention_type ==>>>>', obj.invention_type);

	async function handleSubmit() {
		const researchProjectObj: ResearchProjectDetailsReq = {
			nmims_school:
				obj.nmims_school != null ? obj.nmims_school.map((data: { value: any }) => data.value) : [],
			nmims_campus:
				obj.nmims_campus != null ? obj.nmims_campus.map((data: { value: any }) => data.value) : [],
			research_status: obj.research_status != null ? Number(obj.research_status.value) : 0,
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
					? obj.internal_authors.map((data: { value: any }) => Number(data.value))
					: [],
			external_authors:
				obj.external_authors != null
					? obj.external_authors.map((data: { value: any }) => Number(data.value))
					: []
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
		formData.append('update_research_project_data', JSON.stringify(researchProjectObj));
		formData.append('research_project_id', obj.research_project_id);

		Array.from(files).forEach((file: any) => {
			formData.append('supporting_documents', file);
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

		const { error, json } = await fetchFormApi<updatedResearchProjectStatus[]>({
			url: `${PUBLIC_API_BASE_URL}/research-project-update`,
			method: 'POST',
			body: formData
		});

		const researchProject = json as updatedResearchProjectStatus[]

		if (error) {
			toast.error(error.message || 'Something went wrong!', {
				description: error.errorId ? `ERROR-ID: ${error.errorId}` : ''
			});
			return;
		}
		
		if (researchProject[0].upsert_research_project.status == 403) {
			toast.error('ALERT!', { description: researchProject[0].upsert_research_project.message });
		} else {
			toast.success('Updated Successfully');
			goto(`${PUBLIC_BASE_URL}project`);
		}
		
		
	}

	async function downLoadFiles() {
		fetch(`${PUBLIC_API_BASE_URL}/research-project-download-files?id=${obj.research_project_id}`)
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
				a.download = 'research_project_document.zip';
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
				<label class="text-sm text-[#888888]">
					Grant Proposal<span class="text-danger text-sm">*</span>
				</label>
				<div class="mt-2.5 flex flex-row gap-[20px]">
					<div class="flex flex-row">
						<input
							type="radio"
							class="lms-input-radio w-4"
							name="grant-proposal"
							bind:group={obj.grant_proposal}
							value={1}
						/>
						<span class="text-sm text-[#888888]"> Goverment</span>
					</div>
					<div class="flex flex-row">
						<input
							type="radio"
							class="lms-input-radio w-4"
							name="grant-proposal"
							bind:group={obj.grant_proposal}
							value={2}
						/>
						<span class="text-sm text-[#888888]"> Industry</span>
					</div>
				</div>
			</div>
		</div>

		<div class="grid grid-cols-1 gap-8 p-4 md:grid-cols-2 lg:grid-cols-3">
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
							name="grant-type"
							bind:group={obj.grant_type}
							value={1}
						/>
						<span class="text-sm text-[#888888]">Research Project</span>
					</div>
					<div class="flex flex-row">
						<input
							type="radio"
							class="lms-input-radio w-4"
							name="grant-type"
							bind:group={obj.grant_type}
							value={2}
						/>
						<span class="text-sm text-[#888888]"> Consultancy </span>
					</div>
					<div class="flex flex-row">
						<input
							type="radio"
							class="lms-input-radio w-4"
							name="grant-type"
							bind:group={obj.grant_type}
							value={3}
						/>
						<span class="text-sm text-[#888888]">Capacity Building </span>
					</div>
				</div>
			</div>
			<Input type="number" placeholder="Funding Amount" bind:value={obj.funding_amount} />
			<Input type="text" placeholder="Name of Funding Agency " bind:value={obj.funding_agency} />
		</div>
		<div class="grid grid-cols-1 gap-8 p-4 md:grid-cols-2 lg:grid-cols-3">
			<Input type="text" placeholder="Duration Of Project In Months" bind:value={obj.duration} />
			<Input type="text" placeholder="Scheme" bind:value={obj.scheme} />
			<Input type="number" placeholder="Amount Received" bind:value={obj.received_amount} />
		</div>

		<div class="grid grid-cols-1 gap-8 p-4 md:grid-cols-2 lg:grid-cols-3">
			<div class="space-y-4">
				<label for="supporting-documents" class="lms-label"
					>Upload Supporting Documents <i style="color: red;">*</i><br /></label
				>
				<label class="lms-label"
					>Click To Upload New File
					<input type="checkbox" bind:checked={isChecked} class="accent-primary" />
				</label>
				{#if checkVal}
					<File on:filesSelected={handleFiles} on:deletedFiles={handleDeleteFiles} isView={false} />
					{#if files.length > 0}
				      {@const fileString = files.length > 1 ? 'Files' : 'File' }
				      <p class="lms-label">{files.length} {fileString} Uploaded</p>
			        {/if}
				{:else}
					<button class="lms-primary-btn mt-2" on:click={downLoadFiles}
						><i class="fa-solid fa-download text-md"></i></button
					>
				{/if}
			</div>

			<div class="ml-2">
				<!-- svelte-ignore a11y-label-has-associated-control -->
				<label class="text-sm text-[#888888]"
					>Name Of Co-Authors<span class="text-danger text-sm">*</span>
				</label>
				<div class="mt-2.5 flex gap-[100px]">
					<div class="flex items-center">
						<input
							id="internal-checkbox"
							type="checkbox"
							class="lms-input-radio w-4"
							bind:checked={showInternal}
						/>
						<label for="internal-checkbox" class="lms-label">Internal</label>
					</div>
					<div class="flex items-center">
						<input
							id="external-checkbox"
							type="checkbox"
							class="lms-input-radio w-4"
							bind:checked={showExternal}
						/>
						<label for="external-checkbox" class="lms-label">External</label>
					</div>
				</div>

				<div class="mt-6 flex items-center gap-8">
					<div>
						{#if showInternalFaculty}
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
						{#if showExternalFaculty}
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
		</div>

		<div class="grid grid-cols md:grid-cols-2 lg:grid-cols-2 mt-4">
			<div class="flex md:flex-row gap-4 ">
				<DatePicker
					on:change={handleDateChange1}
					bind:selectedDateTime={grantDate}
					disabled={(grantDate) => grantDate.getTime() < new Date().setHours(0, 0, 0, 0)}
				>
					<div class="text-primary hover:bg-base flex items-center gap-x-3 rounded-lg px-3 py-2">
						<SelectDateIcon />
						<span class="text-body-2 font-bold"> Submission/Grant Date</span>
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

			<div class="flex md:flex-row gap-4">
				<DatePicker
					on:change={handleDateChange2}
					bind:selectedDateTime={paymentDate}
					disabled={(paymentDate) => paymentDate.getTime() < new Date().setHours(0, 0, 0, 0)}
				>
					<div class="text-primary hover:bg-base flex items-center gap-x-3 rounded-lg px-3 py-2">
						<SelectDateIcon />
						<span class="text-body-2 font-bold"> Annual Payment Date</span>
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
		<button class="lms-btn lms-primary-btn" on:click={handleSubmit}>Update</button>
	</div>
</Card>

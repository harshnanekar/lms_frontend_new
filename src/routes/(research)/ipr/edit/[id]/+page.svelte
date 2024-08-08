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

	import { PUBLIC_API_BASE_URL, PUBLIC_BASE_URL } from '$env/static/public';

	import type { any } from 'zod';

	import { goto } from '$app/navigation';
	import type { updateIprStatus } from '$lib/types/modules/research/research-types';

	import { fileDataStore } from '$lib/stores/modules/research/master.store';

	export let data: any;

	// let isRequired = false;
	let isChecked: boolean = false;
	$: checkVal = isChecked;

	let title = 'IPR';
	
	let nmimsSchool = data?.iprDataList?.school?.message.length > 0 ? data?.iprDataList?.school?.message : [];
	let nmimsCampus = data?.iprDataList?.campus?.message.length > 0 ? data?.iprDataList?.campus?.message : [];
	let enternalAuthors = data?.iprDataList?.internalAuthors?.message.length > 0 ? data?.iprDataList?.internalAuthors?.message : [];
	let externalAuthors = data?.iprDataList?.externalAuthors?.message.length > 0 ? data?.iprDataList?.externalAuthors?.message : [];
	let sdgGoals = data?.iprDataList?.sdgGoals?.message.length > 0 ? data?.iprDataList?.sdgGoals?.message : [];
	let patetntStatus = data?.iprDataList?.status?.message.length > 0 ? data?.iprDataList?.status?.message : [];
	let inventionType = data?.iprDataList?.inventionType?.message.length > 0 ? data?.iprDataList?.inventionType?.message : [];
	let applicantNames = data?.iprDataList?.applicantNames?.message.length > 0 ? data?.iprDataList?.applicantNames?.message : [];


	// let isRequired = false;

	console.log('render iprDataList', data.iprDataList.iprDataList[0]);

	// Reactive  variable

	$: school = nmimsSchool;

	$: campus = nmimsCampus;

	$: patetntStatus = patetntStatus;

	$: sdgGoals = sdgGoals;

	$: inventionType = inventionType;

	$: external = externalAuthors;
	$: internal = enternalAuthors;

	$: applicantNames = applicantNames;

	console.log('data.iprDataList.iprdata[0].ipr_id ==>>', data.iprDataList.iprDataList[0].ipr_id);

	let obj: any = {
		ipr_id: parseInt(data.iprDataList.iprDataList[0].ipr_id),
		nmims_school:
			data.iprDataList.iprDataList.length > 0 &&
			data.iprDataList.iprDataList[0].nmims_school != null
				? data.iprDataList.iprDataList[0].nmims_school.map((dt: any) => {
						return { value: dt, label: dt };
					})
				: [],
		nmims_campus:
			data.iprDataList.iprDataList.length > 0 &&
			data.iprDataList.iprDataList[0].nmims_campus != null
				? data.iprDataList.iprDataList[0].nmims_campus.map((dt: any) => {
						return { value: dt, label: dt };
					})
				: [],
		invention_type:
			data.iprDataList.iprDataList.length > 0 && data.iprDataList.iprDataList[0].invention_type
				? {
						value: data.iprDataList.iprDataList[0].invention_id,
						label: data.iprDataList.iprDataList[0].invention_type
					}
				: null,
		sdg_goals:
			data.iprDataList.iprDataList.length > 0 && data.iprDataList.iprDataList[0].sdg_goals != null
				? data.iprDataList.iprDataList[0].sdg_goals.map((dt: any) => {
						return { value: dt.id, label: dt.goals_name };
					})
				: [],
		patent_status:
			data.iprDataList.iprDataList.length > 0 && data.iprDataList.iprDataList[0].patent_status
				? {
						value: data.iprDataList.iprDataList[0].status_id,
						label: data.iprDataList.iprDataList[0].patent_status
					}
				: null,
		title:
			data.iprDataList.iprDataList.length > 0 && data.iprDataList.iprDataList[0].title
				? data.iprDataList.iprDataList[0].title
				: '',
		appln_no:
			data.iprDataList.iprDataList.length > 0 && data.iprDataList.iprDataList[0].appln_no
				? data.iprDataList.iprDataList[0].appln_no
				: '',
		filed_date:
			data.iprDataList.iprDataList.length > 0 && data.iprDataList.iprDataList[0].filed_date
				? data.iprDataList.iprDataList[0].filed_date
				: '',
		grant_date:
			data.iprDataList.iprDataList.length > 0 && data.iprDataList.iprDataList[0].grant_date
				? data.iprDataList.iprDataList[0].grant_date
				: '',
		published_date:
			data.iprDataList.iprDataList.length > 0 && data.iprDataList.iprDataList[0].published_date
				? data.iprDataList.iprDataList[0].published_date
				: '',
		publication_no:
			data.iprDataList.iprDataList.length > 0 && data.iprDataList.iprDataList[0].publication_no
				? data.iprDataList.iprDataList[0].publication_no
				: '',
		granted_no:
			data.iprDataList.iprDataList.length > 0 && data.iprDataList.iprDataList[0].granted_no
				? data.iprDataList.iprDataList[0].granted_no
				: '',
		institute_affiliation:
			data.iprDataList.iprDataList.length > 0 &&
			data.iprDataList.iprDataList[0].institute_affiliation
				? data.iprDataList.iprDataList[0].institute_affiliation
				: '',
		applicant_names:
			data.iprDataList.iprDataList.length > 0 &&
			data.iprDataList.iprDataList[0].applicant_names != null
				? data.iprDataList.iprDataList[0].applicant_names.map((dt: any) => {
						return { value: dt.id, label: dt.name };
					})
				: [],
		internal_authors:
			data.iprDataList.iprDataList[0].internal_faculty &&
			data.iprDataList.iprDataList[0].internal_faculty.length > 0
				? data.iprDataList.iprDataList[0].internal_faculty.map((dt: any) => {
						return { value: dt.id, label: dt.faculty_name };
					})
				: null,
		external_authors:
			data.iprDataList.iprDataList[0].external_faculty &&
			data.iprDataList.iprDataList[0].external_faculty.length > 0
				? data.iprDataList.iprDataList[0].external_faculty.map((dt: any) => {
						return { value: dt.id, label: dt.faculty_name };
					})
				: null
	};

	let filedDate: Date | null = new Date();
	filedDate =
		data.iprDataList.iprDataList.length > 0 && data.iprDataList.iprDataList[0].filed_date != null
			? new Date(data.iprDataList.iprDataList[0].filed_date)
			: null;
	$: fileFormattedDate = filedDate ? formatDate(filedDate) : '';

	let grantDate: Date | null = new Date();
	grantDate =
		data.iprDataList.iprDataList.length > 0 && data.iprDataList.iprDataList[0].grant_date != null
			? new Date(data.iprDataList.iprDataList[0].grant_date)
			: null;
	$: grantFormattedDate = grantDate ? formatDate(grantDate) : '';

	let publishedDate: Date | null = new Date();
	publishedDate =
		data.iprDataList.iprDataList.length > 0 &&
		data.iprDataList.iprDataList[0].published_date != null
			? new Date(data.iprDataList.iprDataList[0].published_date)
			: null;
	$: publishedFormattedDate = publishedDate ? formatDate(publishedDate) : '';

	function handleDateChange(e: CustomEvent<any>) {
		if (!filedDate) return;
		fileFormattedDate = formatDate(filedDate);
		console.log('publication date ', filedDate);
	}

	function handleDateChange1(e: CustomEvent<any>) {
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

	$: console.log('final obj ', JSON.stringify(obj));

	showInternal = obj.internal_authors != null ? true : false;
	showExternal = obj.external_authors != null ? true : false;

	$: showInternalFaculty = showInternal;
	$: showExternalFaculty = showExternal;

	//submit function for sending data
	console.log('obj.invention_type ==>>>>', obj.invention_type);

	async function handleSubmit() {
		const iprObject: iprDetailsReq = {
			nmims_school:
				obj.nmims_school != null ? obj.nmims_school.map((data: { value: any }) => data.value) : [],
			nmims_campus:
				obj.nmims_campus != null ? obj.nmims_campus.map((data: { value: any }) => data.value) : [],
			invention_type: obj.invention_type != null ? Number(obj.invention_type.value) : 0,
			sdg_goals:
				obj.sdg_goals != null
					? obj.sdg_goals.map((data: { value: any }) => Number(data.value))
					: [],
			patent_status: obj.patent_status != null ? Number(obj.patent_status.value) : 0,
			title: obj.title,
			appln_no: Number(obj.appln_no),
			filed_date: fileFormattedDate,
			grant_date: grantFormattedDate,
			published_date: publishedFormattedDate,
			publication_no: Number(obj.publication_no),
			granted_no: Number(obj.granted_no),
			institute_affiliation: obj.institute_affiliation,
			internal_authors:
				obj.internal_authors != null
					? obj.internal_authors.map((data: { value: any }) => Number(data.value))
					: [],
			external_authors:
				obj.external_authors != null
					? obj.external_authors.map((data: { value: any }) => Number(data.value))
					: [],
			applicant_names:
				obj.applicant_names != null
					? obj.applicant_names.map((data: { value: any }) => Number(data.value))
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
		formData.append('update_ipr_data', JSON.stringify(iprObject));
		formData.append('ipr_id', obj.ipr_id);

		Array.from(files).forEach((file: any) => {
			formData.append('supporting_documents', file);
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

		const { error, json } = await fetchFormApi<updateIprStatus[]>({
			url: `${PUBLIC_API_BASE_URL}/ipr-update`,
			method: 'POST',
			body: formData
		});

		if (error) {
			toast.error(error.message || 'Something went wrong!', {
				description: error.errorId ? `ERROR-ID: ${error.errorId}` : ''
			});
			return;
		}
		if(json && validateWithZod.length > 0){
			if (json[0].upsert_ipr.status == 403) {
			toast.error('ALERT!', { description: json[0].upsert_ipr.message });
		} else {
			toast.success('Updated Successfully');
			goto(`${PUBLIC_BASE_URL}ipr`);
		}

		} 
		else {
			toast.error('No response data received');
		}
		
	}

	async function downLoadFiles() {
		fetch(`${PUBLIC_API_BASE_URL}/ipr-download-files?id=${obj.ipr_id}`)
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
				a.download = 'ipr_document.zip';
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
				placeholder="Type of Invention(IPR) "
				options={getInventionType(inventionType)}
				bind:selectedOptions={obj.invention_type}
				isMultiSelect={false}
			/>
		</div>

		<div class="grid grid-cols-1 gap-8 p-4 md:grid-cols-2 lg:grid-cols-3">
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

		<div class="grid grid-cols-1 gap-8 p-4 md:grid-cols-2 lg:grid-cols-3">
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

		<div class="grid grid-cols-1 gap-8 p-4 md:grid-cols-2 lg:grid-cols-2">
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
			<!-- <div class="space-y-4">
				<label for="supporting-documents" class="lms-label"
					>Upload Supporting Documents <i style="color: red;">*</i><br /></label
				>
				<label class="lms-label">Click To Upload New File
					 <input type="checkbox" bind:checked={isChecked} class="accent-primary"/>
					 </label>
				{#if checkVal}
					<File
						on:filesSelected={handleFiles}
						on:deletedFiles={handleDeleteFiles}
						isView={false}
					/>
				{:else}
					<button class="lms-primary-btn mt-2" on:click={downLoadFiles}
						><i class="fa-solid fa-download text-md"></i></button
					>
				{/if}
			</div> -->
		</div>
		<div class="grid grid-cols-1 gap-8 p-4 md:grid-cols-2 lg:grid-cols-2">
			<div class="ml-2 gap-8">
				<!-- svelte-ignore a11y-label-has-associated-control -->
				<label class="text-sm text-[#888888]"
					>Name Of Co-Authors<span class="text-danger text-sm">*</span>
				</label>
				<div class="mt-4 flex items-center gap-8">
					<div class="flex items-center gap-2">
						<input
							id="internal-checkbox"
							type="checkbox"
							class="lms-input-radio w-4"
							bind:checked={showInternal}
						/>
						<label for="internal-checkbox" class="lms-label">Internal</label>
					</div>
					<div class="flex items-center gap-2">
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

			<div class="space-y-4">
				<label for="supporting-documents" class="lms-label"
					>Upload Supporting Documents <i style="color: red;">*</i><br /></label
				>
				<label class="lms-label">Click To Upload New File
					 <input type="checkbox" bind:checked={isChecked} class="accent-primary"/>
					 </label>
				{#if checkVal}
					<File
						on:filesSelected={handleFiles}
						on:deletedFiles={handleDeleteFiles}
						isView={false}
					/>
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

			<!-- <div>
				<div class="flex flex-row gap-[10px] p-4">
					<DatePicker
						on:change={handleDateChange}
						bind:selectedDateTime={filedDate}
						disabled={(publicationDate) =>
							publicationDate.getTime() < new Date().setHours(0, 0, 0, 0)}
					>
						<div class="text-primary hover:bg-base flex items-center gap-x-3 rounded-lg px-3 py-2">
							<SelectDateIcon />
							<span class="text-body-2 font-bold"> Filed Date</span>
						</div>
					</DatePicker>
					{#if fileFormattedDate}
						{@const formattedDate = formatDateTimeShort(new Date(fileFormattedDate))}
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
									fileFormattedDate = '';
								}}
							>
								<XIcon />
							</button>
						</div>
					{/if}
				</div>
			</div> -->
		</div>
		<div class="grid grid-cols-1 gap-8 p-4 md:grid-cols-2 lg:grid-cols-2">
			<div>
				<div class="flex flex-row gap-[10px]">
					<DatePicker
						on:change={handleDateChange1}
						bind:selectedDateTime={grantDate}
						disabled={(grantDate) => grantDate.getTime() < new Date().setHours(0, 0, 0, 0)}
					>
						<div class="text-primary hover:bg-base flex items-center gap-x-3 rounded-lg px-3 py-2">
							<SelectDateIcon />
							<span class="text-body-2 font-bold"> Patent Grant Date</span>
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
			</div>

			<div class="flex flex-row gap-[10px]">
				<DatePicker
					on:change={handleDateChange2}
					bind:selectedDateTime={publishedDate}
					disabled={(publishedDate) => publishedDate.getTime() < new Date().setHours(0, 0, 0, 0)}
				>
					<div class="text-primary hover:bg-base flex items-center gap-x-3 rounded-lg px-3 py-2">
						<SelectDateIcon />
						<span class="text-body-2 font-bold">Published Date</span>
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
		<button class="lms-btn lms-primary-btn" on:click={handleSubmit}>Update</button>
	</div>
</Card>

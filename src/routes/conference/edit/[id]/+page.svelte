<script lang="ts">
	import { Input, DatePicker, DynamicSelect, File } from '$lib/components/ui';
	import { SelectDateIcon, XIcon } from '$lib/components/icons';
	import { formatDateTimeShort, formatDate } from '$lib/utils/date-formatter';
	import { tooltip } from '$lib/utils/tooltip';
	import { fly } from 'svelte/transition';
	import { Card } from '$lib/components/ui';
	import { fileDataStore } from '$lib/stores/modules/research/master.store';

	import type {
		conferenceStatus,
		updateConferenceStatus
	} from '$lib/types/modules/research/research-types';

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
	import { PUBLIC_API_BASE_URL } from '$env/static/public';
	import type { any } from 'zod';
	import { goto } from '$app/navigation';

	export let data: any;
	let isRequired = false;
	let title = 'Conference';

	type FileReq = {
		documents: [File, ...File[]];
	};

	let nmimsSchool = data?.conferenceDetails?.school?.message;
	let nmimsCampus = data?.conferenceDetails?.campus?.message;
	let masterAllAuthors = data?.conferenceDetails?.masterAllAuthors?.message;
	let externalAuthors = data?.conferenceDetails?.externalAuthors?.message;
	let enternalAuthors = data?.conferenceDetails?.enternalAuthors?.message;
	let conferenceDocumentAbbr = data?.conferenceDetails?.conferenceDocumentAbbr;
	let conference_abbr = conferenceDocumentAbbr
		.filter((data: { abbr: string }) => data.abbr === 'cd')
		.map((dt: { id: any }) => Number(dt.id))[0];
	let award_abbr = conferenceDocumentAbbr
		.filter((data: { abbr: string }) => data.abbr === 'ad')
		.map((dt: { id: any }) => Number(dt.id))[0];
	console.log('conference abbr ', conference_abbr, award_abbr);

	console.log(
		'enternalAuthors ankit mishra ===>>>>>',
		JSON.stringify(data?.conferenceDetails?.conferenceDocumentAbbr)
	);
	console.log('nmimsSchool ankit mishra ===>>>>>', nmimsSchool);

	$: school = nmimsSchool;
	$: allAuth = masterAllAuthors;
	$: campus = nmimsCampus;
	$: external = externalAuthors;
	$: internal = enternalAuthors;

	console.log('external ===>>>>>>', externalAuthors);
	console.log('internal ===>>>>>>', internal);
	console.log('campus ===>>>>>>', campus);

	let isCheckedDoc: boolean = false;
	let isCheckedaward: boolean = false;

	$: checkDoc = isCheckedDoc;
	$: checkAward = isCheckedaward;
	console.log('checkbox check ', checkDoc);

	let publicationDate: Date | null = new Date();
	publicationDate = new Date(data.conferenceDetails.conferenceDetails[0].publication_date);
	$: publicationFormattedDate = publicationDate;
	function handleDateChange(e: CustomEvent<any>) {
		if (!publicationDate) return;
		publicationFormattedDate = publicationDate;
		console.log('publication date ', publicationFormattedDate);
	}

	console.log('JSON.stringify(school)', JSON.stringify(school));
	console.log('conference details', JSON.stringify(data.conferenceDetails));

	$: console.log(
		'facultyDetails ===>>>>>',
		JSON.stringify(data.conferenceDetails.conferenceDetails)
	);

	let obj: any = {
		conference_id: parseInt(data.conferenceDetails.conferenceDetails[0].conference_id),
		nmims_school:
			data.conferenceDetails.conferenceDetails[0].nmims_school != null
				? data.conferenceDetails.conferenceDetails[0].nmims_school.map((dt: any) => {
						return { value: dt, label: dt };
					})
				: [],
		nmims_campus:
			data.conferenceDetails.conferenceDetails[0].nmims_campus != null
				? data.conferenceDetails.conferenceDetails[0].nmims_campus.map((dt: any) => {
						return { value: dt, label: dt };
					})
				: [],
		paper_title: data.conferenceDetails.conferenceDetails[0].paper_title
			? data.conferenceDetails.conferenceDetails[0].paper_title
			: '',
		conference_name: data.conferenceDetails.conferenceDetails[0].conference_name
			? data.conferenceDetails.conferenceDetails[0].conference_name
			: '',
		all_authors:
			data.conferenceDetails.conferenceDetails[0].all_authors != null
				? data.conferenceDetails.conferenceDetails[0].all_authors.map((dt: any) => {
						return { value: dt.id, label: dt.name };
					})
				: [],
		place: data.conferenceDetails.conferenceDetails[0].place
			? data.conferenceDetails.conferenceDetails[0].place
			: '',
		proceeding_published: data.conferenceDetails.conferenceDetails[0].proceeding_published,
		conference_type: Number(data.conferenceDetails.conferenceDetails[0].conference_type),
		presenting_author: data.conferenceDetails.conferenceDetails[0].presenting_author
			? data.conferenceDetails.conferenceDetails[0].presenting_author
			: '',
		organizing_body: data.conferenceDetails.conferenceDetails[0].organizing_body
			? data.conferenceDetails.conferenceDetails[0].organizing_body
			: '',
		volume_no: data.conferenceDetails.conferenceDetails[0].volume_no
			? data.conferenceDetails.conferenceDetails[0].volume_no
			: '',
		issn_no: data.conferenceDetails.conferenceDetails[0].issn_no
			? data.conferenceDetails.conferenceDetails[0].issn_no
			: '',
		sponsored: Number(data.conferenceDetails.conferenceDetails[0].sponsored),
		doi_no: data.conferenceDetails.conferenceDetails[0].doi_no
			? data.conferenceDetails.conferenceDetails[0].doi_no
			: '',
		amount: data.conferenceDetails.conferenceDetails[0].amount
			? data.conferenceDetails.conferenceDetails[0].amount
			: '',
		publication_date: publicationFormattedDate != null ? formatDate(publicationFormattedDate) : '',
		internal_authors:
			data.conferenceDetails.conferenceDetails[0].internal_faculty &&
			data.conferenceDetails.conferenceDetails[0].internal_faculty.length > 0
				? data.conferenceDetails.conferenceDetails[0].internal_faculty.map((dt: any) => {
						return { value: dt.id, label: dt.faculty_name };
					})
				: null,
		external_authors:
			data.conferenceDetails.conferenceDetails[0].external_faculty &&
			data.conferenceDetails.conferenceDetails[0].external_faculty.length > 0
				? data.conferenceDetails.conferenceDetails[0].external_faculty.map((dt: any) => {
						return { value: dt.id, label: dt.faculty_name };
					})
				: null
	};

	let showInternal = false;
	let showExternal = false;

	let fileArr: any = [];

	let selectedConferencePreviewFile: any = [];
	let selectedAwardPreviewFile: any = [];

	$: console.log('final obj ', JSON.stringify(obj));

	showInternal = obj.internal_authors != null ? true : false;
	showExternal = obj.external_authors != null ? true : false;

	$: showInternalFaculty = showInternal;
	$: showExternalFaculty = showExternal;

	let conferenceFiles: any = [];
	let awardFiles: any = [];

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
			publication_date:
				publicationFormattedDate != null ? formatDate(publicationFormattedDate) : '',
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
				description: firstMessage
			});
			return;
		}

		console.log('validated data', JSON.stringify(result.data));

		const formData = new FormData();
		formData.append('update_conference_publication', JSON.stringify(conferenceObj));
		formData.append('conference_id', JSON.stringify(obj.conference_id));

		if (checkDoc) {
			const conferenceFileObject = { documents: conferenceFiles.map((f: any) => f.file) };
			const conferenceFileResult = validateWithZod(fileSchema, conferenceFileObject);

			// Check for validation errors in conference files
			if (conferenceFileResult.errors) {
				const [firstPath, firstMessage] = Object.entries(conferenceFileResult.errors)[0];
				toast.error('ALERT!', {
					description: firstMessage as string
				});
				return;
			}
			conferenceFiles.forEach((file: any) => {
				formData.append(conference_abbr, file.file);
			});
		}

		if (checkAward) {
			// Validate award files
			const awardFileObject = { documents: awardFiles.map((f: any) => f.file) };
			const awardFileResult = validateWithZod(fileSchema, awardFileObject);

			// Check for validation errors in award files
			if (awardFileResult.errors) {
				const [firstPath, firstMessage] = Object.entries(awardFileResult.errors)[0];
				toast.error('ALERT!', {
					description: firstMessage as string
				});
				return;
			}
			// Append award files to formData
			awardFiles.forEach((file: any) => {
				formData.append(award_abbr, file.file);
			});
		}

		for (let [key, value] of formData.entries()) {
			console.log(`${key}: ${value}`);
		}

		const { error, json } = await fetchFormApi<updateConferenceStatus[]>({
			url: `${PUBLIC_API_BASE_URL}/conference-update`,
			method: 'POST',
			body: formData
		});

		if (error) {
			toast.error(error.message || 'Something went wrong!', {
				description: error.errorId ? `ERROR-ID: ${error.errorId}` : ''
			});
			return;
		}

		if (json[0].upsert_conference.status === 403) {
			toast.error('ALERT!', {
				description: json[0].upsert_conference.message
			});
		} else {
			toast.success('Updated Successfully');
			goto('/conference');
		}
	}

	async function downLoadFiles(abbr: string) {
		fetch(`${PUBLIC_API_BASE_URL}/conference-download-files?id=${obj.conference_id}&abbr=${abbr}`)
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
				a.download = 'conference_documents.zip';
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

<!-- <div class="shadow-card rounded-2xl border-[1px] border-[#E5E9F1] p-4 !pt-0 sm:p-6"> -->
<Card {title}>
	<div class="modal-content p-4">
		<!-- Adjust max-height as needed -->
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
			<Input type="text" placeholder="Title Of The Paper" bind:value={obj.paper_title} />
		</div>

		<div class="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
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
		<div class="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
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
		<div class="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
			<Input type="text" placeholder="Organizing Body" bind:value={obj.organizing_body} />
			<Input type="text" placeholder="Vol and issue no [e.g 9 (12)]" bind:value={obj.volume_no} />
			<Input type="text" placeholder="ISSN/ISNB No." bind:value={obj.issn_no} />
		</div>
		<div class="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
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

		<div class="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
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
			<!-- Upload Conference Documents -->
			<!-- Upload Conference Documents -->
			<div class="space-y-4">
				<label for="text-sm text-[#888888]" class="lms-label"
					>Upload Conference Documents <i style="color: red;">*</i><br /></label
				>
				<label class="lms-label"
					>Click To Upload Conference Documents File
					<input type="checkbox" bind:checked={isCheckedDoc} class="accent-primary" />
				</label>
				{#if checkDoc}
					<File
						isCombine={true}
						on:filesSelected={(event) => handleConferenceFiles(event, 'cd')}
						on:deletedFiles={(event) => handleDeleteFiles(event, 'cd')}
						on:previewFile={previewConferenceFile}
						isView={false}
					/>
				{:else}
					<button class="lms-primary-btn mt-2" on:click={() => downLoadFiles('cd')}
						><i class="fa-solid fa-download text-md"></i></button
					>
				{/if}
			</div>
			<!-- svelte-ignore a11y-label-has-associated-control -->
			<!-- Upload Conference Documents Any Award -->
			<div class="space-y-4">
				<label for="text-sm text-[#888888]" class="lms-label"
					>Upload Award Documents <i style="color: red;">*</i><br /></label
				>
				<label class="lms-label"
					>Click To Upload Award Documents
					<input type="checkbox" bind:checked={isCheckedaward} class="accent-primary" />
				</label>
				{#if checkAward}
					<File
						isCombine={true}
						on:filesSelected={(event) => handleAwardFiles(event, 'ad')}
						on:deletedFiles={(event) => handleDeleteFiles(event, 'ad')}
						on:previewFile={previewAwardFile}
						isView={false}
					/>
				{:else}
					<button class="lms-primary-btn mt-2" on:click={() => downLoadFiles('cd')}
						><i class="fa-solid fa-download text-md"></i></button
					>
				{/if}
			</div>
		</div>

		<div class="flex flex-row gap-[10px] p-4">
			<DatePicker
				on:change={handleDateChange}
				bind:selectedDateTime={publicationDate}
				disabled={(publicationDate) => publicationDate.getTime() < new Date().setHours(0, 0, 0, 0)}
			>
				<div class="text-primary hover:bg-base flex items-center gap-x-3 rounded-lg px-3 py-2">
					<SelectDateIcon />
					<span class="text-body-2 font-bold">Date of Filing/Grant/Published </span>
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
	<div class="flex flex-col gap-4 p-4 md:flex-row">
		<button class="lms-btn lms-primary-btn" on:click={handleSubmit}>Update</button>
	</div>
</Card>

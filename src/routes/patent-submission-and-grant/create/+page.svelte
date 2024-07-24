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
		getInventionType,
		getSdgGoals,
		getPatentStatus
	} from '$lib/utils/select.helper';

	import { validateWithZod } from '$lib/utils/validations';

	import {
		patentDetails,
		type patentDetailsReq
	} from '$lib/schemas/modules/research/master-validations';

	import { type FileReq, fileSchema } from '$lib/schemas/modules/research/master-validations';

	import { toast } from 'svelte-sonner';

	import { fetchApi, fetchFormApi } from '$lib/utils/fetcher';

	import { PUBLIC_API_BASE_URL } from '$env/static/public';

	import type { any } from 'zod';

	import { goto } from '$app/navigation';
	import { json } from '@sveltejs/kit';
	import type { patentStatus } from '$lib/types/modules/research/research-types';

	export let data: any;

	let isRequired = false;

	let title = 'Patent Submission And Grant';

	let enternalAuthors = data?.patentDataList?.internalAuthors?.message;

	let externalAuthors = data?.patentDataList?.externalAuthors?.message;

	let sdgGoals = data?.patentDataList?.sdgGoals?.message;

	let patetntStatus = data?.patentDataList?.status?.message;

	let inventionType = data?.patentDataList?.inventionType?.message;

	// let isRequired = false;

	console.log('render patentDataList', data.patentDataList);

	$: patetntStatus = patetntStatus;

	$: sdgGoals = sdgGoals;

	$: inventionType = inventionType;

	$: external = externalAuthors;
	$: internal = enternalAuthors;

	let obj = {
		invention_type: null,
		sdg_goals: null,
		patent_status: null,
		title: '',
		appln_no: '',
		publication_date: '',
		internal_authors: null,
		external_authors: null
	};

	let publicationDate: Date | null = new Date();
	publicationDate = null;
	$: publicationFormattedDate = publicationDate ? formatDate(publicationDate) : '';

	function handleDateChange(e: CustomEvent<any>) {
		if (!publicationDate) return;
		publicationFormattedDate = formatDate(publicationDate);
		console.log('publication date ', publicationDate);
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
		const patentObject: patentDetailsReq = {
			invention_type: obj.invention_type != null ? Number((obj.invention_type as any).value) : 0,
			sdg_goals:
				obj.sdg_goals != null
					? (obj.sdg_goals as any).map((data: { value: any }) => Number(data.value))
					: [],
			patent_status: obj.patent_status != null ? Number((obj.patent_status as any).value) : 0,
			title: obj.title,
			appln_no: Number(obj.appln_no),
			publication_date: publicationFormattedDate ? publicationFormattedDate : '',
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
		formData.append('patent_data', JSON.stringify(patentObject));

		// Append each file to the FormData
		Array.from(files).forEach((file: any) => {
			formData.append('supporting_documents', file.file);
		});
		for (let [key, value] of formData.entries()) {
			console.log(`${key}: ${value}`);
		}

		console.log(JSON.stringify(patentObject));
		const result = validateWithZod(patentDetails, patentObject);

		if (result.errors) {
			console.log(result.errors);
			const [firstPath, firstMessage] = Object.entries(result.errors)[0];
			toast.error('ALERT!', { description: firstMessage });
			return;
		}

		console.log('validated data', JSON.stringify(result.data));

		const { error, json } = await fetchFormApi<patentStatus[]>({
			url: `${PUBLIC_API_BASE_URL}/patent-submission-and-grant-insert`,
			method: 'POST',
			body: formData
		});

		if (error) {
			toast.error(error.message || 'Something went wrong!', {
				description: error.errorId ? `ERROR-ID: ${error.errorId}` : ''
			});
			return;
		}

		if (json[0].insert_patent_grant.status == 403) {
			toast.error('ALERT!', { description: json[0].insert_patent_grant.message });
		} else {
			toast.success('Inserted Successfully');
			clearForm();
			goto('/patent-submission-and-grant');
		}
	}

	function clearForm() {
		obj = {
			invention_type: null,
			sdg_goals: null,
			patent_status: null,
			title: '',
			appln_no: '',
			publication_date: '',
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
			<Input type="text" placeholder="Title of Patent / Invention" bind:value={obj.title} />

			<DynamicSelect
				isRequired={true}
				placeholder="Type of Invention(IPR) "
				options={getInventionType(inventionType)}
				bind:selectedOptions={obj.invention_type}
				isMultiSelect={false}
			/>

			<DynamicSelect
				isRequired={true}
				placeholder="Patent Status"
				options={getPatentStatus(patetntStatus)}
				bind:selectedOptions={obj.patent_status}
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

			<Input
				type="number"
				placeholder="Patent/Invention Application Number"
				bind:value={obj.appln_no}
			/>
			<div class="space-y-2">
				<!-- svelte-ignore a11y-label-has-associated-control -->
				<label class="lms-label"
					>Upload Supporting Documents<span class="text-primary">*</span></label
				>
				<File on:filesSelected={handleFiles} on:deletedFiles={handleDeleteFiles} isView={false} />
			</div>
		</div>

		<div class="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
			<div class="ml-2">
				<!-- svelte-ignore a11y-label-has-associated-control -->
				<label class="text-sm text-[#888888]"
					>Details of Other Inventors<span class="text-danger text-sm">*</span>
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
		<div class="flex gap-4 md:flex-row">
			<DatePicker
				on:change={handleDateChange}
				bind:selectedDateTime={publicationDate}
				disabled={(filedDate) => filedDate.getTime() < new Date().setHours(0, 0, 0, 0)}
			>
				<div class="text-primary hover:bg-base flex items-center gap-x-3 rounded-lg px-3 py-2">
					<SelectDateIcon />
					<span class="text-body-2 font-bold"> Add Date of Filing/Grant/Published </span>
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

	<div class="flex flex-row gap-[20px] p-4">
		<button class="lms-btn lms-secondary-btn" on:click={clearForm}>Clear Form</button>

		<button class="lms-btn lms-primary-btn" on:click={handleSubmit}>Submit</button>
	</div>
</Card>

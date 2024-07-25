<script lang="ts">
	import { Input, DatePicker, DynamicSelect,File } from '$lib/components/ui';
	import { SelectDateIcon, XIcon } from '$lib/components/icons';
	import { formatDateTimeShort, formatDate } from '$lib/utils/date-formatter';
	import { tooltip } from '$lib/utils/tooltip';
	import { fly } from 'svelte/transition';
	import { Card } from '$lib/components/ui';
    import { fileDataStore } from '$lib/stores/modules/research/master.store';
	import { getSchool, getCampus } from '$lib/utils/select.helper';
	import { validateWithZod } from '$lib/utils/validations';
	import {
		researchAwardObj,
		type researchAwardReq
	} from '$lib/schemas/modules/research/master-validations';
	import { type FileReq, fileSchema } from '$lib/schemas/modules/research/master-validations';
	import { toast } from 'svelte-sonner';
	import { fetchApi, fetchFormApi } from '$lib/utils/fetcher';
	import { PUBLIC_API_BASE_URL } from '$env/static/public';
	import type { any } from 'zod';
	import { goto } from '$app/navigation';

	export let data: any;
	let isRequired = false;
	let title = 'Research Award';

	let nmimsSchool = data?.researchAwardData?.nmims_school?.message;
	let nmimsCampus = data?.researchAwardData?.nmims_campus?.message;

	// let isRequired = false;

	$: school = nmimsSchool;
	$: campus = nmimsCampus;

	let publicationDate: Date | null = new Date();
	publicationDate = null;
	$: publicationFormattedDate = publicationDate;
	function handleDateChange(e: CustomEvent<any>) {
		if (!publicationDate) return;
		publicationFormattedDate = publicationDate;
	}

	let obj: any = {
		nmims_school: null,
		nmims_campus: null,
		faculty_name: '',
		award_name: '',
		award_details: '',
		award_organization: '',
		award_place: '',
		award_category: 1
	};

	let files: any = [];
	fileDataStore.set(files)

	async function handleSubmit() {
		const researchAward: researchAwardReq = {
			nmims_school:
				obj.nmims_school != null ? obj.nmims_school.map((data: { value: any }) => data.value) : [],
			nmims_campus:
				obj.nmims_campus != null ? obj.nmims_campus.map((data: { value: any }) => data.value) : [],
			faculty_name: obj.faculty_name,
			award_name: obj.award_name,
			award_details: obj.award_details,
			award_organization: obj.award_organization,
			award_place: obj.award_place,
			award_category: Number(obj.award_category),
			award_date: publicationFormattedDate != null ? formatDate(publicationFormattedDate) : ''
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
		Array.from(files).forEach((file: any) => {
			formData.append('supporting_documents', file.file);
		});

		const result = validateWithZod(researchAwardObj, researchAward);

		if (result.errors) {
			console.log(result.errors);
			const [firstPath, firstMessage] = Object.entries(result.errors)[0];
			toast.error('ALERT!', {
				description: firstMessage
			});
			return;
		}

		console.log('validated data', JSON.stringify(result.data));
		formData.append('research_award', JSON.stringify(result.data));

		const { error, json } = await fetchFormApi({
			url: `${PUBLIC_API_BASE_URL}/research-award-insert`,
			method: 'POST',
			body: formData
		});

		if (error) {
			toast.error(error.message || 'Something went wrong!', {
				description: error.errorId ? `ERROR-ID: ${error.errorId}` : ''
			});
			return;
		}

		if (json[0].insert_research_award.status == 200) {
			toast.success('Inserted Successfully');
			clearForm();
			goto('/research-award');
		}
	}

	function clearForm() {
		obj = {
			nmims_school: null,
			nmims_campus: null,
			faculty_name: '',
			award_name: '',
			award_details: '',
			award_organization: '',
			award_place: '',
			award_category: null
		};
		publicationDate = null;
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
			<Input type="text" placeholder="Faculty Name" bind:value={obj.faculty_name} />
		</div>

		<div class="grid grid-cols-1 gap-8 p-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
			<Input type="text" placeholder="Award Name" bind:value={obj.award_name} />
			<Input type="text" placeholder="Award Details" bind:value={obj.award_details} />
			<Input
				type="text"
				placeholder="Organisation Conferring Award"
				bind:value={obj.award_organization}
			/>
		</div>

		<div class="grid grid-cols-1 items-center gap-8 p-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
			<Input type="text" placeholder="Award Place" bind:value={obj.award_place} />
			<div class="ml-2">
				<label class="text-sm text-[#888888]"> Award Category<span>*</span> </label>
				<div class="mt-2.5 flex flex-row gap-[20px]">
					<div class="flex items-center">
						<input
							type="radio"
							id="international"
							class="lms-input-radio mr-2 w-4"
							name="publisher_category"
							bind:group={obj.award_category}
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
							bind:group={obj.award_category}
							value={2}
						/>
						<span class="text-sm text-[#888888]">National</span>
					</div>
				</div>
			</div>

			<div class="space-y-2">
				<label class="lms-label"
					>Upload Supporting Documents<span class="text-primary">*</span></label
				>
				<File on:filesSelected={handleFiles} on:deletedFiles={handleDeleteFiles} isView={false} />
			</div>		
		
		</div>

		<div class="flex gap-4 p-4 md:flex-row">
			<DatePicker
				on:change={handleDateChange}
				bind:selectedDateTime={publicationDate}
				disabled={(publicationDate) => publicationDate.getTime() < new Date().setHours(0, 0, 0, 0)}
			>
				<div class="text-primary hover:bg-base flex items-center gap-x-3 rounded-lg px-3 py-2">
					<SelectDateIcon />
					<span class="text-body-2 font-bold">Add Award Date</span>
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

		<div class="flex flex-col gap-4 p-4 md:flex-row">
			<button class="lms-btn lms-secondary-btn" on:click={clearForm}>Clear Form</button>
			<button class="lms-btn lms-primary-btn" on:click={handleSubmit}>Submit</button>
		</div>
	</div>
</Card>

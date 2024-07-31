<script lang="ts">
	import { Input, DatePicker, DynamicSelect,File } from '$lib/components/ui';
	import { SelectDateIcon, XIcon } from '$lib/components/icons';
	import { formatDateTimeShort, formatDate } from '$lib/utils/date-formatter';
	import { tooltip } from '$lib/utils/tooltip';
	import { fly } from 'svelte/transition';
	import { Card } from '$lib/components/ui';

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
	import { createFileUrl, createFileUrlFilter } from '$lib/utils/helper';
	import { fileDataStore } from '$lib/stores/modules/research/master.store';
	import { writable } from 'svelte/store';


	export let data: any;
	let isRequired = false;
	let title = 'Conference';
	let disabled: boolean = true;
	let checkData = data.conferenceDetails.conferenceDetails.length > 0 ? true : false;

	console.log('data details ===>>>', data.conferenceDetails.conferenceDetails[0]);
	

	let conferenceFiles: any = data.conferenceDetails.files.length > 0 ? data.conferenceDetails.files.filter((file: any) => file.type_abbr === 'cd') : [];
	let awardFiles: any = data.conferenceDetails.files.length > 0 ? data.conferenceDetails.files.filter((file: any) => file.type_abbr === 'ad') : [];

	const conferenceDocFiles = createFileUrl(conferenceFiles);
	const awardDocFiles = createFileUrl(awardFiles);

	console.log('conferenceDocFiles ===>>>>', conferenceDocFiles)
	console.log('awardDocFiles ===>>>>', awardDocFiles)

	function previewConferenceFile(){
		fileDataStore.set(conferenceDocFiles)
	}

	function previewAwardFile(){
		fileDataStore.set(awardDocFiles);
	}

	

	console.log('data comming from backend ===>>>>', data)

	let showInternal = false;
	let showExternal = false;

	let obj: any = {
		conference_id: checkData ? parseInt(data.conferenceDetails.conferenceDetails[0].conference_id) : null,
		nmims_school:
			checkData && data.conferenceDetails.conferenceDetails[0].nmims_school
				? data.conferenceDetails.conferenceDetails[0].nmims_school
				: '',
		nmims_campus: checkData && data.conferenceDetails.conferenceDetails[0].nmims_campus
			? data.conferenceDetails.conferenceDetails[0].nmims_campus
			: '',
		paper_title:  checkData && data.conferenceDetails.conferenceDetails[0].paper_title ? data.conferenceDetails.conferenceDetails[0].paper_title : '',
		all_authors:  checkData && data.conferenceDetails.conferenceDetails[0].all_authors ? data.conferenceDetails.conferenceDetails[0].all_authors : '',
		conference_name:  checkData && data.conferenceDetails.conferenceDetails[0].conference_name
			? data.conferenceDetails.conferenceDetails[0].conference_name
			: '',
		place:  checkData && data.conferenceDetails.conferenceDetails[0].place ? data.conferenceDetails.conferenceDetails[0].place : '',
		proceeding_published:  checkData && data.conferenceDetails.conferenceDetails[0].proceeding_published,
		conference_type: Number(data.conferenceDetails.conferenceDetails[0].conference_type),
		presenting_author:  checkData && data.conferenceDetails.conferenceDetails[0].presenting_author
			? data.conferenceDetails.conferenceDetails[0].presenting_author
			: '',
		organizing_body:  checkData && data.conferenceDetails.conferenceDetails[0].organizing_body
			? data.conferenceDetails.conferenceDetails[0].organizing_body
			: '',
		volume_no:  checkData && data.conferenceDetails.conferenceDetails[0].volume_no ? data.conferenceDetails.conferenceDetails[0].volume_no : '',
		issn_no:  checkData && data.conferenceDetails.conferenceDetails[0].issn_no ? data.conferenceDetails.conferenceDetails[0].issn_no : '',
		sponsored: Number(data.conferenceDetails.conferenceDetails[0].sponsored),
		doi_no:  checkData && data.conferenceDetails.conferenceDetails[0].doi_no ? data.conferenceDetails.conferenceDetails[0].doi_no : '',
		amount:  checkData && data.conferenceDetails.conferenceDetails[0].amount ? data.conferenceDetails.conferenceDetails[0].amount : '',
		publication_date:  checkData && data.conferenceDetails.conferenceDetails[0].publication_date
			? new Date(data.conferenceDetails.conferenceDetails[0].publication_date)
			: null,
		internal_faculty_details:  checkData && data.conferenceDetails.conferenceDetails[0].internal_faculty_details
			? data.conferenceDetails.conferenceDetails[0].internal_faculty_details
			: '',
		external_faculty_details:  checkData && data.conferenceDetails.conferenceDetails[0].external_faculty_details
			? data.conferenceDetails.conferenceDetails[0].external_faculty_details
			: '',
		conference_documents:  checkData && data.conferenceDetails.conferenceDetails[0].conference_documents
			? data.conferenceDetails.conferenceDetails[0].conference_documents
			: '',
		conference_awards:  checkData && data.conferenceDetails.conferenceDetails[0].conference_awards
			? data.conferenceDetails.conferenceDetails[0].conference_awards
			: ''
	};
	console.log('boj ankit  ===>>>>', obj);
	let publicationDate: Date | null = new Date();
	publicationDate = obj.publication_date;
	$: publicationFormattedDate = publicationDate;

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

{#if checkData}
	<Card {title}>
		<div class="modal-content p-4">
			<!-- Adjust max-height as needed -->
			<div class="grid grid-cols-1 gap-8 items-center p-4 md:grid-cols-2 lg:grid-cols-3">
				<Input type="text" placeholder="Nmims School" value={obj.nmims_school} {disabled} />
				<Input type="text" placeholder="Nmims Campus" value={obj.nmims_campus} {disabled} />
				<Input
					type="text"
					placeholder="Title Of The Paper"
					bind:value={obj.paper_title}
					{disabled}
				/>
			</div>

			<div class="grid grid-cols-1 gap-8 items-center p-4 md:grid-cols-2 lg:grid-cols-3">
				<Input
					type="text"
					placeholder="Name of Conference"
					bind:value={obj.conference_name}
					{disabled}
				/>
				<Input type="text" placeholder="All Authors Names" value={obj.all_authors} {disabled} />
				<Input type="text" placeholder="Place of Conference" bind:value={obj.place} {disabled} />
			</div>
			<div class="grid grid-cols-1 gap-8 items-center p-4 md:grid-cols-2 lg:grid-cols-3">
				<div class="ml-2">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="text-sm text-[#888888]"
						>Proceedings published<span class="text-danger text-sm">*</span>
					</label>
					<div class="mt-2.5 flex flex-row gap-[20px]">
						<div class="flex items-center">
							<input
								type="radio"
								class="lms-input-radio w-4"
								name="proceedings-published"
								value={true}
								checked={obj.proceeding_published === true}
								{disabled}
							/>
							<span class="text-sm text-[#888888]">Yes</span>
						</div>
						<div class="flex items-center">
							<input
								type="radio"
								class="lms-input-radio w-4"
								name="proceedings-published"
								checked={obj.proceeding_published === false}
								value={false}
								{disabled}
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
						<div class="flex items-center">
							<input
								type="radio"
								class="lms-input-radio w-4"
								name="conference-type"
								checked={obj.conference_type === 1}
								value={2}
								{disabled}
							/>
							<span class="text-sm text-[#888888]">International </span>
						</div>
						<div class="flex items-center">
							<input
								type="radio"
								class="lms-input-radio w-4"
								name="conference-type"
								checked={obj.conference_type === 2}
								value={2}
								{disabled}
							/>
							<span class="text-sm text-[#888888]"> National</span>
						</div>
					</div>
				</div>
				<Input type="text" placeholder="Presenting Author " bind:value={obj.presenting_author} />
			</div>
			<div class="grid grid-cols-1 gap-8 items-center p-4 md:grid-cols-2 lg:grid-cols-3">
				<Input
					type="text"
					placeholder="Organizing Body"
					bind:value={obj.organizing_body}
					{disabled}
				/>
				<Input
					type="text"
					placeholder="Vol and issue no [e.g 9 (12)]"
					bind:value={obj.volume_no}
					{disabled}
				/>
				<Input type="text" placeholder="ISSN/ISNB No." bind:value={obj.issn_no} {disabled} />
			</div>
			<div class="grid grid-cols-1 gap-8 items-center p-4 md:grid-cols-2 lg:grid-cols-3">
				<div class="ml-2">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="text-sm text-[#888888]"
						>Sponsored By NMIMS/Other<span class="text-danger text-sm">*</span>
					</label>
					<div class="mt-2.5 flex flex-row gap-[20px]">
						<div class="flex items-center">
							<input
								type="radio"
								id="html"
								class="lms-input-radio w-4"
								name="radio-button-national"
								checked={obj.sponsored == 1}
								value={1}
								{disabled}
							/>
							<span class="text-sm text-[#888888]">NMIMS </span>
						</div>
						<div class="flex items-center">
							<input
								type="radio"
								id="html"
								class="lms-input-radio w-4"
								name="radio-button-national"
								checked={obj.sponsored == 2}
								value={2}
								{disabled}
							/>
							<span class="text-sm text-[#888888]"> Other</span>
						</div>
					</div>
				</div>
				<Input type="text" placeholder="WebLink /DOI No." bind:value={obj.doi_no} {disabled} />
				<Input
					type="number"
					placeholder="Amount Spent In RS. By NMIMS"
					bind:value={obj.amount}
					{disabled}
				/>
			</div>

			<div class="grid grid-cols-1 gap-8 p-4 md:grid-cols-2 lg:grid-cols-3">
				<!-- svelte-ignore a11y-label-has-associated-control -->
				<Input
					type="text"
					placeholder="Name Of  Internal Co-Authors"
					value={obj.internal_faculty_details}
					{disabled}
				/>
				<Input
					type="text"
					placeholder="Name Of External Co-Authors"
					value={obj.external_faculty_details}
					{disabled}
				/>
				

			</div>
			<div class="grid grid-cols-1 gap-8 p-4 md:grid-cols-2 lg:grid-cols-2">
				<div class="space-y-2">
					<label for="documents" class="lms-label"
						> Conference Documents
						<span>*</span>
					</label>
					<div class="flex items-center gap-2">
					<File isView={true}
					isCombine={true} on:previewFile={previewConferenceFile} />	
					<button class="lms-btn lms-primary-btn" on:click={() => downLoadFiles('cd')}
						><i class="fa-solid fa-download text-lg"></i></button>
					</div>
				</div>

				<div class="space-y-2">
					<label for="documents" class="lms-label"
						> Conference Awards 
						<span>*</span>
					</label>
					<div class="flex items-center gap-2">
					<File isView={true} isCombine={true} 
					on:previewFile={previewAwardFile}/>	
					<button class="lms-btn lms-primary-btn" on:click={() => downLoadFiles('ad')}
						><i class="fa-solid fa-download text-lg"></i></button>
					</div>
				</div>

			</div> 

			<div class="flex flex-row gap-[40px] p-4">
				<div class="text-primary hover:bg-base flex items-center gap-x-3 rounded-lg px-3 py-2">
					<SelectDateIcon />
					<span class="text-body-2 font-bold">Publication Date</span>
				</div>
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
						>
						</button>
					</div>
				{/if}
			</div>
		

		</div>
		<div class="flex flex-col gap-4 p-4 md:flex-row"></div>
	</Card>
{:else}
	<p>No Data Found</p>
{/if}

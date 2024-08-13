<script lang="ts">
	import { Input, DatePicker, DynamicSelect, File } from '$lib/components/ui';

	import { SelectDateIcon, XIcon } from '$lib/components/icons';

	import { formatDateTimeShort, formatDate } from '$lib/utils/date-formatter';

	import { tooltip } from '$lib/utils/tooltip';

	import { fly } from 'svelte/transition';

	import { Card } from '$lib/components/ui';

	import { validateWithZod } from '$lib/utils/validations';

	import {
		patentDetails,
		type patentDetailsReq
	} from '$lib/schemas/modules/research/master-validations';
	import { type FileReq, fileSchema } from '$lib/schemas/modules/research/master-validations';
	import { toast } from 'svelte-sonner';
	import { fetchApi, fetchFormApi } from '$lib/utils/fetcher';
	import { PUBLIC_API_BASE_URL } from '$env/static/public';
	import { fileDataStore } from '$lib/stores/modules/research/master.store';
	import { createFileUrl } from '$lib/utils/helper';

	export let data: any;

	// let isRequired = false;
	let disabled: boolean = true;
	let title = 'Patent Submission And Grant';
	let checkData = data.patentDataList.patentDataList.length > 0 ? true : false;
	console.log('checkData ===>>>>>', checkData);
	console.log('data in view comming from backend ===>>>>', JSON.stringify(data));
	console.log('render patentDataList', data);

	let files = data.patentDataList.files.length > 0 ? createFileUrl(data.patentDataList.files) : [];

	fileDataStore.set(files);

	let obj: any = {
		patent_id: parseInt(data.patentDataList.patentDataList[0].patent_id),
		title:
			checkData && data.patentDataList.patentDataList[0].title
				? data.patentDataList.patentDataList[0].title
				: '',
		invention_type:
			checkData && data.patentDataList.patentDataList[0].invention_type
				? data.patentDataList.patentDataList[0].invention_type
				: '',
		sdg_goals:
			checkData && data.patentDataList.patentDataList[0].sdg_goals
				? data.patentDataList.patentDataList[0].sdg_goals
				: '',
		patent_status:
			checkData && data.patentDataList.patentDataList[0].patent_status
				? data.patentDataList.patentDataList[0].patent_status
				: '',
		appln_no:
			checkData && data.patentDataList.patentDataList[0].appln_no
				? data.patentDataList.patentDataList[0].appln_no
				: '',

		external_faculty_details:
			checkData && data.patentDataList.patentDataList[0].external_faculty_details
				? data.patentDataList.patentDataList[0].external_faculty_details
				: '',
		internal_faculty_details:
			checkData && data.patentDataList.patentDataList[0].internal_faculty_details
				? data.patentDataList.patentDataList[0].internal_faculty_details
				: '',
		filename:
			checkData && data.patentDataList.patentDataList[0].supporting_documents
				? data.patentDataList.patentDataList[0].supporting_documents
				: '',

		publication_date:
			checkData && data.patentDataList.patentDataList[0].publication_date
				? new Date(data.patentDataList.patentDataList[0].publication_date)
				: null
	};

	let publicationDate: Date | null = new Date();
	publicationDate = obj.publication_date;
	$: publicationFormattedDate = publicationDate;

	async function downLoadFiles() {
		fetch(`${PUBLIC_API_BASE_URL}/patent-submission-and-grant-download-files?id=${obj.patent_id}`)
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
				a.download = 'patent_submission_document.zip';
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
		<div class="p-4">
			<!-- Adjust max-height as needed -->
			<div class="grid grid-cols-1 gap-8 p-4 md:grid-cols-2 lg:grid-cols-3">
				<Input
					type="text"
					placeholder="Title of Patent / Invention"
					bind:value={obj.title}
					{disabled}
				/>
				<Input
					type="text"
					placeholder="Type of Invention(IPR)"
					value={obj.invention_type}
					{disabled}
				/>
				<Input type="text" placeholder="Patent Status" bind:value={obj.patent_status} {disabled} />
			</div>
			<div class="grid grid-cols-1 gap-8 p-4 md:grid-cols-2 lg:grid-cols-3">
				<Input
					type="text"
					placeholder="Sustainable Development Goals"
					value={obj.sdg_goals}
					{disabled}
				/>
				<Input
					type="number"
					placeholder="Patent/Invention Application Number"
					bind:value={obj.appln_no}
					{disabled}
				/>
				<div class="space-y-2">
					<label for="documents" class="lms-label"
						>Download Supporting Documents
						<span>*</span>
					</label>
					<div class="flex items-center gap-2">
						<File isView={true} />
						<button class="lms-btn lms-primary-btn" on:click={downLoadFiles}
							><i class="fa-solid fa-download text-lg"></i></button
						>
					</div>
				</div>
			</div>

			<div class="grid grid-cols-1 gap-8 p-4 md:grid-cols-2 lg:grid-cols-3 items-center">
				<Input
					type="text"
					placeholder="Names Of  Internal  Inventors"
					value={obj.internal_faculty_details}
					{disabled}
				/>
				<Input
					type="text"
					placeholder="Names Of External Inventors"
					value={obj.external_faculty_details}
					{disabled}
				/> 

				<div class="flex flex-wrap">
					<div class="text-primary hover:bg-base flex items-center gap-x-3 rounded-lg px-3 py-2">
						<SelectDateIcon />
						<span class="text-body-2 font-bold">Date of Filing/Grant/Published</span>
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
			
			
		</div>
	</Card>
{:else}
	<p>No Data Found</p>
{/if}

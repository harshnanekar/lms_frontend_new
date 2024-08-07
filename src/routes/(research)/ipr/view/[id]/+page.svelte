<script lang="ts">
	import { Input, DatePicker, DynamicSelect, File } from '$lib/components/ui';

	import { SelectDateIcon, XIcon } from '$lib/components/icons';

	import { formatDateTimeShort, formatDate } from '$lib/utils/date-formatter';

	import { tooltip } from '$lib/utils/tooltip';

	import { fly } from 'svelte/transition';

	import { Card } from '$lib/components/ui';

	import { validateWithZod } from '$lib/utils/validations';

	import { iprDetails, type iprDetailsReq } from '$lib/schemas/modules/research/master-validations';

	import { type FileReq, fileSchema } from '$lib/schemas/modules/research/master-validations';

	import { toast } from 'svelte-sonner';

	import { fetchApi, fetchFormApi } from '$lib/utils/fetcher';

	import { PUBLIC_API_BASE_URL } from '$env/static/public';

	import type { any } from 'zod';

	import { goto } from '$app/navigation';

	import { fileDataStore } from '$lib/stores/modules/research/master.store';

	import { createFileUrl } from '$lib/utils/helper';


	export let data: any;

	// let isRequired = false;
	let disabled: boolean = true;
	let title = 'IPR';
	console.log('data ===>>>>>>', data)
	let checkData = data.iprDataList.iprDataList.length > 0 ? true : false;
	console.log('iprDataList ==>>>>', data.iprDataList.files.length);
	console.log('checkData ===>>>>>', checkData);
	let files = data.iprDataList.files.length > 0 ? createFileUrl(data.iprDataList.files) : [];
	
    fileDataStore.set(files);

	console.log('data in view comming from backend ===>>>>', JSON.stringify(data));
	console.log('render iprDataList', data.iprDataList.iprDataList[0]);

	let obj: any = {
		ipr_id: parseInt(data.iprDataList.iprDataList[0].ipr_id),
		nmims_school: checkData && data.iprDataList.iprDataList[0].nmims_school ? data.iprDataList.iprDataList[0].nmims_school : '',
		nmims_campus: data.iprDataList.iprDataList[0].nmims_campus ? data.iprDataList.iprDataList[0].nmims_campus : '',
		invention_type: data.iprDataList.iprDataList[0].invention_type ? data.iprDataList.iprDataList[0].invention_type : '',
		sdg_goals: data.iprDataList.iprDataList[0].sdg_goals ? data.iprDataList.iprDataList[0].sdg_goals : '',
		patent_status: data.iprDataList.iprDataList[0].patent_status ? data.iprDataList.iprDataList[0].patent_status : '',
		title: data.iprDataList.iprDataList[0].title ? data.iprDataList.iprDataList[0].title : '',
		appln_no: data.iprDataList.iprDataList[0].appln_no ? data.iprDataList.iprDataList[0].appln_no : '',
		publication_no: data.iprDataList.iprDataList[0].publication_no ? data.iprDataList.iprDataList[0].publication_no : '',
		granted_no: data.iprDataList.iprDataList[0].granted_no ? data.iprDataList.iprDataList[0].granted_no : '',
		institute_affiliation: data.iprDataList.iprDataList[0].institute_affiliation
			? data.iprDataList.iprDataList[0].institute_affiliation
			: '',
		applicants_names: data.iprDataList.iprDataList[0].applicants_names
			? data.iprDataList.iprDataList[0].applicants_names
			: '',
		external_faculty_details: data.iprDataList.iprDataList[0].external_faculty_details
			? data.iprDataList.iprDataList[0].external_faculty_details
			: '',
		internal_faculty_details: data.iprDataList.iprDataList[0].internal_faculty_details
			? data.iprDataList.iprDataList[0].internal_faculty_details
			: '',
		filename: data.iprDataList.iprDataList[0].supporting_documents
			? data.iprDataList.iprDataList[0].supporting_documents
			: '',
		filed_date: data.iprDataList.iprDataList[0].filed_date ? new Date(data.iprDataList.iprDataList[0].filed_date) : null,
		grant_date: data.iprDataList.iprDataList[0].grant_date ? new Date(data.iprDataList.iprDataList[0].grant_date) : null,
		published_date: data.iprDataList.iprDataList[0].published_date
			? new Date(data.iprDataList.iprDataList[0].published_date)
			: null
	};

	console.log('boj ===>>>>', obj)

	let filedDate: Date | null = new Date();
	filedDate = obj.filed_date;
	$: filedFormattedDate = filedDate;

	let grantDate: Date | null = new Date();
	grantDate = obj.grant_date;
	$: grantformattedDate = grantDate;

	let publishedDate: Date | null = new Date();
	publishedDate = obj.published_date;
	$: publishedFormattedDate = publishedDate;



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
	console.log('checkData ===>>>>>>', checkData);
</script>

{#if checkData}
	<Card {title}>
		<div class="modal-content p-4">
			<!-- Adjust max-height as needed -->
			<div class="grid grid-cols-3 gap-8 items-center p-4">
				<Input type="text" placeholder="Nmims School" value={obj.nmims_school} {disabled} />
				<Input type="text" placeholder="Nmims Campus" value={obj.nmims_campus} {disabled} />
				<Input
					type="text"
					placeholder="Type of Invention(IPR)"
					value={obj.invention_type}
					{disabled}
				/>
			</div>
			<div class="grid grid-cols-3 gap-8 items-center p-4">
				<Input
					type="text"
					placeholder="Sustainable Development Goals"
					value={obj.sdg_goals}
					{disabled}
				/>
				<Input type="text" placeholder="Patent Status" bind:value={obj.patent_status} {disabled} />
				<Input
					type="text"
					placeholder="Title of Patent / Invention"
					bind:value={obj.title}
					{disabled}
				/>
			</div>
			<div class="grid grid-cols-3 gap-8 p-4">
				<Input
					type="number"
					placeholder="Patent/Invention Application Number"
					bind:value={obj.appln_no}
					{disabled}
				/>
				<Input
					type="number"
					placeholder="Patent/Invention Publication Number"
					bind:value={obj.publication_no}
					{disabled}
				/>
				<Input
					type="number"
					placeholder="Patent/Invention Granted Number"
					bind:value={obj.granted_no}
					{disabled}
				/>
			</div>
			<div class="grid grid-cols-3 gap-8 p-4">
				<Input
					type="text"
					placeholder="Institute Affiliation"
					bind:value={obj.institute_affiliation}
					{disabled}
				/>
				<Input
					type="text"
					placeholder="Applicants Names"
					bind:value={obj.applicants_names}
					{disabled}
				/>
				<Input
					type="text"
					placeholder="Names Of  Internal  Inventors"
					value={obj.internal_faculty_details}
					{disabled}
				/>
				
			</div>

			<div class="grid grid-cols-1 items-center gap-8 p-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
				<Input
					type="text"
					placeholder="Names Of External Inventors"
					value={obj.external_faculty_details}
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
						><i class="fa-solid fa-download text-lg"></i></button>
					</div>
				</div>


			</div>
		
			<div class="grid grid-cols-1 items-center gap-8 p-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
				

				<div class="flex flex-row">
					<div class="text-primary hover:bg-base flex items-center gap-x-3 rounded-lg px-3 py-2">
						<SelectDateIcon />
						<span class="text-body-2 font-bold">Patent Filed Date</span>
					</div>
					{#if filedFormattedDate}
						{@const formattedDate = formatDateTimeShort(new Date(filedFormattedDate))}
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



				<div class="flex flex-row">

					<div class="text-primary hover:bg-base flex items-center gap-x-3 rounded-lg px-3 py-2">
						<SelectDateIcon />
						<span class="text-body-2 font-bold">Patent Grant Date</span>
					</div>
					{#if grantformattedDate}
						{@const formattedDate = formatDateTimeShort(new Date(grantformattedDate))}
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
					{:else}
						<p>No Data Found</p>
					{/if}
				</div>
			
			</div>
			<div class="grid grid-cols-1 items-center gap-8 p-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
				<div class="flex flex-row">
					<div class="text-primary hover:bg-base flex items-center gap-x-3 rounded-lg px-3 py-2">
						<SelectDateIcon />
						<span class="text-body-2 font-bold">Patent /Invention Published Date</span>
					</div>
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
							>
							</button>
						</div>
					{:else}
						<p>No Data Found</p>
					{/if}
				</div>
			</div>
		</div>
	</Card>
{:else}
	<p>No Data Found</p>
{/if}

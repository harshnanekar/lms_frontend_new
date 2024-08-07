<script lang="ts">
	export let data: any;
	import { Card, Input ,File } from '$lib/components/ui';
	import { SelectDateIcon } from '$lib/components/icons';
	import { formatDateTimeShort } from '$lib/utils/date-formatter';
	import { tooltip } from '$lib/utils/tooltip';
	import { fly } from 'svelte/transition';
	import { PUBLIC_API_BASE_URL } from '$env/static/public';
	import { downloadFetch } from '$lib/utils/fetcher';
	import { toast } from 'svelte-sonner';
	import { fileDataStore } from '$lib/stores/modules/research/master.store';
	import { createFileUrl } from '$lib/utils/helper';

	let disabled: boolean = true;
	let checkData = data.researchSeminarData.researchSeminarData.length > 0 ? true : false;
	let files = data.researchSeminarData.files.length > 0 ? createFileUrl(data.researchSeminarData.files) : [];
	fileDataStore.set(files);
	let title = 'Research Seminars';

	let obj = {
		research_seminar_id:
			data.researchSeminarData.researchSeminarData.length > 0 ? data.researchSeminarData.researchSeminarData[0].id : null,
		nmims_school:
			data.researchSeminarData.researchSeminarData.length > 0 && data.researchSeminarData.researchSeminarData[0].nmims_school != null
				? data.researchSeminarData.researchSeminarData[0].nmims_school
				: null,
		nmims_campus:
			data.researchSeminarData.researchSeminarData.length > 0 && data.researchSeminarData.researchSeminarData[0].nmims_campus != null
				? data.researchSeminarData.researchSeminarData[0].nmims_campus
				: null,
		topic:
			data.researchSeminarData.researchSeminarData.length > 0 && data.researchSeminarData.researchSeminarData[0].topic
				? data.researchSeminarData.researchSeminarData[0].topic
				: '',
		resource_person:
			data.researchSeminarData.researchSeminarData.length > 0 ? data.researchSeminarData.researchSeminarData[0].resource_person : '',
		nmims_authors:
			data.researchSeminarData.researchSeminarData.length > 0 && data.researchSeminarData.researchSeminarData[0].nmims_authors != null
				? data.researchSeminarData.researchSeminarData[0].nmims_authors
				: null,
		paper_title:
			data.researchSeminarData.researchSeminarData.length > 0 && data.researchSeminarData.researchSeminarData[0].paper_title
				? data.researchSeminarData.researchSeminarData[0].paper_title
				: '',
		journal_name:
			data.researchSeminarData.researchSeminarData.length > 0 && data.researchSeminarData.researchSeminarData[0].journal_name
				? data.researchSeminarData.researchSeminarData[0].journal_name
				: '',
		publisher:
			data.researchSeminarData.researchSeminarData.length > 0 && data.researchSeminarData.researchSeminarData[0].publisher
				? data.researchSeminarData.researchSeminarData[0].publisher
				: '',
		publisher_category:
			data.researchSeminarData.researchSeminarData.length > 0 && data.researchSeminarData.researchSeminarData[0].publisher_category != null
				? Number(data.researchSeminarData.researchSeminarData[0].publisher_category)
				: null,
		volume_no: data.researchSeminarData.researchSeminarData.length > 0 ? data.researchSeminarData.researchSeminarData[0].volume_no : '',
		issn_no: data.researchSeminarData.researchSeminarData.length > 0 ? data.researchSeminarData.researchSeminarData[0].issn_no : '',
		scopus_site_score: data.researchSeminarData.researchSeminarData[0].scopus_site_score,
		impact_factor:
			data.researchSeminarData.researchSeminarData.length > 0 && data.researchSeminarData.researchSeminarData[0].impact_factor
				? Number(data.researchSeminarData.researchSeminarData[0].impact_factor)
				: 0,
		scs_indexed:
			data.researchSeminarData.researchSeminarData.length > 0 ? data.researchSeminarData.researchSeminarData[0].scs_indexed : null,
		wos_indexed:
			data.researchSeminarData.researchSeminarData.length > 0 ? data.researchSeminarData.researchSeminarData[0].wos_indexed : null,
		gs_indexed: data.researchSeminarData.researchSeminarData.length > 0 ? data.researchSeminarData.researchSeminarData[0].gs_indexed : '',
		abdc_indexed:
			data.researchSeminarData.researchSeminarData.length > 0 ? data.researchSeminarData.researchSeminarData[0].abdc_indexed : null,
		ugc_indexed:
			data.researchSeminarData.researchSeminarData.length > 0 ? data.researchSeminarData.researchSeminarData[0].ugc_indexed : null,
		doi_no: data.researchSeminarData.researchSeminarData.length > 0 ? data.researchSeminarData.researchSeminarData[0].doi_no : '',
		uid:
			data.researchSeminarData.researchSeminarData.length > 0 && data.researchSeminarData.researchSeminarData[0].uid
				? data.researchSeminarData.researchSeminarData[0].uid
				: '',
		supporting_documents:
			data.researchSeminarData.researchSeminarData.length > 0 && data.researchSeminarData.researchSeminarData[0].filename
				? data.researchSeminarData.researchSeminarData[0].filename
				: ''
	};

	let publicationDate: Date | null = new Date();
	publicationDate = data.researchSeminarData.researchSeminarData[0].publication_date
		? data.researchSeminarData.researchSeminarData[0].publication_date
		: null;
	$: publicationFormattedDate = publicationDate;

	let researchDate: Date | null = new Date();
	researchDate = data.researchSeminarData.researchSeminarData[0].research_date
		? data.researchSeminarData.researchSeminarData[0].research_date
		: null;
	$: researchFormattedDate = researchDate;

	async function downLoadFiles() {
		// const response = await downloadFetch<null>({
		// url: `${PUBLIC_API_BASE_URL}/case-study-download-files?id=${obj.research_seminar_id}`,
		// method: 'GET',
		// isDownload: true,
		// downloadFileName: 'research_seminar_documents.zip'
		// });

		// if (response.error) {
		//     toast.error(response.error.message || 'Something went wrong!', {
		//         description: response.error.errorId ? `ERROR-ID: ${response.error.errorId}` : ''
		//     });
		// }
		fetch(`${PUBLIC_API_BASE_URL}/research-seminar-download-files?id=${obj.research_seminar_id}`)
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
				a.download = 'research_seminar_documents.zip';
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
			<div class="grid grid-cols-1 gap-8 p-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
				<Input
					type="text"
					placeholder="Nmims School"
					isRequired={true}
					value={obj.nmims_school}
					{disabled}
				/>
				<Input
					type="text"
					placeholder="Nmims Campus"
					isRequired={true}
					value={obj.nmims_campus}
					{disabled}
				/>
				<Input
					type="text"
					placeholder="Topic Of Research Seminar"
					isRequired={true}
					value={obj.topic}
					{disabled}
				/>
			</div>

			<div class="grid grid-cols-1 gap-8 p-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
				<Input
					type="text"
					placeholder="Resource Person"
					isRequired={false}
					value={obj.resource_person}
					{disabled}
				/>
				<Input
					type="text"
					placeholder="Nmims Authors"
					isRequired={true}
					value={obj.paper_title}
					{disabled}
				/>
				<Input
					type="text"
					placeholder="Title Of Paper"
					isRequired={true}
					value={obj.paper_title}
					{disabled}
				/>
			</div>

			<div class="grid grid-cols-1 gap-8 p-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
				<Input
					type="text"
					placeholder="Journal Name"
					isRequired={true}
					value={obj.journal_name}
					{disabled}
				/>
				<Input
					type="text"
					placeholder="Publisher"
					value={obj.publisher}
					isRequired={true}
					{disabled}
				/>
				<div class="ml-2">
					<label class="text-sm text-[#888888]">Publisher Category</label><span>*</span>
					<div class="mt-2.5 flex flex-row gap-[20px]">
						<div class="flex flex-row">
							<input
								type="radio"
								id="html"
								class="lms-input-radio w-4"
								name="radio-button-national"
								value={1}
								checked={obj.publisher_category === 1}
								{disabled}
							/>
							<span class="text-sm text-[#888888]">International</span>
						</div>
						<div class="flex flex-row">
							<input
								type="radio"
								id="html"
								class="lms-input-radio w-4"
								name="radio-button-national"
								bind:group={obj.publisher_category}
								value={2}
								checked={obj.publisher_category === 2}
								{disabled}
							/>
							<span class="text-sm text-[#888888]">National</span>
						</div>
					</div>
				</div>
			</div>

			<div class="grid grid-cols-1 gap-8 p-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
				<Input
					type="text"
					isRequired={false}
					placeholder="Vol,Issue,Page No."
					value={obj.volume_no}
					{disabled}
				/>
				<Input
					type="text"
					isRequired={false}
					placeholder="ISSN No."
					value={obj.issn_no}
					{disabled}
				/>
				<Input
					type="text"
					isRequired={false}
					placeholder="Scopus Site Score"
					value={obj.scopus_site_score}
					{disabled}
				/>
			</div>

			<div class="grid grid-cols-1 gap-8 p-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
				<Input
					type="number"
					isRequired={false}
					placeholder="Impact factor by Clarivate Analytics"
					value={obj.impact_factor}
					{disabled}
				/>
				<div class="ml-2">
					<label class="text-sm text-[#888888]">Wos Indexed</label>
					<div class="mt-2 flex flex-row gap-[20px]">
						<div class="flex flex-row">
							<input
								type="radio"
								id="html"
								class="lms-input-radio w-4"
								name="radio-button-wos"
								value={true}
								checked={obj.wos_indexed === true}
								{disabled}
							/>
							<span class="text-sm text-[#888888]">Yes</span>
						</div>
						<div class="flex flex-row">
							<input
								type="radio"
								id="html"
								class="lms-input-radio w-4"
								name="radio-button-wos"
								value={false}
								checked={obj.wos_indexed === false}
								{disabled}
							/>
							<span class="text-sm text-[#888888]">No</span>
						</div>
					</div>
				</div>
				<Input
					type="text"
					isRequired={false}
					placeholder="Scopus Indexed"
					value={obj.scs_indexed}
					{disabled}
				/>
			</div>

			<div class="grid grid-cols-1 gap-8 p-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
				<Input
					type="text"
					isRequired={false}
					placeholder="GS Indexed"
					value={obj.gs_indexed}
					{disabled}
				/>
				<Input
					type="text"
					isRequired={false}
					placeholder="ABDC Indexed"
					value={obj.abdc_indexed}
					{disabled}
				/>

				<div class="ml-2">
					<label class="text-sm text-[#888888]">UGC Indexed</label>
					<div class="mt-2 flex flex-row gap-[20px]">
						<div class="flex flex-row">
							<input
								type="radio"
								id="html"
								class="lms-input-radio w-4"
								name="radio-button-ugc"
								value={true}
								checked={obj.ugc_indexed === true}
								{disabled}
							/>
							<span class="text-sm text-[#888888]">Yes</span>
						</div>
						<div class="flex flex-row">
							<input
								type="radio"
								id="html"
								class="lms-input-radio w-4"
								name="radio-button-ugc"
								bind:group={obj.ugc_indexed}
								value={false}
								checked={obj.ugc_indexed === false}
								{disabled}
							/>
							<span class="text-sm text-[#888888]">No</span>
						</div>
					</div>
				</div>
			</div>

			<div class="grid grid-cols-1 items-center gap-8 p-4 md:grid-cols-2 lg:grid-cols-3">
				<Input
					type="text"
					isRequired={false}
					placeholder="Weblink/DOI NO."
					value={obj.doi_no}
					{disabled}
				/>
				<Input type="text" isRequired={true} placeholder="UID" bind:value={obj.uid} {disabled} />
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

			<div class="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-2">
				<div class="flex gap-4 md:flex-row">
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

				<div class="flex gap-4 md:flex-row">
					<div class="text-primary hover:bg-base flex items-center gap-x-3 rounded-lg px-3 py-2">
						<SelectDateIcon />
						<span class="text-body-2 font-bold">Research Seminar Date</span>
					</div>
					{#if researchFormattedDate}
						{@const formattedDate = formatDateTimeShort(new Date(researchFormattedDate))}
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
	<p>No Data Found !</p>
{/if}

<script lang="ts">
	import { createFileUrl } from '$lib/utils/helper';
	import { Card } from '$lib/components/ui';
	import { Input , File} from '$lib/components/ui';
	import { SelectDateIcon } from '$lib/components/icons';
	import { formatDateTimeShort } from '$lib/utils/date-formatter';
	import { tooltip } from '$lib/utils/tooltip';
	import { fly } from 'svelte/transition';
	import { fetchApi } from '$lib/utils/fetcher';
	import { PUBLIC_API_BASE_URL } from '$env/static/public';
	import { toast } from 'svelte-sonner';
	import { fileDataStore } from '$lib/stores/modules/research/master.store';

	export let data: any;
	let disabled: boolean = true;
	let checkData = data.journalData.journalData.length > 0 ? true : false;
	
	let fileUrls = data.journalData.files.length > 0 ? createFileUrl( data.journalData.files) : [];
	fileDataStore.set(fileUrls);

	let obj = {
		journal_paper_id: checkData ? data.journalData.journalData[0].journal_paper_id : null,
		journal_name:checkData && data.journalData.journalData[0].journal_name
				? data.journalData.journalData[0].journal_name
				: '',
		title:checkData && data.journalData.journalData[0].title ? data.journalData.journalData[0].title : '',
		publish_year:
		checkData && data.journalData.journalData[0].publish_year
				? data.journalData.journalData[0].publish_year
				: null,
		total_authors:
		checkData && data.journalData.journalData[0].total_authors
				? data.journalData.journalData[0].total_authors
				: null,
		nmims_author_count:
		checkData && data.journalData.journalData[0].nmims_authors_count
				? data.journalData.journalData[0].nmims_authors_count
				: null,
		uid: checkData && data.journalData.journalData[0].uid ? data.journalData.journalData[0].uid : '',
		doi_no:
		checkData&& data.journalData.journalData[0].doi_no ? data.journalData.journalData[0].doi_no : '',
		publisher:
		checkData && data.journalData.journalData[0].publisher
				? data.journalData.journalData[0].publisher
				: '',
		publication_date:
		checkData ? new Date(data.journalData.journalData[0].publishing_date) : null,
		issn_no:
		checkData && data.journalData.journalData[0].issn_no ? data.journalData.journalData[0].issn_no : '',
		scopus_site_score:
		checkData && data.journalData.journalData[0].scopus_site_score
				? data.journalData.journalData[0].scopus_site_score
				: null,
		gs_indexed:
		checkData && data.journalData.journalData[0].gs_indexed
				? data.journalData.journalData[0].gs_indexed
				: null,
		journal_type:
		checkData && data.journalData.journalData[0].journal_type
				? Number(data.journalData.journalData[0].journal_type)
				: null,
		ugc_indexed: checkData ? data.journalData.journalData[0].ugc_indexed : null,
		scs_indexed: checkData ? data.journalData.journalData[0].scs_indexed : null,
		wos_indexed: checkData ? data.journalData.journalData[0].wos_indexed : null,
		foreign_authors_count:
		checkData && data.journalData.journalData[0].foreign_authors_count
				? data.journalData.journalData[0].foreign_authors_count
				: null,
		student_authors_count:
		checkData && data.journalData.journalData[0].student_authors_count
				? data.journalData.journalData[0].student_authors_count
				: null,
		impact_factor:
		checkData && data.journalData.journalData[0].impact_factor
				? data.journalData.journalData[0].impact_factor
				: null,
		page_no:
		checkData && data.journalData.journalData[0].page_no ? data.journalData.journalData[0].page_no : '',
		paper_type:
		checkData && data.journalData.journalData[0].paper_name
				? data.journalData.journalData[0].paper_name
				: '',
		nmims_school:
		checkData && data.journalData.journalData[0].nmims_school
				? data.journalData.journalData[0].nmims_school
				: '',
		nmims_campus:
		checkData && data.journalData.journalData[0].nmims_campus
				? data.journalData.journalData[0].nmims_campus
				: '',
		abdc_indexed: checkData ? data.journalData.journalData[0].abdc_indexed : '',
		policy_cadre:
		checkData && data.journalData.journalData[0].policy_names
				? data.journalData.journalData[0].policy_names
				: '',
		all_authors:
		checkData && data.journalData.journalData[0].all_authors
				? data.journalData.journalData[0].all_authors
				: '',
		nmims_authors:
		checkData && data.journalData.journalData[0].nmims_authors
				? data.journalData.journalData[0].nmims_authors
				: '',
		foreign_authors:
		checkData && data.journalData.journalData[0].foreign_authors
				? data.journalData.journalData[0].foreign_authors
				: '',
		other_authors:
		checkData && data.journalData.journalData[0].other_authors
				? data.journalData.journalData[0].other_authors
				: '',
		student_authors:
		checkData && data.journalData.journalData[0].student_authors
				? data.journalData.journalData[0].student_authors
				: '',
		supporting_documents:
		checkData && data.journalData.journalData[0].supporting_documents
				? data.journalData.journalData[0].supporting_documents
				: '',
		filename:
		checkData && data.journalData.journalData[0].filename
				? data.journalData.journalData[0].filename
				: ''
	};

	let publicationDate: Date | null = new Date();
	publicationDate = obj.publication_date;
	$: publicationFormattedDate = publicationDate;

	let title = 'Journal Articles Published';

	async function downLoadFiles() {
		fetch(`${PUBLIC_API_BASE_URL}/journal-download-files?id=${obj.journal_paper_id}`)
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
				a.download = 'journal_article_documents.zip';
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
			<div class="modal-content">
				<!-- Adjust max-height as needed -->
				<div class="grid grid-cols-1 gap-8 p-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
					<Input type="text" placeholder="Nmims School" value={obj.nmims_school} {disabled} />
					<Input type="text" placeholder="Nmims Campus" value={obj.nmims_campus} {disabled} />
					<Input type="number" placeholder="Publishing Year" value={obj.publish_year} {disabled} />
				</div>
				<div class="grid grid-cols-1 gap-8 p-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
					<Input type="text" placeholder="Policy Cadre" value={obj.policy_cadre} {disabled} />
					<Input type="text" placeholder="Name Of All Authors" value={obj.all_authors} {disabled} />
					<Input
						type="number"
						placeholder="Total No. Of Authors"
						value={obj.total_authors}
						{disabled}
					/>
				</div>
				<div class="grid grid-cols-1 gap-8 p-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
					<Input
						type="text"
						placeholder="Name Of Nmims Authors"
						value={obj.nmims_authors}
						{disabled}
					/>
					<Input
						type="text"
						placeholder="No. Of Nmims Authors"
						value={obj.nmims_author_count}
						{disabled}
					/>
					<Input type="text" placeholder="Journal Name" value={obj.journal_name} {disabled} />
				</div>
				<div class="grid grid-cols-1 gap-8 p-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
					<Input type="text" placeholder="UID" value={obj.uid} {disabled} />
					<Input type="text" placeholder="Publisher" value={obj.publisher} {disabled} />
					<Input
						type="text"
						placeholder="Names Of Other-Authors"
						value={obj.other_authors}
						{disabled}
					/>
				</div>
				<div class="grid grid-cols-1 gap-8 p-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
					<Input type="text" placeholder="Vol,Issue,Page No." value={obj.page_no} {disabled} />
					<Input type="text" placeholder="ISSN No." value={obj.issn_no} {disabled} />
					<Input
						type="number"
						placeholder="Scopus Site Score"
						value={obj.scopus_site_score}
						{disabled}
					/>
				</div>
				<div class="grid grid-cols-1 gap-8 p-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
					<Input
						type="number"
						placeholder="Impact factor by Clarivate Analytics"
						value={obj.impact_factor}
						{disabled}
					/>
					<Input type="text" placeholder="WebLink /DOI No." value={obj.doi_no} {disabled} />
					<Input type="text" placeholder="Title Of Paper" value={obj.title} {disabled} />
				</div>

				<div class="grid grid-cols-1 gap-8 p-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
					<Input type="text" placeholder="GS Indexed" value={obj.gs_indexed} {disabled} />
					<div class="ml-2">
						<label class="text-sm text-[#888888]"
							>Journal Type<span class="text-danger text-sm">*</span></label
						>
						<div class="mt-2.5 flex flex-row gap-[20px]">
							<div class="flex flex-row">
								<input
									type="radio"
									id="international"
									class="lms-input-radio w-4"
									name="nationality"
									value={1}
									checked={obj.journal_type === 1}
									{disabled}
								/>
								<span class="text-sm text-[#888888]">International</span>
							</div>
							<div class="flex flex-row">
								<input
									type="radio"
									id="national"
									class="lms-input-radio w-4"
									name="nationality"
									value={2}
									checked={obj.journal_type === 2}
									{disabled}
								/>
								<span class="text-sm text-[#888888]">National</span>
							</div>
						</div>
					</div>
					<div class="ml-2">
						<label class="text-sm text-[#888888]"
							>Wos Indexed<span class="text-danger text-sm">*</span></label
						>
						<div class="mt-2 flex flex-row gap-[20px]">
							<div class="flex flex-row">
								<input
									type="radio"
									id="wosYes"
									class="lms-input-radio w-4"
									name="wosIndexed"
									value={true}
									checked={obj.wos_indexed === true}
									{disabled}
								/>
								<span class="text-sm text-[#888888]">Yes</span>
							</div>
							<div class="flex flex-row">
								<input
									type="radio"
									id="wosNo"
									class="lms-input-radio w-4"
									name="wosIndexed"
									value={false}
									checked={obj.wos_indexed === false}
									{disabled}
								/>
								<span class="text-sm text-[#888888]">No</span>
							</div>
						</div>
					</div>
				</div>

				<div class="grid grid-cols-1 gap-8 p-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
					<Input type="text" placeholder="Abdc Indexed" value={obj.abdc_indexed} {disabled} />
					<div class="ml-2">
						<label class="text-sm text-[#888888]"
							>UGC Indexed<span class="text-danger text-sm">*</span></label
						>
						<div class="mt-2 flex flex-row gap-[20px]">
							<div class="flex flex-row">
								<input
									type="radio"
									id="ugcYes"
									class="lms-input-radio w-4"
									name="ugcIndexed"
									value={true}
									checked={obj.ugc_indexed === true}
									{disabled}
								/>
								<span class="text-sm text-[#888888]">Yes</span>
							</div>
							<div class="flex flex-row">
								<input
									type="radio"
									id="ugcNo"
									class="lms-input-radio w-4"
									name="ugcIndexed"
									value={false}
									checked={obj.ugc_indexed === false}
									{disabled}
								/>
								<span class="text-sm text-[#888888]">No</span>
							</div>
						</div>
					</div>
					<Input type="text" placeholder="Paper Type" value={obj.paper_type} {disabled} />
				</div>

				<div class="grid grid-cols-1 gap-8 p-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
					<Input type="text" placeholder="Foreign Authors" value={obj.foreign_authors} {disabled} />
					<Input
						type="number"
						placeholder="No. Of Foreign Authors"
						value={obj.foreign_authors_count}
						{disabled}
					/>
					<Input type="text" placeholder="Student Authors" value={obj.student_authors} {disabled} />
				</div>

				<div class="grid grid-cols-1 items-center gap-8 p-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
					<Input
						type="text"
						placeholder="No. Of Student Authors"
						value={obj.student_authors_count}
						{disabled}
					/>

					<!---scopus-->
					<div class="ml-2">
						<label class="text-sm text-[#888888]"
							>Scopus Site Indexed<span class="text-danger text-sm">*</span></label
						>
						<div class="mt-2 flex flex-row gap-[20px]">
							<div class="flex flex-row">
								<input
									type="radio"
									id="scsYes"
									class="lms-input-radio w-4 accent-[#FF0000]"
									name="scsIndexed"
									value={true}
									checked={obj.scs_indexed === true}
									{disabled}
								/>
								<span class="text-sm text-[#888888]">Yes</span>
							</div>
							<div class="flex flex-row">
								<input
									type="radio"
									id="scsNo"
									class="lms-input-radio w-4 accent-[#FF0000]"
									name="scsIndexed"
									value={false}
									checked={obj.scs_indexed === false}
									{disabled}
								/>
								<span class="text-sm text-[#888888]">No</span>
							</div>
						</div>
					</div>

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
		</div>
	</Card>
{:else}
	<p>No Data Found</p>
{/if}

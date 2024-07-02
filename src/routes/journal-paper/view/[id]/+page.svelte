<script lang="ts">
	import { Card } from '$lib/components/ui';
	import type { JournalPaper } from '$lib/types/modules/research/research-types.ts';
	import { Input } from '$lib/components/ui';
	import { SelectDateIcon, XIcon } from '$lib/components/icons';
	import { formatDateTimeShort } from '$lib/utils/date-formatter';
	import { tooltip } from '$lib/utils/tooltip';
	import { fly } from 'svelte/transition';

	let campus: string = '';
	let disabled: boolean = true;
	export let data;

	let obj = {
		journal_name: data.journalData[0].journal_name,
		title: data.journalData[0].title,
		publish_year: data.journalData[0].publish_year,
		total_authors: data.journalData[0].total_authors,
		nmims_author_count: data.journalData[0].nmims_authors_count,
		uid: data.journalData[0].uid,
		doi_no: data.journalData[0].doi_no,
		publisher: data.journalData[0].publisher,
		publication_date: new Date(data.journalData[0].publishing_date),
		issn_no: data.journalData[0].issn_no,
		scopus_site_score: data.journalData[0].scopus_site_score,
		gs_indexed: data.journalData[0].gs_indexed,
		journal_type: Number(data.journalData[0].journal_type),
		ugc_indexed: data.journalData[0].ugc_indexed,
		scs_indexed: data.journalData[0].scs_indexed,
		wos_indexed: data.journalData[0].wos_indexed,
		foreign_authors_count: data.journalData[0].foreign_authors_count,
		student_authors_count: data.journalData[0].student_authors_count,
		impact_factor: data.journalData[0].impact_factor,
		page_no: data.journalData[0].page_no,
		paper_type: data.journalData[0].paper_name,
		nmims_school: data.journalData[0].nmims_school,
		nmims_campus: data.journalData[0].nmims_school,
		abdc_indexed: data.journalData[0].abdc_type,
		policy_cadre: data.journalData[0].policy_names,
		all_authors: data.journalData[0].all_authors,
		nmims_authors: data.journalData[0].nmims_authors,
		foreign_authors: data.journalData[0].foreign_authors,
		other_authors: data.journalData[0].other_authors,
		student_authors: data.journalData[0].student_authors,
		supporting_documents: data.journalData[0].supporting_documents
	};

	let publicationDate: Date | null = new Date();
	publicationDate = obj.publication_date;
	$: publicationFormattedDate = publicationDate;

	let title = 'Journal Articles Published';

	console.log('journal json ', JSON.stringify(obj), data.journalData[0].paper_name);
</script>

<Card {title}>
	<div class="p-4">
		<div class="no-scrollbar modal-content max-h-[70vh] min-h-[50vh] overflow-auto">
			<!-- Adjust max-height as needed -->
			<div class="grid grid-cols-3 gap-[40px] p-4">
				<Input type="text" placeholder="Nmims Campus" bind:value={obj.nmims_school} {disabled} />
				<Input type="text" placeholder="Nmims Campus" bind:value={obj.nmims_campus} {disabled} />
				<Input
					type="number"
					placeholder="Publishing Year"
					bind:value={obj.publish_year}
					{disabled}
				/>
			</div>
			<div class="grid grid-cols-3 gap-[40px] p-4">
				<Input type="text" placeholder="Policy Cadre" bind:value={obj.policy_cadre} {disabled} />
				<Input
					type="text"
					placeholder="Name Of All Authors"
					bind:value={obj.all_authors}
					{disabled}
				/>
				<Input
					type="number"
					placeholder="Total No. Of Authors"
					bind:value={obj.total_authors}
					{disabled}
				/>
			</div>
			<div class="grid grid-cols-3 gap-[40px] p-4">
				<Input
					type="text"
					placeholder="Name Of Nmims Authors"
					bind:value={obj.nmims_authors}
					{disabled}
				/>
				<Input
					type="text"
					placeholder="No. Of Nmims Authors"
					bind:value={obj.nmims_author_count}
					{disabled}
				/>
				<Input type="text" placeholder="Journal Name" bind:value={obj.journal_name} {disabled} />
			</div>
			<div class="grid grid-cols-3 gap-[40px] p-4">
				<Input type="text" placeholder="UID" bind:value={obj.uid} {disabled} />
				<Input type="text" placeholder="Publisher" bind:value={obj.publisher} {disabled} />
				<Input
					type="text"
					placeholder="Names Of Other-Authors"
					bind:value={obj.other_authors}
					{disabled}
				/>
			</div>
			<div class="grid grid-cols-3 gap-[40px] p-4">
				<Input type="text" placeholder="Vol,Issue,Page No." bind:value={obj.page_no} {disabled} />
				<Input type="text" placeholder="ISSN No." bind:value={obj.issn_no} {disabled} />
				<Input
					type="number"
					placeholder="Scopus Site Score"
					bind:value={obj.scopus_site_score}
					{disabled}
				/>
			</div>
			<div class="grid grid-cols-3 gap-[40px] p-4">
				<Input
					type="number"
					placeholder="Impact factor by Clarivate Analytics"
					bind:value={obj.impact_factor}
					{disabled}
				/>
				<Input type="text" placeholder="WebLink /DOI No." bind:value={obj.doi_no} {disabled} />
				<Input type="text" placeholder="Title Of Paper" bind:value={obj.title} {disabled} />
			</div>

			<div class="grid grid-cols-3 gap-[40px] p-4">
				<Input type="text" placeholder="GS Indexed" bind:value={obj.gs_indexed} {disabled} />
				<div class="ml-2">
					<label class="text-sm text-[#888888]"
						>International/National Journal<span class="text-danger text-sm">*</span></label
					>
					<div class="mt-2.5 flex flex-row gap-[20px]">
						<div class="flex flex-row">
							<input
								type="radio"
								id="international"
								class="lms-input-radio w-4"
								name="nationality"
								bind:group={obj.journal_type}
								value={1}
								checked={obj.journal_type === 1}
							/>
							<span class="text-sm text-[#888888]">International</span>
						</div>
						<div class="flex flex-row">
							<input
								type="radio"
								id="national"
								class="lms-input-radio w-4"
								name="nationality"
								bind:group={obj.journal_type}
								value={2}
								checked={obj.journal_type === 2}
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
								bind:group={obj.wos_indexed}
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
								bind:group={obj.wos_indexed}
								value={false}
								checked={obj.wos_indexed === false}
								{disabled}
							/>
							<span class="text-sm text-[#888888]">No</span>
						</div>
					</div>
				</div>
			</div>

			<div class="grid grid-cols-3 gap-[40px] p-4">
				<Input type="text" placeholder="Abdc Indexed" bind:value={obj.abdc_indexed} />
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
								bind:group={obj.ugc_indexed}
								value={true}
								checked={obj.ugc_indexed === true}
							/>
							<span class="text-sm text-[#888888]">Yes</span>
						</div>
						<div class="flex flex-row">
							<input
								type="radio"
								id="ugcNo"
								class="lms-input-radio w-4"
								name="ugcIndexed"
								bind:group={obj.ugc_indexed}
								value={false}
								checked={obj.ugc_indexed === false}
							/>
							<span class="text-sm text-[#888888]">No</span>
						</div>
					</div>
				</div>
				<Input type="text" placeholder="Paper Type" bind:value={obj.paper_type} />
			</div>

			<div class="grid grid-cols-3 gap-[40px] p-4">
				<Input type="text" placeholder="Foreign Authors" bind:value={obj.foreign_authors} />
				<Input
					type="number"
					placeholder="No. Of Foreign Authors"
					bind:value={obj.foreign_authors_count}
				/>
				<Input type="text" placeholder="Student Authors" bind:value={obj.student_authors} />
			</div>

			<div class="grid grid-cols-3 gap-[40px] p-4">
				<Input
					type="text"
					placeholder="No. Of Student Authors"
					bind:value={obj.student_authors_count}
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
								class="lms-input-radio w-4"
								name="scsIndexed"
								bind:group={obj.scs_indexed}
								value={true}
								checked={obj.scs_indexed === true}
							/>
							<span class="text-sm text-[#888888]">Yes</span>
						</div>
						<div class="flex flex-row">
							<input
								type="radio"
								id="scsNo"
								class="lms-input-radio w-4"
								name="scsIndexed"
								bind:group={obj.scs_indexed}
								value={false}
								checked={obj.scs_indexed === false}
							/>
							<span class="text-sm text-[#888888]">No</span>
						</div>
					</div>
				</div>
				<button class="lms-btn lms-primary-btn">Download</button>
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

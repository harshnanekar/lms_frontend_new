<script lang="ts">
	import { Input, DatePicker, DynamicSelect } from '$lib/components/ui';
	import { SelectDateIcon, XIcon } from '$lib/components/icons';
	import { formatDateTimeShort } from '$lib/utils/date-formatter';
	import { tooltip } from '$lib/utils/tooltip';
	import { fly } from 'svelte/transition';
	import {
		getAbdcIndexed,
		getPaperType,
		getSchool,
		getCampus,
		getPolicyCadre,
		getAllAuthor,
		getNmimsAuthor,
		getOtherAuthor,
		getForeignAuthor,
		getStudentAuthor
	} from '$lib/utils/select.helper';
	import { validateWithZod } from '$lib/utils/validations';
	import {
		journalPaper,
		type JournalPaperReq
	} from '$lib/schemas/modules/research/master-validations';
	import { toast } from 'svelte-sonner';
	import { fetchApi, fetchFormApi } from '$lib/utils/fetcher';
	import { PUBLIC_API_BASE_URL } from '$env/static/public';
	import type { any } from 'zod';

	export let data;
	let isRequired = false;

	let foreignAuthors = data?.journalData?.foreignAuthors?.message;
	let studentAuthors = data?.journalData?.StudentAuthors?.message;
	let otherAuthors = data?.journalData?.otherAuthors?.message;
	let policyCadre = data?.journalData?.policyCadre?.message;
	let nmimsAuthors = data?.journalData?.nmimsAuthors?.message;
	let allAuthors = data?.journalData?.allAuthors?.message;
	let abdcIndexed = data?.journalData?.abdcIndexed?.message;
	let paperType = data?.journalData?.paperType?.message;
	let nmimsSchool = data?.journalData?.school?.message;
	let nmimsCampus = data?.journalData?.campus?.message;

	// let isRequired = false;

	$: abdcTypes = abdcIndexed;
	$: foreignAuth = foreignAuthors;
	$: studentAuth = studentAuthors;
	$: otherAuth = otherAuthors;
	$: policy = policyCadre;
	$: nmimsAuth = nmimsAuthors;
	$: allAuth = allAuthors;
	$: paper = paperType;
	$: school = nmimsSchool;
	$: campus = nmimsCampus;

	console.log(JSON.stringify(otherAuthors));

	let publicationDate: Date | null = new Date();
	publicationDate = null;
	$: publicationFormattedDate = publicationDate;
	function handleDateChange(e: CustomEvent<any>) {
		if (!publicationDate) return;
		publicationFormattedDate = publicationDate;
		console.log('publication date ', publicationDate);
	}

	const obj = {
		nmims_school: [
			{
				value: nmimsSchool[0].school_name,
				label: nmimsSchool[0].school_name
			}
		],
		nmims_campus: [
			{
				value: nmimsCampus[0].campus_name,
				label: nmimsCampus[0].campus_name
			}
		],
		publish_year: null,
		policy_cadre: [
			{
				value: policyCadre[0].id,
				label: policyCadre[0].policy_name
			}
		],
		all_authors: [
			{
				value: allAuthors[0].id,
				label: allAuthors[0].faculty_name
			}
		],
		total_authors: null,
		nmims_authors: [
			{
				value: nmimsAuthors[0].id,
				label: nmimsAuthors[0].faculty_name
			}
		],
		nmims_author_count: null,
		journal_name: '',
		uid: '',
		publisher: '',
		other_authors: [
			{
				value: otherAuthors[0].id,
				label: otherAuthors[0].name
			}
		],
		page_no: '',
		issn_no: '',
		scopus_site_score: null,
		impact_factor: null,
		doi_no: '',
		title: '',
		gs_indexed: '',
		paper_type: {
			value: paperType[0].id,
			label: paperType[0].paper_name
		},
		wos_indexed: true,
		abdc_indexed: {
			value: abdcIndexed[0].id,
			label: abdcIndexed[0].abdc_type
		},
		ugc_indexed: true,
		scs_indexed: true,
		foreign_authors_count: null,
		foreign_authors: [
			{
				value: foreignAuthors[0].id,
				label: foreignAuthors[0].name
			}
		],
		student_authors_count: null,
		student_authors: [
			{
				value: studentAuthors[0].id,
				label: studentAuthors[0].name
			}
		],
		journal_type: 1
	};

	let files: any = [];
	let documentsArr: object[] = [];
	const fileToBase64 = (file: File): Promise<string> => {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => resolve(reader.result as string);
			reader.onerror = (error) => reject(error);
		});
	};

	$: if (files.length > 0) {
		documentsArr = [];
		(async () => {
			for (const file of files) {
				const base64String = await fileToBase64(file);
				documentsArr.push({ name: file.name, content: base64String });
				console.log(`${file.name}: ${file.size} bytes`);
			}
		})();
	}
	async function handleSubmit() {
		const journalObject: JournalPaperReq = {
			nmims_school: obj.nmims_school.map((data) => data.value),
			nmims_campus: obj.nmims_campus.map((data) => data.value),
			publish_year: Number(obj.publish_year),
			policy_cadre: obj.policy_cadre.map((data) => Number(data.value)),
			all_authors: obj.all_authors.map((data) => Number(data.value)),
			total_authors: Number(obj.total_authors),
			nmims_authors: obj.nmims_authors.map((data) => Number(data.value)),
			nmims_author_count: Number(obj.nmims_author_count),
			journal_name: obj.journal_name,
			uid: obj.uid,
			publisher: obj.publisher,
			other_authors: obj.other_authors.map((data) => Number(data.value)),
			page_no: obj.page_no,
			issn_no: obj.issn_no,
			scopus_site_score: Number(obj.scopus_site_score),
			impact_factor: Number(obj.impact_factor),
			doi_no: obj.doi_no,
			publication_date: publicationFormattedDate,
			title: obj.title,
			gs_indexed: obj.gs_indexed,
			paper_type: Number(obj.paper_type.value),
			wos_indexed: obj.wos_indexed,
			abdc_indexed: Number(obj.abdc_indexed.value),
			ugc_indexed: obj.ugc_indexed,
			scs_indexed: obj.scs_indexed,
			foreign_authors_count: Number(obj.foreign_authors_count),
			foreign_authors: obj.foreign_authors.map((data) => Number(data.value)),
			student_authors_count: Number(obj.student_authors_count),
			student_authors: obj.student_authors.map((data) => Number(data.value)),
			supporting_documents: documentsArr,
			journal_type: Number(obj.journal_type)
		};

		// const formData = new FormData();

		// formData.append('journal_paper', JSON.stringify(journalObject));

		// // Append each file to the FormData
		// Array.from(files).forEach((file) => {
		// 	formData.append('supporting_documents', file);
		// });

		// console.log('Form Data:', JSON.stringify(formData));

		console.log(JSON.stringify(journalObject));
		const result = validateWithZod(journalPaper, journalObject);

		if (result.errors) {
			console.log(result.errors);
			const [firstPath, firstMessage] = Object.entries(result.errors)[0];
			toast.error('ALERT!', {
				description: firstMessage
			});
			return;
		}

		console.log('validated data', JSON.stringify(result.data));

		const { error, json } = await fetchApi({
			url: `${PUBLIC_API_BASE_URL}/journal-article-insert`,
			method: 'POST',
			body: {
				journal_paper: result.data
			}
		});

		if (error) {
			toast.error(error.message || 'Something went wrong!', {
				description: error.errorId ? `ERROR-ID: ${error.errorId}` : ''
			});
			return;
		}

		toast.success('Inserted Successfully');
	}
</script>

<div class="shadow-card rounded-2xl border-[1px] border-[#E5E9F1] p-4 !pt-0 sm:p-6">
	<div class="scroll modal-content max-h-[70vh] min-h-[50vh] overflow-auto">
		<!-- Adjust max-height as needed -->
		<div class="grid grid-cols-3 gap-[40px] p-4">
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
			<Input type="number" placeholder="Publishing Year" bind:value={obj.publish_year} />
		</div>

		<div class="grid grid-cols-3 gap-[40px] p-4">
			<DynamicSelect
				isRequired={true}
				placeholder="Policy Cadre"
				options={getPolicyCadre(policy)}
				bind:selectedOptions={obj.policy_cadre}
				isMultiSelect={true}
			/>
			<DynamicSelect
				isRequired={true}
				placeholder="All Authors"
				options={getAllAuthor(allAuth)}
				bind:selectedOptions={obj.all_authors}
				isMultiSelect={true}
			/>
			<Input type="number" placeholder="Total No. Of Authors" bind:value={obj.total_authors} />
		</div>

		<div class="grid grid-cols-3 gap-[40px] p-4">
			<DynamicSelect
				isRequired={true}
				placeholder="Nmims Authors"
				options={getNmimsAuthor(nmimsAuth)}
				bind:selectedOptions={obj.nmims_authors}
				isMultiSelect={true}
			/>
			<Input type="number" placeholder="No. Of Nmims Authors" bind:value={obj.nmims_author_count} />
			<Input type="text" placeholder="Journal Name" bind:value={obj.journal_name} />
		</div>
		<div class="grid grid-cols-3 gap-[40px] p-4">
			<Input type="text" placeholder="UID" bind:value={obj.uid} />
			<Input type="text" placeholder="Publisher" bind:value={obj.publisher} />
			<DynamicSelect
				isRequired={false}
				placeholder="Other Authors"
				options={getOtherAuthor(otherAuth)}
				bind:selectedOptions={obj.other_authors}
				isMultiSelect={true}
			/>
		</div>
		<div class="grid grid-cols-3 gap-[40px] p-4">
			<Input type="text" {isRequired} placeholder="Vol,Issue,Page No." bind:value={obj.page_no} />
			<Input type="text" {isRequired} placeholder="ISSN No." bind:value={obj.issn_no} />
			<Input
				type="number"
				{isRequired}
				placeholder="Scopus Site Score"
				bind:value={obj.scopus_site_score}
			/>
		</div>
		<div class="grid grid-cols-3 gap-[40px] p-4">
			<Input
				type="number"
				placeholder="Impact factor by Clarivate Analytics"
				bind:value={obj.impact_factor}
			/>
			<Input type="text" placeholder="WebLink /DOI No." bind:value={obj.doi_no} />
			<Input type="text" placeholder="Title Of Paper" bind:value={obj.title} />
		</div>
		<div class="grid grid-cols-3 gap-[40px] p-4">
			<Input type="text" {isRequired} placeholder="GS Indexed" bind:value={obj.gs_indexed} />
			<div class="ml-2">
				<label class="text-sm text-[#888888]"
					>International/National Journal<span class="text-danger text-sm">*</span></label
				>
				<div class="mt-2.5 flex flex-row gap-[20px]">
					<div class="flex flex-row">
						<input
							type="radio"
							id="html"
							class="lms-input-radio w-4"
							name="radio-button-national"
							bind:group={obj.journal_type}
							checked={obj.journal_type == 1}
							value={1}
						/>
						<span class="text-sm text-[#888888]">International</span>
					</div>
					<div class="flex flex-row">
						<input
							type="radio"
							id="html"
							class="lms-input-radio w-4"
							name="radio-button-national"
							bind:group={obj.journal_type}
							checked={obj.journal_type == 1}
							value={2}
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
							id="html"
							class="lms-input-radio w-4"
							name="radio-button-wos"
							bind:group={obj.wos_indexed}
							checked={obj.wos_indexed == true}
							value={true}
						/>
						<span class="text-sm text-[#888888]">Yes</span>
					</div>
					<div class="flex flex-row">
						<input
							type="radio"
							id="html"
							class="lms-input-radio w-4"
							name="radio-button-wos"
							bind:group={obj.wos_indexed}
							checked={obj.wos_indexed == true}
							value={false}
						/>
						<span class="text-sm text-[#888888]">No</span>
					</div>
				</div>
			</div>
		</div>
		<div class="grid grid-cols-3 gap-[40px] p-4">
			<DynamicSelect
				isRequired={true}
				placeholder="ABDC Indexed"
				options={getAbdcIndexed(abdcTypes)}
				bind:selectedOptions={obj.abdc_indexed}
				isMultiSelect={false}
			/>
			<div class="ml-2">
				<label class="text-sm text-[#888888]"
					>UGC Indexed<span class="text-danger text-sm">*</span></label
				>
				<div class="mt-2 flex flex-row gap-[20px]">
					<div class="flex flex-row">
						<input
							type="radio"
							id="html"
							class="lms-input-radio w-4"
							name="radio-button-ugc"
							bind:group={obj.ugc_indexed}
							checked={obj.ugc_indexed == true}
							value={true}
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
							checked={obj.ugc_indexed == true}
							value={false}
						/>
						<span class="text-sm text-[#888888]">No</span>
					</div>
				</div>
			</div>
			<DynamicSelect
				isRequired={true}
				placeholder="Paper Type"
				options={getPaperType(paper)}
				bind:selectedOptions={obj.paper_type}
				isMultiSelect={false}
			/>
		</div>

		<div class="grid grid-cols-3 gap-[40px] p-4">
			<DynamicSelect
				isRequired={false}
				placeholder="Foreign Authors"
				options={getForeignAuthor(foreignAuth)}
				bind:selectedOptions={obj.foreign_authors}
				isMultiSelect={true}
			/>
			<Input
				{isRequired}
				type="number"
				placeholder="No. Of Foreign Authors"
				bind:value={obj.foreign_authors_count}
			/>
			<DynamicSelect
				isRequired={false}
				placeholder="Student Authors"
				options={getStudentAuthor(studentAuth)}
				bind:selectedOptions={obj.student_authors}
				isMultiSelect={true}
			/>
		</div>

		<div class="grid grid-cols-3 gap-[40px] p-4">
			<Input
				{isRequired}
				type="number"
				placeholder="No. Of Student Authors"
				bind:value={obj.student_authors_count}
			/>
			<div class="ml-2">
				<label class="text-sm text-[#888888]"
					>Scopus Site Indexed<span class="text-danger text-sm">*</span></label
				>
				<div class="mt-2 flex flex-row gap-[20px]">
					<div class="flex flex-row">
						<input
							type="radio"
							id="html"
							class="lms-input-radio w-4"
							name="radio-button-scs"
							bind:group={obj.scs_indexed}
							checked={obj.scs_indexed == true}
							value={true}
						/>
						<span class="text-sm text-[#888888]">Yes</span>
					</div>
					<div class="flex flex-row">
						<input
							type="radio"
							id="html"
							class="lms-input-radio w-4"
							name="radio-button-scs"
							bind:group={obj.scs_indexed}
							checked={obj.scs_indexed == true}
							value={false}
						/>
						<span class="text-sm text-[#888888]">No</span>
					</div>
				</div>
			</div>
			<input type="file" bind:files multiple />
		</div>

		<div class="flex flex-row gap-[40px] p-4">
			<DatePicker
				on:change={handleDateChange}
				bind:selectedDateTime={publicationDate}
				disabled={(publicationDate) => publicationDate.getTime() < new Date().setHours(0, 0, 0, 0)}
			>
				<div class="text-primary hover:bg-base flex items-center gap-x-3 rounded-lg px-3 py-2">
					<SelectDateIcon />
					<span class="text-body-2 font-bold">Add Publication Date</span>
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

	<div class="flex flex-row gap-[20px] p-4">
		<button class="lms-btn lms-secondary-btn">Clear Form</button>
		<button class="lms-btn lms-primary-btn" on:click={handleSubmit}>Submit</button>
	</div>
</div>

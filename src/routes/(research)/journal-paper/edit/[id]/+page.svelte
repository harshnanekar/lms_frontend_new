<script lang="ts">
	import { fileDataStore } from '$lib/stores/modules/research/master.store.ts';
	import { Input, DatePicker, DynamicSelect, File } from '$lib/components/ui';
	import { SelectDateIcon, XIcon } from '$lib/components/icons';
	import { formatDateTimeShort, formatDate } from '$lib/utils/date-formatter';
	import { tooltip } from '$lib/utils/tooltip';
	import { fly } from 'svelte/transition';
	import { Card } from '$lib/components/ui';

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
	import { type FileReq, fileSchema } from '$lib/schemas/modules/research/master-validations';
	import { toast } from 'svelte-sonner';
	import { fetchFiles, fetchFormApi } from '$lib/utils/fetcher';
	import { PUBLIC_API_BASE_URL, PUBLIC_BASE_URL } from '$env/static/public';
	import type { any } from 'zod';
	import { goto } from '$app/navigation';

	export let data: any;
	let isRequired = false;
	let title = 'Journal Articles Published';

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
	let isChecked: boolean = false;
	$: checkVal = isChecked;
	console.log('checkbox check ', checkVal);

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

	let checkData = data.journalData.journalData.length > 0 ? true : false;

	let publicationDate: Date | null = new Date();
	publicationDate = checkData ? data.journalData.journalData[0].publishing_date : null;
	$: publicationFormattedDate = publicationDate;
	function handleDateChange(e: CustomEvent<any>) {
		if (!publicationDate) return;
		publicationFormattedDate = publicationDate;
		console.log('publication date ', publicationFormattedDate);
	}

	let obj: any = {
		journal_paper_id: checkData ? parseInt(data.journalData.journalData[0].journal_paper_id) : null,
		nmims_school:
			checkData && data.journalData.journalData[0].nmims_school != null
				? data.journalData.journalData[0].nmims_school.map((dt: any) => {
						return { value: dt, label: dt };
					})
				: null,
		nmims_campus:
			checkData && data.journalData.journalData[0].nmims_campus != null
				? data.journalData.journalData[0].nmims_campus.map((dt: any) => {
						return { value: dt, label: dt };
					})
				: null,
		publish_year:
			checkData && data.journalData.journalData[0].publish_year
				? data.journalData.journalData[0].publish_year
				: null,
		policy_cadre:
			checkData && data.journalData.journalData[0].policy_names != null
				? data.journalData.journalData[0].policy_names.map((dt: any) => {
						return { value: dt.id, label: dt.policy_name };
					})
				: null,
		all_authors:
			checkData && data.journalData.journalData[0].all_authors != null
				? data.journalData.journalData[0].all_authors.map((dt: any) => {
						return { value: dt.id, label: dt.faculty_name };
					})
				: null,
		total_authors:
			checkData && data.journalData.journalData[0].total_authors
				? data.journalData.journalData[0].total_authors
				: null,
		nmims_authors:
			checkData && data.journalData.journalData[0].nmims_authors != null
				? data.journalData.journalData[0].nmims_authors.map((dt: any) => {
						return { value: dt.id, label: dt.faculty_name };
					})
				: null,
		nmims_author_count:
			checkData && data.journalData.journalData[0].nmims_authors_count
				? data.journalData.journalData[0].nmims_authors_count
				: null,
		journal_name:
			checkData && data.journalData.journalData[0].journal_name
				? data.journalData.journalData[0].journal_name
				: '',
		uid:
			checkData && data.journalData.journalData[0].uid ? data.journalData.journalData[0].uid : '',
		publisher:
			checkData && data.journalData.journalData[0].publisher
				? data.journalData.journalData[0].publisher
				: '',
		other_authors:
			checkData && data.journalData.journalData[0].other_authors != null
				? data.journalData.journalData[0].other_authors.map((dt: any) => {
						return { value: dt.id, label: dt.name };
					})
				: null,
		page_no:
			checkData && data.journalData.journalData[0].page_no
				? data.journalData.journalData[0].page_no
				: '',
		issn_no:
			checkData && data.journalData.journalData[0].issn_no
				? data.journalData.journalData[0].issn_no
				: '',
		scopus_site_score:
			checkData && data.journalData.journalData[0].scopus_site_score
				? data.journalData.journalData[0].scopus_site_score
				: null,
		impact_factor:
			checkData && data.journalData.journalData[0].impact_factor
				? data.journalData.journalData[0].impact_factor
				: null,
		doi_no:
			checkData && data.journalData.journalData[0].doi_no
				? data.journalData.journalData[0].doi_no
				: null,
		title:
			checkData && data.journalData.journalData[0].title
				? data.journalData.journalData[0].title
				: '',
		gs_indexed: checkData && data.journalData.journalData[0].gs_indexed,
		paper_type:
			checkData && data.journalData.journalData[0].paper_type[0]
				? {
						value: data.journalData.journalData[0].paper_type[0].id,
						label: data.journalData.journalData[0].paper_type[0].paper_name
					}
				: null,
		wos_indexed: checkData ? data.journalData.journalData[0].wos_indexed : null,
		abdc_indexed:
			checkData && data.journalData.journalData[0].abdc_indexed[0] != null
				? {
						value: data.journalData.journalData[0].abdc_indexed[0].id,
						label: data.journalData.journalData[0].abdc_indexed[0].abdc_type
					}
				: null,
		ugc_indexed: checkData ? data.journalData.journalData[0].ugc_indexed : null,
		scs_indexed: checkData ? data.journalData.journalData[0].scs_indexed : null,
		foreign_authors_count:
			checkData && data.journalData.journalData[0].foreign_authors_count
				? data.journalData.journalData[0].foreign_authors_count
				: null,
		foreign_authors:
			checkData && data.journalData.journalData[0].foreign_authors.length > 0
				? data.journalData.journalData[0].foreign_authors.map((dt: any) => {
						return { value: dt.id, label: dt.name };
					})
				: null,
		student_authors_count:
			checkData && data.journalData.journalData[0].student_authors_count
				? data.journalData.journalData[0].student_authors_count
				: null,
		student_authors:
			checkData && data.journalData.journalData[0].student_authors.length > 0
				? data.journalData.journalData[0].student_authors.map((dt: any) => {
						return { value: dt.id, label: dt.name };
					})
				: null,
		journal_type:
			checkData && data.journalData.journalData[0].journal_type
				? parseInt(data.journalData.journalData[0].journal_type)
				: null
	};

	let files: any = [];
	$: console.log('retrieved files ', files);
	fileDataStore.set(files);

	async function handleSubmit() {
		const journalObject: JournalPaperReq = {
			nmims_school:
				obj.nmims_school != null ? obj.nmims_school.map((data: { value: any }) => data.value) : [],
			nmims_campus:
				obj.nmims_campus != null ? obj.nmims_campus.map((data: { value: any }) => data.value) : [],
			publish_year: Number(obj.publish_year),
			policy_cadre:
				obj.policy_cadre != null
					? obj.policy_cadre.map((data: { value: any }) => Number(data.value))
					: [],
			all_authors: obj.all_authors
				? obj.all_authors.map((data: { value: any }) => Number(data.value))
				: [],
			total_authors: Number(obj.total_authors),
			nmims_authors: obj.nmims_authors.map((data: { value: any }) => Number(data.value)),
			nmims_author_count: Number(obj.nmims_author_count),
			journal_name: obj.journal_name,
			uid: obj.uid,
			publisher: obj.publisher,
			other_authors: obj.other_authors
				? obj.other_authors.map((data: { value: any }) => Number(data.value))
				: [],
			page_no: obj.page_no,
			issn_no: obj.issn_no,
			scopus_site_score: Number(obj.scopus_site_score),
			impact_factor: Number(obj.impact_factor),
			doi_no: obj.doi_no,
			publication_date:
				publicationFormattedDate != null ? formatDate(publicationFormattedDate) : '',
			title: obj.title,
			gs_indexed: obj.gs_indexed,
			paper_type: obj.paper_type != null ? Number(obj.paper_type.value) : 0,
			wos_indexed: obj.wos_indexed,
			abdc_indexed: obj.abdc_indexed != null ? Number(obj.abdc_indexed.value) : null,
			ugc_indexed: obj.ugc_indexed,
			scs_indexed: obj.scs_indexed,
			foreign_authors_count: Number(obj.foreign_authors_count),
			foreign_authors:
				obj.foreign_authors != null
					? obj.foreign_authors.map((data: { value: any }) => Number(data.value))
					: [],
			student_authors_count: Number(obj.student_authors_count),
			student_authors:
				obj.student_authors != null
					? obj.student_authors.map((data: { value: any }) => Number(data.value))
					: [],
			journal_type: Number(obj.journal_type)
		};

		if (checkVal) {
			const fileObject: FileReq = {
				documents: files.map((f: any) => {
					return f.file;
				})
			};

			console.log('fileObject validation', fileObject);

			const fileresult = validateWithZod(fileSchema, fileObject);
			if (fileresult.errors) {
				console.log(fileresult.errors);
				const [firstPath, firstMessage] = Object.entries(fileresult.errors)[0];
				toast.error('ALERT!', {
					description: firstMessage
				});
				return;
			}
		}

		const formData = new FormData();

		formData.append('journal_paper', JSON.stringify(journalObject));
		formData.append('journal_id', obj.journal_paper_id);

		Array.from(files).forEach((file: any) => {
			formData.append('supporting_documents', file.file);
		});

		for (let [key, value] of formData.entries()) {
			console.log(`${key}: ${value}`);
		}

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

		const { error, json } = await fetchFormApi({
			url: `${PUBLIC_API_BASE_URL}/journal-article-update`,
			method: 'POST',
			body: formData
		});

		if (error) {
			toast.error(error.message || 'Something went wrong!', {
				description: error.errorId ? `ERROR-ID: ${error.errorId}` : ''
			});
			return;
		}

		console.log(' data', JSON.stringify(json));

		if (json.data[0].upsert_journal_article.status == 403) {
			toast.error('ALERT!', {
				description: json.data[0].upsert_journal_article.message
			});
		} else {
			toast.success('Updated Successfully');
			files = [];
		    fileDataStore.set(files);
			isChecked = false;
			goto(`${PUBLIC_BASE_URL}journal-paper`);
		}
	}

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

	function handleFiles(event: CustomEvent<File[]>) {
		files = event.detail;
		console.log('edit files details', files);

		files.forEach((file: any) => {
			console.log('File instance:', file instanceof File);
		});
	}

	function handleDeleteFiles(event: CustomEvent) {
		files = event.detail;
	}
</script>

<!-- <div class="shadow-card rounded-2xl border-[1px] border-[#E5E9F1] p-4 !pt-0 sm:p-6"> -->
<Card {title}>
	<div class="modal-content p-4">
		<!-- Adjust max-height as needed -->
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
			<Input type="number" placeholder="Publishing Year" bind:value={obj.publish_year} />
		</div>

		<div class="grid grid-cols-1 gap-8 p-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
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

		<div class="grid grid-cols-1 gap-8 p-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
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
		<div class="grid grid-cols-1 gap-8 p-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
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
		<div class="grid grid-cols-1 gap-8 p-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
			<Input type="text" {isRequired} placeholder="Vol,Issue,Page No." bind:value={obj.page_no} />
			<Input type="text" {isRequired} placeholder="ISSN No." bind:value={obj.issn_no} />
			<Input
				type="number"
				{isRequired}
				placeholder="Scopus Site Score"
				bind:value={obj.scopus_site_score}
			/>
		</div>
		<div class="grid grid-cols-1 gap-8 p-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
			<Input
				type="number"
				placeholder="Impact factor by Clarivate Analytics"
				bind:value={obj.impact_factor}
			/>
			<Input type="text" placeholder="WebLink /DOI No." bind:value={obj.doi_no} />
			<Input type="text" placeholder="Title Of Paper" bind:value={obj.title} />
		</div>
		<div class="grid grid-cols-1 gap-8 p-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
			<Input type="text" {isRequired} placeholder="GS Indexed" bind:value={obj.gs_indexed} />
			<div class="ml-2">
				<label class="text-sm text-[#888888]">Journal Type<span>*</span></label>
				<div class="mt-2.5 flex flex-row gap-[20px]">
					<div class="flex flex-row">
						<input
							type="radio"
							id="html"
							class="lms-input-radio w-4"
							name="radio-button-national"
							bind:group={obj.journal_type}
							checked={obj.journal_type === 1}
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
							checked={obj.journal_type === 2}
							value={2}
						/>
						<span class="text-sm text-[#888888]">National</span>
					</div>
				</div>
			</div>
			<div class="ml-2">
				<label class="text-sm text-[#888888]">Wos Indexed<span>*</span></label>
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
							checked={obj.wos_indexed == false}
							value={false}
						/>
						<span class="text-sm text-[#888888]">No</span>
					</div>
				</div>
			</div>
		</div>
		<div class="grid grid-cols-1 gap-8 p-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
			<DynamicSelect
				isRequired={false}
				placeholder="ABDC Indexed"
				options={getAbdcIndexed(abdcTypes)}
				bind:selectedOptions={obj.abdc_indexed}
				isMultiSelect={false}
			/>
			<div class="ml-2">
				<label class="text-sm text-[#888888]">UGC Indexed<span>*</span></label>
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
							checked={obj.ugc_indexed == false}
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

		<div class="grid grid-cols-1 gap-8 p-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
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

		<div class="grid grid-cols-1 items-center gap-8 p-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
			<Input
				{isRequired}
				type="number"
				placeholder="No. Of Student Authors"
				bind:value={obj.student_authors_count}
			/>
			<div class="ml-2">
				<label class="text-sm text-[#888888]">Scopus Site Indexed<span>*</span></label>
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
							checked={obj.scs_indexed == false}
							value={false}
						/>
						<span class="text-sm text-[#888888]">No</span>
					</div>
				</div>
			</div>

			<div class="space-y-2">
				<label for="supporting-documents" class="lms-label"
					>Upload Supporting Documents <i style="color: red;">*</i><br /></label
				>
				<label class="lms-label"
					>Click To Upload New File <input type="checkbox" bind:checked={isChecked} class="accent-primary"/></label
				>
				{#if checkVal}
					<File
						on:filesSelected={handleFiles}
						on:deletedFiles={handleDeleteFiles}
						isView={false}
					/>
					{#if files.length > 0}
				      <p class="lms-label">{$fileDataStore.length} Files Uploaded</p>
				    {/if}
				{:else}
					<button class="lms-primary-btn mt-2" on:click={downLoadFiles}
						><i class="fa-solid fa-download text-md"></i></button
					>
				{/if}
			</div>
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
	<div class="flex flex-col gap-4 p-4 md:flex-row">
		<button class="lms-btn lms-primary-btn" on:click={handleSubmit}>Update</button>
	</div>
</Card>

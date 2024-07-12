<script lang="ts">
	import { Input, DatePicker, DynamicSelect } from '$lib/components/ui';
	import { SelectDateIcon, XIcon } from '$lib/components/icons';
	import { formatDateTimeShort, formatDate } from '$lib/utils/date-formatter';
	import { tooltip } from '$lib/utils/tooltip';
	import { fly } from 'svelte/transition';
	import { Card } from '$lib/components/ui';

	import {
		getSchool,
		getCampus,
		getMasterAllAuthors,
		getExternalAuthors,
		getEnternalAuthors
	} from '$lib/utils/select.helper';
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

	export let data: any;
	let isRequired = false;
	let title = 'Conference';

	let nmimsSchool = data?.conferenceDetails?.school?.message;
	let nmimsCampus = data?.conferenceDetails?.campus?.message;
	let nmimsAuthors = data?.conferenceDetails?.nmimsAuthors?.message;
	let masterAllAuthors = data?.conferenceDetails?.masterAllAuthors?.message;
	let externalAuthors = data?.conferenceDetails?.externalAuthors?.message;
	let enternalAuthors = data?.conferenceDetails?.enternalAuthors?.message;
	let conferenceDocumentAbbr = data?.conferenceDetails?.conferenceDocumentAbbr;
	let conference_abbr = conferenceDocumentAbbr
		.filter((data) => data.abbr === 'cd')
		.map((dt) => Number(dt.id))[0];
	let award_abbr = conferenceDocumentAbbr
		.filter((data) => data.abbr === 'ad')
		.map((dt) => Number(dt.id))[0];
	console.log('conference abbr ', conference_abbr, award_abbr);

	console.log(
		'enternalAuthors ankit mishra ===>>>>>',
		JSON.stringify(data?.conferenceDetails?.conferenceDocumentAbbr)
	);
	console.log('nmimsSchool ankit mishra ===>>>>>', nmimsSchool);

	$: school = nmimsSchool;
	$: nmimsAuth = nmimsAuthors;
	$: allAuth = masterAllAuthors;
	$: campus = nmimsCampus;
	$: external = externalAuthors;
	$: internal = enternalAuthors;

	console.log('external ===>>>>>>', external);
	console.log('internal ===>>>>>>', internal);
	console.log('campus ===>>>>>>', campus);

    let isCheckedDoc: boolean = false;
	let isCheckedaward: boolean = false;

	$: checkDoc = isCheckedDoc;
	$: checkAward = isCheckedaward
	console.log('checkbox check ', checkDoc);

	
	let publicationDate: Date | null = new Date();
	publicationDate = new Date(data.conferenceDetails.conferenceDetails[0].publication_date);
	$: publicationFormattedDate = publicationDate;
	function handleDateChange(e: CustomEvent<any>) {
		if (!publicationDate) return;
		publicationFormattedDate = publicationDate;
		console.log('publication date ', publicationFormattedDate);
	}


	console.log('JSON.stringify(school)', JSON.stringify(school));
    console.log('conference details', JSON.stringify(data.conferenceDetails));
    let facultyDetails = data.conferenceDetails.conferenceDetails[0].faculty_details || [];

    console.log('facultyDetails ===>>>>>', facultyDetails);
    

	let obj: any = {
    conference_id: parseInt(data.conferenceDetails.conferenceDetails[0].conference_id),
    nmims_school: data.conferenceDetails.conferenceDetails[0].nmims_school != null
        ? data.conferenceDetails.conferenceDetails[0].nmims_school.map((dt: any) => {
            return { value: dt, label: dt };
        })
        : [],
    nmims_campus: data.conferenceDetails.conferenceDetails[0].nmims_campus != null
        ? data.conferenceDetails.conferenceDetails[0].nmims_campus.map((dt: any) => {
            return { value: dt, label: dt };
        })
        : [],
    paper_title: data.conferenceDetails.conferenceDetails[0].paper_title ? data.conferenceDetails.conferenceDetails[0].paper_title : '',
    conference_name: data.conferenceDetails.conferenceDetails[0].conference_name ? data.conferenceDetails.conferenceDetails[0].conference_name : '',
    all_authors: data.conferenceDetails.conferenceDetails[0].all_authors != null
        ? data.conferenceDetails.conferenceDetails[0].all_authors.map((dt: any) => {
            return { value: dt.id, label: dt.name };
        })
        : [],
    place: data.conferenceDetails.conferenceDetails[0].place ? data.conferenceDetails.conferenceDetails[0].place : '',
    proceeding_published: data.conferenceDetails.conferenceDetails[0].proceeding_published,
    conference_type: Number(data.conferenceDetails.conferenceDetails[0].conference_type),
    presenting_author: data.conferenceDetails.conferenceDetails[0].presenting_author ? data.conferenceDetails.conferenceDetails[0].presenting_author : '',
    organizing_body: data.conferenceDetails.conferenceDetails[0].organizing_body ? data.conferenceDetails.conferenceDetails[0].organizing_body : '',
    volume_no: data.conferenceDetails.conferenceDetails[0].volume_no ? data.conferenceDetails.conferenceDetails[0].volume_no : '',
    issn_no: data.conferenceDetails.conferenceDetails[0].issn_no ? data.conferenceDetails.conferenceDetails[0].issn_no : '',
    sponsored: Number(data.conferenceDetails.conferenceDetails[0].sponsored),
    doi_no: data.conferenceDetails.conferenceDetails[0].doi_no ? data.conferenceDetails.conferenceDetails[0].doi_no : '',
    amount: data.conferenceDetails.conferenceDetails[0].amount ? data.conferenceDetails.conferenceDetails[0].amount : '',
    publication_date: publicationFormattedDate != null ? formatDate(publicationFormattedDate) : '',
    internal_authors: facultyDetails.filter((author: any) => author.abbr === 'int').map((author: any) => ({ value: author.id, label: author.faculty_name })),
    external_authors: facultyDetails.filter((author: any) => author.abbr === 'ext').map((author: any) => ({ value: author.id, label: author.faculty_name }))
};

	let conferenceFiles: any = [];
	let awardFiles: any = [];

	let showInternal = false;
	let showExternal = false;

	function handleInternalChange(event: { target: { checked: boolean } }) {
		showInternal = event.target.checked;
	}

	function handleExternalChange(event: { target: { checked: boolean } }) {
		showExternal = event.target.checked;
	}

	async function handleSubmit() {
		


		const conferenceObj: conferenceReq = {

			nmims_school:
				obj.nmims_school != null ? obj.nmims_school.map((data: { value: any }) => data.value) : [],
			nmims_campus:
				obj.nmims_campus != null ? obj.nmims_campus.map((data: { value: any }) => data.value) : [],
			paper_title: obj.paper_title,
			conference_name: obj.conference_name,
			all_authors:
				obj.all_authors != null
					? obj.all_authors.map((data: { value: any }) => Number(data.value))
					: [],
			place: obj.place,
			proceeding_published: obj.proceeding_published,
			conference_type: Number(obj.conference_type),
			presenting_author: obj.presenting_author,
			organizing_body: obj.organizing_body,
			volume_no: obj.volume_no,
			issn_no: obj.issn_no,
			doi_no: obj.doi_no,
			publication_date:
				publicationFormattedDate != null ? formatDate(publicationFormattedDate) : '',
			sponsored: obj.sponsored,
			amount: obj.amount,
            internal_authors: obj.internal_authors != null ? obj.internal_authors.map((data: { value: any }) => Number(data.value)) : [],
            external_authors: obj.external_authors != null ? obj.external_authors.map((data: { value: any }) => Number(data.value)) : [],
        }
		const result = validateWithZod(conferenceData, conferenceObj);

		if (result.errors) {
			console.log(result.errors);
			const [firstPath, firstMessage] = Object.entries(result.errors)[0];
			toast.error('ALERT!', {
				description: firstMessage
			});
			return;
		}

		console.log('validated data', JSON.stringify(result.data));

		const formData = new FormData();
		formData.append('update_conference_publication', JSON.stringify(conferenceObj));
		formData.append('conference_id', JSON.stringify(obj.conference_id));

		// Append each file to the FormData with their respective keys
        // Array.from(conferenceFiles).forEach((file: any) => {
        //     formData.append(conference_abbr, file);
        // });

        if (checkDoc) {
            if(conferenceFiles.length === 0){
			toast.error('Conference documents  are required for submission');
		}
            Array.from(conferenceFiles).forEach((file: any) => {
            const fileObject: FileReq = {
                documents: [file] 
            };
            const fileresult = validateWithZod(fileSchema, fileObject);
            if (fileresult.errors) {
                console.log(fileresult.errors);
                const [firstPath, firstMessage] = Object.entries(fileresult.errors)[0];
                toast.error('ALERT!', {
                    description: firstMessage as string
                });
                return;
        }
        formData.append(conference_abbr, file);
    });
        } 

        // Array.from(awardFiles).forEach((file: any) => {
        //     formData.append(award_abbr, file);
        // }); 

        if (checkAward) {
            if(awardFiles.length === 0){
                toast.error('Conference award fils are required for submission');
            }
            Array.from(awardFiles).forEach((file: any) => {
            const fileObject: FileReq = {
                documents: [file] 
            };
            const fileresult = validateWithZod(fileSchema, fileObject);
            if (fileresult.errors) {
                console.log(fileresult.errors);
                const [firstPath, firstMessage] = Object.entries(fileresult.errors)[0];
                toast.error('ALERT!', {
                    description: firstMessage as string
                });
                return;
        }
        formData.append(award_abbr, file);
    });
        }
	

		for (let [key, value] of formData.entries()) {
			console.log(`${key}: ${value}`);
		}

		const { error, json } = await fetchFormApi({
			url: `${PUBLIC_API_BASE_URL}/conference-update`,
			method: 'POST',
			body: formData
		});

		if (error) {
			toast.error(error.message || 'Something went wrong!', {
				description: error.errorId ? `ERROR-ID: ${error.errorId}` : ''
			});
			return;
		}

		if (json[0].upsert_conference.status === 403) {
			toast.error('ALERT!', {
				description: json[0].insert_conference.message
			});
		} else {
			toast.success('Inserted Successfully');
			goto('/conference');
		}
	}



	// function clearForm() {
	// 	obj = {
	// 		nmims_school: null,
	// 		nmims_campus: null,
	// 		paper_title: '',
	// 		conference_name: '',
	// 		all_authors: null,
	// 		place: '',
	// 		proceeding_published: true,
	// 		conference_type: 1,
	// 		presenting_author: '',
	// 		organizing_body: '',
	// 		volume_no: '',
	// 		issn_no: '',
	// 		publication_date: '',
	// 		enternal: '',
	// 		external: '',
	// 		doi_no: '',
	// 		sponsored: 1,
	// 		amount: '',
	// 		internal_authors: null,
	// 		external_authors: null
	// 	};
	// 	conferenceFiles = [];
	// 	awardFiles = [];
	// } 


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

<!-- <div class="shadow-card rounded-2xl border-[1px] border-[#E5E9F1] p-4 !pt-0 sm:p-6"> -->
<Card {title}>
	<div class="modal-content p-4">
		<!-- Adjust max-height as needed -->
		<div class="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
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
			<Input type="text" placeholder="Title Of The Paper" bind:value={obj.paper_title} />
		</div>

		<div class="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
			<Input type="text" placeholder="Name of Conference" bind:value={obj.conference_name} />
			<DynamicSelect
				isRequired={true}
				placeholder="All Authors Names"
				options={getMasterAllAuthors(allAuth)}
				bind:selectedOptions={obj.all_authors}
				isMultiSelect={true}
			/>
			<Input type="text" placeholder="Place of Conference" bind:value={obj.place} />
		</div>
		<div class="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
			<div class="ml-2">
				<!-- svelte-ignore a11y-label-has-associated-control -->
				<label class="text-sm text-[#888888]"
					>Proceedings published<span class="text-danger text-sm">*</span>
				</label>
				<div class="mt-2.5 flex flex-row gap-[20px]">
					<div class="flex flex-row">
						<input
							type="radio"
							class="lms-input-radio w-4"
							name="proceedings-published"
							bind:group={obj.proceeding_published}
							value={true}
						/>
						<span class="text-sm text-[#888888]">Yes</span>
					</div>
					<div class="flex flex-row">
						<input
							type="radio"
							class="lms-input-radio w-4"
							name="proceedings-published"
							bind:group={obj.proceeding_published}
							value={false}
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
					<div class="flex flex-row">
						<input
							type="radio"
							class="lms-input-radio w-4"
							name="conference-type"
							bind:group={obj.conference_type}
							value={1}
						/>
						<span class="text-sm text-[#888888]">International </span>
					</div>
					<div class="flex flex-row">
						<input
							type="radio"
							class="lms-input-radio w-4"
							name="conference-type"
							bind:group={obj.conference_type}
							value={2}
						/>
						<span class="text-sm text-[#888888]"> National</span>
					</div>
				</div>
			</div>
			<Input type="text" placeholder="Presenting Author " bind:value={obj.presenting_author} />
		</div>
		<div class="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
			<Input type="text" placeholder="Organizing Body" bind:value={obj.organizing_body} />
			<Input type="text" placeholder="Vol and issue no [e.g 9 (12)]" bind:value={obj.volume_no} />
			<Input type="text" placeholder="ISSN/ISNB No." bind:value={obj.issn_no} />
		</div>
		<div class="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
			<div class="ml-2">
				<!-- svelte-ignore a11y-label-has-associated-control -->
				<label class="text-sm text-[#888888]"
					>Sponsored By NMIMS/Other<span class="text-danger text-sm">*</span>
				</label>
				<div class="mt-2.5 flex flex-row gap-[20px]">
					<div class="flex flex-row">
						<input
							type="radio"
							id="html"
							class="lms-input-radio w-4"
							name="radio-button-national"
							bind:group={obj.sponsored}
							checked={obj.sponsored == 1}
							value={1}
						/>
						<span class="text-sm text-[#888888]">NMIMS </span>
					</div>
					<div class="flex flex-row">
						<input
							type="radio"
							id="html"
							class="lms-input-radio w-4"
							name="radio-button-national"
							bind:group={obj.sponsored}
							value={2}
						/>
						<span class="text-sm text-[#888888]"> Other</span>
					</div>
				</div>
			</div>
			<Input type="text" placeholder="WebLink /DOI No." bind:value={obj.doi_no} />
			<Input type="number" placeholder="Amount Spent In RS. By NMIMS" bind:value={obj.amount} />
		</div>


		<div class="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
			<div class="ml-2">
				<!-- svelte-ignore a11y-label-has-associated-control -->
				<label class="text-sm text-[#888888]"
					>Name Of Co-Authors<span class="text-danger text-sm">*</span>
				</label>
				<div class="mt-2.5 flex md:flex-row gap-[20px]">
					<div class="flex md:flex-row items-center">
						<input
							id="internal-checkbox"
							type="checkbox"
							class="lms-input-radio w-4"
							on:change={handleInternalChange}
						/>
						<label for="internal-checkbox" class="ml-2 text-sm font-medium text-gray-900"
							>Internal</label
						>
					</div>
					<div class="flex md:flex-row items-center">
						<input
							id="external-checkbox"
							type="checkbox"
							class="lms-input-radio w-4"
							on:change={handleExternalChange}
						/>
						<label for="external-checkbox" class="ml-2 text-sm font-medium text-gray-900"
							>External</label
						>
					</div>
				</div>
				<div class="grid grid-row-2 items-center mt-2 gap-4">
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

            <!-- Upload Conference Documents -->
            <div>
				<label>Click To Upload Conference Documents <input type="checkbox" bind:checked={isCheckedDoc} /></label>
				{#if checkDoc}
				<input type="file" bind:files={conferenceFiles} multiple />
				{:else}
					<button class="lms-primary-btn mt-2" on:click={downLoadFiles}
						><i class="fa-solid fa-download text-md"></i></button
					>
				{/if}
			</div>
			<!-- svelte-ignore a11y-label-has-associated-control -->
             <!-- Upload Conference Documents Any Award -->
            <div>
				<label>Click To Upload Conference Award File <input type="checkbox" bind:checked={isCheckedaward} /></label>
				{#if isCheckedaward}
				<input type="file" bind:files={awardFiles} multiple />
				{:else}
					<button class="lms-primary-btn mt-2" on:click={downLoadFiles}
						><i class="fa-solid fa-download text-md"></i></button
					>
				{/if}
			</div>
	
		</div>

		<div class="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
			<div class="flex flex-row gap-[40px] p-4">
				<DatePicker
					on:change={handleDateChange}
					bind:selectedDateTime={publicationDate}
					disabled={(publicationDate) =>
						publicationDate.getTime() < new Date().setHours(0, 0, 0, 0)}
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
	</div>
	<div class="flex flex-col gap-4 p-4 md:flex-row">
		<button class="lms-btn lms-primary-btn" on:click={handleSubmit}>Update</button>
	</div>
</Card>


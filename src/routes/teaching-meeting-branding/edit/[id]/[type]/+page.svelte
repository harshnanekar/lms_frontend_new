<script lang="ts">
	import DynamicSelect from '$lib/components/ui/select/dynamic-select.svelte';
	import { PlusIcon, MinusIcon } from '$lib/components/icons';
	import { Input } from '$lib/components/ui/input';
	import {
		getTeachingDropdown,
		getMeetingDropdown,
		getBrandingDropdown,
		getCommonDropdownData
	} from '$lib/utils/select.helper';
	import {
		brandingItemsSchema,
		fileSchema,
		meetingItemsSchema,
		teachingItemsSchema,
		validateFiles,
		type brandingItemsReq,
		type FileReq,
		type meetingItemsReq,
		type TeachingItemsReq
	} from '$lib/schemas/modules/research/master-validations';
	import { toast } from 'svelte-sonner';
	import { validateWithZod } from '$lib/utils/validations';
	import { PUBLIC_API_BASE_URL } from '$env/static/public';
	import { fetchFormApi } from '$lib/utils/fetcher';
	import { optionStore } from '$lib/stores/modules/research/master.store';
	import { goto } from '$app/navigation';
	import { Header } from '$lib/components/researchHeader';

	export let data: any;

	let teachingHeader = 'Teaching Excellance';
	let meetingHeader = 'Meeting Stakeholders';
	let brandingHeader = 'Branding & Advertisement';

	$: dynamicHeader =
		data.type === 'te' ? teachingHeader : data.type === 'ms' ? meetingHeader : brandingHeader;

	let inputItems: {
		id: number;
		type: any;
		description: string;
		link: string;
		file: File[];
		isChecked?: boolean;
		isPresent?: boolean;
	}[] = data.inputData.input_data ? data.inputData.input_data : [];

	console.log('items ',JSON.stringify(inputItems))
	// let meetingItems: {
	// 	id: number;
	// 	type: any;
	// 	description: string;
	// 	link: string;
	// 	file: File[];
	// 	isChecked?: boolean;
	// 	isPresent?: boolean;
	// }[] = data.inputData.meeting_data ? data.inputData.meeting_data : [];
	// let brandingItems: {
	// 	id: number;
	// 	type: any;
	// 	description: string;
	// 	link: string;
	// 	file: File[];
	// 	isChecked?: boolean;
	// 	isPresent?: boolean;
	// }[] = data.inputData.branding_data ? data.inputData.branding_data : [];

	// let teachingId = data.inputData.teachingId != null ? data.inputData.teachingId : null;
	// let meetingId = data.inputData.meetingId != null ? data.inputData.meetingId : null;
	// let brandingId = data.inputData.brandingId != null ? data.inputData.brandingId : null;

	// console.log('teaching  ', JSON.stringify(teachingItems));
	// console.log('meeting  ', JSON.stringify(meetingItems));
	// console.log('branding  ', JSON.stringify(brandingItems));

	let inputDropdown = data.inputData.dropdown_data
		? data.inputData.dropdown_data.message
		: [];

    console.log('dropdown data ',JSON.stringify(inputDropdown))
	// let meetingDropdown = data.inputData.meeting_inputs ? data.inputData.meeting_inputs.message : [];
	// let brandingDropdown = data.inputData.branding_inputs
	// 	? data.inputData.branding_inputs.message
	// 	: [];

	function addNewRow() {
		inputItems = [
			...inputItems,
			{ id: inputItems.length, type: null, description: '', link: '', file: [] ,isPresent:false}
		];
	}

	function removeRow(id: number) {
		inputItems = inputItems.filter((item) => item.id !== id);
	}

	function updateInputItem(id: number, field: string, value: any) {
		inputItems = inputItems.map((item) =>
			item.id === id ? { ...item, [field]: value } : item
		);
	}

	// function addMeetingRow() {
	// 	meetingItems = [
	// 		...meetingItems,
	// 		{ id: meetingItems.length, type: null, description: '', link: '', file: [] }
	// 	];
	// }

	// function removeMeetingRow(id: number) {
	// 	meetingItems = meetingItems.filter((item) => item.id !== id);
	// }

	// function updateMeetingItem(id: number, field: string, value: any) {
	// 	meetingItems = meetingItems.map((item) =>
	// 		item.id === id ? { ...item, [field]: value } : item
	// 	);
	// }

	// function addBrandingRow() {
	// 	brandingItems = [
	// 		...brandingItems,
	// 		{ id: brandingItems.length, type: null, description: '', link: '', file: [] }
	// 	];
	// }

	// function removeBrandingRow(id: number) {
	// 	brandingItems = brandingItems.filter((item) => item.id !== id);
	// }

	// function updateBrandingItem(id: number, field: string, value: any) {
	// 	brandingItems = brandingItems.map((item) =>
	// 		item.id === id ? { ...item, [field]: value } : item
	// 	);
	// }

	// function getAllFiles(): File[] {
	// 	return teachingItems.flatMap((item) => item.file);
	// }

	 let input_json: TeachingItemsReq = [];
	// let allFiles: any;

	let isChecked: boolean = false;
	$: checkVal = isChecked;

	$: {
		input_json = inputItems.map((item) => ({
			input_type: item.type ? item.type.value : '',
			description: item.description,
			link: item.link
		}));

	// 	allFiles = getAllFiles();
	}

	$: updatedItems = inputItems;
	let formData = new FormData();

	// let meeting_json: meetingItemsReq = [];

	// $: {
	// 	meeting_json = meetingItems.map((item) => ({
	// 		input_type: item.type ? item.type.value : '',
	// 		description: item.description,
	// 		link: item.link
	// 	}));
	// }

	// $: updatedMeetingItems = meetingItems;
	// let meetingformData = new FormData();

	// let branding_json: brandingItemsReq = [];

	// $: {
	// 	branding_json = brandingItems.map((item) => ({
	// 		input_type: item.type ? item.type.value : '',
	// 		description: item.description,
	// 		link: item.link
	// 	}));
	// }

	// $: updatedBrandingItems = brandingItems;
	// let brandingformData = new FormData();

	async function submitItems(abbr : string) {
		console.log(' Items:', JSON.stringify(inputItems),abbr);

		let dynamicUrl = abbr === 'te' 
					? 'update-teaching-data'
					: abbr === 'ms'
					? 'update-meeting-data'
					: 'update-branding-data';

		const result = validateWithZod(teachingItemsSchema, input_json);

		if (result.errors) {
			console.log(result.errors);
			const [firstPath, firstMessage] = Object.entries(result.errors)[0];
			toast.error('ALERT!', {
				description: firstMessage
			});
			return;
		}

		if (result.success) {
			for (const [index, data] of updatedItems.entries()) {
				if (data.isChecked) {
					const fileResult = validateWithZod(fileSchema, { documents: data.file });
					if (fileResult.errors) {
						console.log(fileResult.errors);
						const [firstPath, firstMessage] = Object.entries(fileResult.errors)[0];
						toast.error('ALERT!', {
							description: firstMessage
						});
						return;
					}
				}

				for (const file of data.file) {
					let abbr = data.type.value;
					formData.append(`${abbr}`, file);
				}
			}

			console.log('inserted json ', JSON.stringify(result.data));
			formData.append('json_data', JSON.stringify(result.data));
			formData.append('row_id', data.id);

			const { error, json } = await fetchFormApi({
				url: `${PUBLIC_API_BASE_URL}/${dynamicUrl}`,
				method: 'POST',
				body: formData
			});

			if (error) {
				toast.error(error.message || 'Something went wrong!', {
					description: error.errorId ? `ERROR-ID: ${error.errorId}` : ''
				});
				return;
			}

			   console.log('upsert json ', JSON.stringify(json));
				toast.success('Updated Successfully!');
				goto('/teaching-meeting-branding');
			
		}
		}
	

	// async function submitMeetingItems() {
	// 	console.log('Meeting Items:', JSON.stringify(meetingItems));

	// 	const result = validateWithZod(meetingItemsSchema, meeting_json);

	// 	if (result.errors) {
	// 		console.log(result.errors);
	// 		const [firstPath, firstMessage] = Object.entries(result.errors)[0];
	// 		toast.error('ALERT!', {
	// 			description: firstMessage
	// 		});
	// 		return;
	// 	}

	// 	if (result.success) {
	// 		for (const [index, data] of updatedMeetingItems.entries()) {
	// 			if (data.isChecked) {
	// 				const fileResult = validateWithZod(fileSchema, { documents: data.file });
	// 				if (fileResult.errors) {
	// 					console.log(fileResult.errors);
	// 					const [firstPath, firstMessage] = Object.entries(fileResult.errors)[0];
	// 					toast.error('ALERT!', {
	// 						description: firstMessage
	// 					});
	// 					return;
	// 				}
	// 			}

	// 			for (const file of data.file) {
	// 				let abbr = data.type.value;
	// 				meetingformData.append(`${abbr}`, file);
	// 			}
	// 		}

	// 		console.log('meeting json ', JSON.stringify(result.data));
	// 		meetingformData.append('meeting_stakeholders', JSON.stringify(result.data));
	// 		meetingformData.append('meetingId', meetingId);

	// 		const { error, json } = await fetchFormApi({
	// 			url: `${PUBLIC_API_BASE_URL}/update-meeting-data`,
	// 			method: 'POST',
	// 			body: meetingformData
	// 		});

	// 		if (error) {
	// 			toast.error(error.message || 'Something went wrong!', {
	// 				description: error.errorId ? `ERROR-ID: ${error.errorId}` : ''
	// 			});
	// 			return;
	// 		}

	// 		console.log('inserted json ', JSON.stringify(json));
	// 		if (json[0].upsert_meeting_stackholder.status === '200') {
	// 			toast.success('Updated Successfully!');
	// 			meetingItems = [];
	// 			goto('/teaching-meeting-branding');
	// 		}
	// 	}
	// }

	// async function submitBrandingItems() {
	// 	console.log('Branding Items:', JSON.stringify(brandingItems));

	// 	const result = validateWithZod(brandingItemsSchema, branding_json);

	// 	if (result.errors) {
	// 		console.log(result.errors);
	// 		const [firstPath, firstMessage] = Object.entries(result.errors)[0];
	// 		toast.error('ALERT!', {
	// 			description: firstMessage
	// 		});
	// 		return;
	// 	}

	// 	if (result.success) {
	// 		for (const [index, data] of updatedBrandingItems.entries()) {
	// 			if (data.isChecked) {
	// 				const fileResult = validateWithZod(fileSchema, { documents: data.file });
	// 				if (fileResult.errors) {
	// 					console.log(fileResult.errors);
	// 					const [firstPath, firstMessage] = Object.entries(fileResult.errors)[0];
	// 					toast.error('ALERT!', {
	// 						description: firstMessage
	// 					});
	// 					return;
	// 				}
	// 			}

	// 			for (const file of data.file) {
	// 				let abbr = data.type.value;
	// 				brandingformData.append(`${abbr}`, file);
	// 			}
	// 		}

	// 		console.log('branding json ', JSON.stringify(result.data));
	// 		brandingformData.append('branding_advertisement', JSON.stringify(result.data));
	// 		brandingformData.append('brandingId', brandingId);

	// 		const { error, json } = await fetchFormApi({
	// 			url: `${PUBLIC_API_BASE_URL}/update-branding-data`,
	// 			method: 'POST',
	// 			body: brandingformData
	// 		});

	// 		if (error) {
	// 			toast.error(error.message || 'Something went wrong!', {
	// 				description: error.errorId ? `ERROR-ID: ${error.errorId}` : ''
	// 			});
	// 			return;
	// 		}

	// 		console.log('upserted json ', JSON.stringify(json));
	// 		if (json[0].upsert_branding_advertisement.status === '200') {
	// 			toast.success('Updated Successfully!');
	// 			meetingItems = [];
	// 			goto('/teaching-meeting-branding');
	// 		}
	// 	}
	// }

	// Function to get available options for each row
	function getAvailableDropdown(selectedOptions: any[]) {
		const selectedValues = selectedOptions.map((option) => (option.type ? option.type.value : ''));
		return getCommonDropdownData(inputDropdown).filter(
			(option) => !selectedValues.includes(option.value)
		);
	}

	// Function to get available options for meeting dropdowns
	// function getAvailableMeetingDropdown(selectedOptions: any[]) {
	// 	const selectedValues = selectedOptions.map((option) => (option.type ? option.type.value : ''));
	// 	return getMeetingDropdown(meetingDropdown).filter(
	// 		(option) => !selectedValues.includes(option.value)
	// 	);
	// }

	// Function to get available options for branding dropdowns
	// function getAvailableBrandingDropdown(selectedOptions: any[]) {
	// 	const selectedValues = selectedOptions.map((option) => (option.type ? option.type.value : ''));
	// 	return getBrandingDropdown(brandingDropdown).filter(
	// 		(option) => !selectedValues.includes(option.value)
	// 	);
	// }

	// async function downLoadTeachingFiles(abbr: any) {
	// 	fetch(`${PUBLIC_API_BASE_URL}/teaching-download-files?id=${teachingId}&abbr=${abbr}`)
	// 		.then((response) => {
	// 			if (response.ok) {
	// 				return response.blob();
	// 			}
	// 			throw new Error('Network response was not ok.');
	// 		})
	// 		.then((blob) => {
	// 			const url = window.URL.createObjectURL(blob);
	// 			const a = document.createElement('a');
	// 			a.style.display = 'none';
	// 			a.href = url;
	// 			a.download = 'teaching_excellance_documents.zip';
	// 			document.body.appendChild(a);
	// 			a.click();
	// 			window.URL.revokeObjectURL(url);
	// 		})
	// 		.catch((error) => {
	// 			toast.error(error.message || 'Something went wrong!', {
	// 				description: error.errorId ? `ERROR-ID: ${error.errorId}` : ''
	// 			});
	// 		});
	// }

	// async function downLoadMeetingFiles(abbr: any) {
	// 	fetch(`${PUBLIC_API_BASE_URL}/meeting-download-files?id=${meetingId}&abbr=${abbr}`)
	// 		.then((response) => {
	// 			if (response.ok) {
	// 				return response.blob();
	// 			}
	// 			throw new Error('Network response was not ok.');
	// 		})
	// 		.then((blob) => {
	// 			const url = window.URL.createObjectURL(blob);
	// 			const a = document.createElement('a');
	// 			a.style.display = 'none';
	// 			a.href = url;
	// 			a.download = 'meeting_stakeholders_documents.zip';
	// 			document.body.appendChild(a);
	// 			a.click();
	// 			window.URL.revokeObjectURL(url);
	// 		})
	// 		.catch((error) => {
	// 			toast.error(error.message || 'Something went wrong!', {
	// 				description: error.errorId ? `ERROR-ID: ${error.errorId}` : ''
	// 			});
	// 		});
	// }

	// async function downLoadBrandingFiles(abbr: any) {
	// 	fetch(`${PUBLIC_API_BASE_URL}/branding-download-files?id=${brandingId}&abbr=${abbr}`)
	// 		.then((response) => {
	// 			if (response.ok) {
	// 				return response.blob();
	// 			}
	// 			throw new Error('Network response was not ok.');
	// 		})
	// 		.then((blob) => {
	// 			const url = window.URL.createObjectURL(blob);
	// 			const a = document.createElement('a');
	// 			a.style.display = 'none';
	// 			a.href = url;
	// 			a.download = 'branding_advertisement_documents.zip';
	// 			document.body.appendChild(a);
	// 			a.click();
	// 			window.URL.revokeObjectURL(url);
	// 		})
	// 		.catch((error) => {
	// 			toast.error(error.message || 'Something went wrong!', {
	// 				description: error.errorId ? `ERROR-ID: ${error.errorId}` : ''
	// 			});
	// 		});
	// }

   
	async function downLoadFiles(abbr: any) {
		console.log('url ',data.type)
		let obj = data.type === 'te' 
					? {url :'teaching-download-files',filename : 'teaching_excellance_docuemnts.zip'}
					: data.type === 'ms'
					? {url : 'meeting-download-files',filename : 'meeting_stakeholders_documents.zip'}
					: {url : 'branding-download-files',filename : 'branding_advertisement_documents.zip'}

		fetch(`${PUBLIC_API_BASE_URL}/${obj.url}?id=${data.id}&abbr=${abbr}`)
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
				a.download = obj.filename;
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

<div class="space-y-6">
	<div class="flex items-center gap-4  p-4 md:flex-row">
		<Header header={dynamicHeader} />
	</div>

	<div class="shadow-card flex items-center justify-between rounded-2xl border border-[#e5e9f1] p-6">
		<div class="lms-table-wrapper rounded-2xl p-4">
			<table class="lms-table">
				<thead>
					<th class="!text-[15px]">{dynamicHeader} Type</th>
					<th class="!text-[15px]">Description</th>
					<th class="!text-[15px]">Link</th>
					<th class="!text-[15px]">Documents</th>
					<th class="!text-[15px]">Action</th>
				</thead>
				<tbody>
				{#each inputItems as item (item.id)}
				  <tr>
					<td>
					<DynamicSelect
					isMultiSelect={false}
					placeholder="Select Type"
					options={getAvailableDropdown(inputItems)}
					on:change={(e) => {
						updateInputItem(item.id, 'type', e.detail.value);
					}}
					bind:selectedOptions={item.type}  disabled = {item.isPresent ? true : false}/>
				   </td>
				   <td>
					<Input
						placeholder="Description"
						bind:value={item.description}
						on:input={(e) => updateInputItem(item.id, 'description', e?.target?.value)}
					/>
				</td>
				<td>
					<Input
						placeholder="Link"
						bind:value={item.link}
						on:input={(e) => updateInputItem(item.id, 'link', e?.target?.value)}
					/>
				</td>
				<td>
					<div>
						{#if item.isPresent}
							<label class="text-gray-500"
								>Click To Upload New File <input
									type="checkbox"
									bind:checked={item.isChecked}
								/></label
							><br/>
							{#if item.isChecked}
								<input
									type="file"
									multiple
									on:change={(e) =>
										updateInputItem(item.id, 'file', [...e?.target?.files])}
								/>
							{:else}
								<button
									class="lms-primary-btn mt-2"
									on:click={() => downLoadFiles(item.type.value)}
									><i class="fa-solid fa-download text-md"></i></button
								>
							{/if}
						{:else}
							<input
								type="file"
								multiple
								on:change={(e) => updateInputItem(item.id, 'file', [...e?.target?.files])}
							/>
						{/if}
					</div>
				</td>
				<td>
					<button class="lms-btn lms-secondary-btn {item.isPresent == true ? 'hidden' : 'visible'}" 
					on:click={() => removeRow(item.id)}>
						<MinusIcon />
						<span class="ml-2 hidden md:block">Remove</span>
					</button>
				</td>
				</tr>	
				{/each}
				</tbody>
			</table>
			<hr class="mt-4"/>
			<div class="flex gap-4 items-center md:flex-row mt-4">
             <button class="lms-btn lms-primary-btn" on:click={addNewRow}>
				<PlusIcon />
				<span class="ml-2 hidden md:block" >Add New</span>
			 </button>
			 <button class="lms-btn lms-secondary-btn" on:click={() => submitItems(data.type)}>Update</button>
			</div>
		</div>	
	</div>
	<!-- <div class=" flex items-center justify-between rounded-2xl border border-[#e5e9f1] p-6">
		<div class="flex flex-row items-center gap-4">
			<i class="fa-solid fa-graduation-cap text-[30px]"></i>
			<h1 class="text-lg font-semibold">Teaching Excellence</h1>
		</div>
		<button
			class="lms-btn lms-primary-btn flex items-center py-2.5"
			on:click={addTeachingRow}
			disabled={teachingItems.length > 0 ? false : true}
		>
			<PlusIcon />
			<span class="ml-2 hidden md:block">Add</span>
		</button>
	</div>

	{#if teachingItems.length > 0}
		<div class="lms-table-wrapper shadow-card rounded-2xl border border-[#e5e9f1] p-6">
			<table class="lms-table">
				<thead>
					<tr>
						<th>Teaching Excellance Type</th>
						<th>Description</th>
						<th>Upload Documents</th>
						<th>Link</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{#each teachingItems as item (item.id)}
						<tr>
							<td>
								<DynamicSelect
									isMultiSelect={false}
									placeholder="Select Teaching Type"
									options={getAvailableTeachingDropdown(teachingItems)}
									on:change={(e) => {
										updateTeachingItem(item.id, 'type', e.detail.value);
									}}
									bind:selectedOptions={item.type}
								/>
							</td>
							<td>
								<Input
									placeholder="Description"
									bind:value={item.description}
									on:input={(e) => updateTeachingItem(item.id, 'description', e?.target?.value)}
								/>
							</td>
							<td>
								<div>
									{#if item.isPresent}
										<label class="text-gray-500"
											>Click To Upload New File <input
												type="checkbox"
												bind:checked={item.isChecked}
											/></label
										>
										{#if item.isChecked}
											<input
												type="file"
												multiple
												on:change={(e) =>
													updateTeachingItem(item.id, 'file', [...e?.target?.files])}
											/>
										{:else}
											<button
												class="lms-primary-btn mt-2"
												on:click={() => downLoadTeachingFiles(item.type.value)}
												><i class="fa-solid fa-download text-md"></i></button
											>
										{/if}
									{:else}
										<input
											type="file"
											multiple
											on:change={(e) => updateTeachingItem(item.id, 'file', [...e?.target?.files])}
										/>
									{/if}
								</div>
							</td>
							<td>
								<Input
									placeholder="Link"
									bind:value={item.link}
									on:input={(e) => updateTeachingItem(item.id, 'link', e?.target?.value)}
								/>
							</td>
							<td>
								<button
									class="lms-btn lms-primary-btn"
									on:click={() => removeTeachingRow(item.id)}
									disabled={item.type != null && item.description != '' && item.link != ''
										? true
										: false}
								>
									<MinusIcon />
									Remove
								</button>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
			<hr class="mt-2" />
			<div class="float-right mt-4 flex flex-row">
				<button class="lms-btn lms-primary-btn mr-8" on:click={submitTeachingItems}>Update</button>
			</div>
		</div>
	{/if} -->

	<!-- <div class=" flex items-center justify-between rounded-2xl border border-[#e5e9f1] p-6">
		<div class="flex flex-row items-center gap-4">
			<i class="fa-solid fa-people-arrows text-[30px]"></i>
			<h1 class="text-lg font-semibold">Meeting Stakeholders</h1>
		</div>
		<button
			class="lms-btn lms-primary-btn flex items-center py-2.5"
			on:click={addMeetingRow}
			disabled={meetingItems.length > 0 ? false : true}
		>
			<PlusIcon />
			<span class="ml-2 hidden md:block">Add</span>
		</button>
	</div>

	{#if meetingItems.length > 0}
		<div class="lms-table-wrapper shadow-card rounded-2xl border border-[#e5e9f1] p-6">
			<table class="lms-table">
				<thead>
					<tr>
						<th>Meeting Stakeholders Type</th>
						<th>Description</th>
						<th>Upload Documents</th>
						<th>Link</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{#each meetingItems as item (item.id)}
						<tr>
							<td>
								<DynamicSelect
									isMultiSelect={false}
									placeholder="Select Meeting Type"
									options={getAvailableMeetingDropdown(meetingItems)}
									on:change={(e) => {
										updateMeetingItem(item.id, 'type', e.detail.value);
									}}
									bind:selectedOptions={item.type}
								/>
							</td>
							<td>
								<Input
									placeholder="Description"
									bind:value={item.description}
									on:input={(e) => updateMeetingItem(item.id, 'description', e?.target?.value)}
								/>
							</td>
							<td>
								<div>
									{#if item.isPresent}
										<label class="text-gray-500"
											>Click To Upload New File <input
												type="checkbox"
												bind:checked={item.isChecked}
											/></label
										>
										{#if item.isChecked}
											<input
												type="file"
												multiple
												on:change={(e) => updateMeetingItem(item.id, 'file', [...e?.target?.files])}
											/>
										{:else}
											<button
												class="lms-primary-btn mt-2"
												on:click={() => downLoadMeetingFiles(item.type.value)}
												><i class="fa-solid fa-download text-md"></i></button
											>
										{/if}
									{:else}
										<input
											type="file"
											multiple
											on:change={(e) => updateMeetingItem(item.id, 'file', [...e?.target?.files])}
										/>
									{/if}
								</div>
							</td>
							<td>
								<Input
									placeholder="Link"
									bind:value={item.link}
									on:input={(e) => updateMeetingItem(item.id, 'link', e?.target?.value)}
								/>
							</td>
							<td>
								<button
									class="lms-btn lms-primary-btn"
									on:click={() => removeMeetingRow(item.id)}
									disabled={item.type != null && item.description != '' && item.link != ''
										? true
										: false}
								>
									<MinusIcon />
									Remove
								</button>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
			<hr class="mt-2" />
			<div class="float-right mt-4 flex flex-row">
				<button class="lms-btn lms-primary-btn mr-8" on:click={submitMeetingItems}>Update</button>
			</div>
		</div>
	{/if} -->

	<!-- <div class=" flex items-center justify-between rounded-2xl border border-[#e5e9f1] p-6">
		<div class="flex flex-row items-center gap-4">
			<i class="fa-solid fa-bullhorn text-[30px]"></i>
			<h1 class="text-lg font-semibold">Branding & Advertisement</h1>
		</div>
		<button
			class="lms-btn lms-primary-btn flex items-center py-2.5"
			on:click={addBrandingRow}
			disabled={brandingItems.length > 0 ? false : true}
		>
			<PlusIcon />
			<span class="ml-2 hidden md:block">Add</span>
		</button>
	</div>

	{#if brandingItems.length > 0}
		<div class="lms-table-wrapper shadow-card rounded-2xl border border-[#e5e9f1] p-6">
			<table class="lms-table">
				<thead>
					<tr>
						<th>Branding Type</th>
						<th>Description</th>
						<th>Upload Documents</th>
						<th>Link</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{#each brandingItems as item (item.id)}
						<tr>
							<td>
								<DynamicSelect
									isMultiSelect={false}
									placeholder="Select Branding Type"
									options={getAvailableBrandingDropdown(brandingItems)}
									on:change={(e) => {
										updateBrandingItem(item.id, 'type', e.detail.value);
									}}
									bind:selectedOptions={item.type}
								/>
							</td>
							<td>
								<Input
									placeholder="Description"
									bind:value={item.description}
									on:input={(e) => updateBrandingItem(item.id, 'description', e?.target?.value)}
								/>
							</td>
							<td>
								<div>
									{#if item.isPresent}
										<label class="text-gray-500"
											>Click To Upload New File <input
												type="checkbox"
												bind:checked={item.isChecked}
											/></label
										>
										{#if item.isChecked}
											<input
												type="file"
												multiple
												on:change={(e) =>
													updateBrandingItem(item.id, 'file', [...e?.target?.files])}
											/>
										{:else}
											<button
												class="lms-primary-btn mt-2"
												on:click={() => downLoadBrandingFiles(item.type.value)}
												><i class="fa-solid fa-download text-md"></i></button
											>
										{/if}
									{:else}
										<input
											type="file"
											multiple
											on:change={(e) => updateBrandingItem(item.id, 'file', [...e?.target?.files])}
										/>
									{/if}
								</div>
							</td>
							<td>
								<Input
									placeholder="Link"
									bind:value={item.link}
									on:input={(e) => updateBrandingItem(item.id, 'link', e?.target?.value)}
								/>
							</td>
							<td>
								<button
									class="lms-btn lms-primary-btn"
									on:click={() => removeBrandingRow(item.id)}
									disabled={item.type != null && item.description != '' && item.link != ''
										? true
										: false}
								>
									<MinusIcon />
									Remove
								</button>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
			<hr class="mt-2" />
			<div class="float-right mt-4 flex flex-row">
				<button class="lms-btn lms-primary-btn mr-8" on:click={submitBrandingItems}>Update</button>
			</div>
		</div>
	{/if} -->
</div>

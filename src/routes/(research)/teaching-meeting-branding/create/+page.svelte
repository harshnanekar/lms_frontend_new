<script lang="ts">
	import DynamicSelect from '$lib/components/ui/select/dynamic-select.svelte';
	import { PlusIcon, MinusIcon } from '$lib/components/icons';
	import { Input,File } from '$lib/components/ui/input';
	import {
		getTeachingDropdown,
		getMeetingDropdown,
		getBrandingDropdown
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
	import { PUBLIC_API_BASE_URL, PUBLIC_BASE_URL } from '$env/static/public';
	import { fetchFormApi } from '$lib/utils/fetcher';
	import { optionStore } from '$lib/stores/modules/research/master.store';
	import { goto } from '$app/navigation';
	import { Accordion, AccordionItem } from '$lib/components/ui';
	import Accordian from '$lib/components/ui/accordian/accordian.svelte';
	import { fileDataStore } from '$lib/stores/modules/research/master.store';
	import TeachingIcon from '$lib/components/icons/layout/teaching-icon.svelte';
	import MeetingIcon from '$lib/components/icons/modules/mpc/meeting-icon.svelte';
	import { writable } from 'svelte/store';
	import type { FileObject } from '$lib/types/modules/research/research-types';

	export let data: any;

	let teachingItems: { id: number; type: any; description: string; link: string; file: any,fileVal : FileObject }[] =
		[];
	let meetingItems: { id: number; type: any; description: string; link: string; file: any,fileVal : FileObject }[] =
		[];
	let brandingItems: { id: number; type: any; description: string; link: string; file: any,fileVal : FileObject }[] =
		[];

	let teachingDropdown = data.inputData.teaching.message.length > 0 ? data.inputData.teaching.message : [];
	let meetingDropdown = data.inputData.meeting.message.length > 0 ? data.inputData.meeting.message : [];
	let brandingDropdown = data.inputData.branding.message.length > 0 ? data.inputData.branding.message : [];

	fileDataStore.set([]);

	function addTeachingRow() {
		teachingItems = [
			...teachingItems,
			{ id: teachingItems.length, type: null, description: '', link: '', file: [], fileVal : {size:0,uploaded:false}}
		];

	}

	function removeTeachingRow(id: number) {
		teachingItems = teachingItems.filter((item) => item.id !== id);
	}

	function updateTeachingItem(id: number, field: string, value: any) {
		teachingItems = teachingItems.map((item) =>
			item.id === id ? { ...item, [field]: value } : item
		);
	}

	function handleFiles(event: CustomEvent<{ files: File[] }>, itemId: number) {
		const files : any  = event.detail;
		teachingItems = teachingItems.map(item =>
			item.id === itemId ? { ...item, file : files,fileVal:{size:files.length,uploaded:true} } : item,
		);
	}

   function handleDeleteFiles(event: CustomEvent<{ files: File[] }>, itemId: number) {
    const  files  = event.detail;
	console.log('delete files ',files)
	updateTeachingItem(itemId, 'file', files);
	}

	let selectPreviewedfiles : any = [];

	function previewFiles (itemId : number){
		 selectPreviewedfiles = teachingItems.filter(data => data.id === itemId).map(dt => dt.file)[0];
		console.log('selected teaching files ',selectPreviewedfiles);
		fileDataStore.set(selectPreviewedfiles);

	}

	// $: 	fileDataStore.set(selectPreviewedfiles);


	function addMeetingRow() {
		meetingItems = [
			...meetingItems,
			{ id: meetingItems.length, type: null, description: '', link: '', file: [] ,fileVal:{size:0,uploaded:false}}
		];
	}

	function removeMeetingRow(id: number) {
		meetingItems = meetingItems.filter((item) => item.id !== id);
	}

	function updateMeetingItem(id: number, field: string, value: any) {
		meetingItems = meetingItems.map((item) =>
			item.id === id ? { ...item, [field]: value } : item
		);
	}

	function handleMeetingFiles(event: CustomEvent<{ files: File[] }>, itemId: number) {
		const files : any  = event.detail;
		meetingItems = meetingItems.map(item =>
			item.id === itemId ? { ...item, file : files,fileVal:{size:files.length,uploaded:true} } : item,
		);
	}

   function handleMeetingDeleteFiles(event: CustomEvent<{ files: File[] }>, itemId: number) {
    const  files  = event.detail;
	console.log('delete files ',files)
	updateMeetingItem(itemId, 'file', files);
	}

	let selectMeetingPreviewedfiles : any = [];

	function previewMeetingFiles (itemId : number){
		selectMeetingPreviewedfiles = meetingItems.filter(data => data.id === itemId).map(dt => dt.file)[0];
		console.log('selected meeting files ',selectMeetingPreviewedfiles);
		fileDataStore.set(selectMeetingPreviewedfiles);
	}

	// $: 	fileDataStore.set(selectMeetingPreviewedfiles);

	function addBrandingRow() {
		brandingItems = [
			...brandingItems,
			{ id: brandingItems.length, type: null, description: '', link: '', file: [],fileVal:{size:0,uploaded:false} }
		];
	}

	function removeBrandingRow(id: number) {
		brandingItems = brandingItems.filter((item) => item.id !== id);
	}

	function updateBrandingItem(id: number, field: string, value: any) {
		brandingItems = brandingItems.map((item) =>
			item.id === id ? { ...item, [field]: value } : item
		);
	}

	function handleBrandingFiles(event: CustomEvent<{ files: File[] }>, itemId: number) {
		const files : any  = event.detail;
		brandingItems = brandingItems.map(item =>
			item.id === itemId ? { ...item, file : files,fileVal:{size:files.length,uploaded:true} } : item,
		);
	}

   function handleBrandingDeleteFiles(event: CustomEvent<{ files: File[] }>, itemId: number) {
    const  files  = event.detail;
	console.log('delete files ',files)
	updateBrandingItem(itemId, 'file', files);
	}

	let selectBrandingPreviewedfiles : any = [];

	function previewBrandingFiles (itemId : number){
		selectBrandingPreviewedfiles = brandingItems.filter(data => data.id === itemId).map(dt => dt.file)[0];
		console.log('selected meeting files ',selectBrandingPreviewedfiles);
		fileDataStore.set(selectBrandingPreviewedfiles);
	}


	function getAllFiles(): File[] {
		return teachingItems.flatMap((item) => item.file);
	}

	let teaching_json: TeachingItemsReq = [];
	let allFiles: any;

	$: {
		teaching_json = teachingItems.map((item) => ({
			input_type: item.type ? item.type.value : '',
			description: item.description,
			link: item.link
		}));

		allFiles = getAllFiles();
	}

	$: updatedTeachingItems = teachingItems;
	let formData = new FormData();

	let meeting_json: meetingItemsReq = [];

	$: {
		meeting_json = meetingItems.map((item) => ({
			input_type: item.type ? item.type.value : '',
			description: item.description,
			link: item.link
		}));
	}

	$: updatedMeetingItems = meetingItems;
	let meetingformData = new FormData();

	let branding_json: brandingItemsReq = [];

	$: {
		branding_json = brandingItems.map((item) => ({
			input_type: item.type ? item.type.value : '',
			description: item.description,
			link: item.link
		}));
	}

	$: updatedBrandingItems = brandingItems;
	let brandingformData = new FormData();

	async function submitTeachingItems() {

		console.log('Teaching Items:', JSON.stringify(updatedTeachingItems));

		const result = validateWithZod(teachingItemsSchema, teaching_json);

		if (result.errors) {
			console.log(result.errors);
			const [firstPath, firstMessage] = Object.entries(result.errors)[0];
			toast.error('ALERT!', {
				description: firstMessage
			});
			return;
		}

		if (result.success) {
			for (const [index, data] of updatedTeachingItems.entries()) {

				const dispFiles : any = [...data.file];
				console.log('view files ',JSON.stringify(dispFiles))
			  	
				const fileResult = validateWithZod(fileSchema, 
				{ 
				documents: dispFiles.map((f: any) => {
				return f.file;
			    })
			    });

				if (fileResult.errors) {
					console.log('frontend error' ,fileResult.errors);
					const [firstPath, firstMessage] = Object.entries(fileResult.errors)[0];
					toast.error('ALERT!', {
						description: firstMessage
					});
					return;
				}

				for (const file of data.file) {
					let abbr = data.type.value;
					formData.append(`${abbr}`, file.file);
				}
			}

			formData.append('teaching_excellance', JSON.stringify(result.data));

			const { error, json } = await fetchFormApi({
				url: `${PUBLIC_API_BASE_URL}/insert-teaching-data`,
				method: 'POST',
				body: formData
			});

			if (error) {
				toast.error(error.message || 'Something went wrong!', {
					description: error.errorId ? `ERROR-ID: ${error.errorId}` : ''
				});
				return;
			}

			console.log('inserted json ', JSON.stringify(json));
			if (json[0].insert_teaching_excellance.status === '200') {
				toast.success('Inserted Successfully!');
				teachingItems = [];
				fileDataStore.set([]);
				// FileVal.set({size:0,uploaded:false});
				goto(`${PUBLIC_BASE_URL}teaching-meeting-branding`);
			}
		}
	}

	async function submitMeetingItems() {
		console.log('Meeting Items:', JSON.stringify(meetingItems));

		const result = validateWithZod(meetingItemsSchema, meeting_json);

		if (result.errors) {
			console.log(result.errors);
			const [firstPath, firstMessage] = Object.entries(result.errors)[0];
			toast.error('ALERT!', {
				description: firstMessage
			});
			return;
		}

		if (result.success) {
			for (const [index, data] of updatedMeetingItems.entries()) {
				const dispFiles : any = [...data.file];

				const fileResult = validateWithZod(fileSchema, 
				{ documents: dispFiles.map((f: any) => {
					return f.file
				 })});

				if (fileResult.errors) {
					console.log(fileResult.errors);
					const [firstPath, firstMessage] = Object.entries(fileResult.errors)[0];
					toast.error('ALERT!', {
						description: firstMessage
					});
					return;
				}

				for (const file of data.file) {
					let abbr = data.type.value;
					meetingformData.append(`${abbr}`, file.file);
				}
			}

			console.log('meeting json ', JSON.stringify(result.data));
			meetingformData.append('meeting_stakeholders', JSON.stringify(result.data));

			const { error, json } = await fetchFormApi({
				url: `${PUBLIC_API_BASE_URL}/insert-meeting-data`,
				method: 'POST',
				body: meetingformData
			});

			if (error) {
				toast.error(error.message || 'Something went wrong!', {
					description: error.errorId ? `ERROR-ID: ${error.errorId}` : ''
				});
				return;
			}

			console.log('inserted json ', JSON.stringify(json));
			if (json[0].insert_meeting_stackholder.status === '200') {
				toast.success('Inserted Successfully!');
				meetingItems = [];
				fileDataStore.set([]);
				goto(`${PUBLIC_BASE_URL}teaching-meeting-branding`);
			}
		}
	}

	async function submitBrandingItems() {
		console.log('Branding Items:', JSON.stringify(brandingItems));

		const result = validateWithZod(brandingItemsSchema, branding_json);

		if (result.errors) {
			console.log(result.errors);
			const [firstPath, firstMessage] = Object.entries(result.errors)[0];
			toast.error('ALERT!', {
				description: firstMessage
			});
			return;
		}

		if (result.success) {
			for (const [index, data] of updatedBrandingItems.entries()) {

				const dispFiles : any = [...data.file];

				const fileResult = validateWithZod(fileSchema, 
				{ documents: dispFiles.map((f: any) => {
					return f.file
				 })});

				if (fileResult.errors) {
					console.log(fileResult.errors);
					const [firstPath, firstMessage] = Object.entries(fileResult.errors)[0];
					toast.error('ALERT!', {
						description: firstMessage
					});
					return;
				}

				for (const file of data.file) {
					let abbr = data.type.value;
					brandingformData.append(`${abbr}`, file.file);
				}
			}

			console.log('branding json ', JSON.stringify(result.data));
			brandingformData.append('branding_advertisement', JSON.stringify(result.data));

			const { error, json } = await fetchFormApi({
				url: `${PUBLIC_API_BASE_URL}/insert-branding-data`,
				method: 'POST',
				body: brandingformData
			});

			if (error) {
				toast.error(error.message || 'Something went wrong!', {
					description: error.errorId ? `ERROR-ID: ${error.errorId}` : ''
				});
				return;
			}

			console.log('inserted json ', JSON.stringify(json));
			if (json[0].insert_branding_advertising.status === '200') {
				toast.success('Inserted Successfully!');
				brandingItems = [];
				fileDataStore.set([]);
				goto(`${PUBLIC_BASE_URL}teaching-meeting-branding`);
			}
		}
	}

	function getAvailableTeachingDropdown(selectedOptions: any[]) {
		const selectedValues = selectedOptions.map((option) => (option.type ? option.type.value : ''));
		return getTeachingDropdown(teachingDropdown).filter(
			(option) => !selectedValues.includes(option.value)
		);
	}

	function getAvailableMeetingDropdown(selectedOptions: any[]) {
		const selectedValues = selectedOptions.map((option) => (option.type ? option.type.value : ''));
		return getMeetingDropdown(meetingDropdown).filter(
			(option) => !selectedValues.includes(option.value)
		);
	}

	function getAvailableBrandingDropdown(selectedOptions: any[]) {
		const selectedValues = selectedOptions.map((option) => (option.type ? option.type.value : ''));
		return getBrandingDropdown(brandingDropdown).filter(
			(option) => !selectedValues.includes(option.value)
		);
	}
</script>

<div class="space-y-8">
	<!-- Teaching Excellence Card -->
	<Accordion collapse spaceBetween>
		<AccordionItem>
			<svelte:fragment slot="title">
				<div class="flex items-center gap-4 md:flex-row">
					<!-- <i class="fa-solid fa-graduation-cap xs:text-[30px] sm:text-[30px] md:text-[30px]"></i> -->
					 <!-- <TeachingIcon /> -->
					<h1 class="xs:text-lg font-semibold sm:text-lg md:text-lg">Teaching Excellance</h1>
				</div>
			</svelte:fragment>

			<svelte:fragment slot="content" let:open>
				<div class="flex flex-row-reverse">
					<button
						class="lms-btn lms-primary-btn flex items-center py-2.5"
						on:click={addTeachingRow}
					>
						<PlusIcon />
						<span class="ml-2 hidden md:block">Add</span>
					</button>
				</div>
				{#if teachingItems.length > 0}
					<div class=" lms-table-wrapper mt-4 rounded-2xl border border-[#e5e9f1] p-6">
						<table class="lms-table">
							<thead>
								<tr>
									<th class="text-lg">Teaching Excellance Type</th>
									<th class="text-lg">Description</th>
									<th class="text-lg">Upload Documents</th>
									<th class="text-lg">Link</th>
									<th class="text-lg">Action</th>
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
												on:input={(e) =>
													updateTeachingItem(item.id, 'description', e?.target?.value)}
											/>
										</td>
										<td>
										
											<div class="space-y-2">
												<File
													isView={false}
													isCombine={true}
													on:filesSelected={(e) => handleFiles(e,item.id)}
													on:deletedFiles={(e) => handleDeleteFiles(e,item.id)}
													on:previewFile={() => previewFiles(item.id)}
												/>
												{#if item.fileVal.uploaded}
													{@const fileString = item.fileVal.size > 1 ? 'Files' : 'File' }
													<p class="lms-label">{item.fileVal.size} {fileString} Uploaded</p>
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
												class="lms-btn lms-secondary-btn"
												on:click={() => removeTeachingRow(item.id)}
											>
												<MinusIcon />
												<span class="ml-2 hidden md:block">Remove</span>
											</button>
										</td>
									</tr>
								{/each}
							</tbody>
						</table>
						<hr class="mt-2" />
						<div class="mt-4 flex md:float-right md:flex-row">
							<!-- <button class="lms-btn lms-secondary-btn mr-8" on:click={() => clearTeachingItems(teachingItems)}>Clear</button> -->
							<button class="lms-btn lms-primary-btn mr-[100px]" on:click={submitTeachingItems}
								>Submit</button
							>
						</div>
					</div>
				{/if}
			</svelte:fragment>
		</AccordionItem>
	</Accordion>

	<!-- Meeting Stakeholders Card -->

	<Accordion collapse spaceBetween>
		<AccordionItem>
			<svelte:fragment slot="title">
				<div class="flex items-center gap-4 md:flex-row">
					<!-- <i class="fa-solid fa-people-arrows xs:text-[30px] sm:text-[30px] md:text-[30px]"></i> -->
					<!-- <MeetingIcon fill="black" width='36' height='36'/> -->
					<h1 class="xs:text-lg font-semibold sm:text-lg md:text-lg">Meeting Stakeholders</h1>
				</div>
			</svelte:fragment>

			<svelte:fragment slot="content" let:open>
				<div class="flex flex-row-reverse">
					<button class="lms-btn lms-primary-btn flex items-center py-2.5" on:click={addMeetingRow}>
						<PlusIcon />
						<span class="ml-2 hidden md:block">Add</span>
					</button>
				</div>
				{#if meetingItems.length > 0}
					<div class="shadow-card lms-table-wrapper mt-4 rounded-2xl border border-[#e5e9f1] p-6">
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
												on:input={(e) =>
													updateMeetingItem(item.id, 'description', e?.target?.value)}
											/>
										</td>
										<td>
											
											<div class="space-y-2">
												<File
													isView={false}
													isCombine={true}
													on:filesSelected={(e) => handleMeetingFiles(e,item.id)}
													on:deletedFiles={(e) => handleMeetingDeleteFiles(e,item.id)}
													on:previewFile={() => previewMeetingFiles(item.id)}
												/>		
												{#if item.fileVal.uploaded}
													{@const fileString = item.fileVal.size > 1 ? 'Files' : 'File' }
													<p class="lms-label">{item.fileVal.size} {fileString} Uploaded</p>
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
												class="lms-btn lms-secondary-btn"
												on:click={() => removeMeetingRow(item.id)}
											>
												<MinusIcon />
												<span class="ml-2 hidden md:block">Remove</span>
											</button>
										</td>
									</tr>
								{/each}
							</tbody>
						</table>
						<hr class="mt-2" />
						<div class="mt-4 flex md:float-right md:flex-row">
							<!-- <button class="lms-btn lms-secondary-btn mr-8" on:click={() => meetingItems = []}>Clear</button> -->
							<button class="lms-btn lms-primary-btn mr-[100px]" on:click={submitMeetingItems}
								>Submit</button
							>
						</div>
					</div>
				{/if}
			</svelte:fragment>
		</AccordionItem>
	</Accordion>

	<!-- Branding & Advertisement Card -->

	<Accordion collapse spaceBetween>
		<AccordionItem>
			<!-- <div class="flex items-center justify-between rounded-2xl border border-[#e5e9f1] p-6"> -->
			<svelte:fragment slot="title">
				<div class="flex items-center gap-4 md:flex-row">
					<!-- <i class="fa-solid fa-bullhorn xs:text-[30px] sm:text-[30px] md:text-[30px]"></i> -->
					<h1 class="xs:text-lg font-semibold sm:text-lg md:text-lg">Branding & Advertisement</h1>
				</div>
			</svelte:fragment>

			<svelte:fragment slot="content" let:open>
				<div class="flex flex-row-reverse">
					<button
						class="lms-btn lms-primary-btn flex items-center py-2.5"
						on:click={addBrandingRow}
					>
						<PlusIcon />
						<span class="ml-2 hidden md:block">Add</span>
					</button>
				</div>
				{#if brandingItems.length > 0}
					<div class="lms-table-wrapper shadow-card mt-4 rounded-2xl border border-[#e5e9f1] p-6">
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
												on:input={(e) =>
													updateBrandingItem(item.id, 'description', e?.target?.value)}
											/>
										</td>
										<td>
									
											<div class="space-y-2">
												<File
													isView={false}
													isCombine={true}
													on:filesSelected={(e) => handleBrandingFiles(e,item.id)}
													on:deletedFiles={(e) => handleBrandingDeleteFiles(e,item.id)}
													on:previewFile={() => previewBrandingFiles(item.id)}
												/>		
												{#if item.fileVal.uploaded}
													{@const fileString = item.fileVal.size > 1 ? 'Files' : 'File' }
													<p class="lms-label">{item.fileVal.size} {fileString} Uploaded</p>
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
												class="lms-btn lms-secondary-btn"
												on:click={() => removeBrandingRow(item.id)}
											>
												<MinusIcon />
												<span class="ml-2 hidden md:block">Remove</span>
											</button>
										</td>
									</tr>
								{/each}
							</tbody>
						</table>
						<hr class="mt-2" />
						<div class="mt-4 flex md:float-right md:flex-row">
							<!-- <button class="lms-btn lms-secondary-btn mr-8" on:click={() => brandingItems = []}>Clear</button> -->
							<button class="lms-btn lms-primary-btn mr-[100px]" on:click={submitBrandingItems}
								>Submit</button
							>
						</div>
					</div>
				{/if}
			</svelte:fragment>
		</AccordionItem>
	</Accordion>
</div>

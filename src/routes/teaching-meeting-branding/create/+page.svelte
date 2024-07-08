<!-- <script lang="ts">
	import { formatDate } from '$lib/utils/date-formatter';
	import DynamicSelect from '$lib/components/ui/select/dynamic-select.svelte';
	import { PlusIcon } from '$lib/components/icons';
	import { Input } from '$lib/components/ui/input';
	import {
		getTeachingDropdown,
		getMeetingDropdown,
		getBrandingDropdown,
	} from '$lib/utils/select.helper';
	
    export let data : any ;

	let teachingItems: any[] = [];
	let teachingList: any = null;
	let teachlink: string;

	let teachingDropdown = data.inputData.teaching.message;
	let meetingDropdown =  data.inputData.meeting.message;
	let brandingDropdown = data.inputData.branding.message;


	function addTeachingRow() {
		teachingItems = [...teachingItems, { id: teachingItems.length }];
	}

	function removeTeachingRow(id: number) {
		teachingItems = teachingItems.filter(item => item.id !== id);

	}


	let meetingItems: any[] = [];
	let meetingList: any = null;
	let meetlink: string;

	function addMeetingRow() {
		meetingItems = [...meetingItems, { id: meetingItems.length }];
	}

	function removeMeetingRow(id: number) {
		meetingItems = meetingItems.filter(item => item.id !== id);

	}

	let brandingItems: any[] = [];
	let brandingList: any = null;
	let brnadinglink: string;

	function addBrandingRow() {
		brandingItems = [...brandingItems, { id: brandingItems.length }];
	}

	function removeBrandingRow(id: number) {
		brandingItems = brandingItems.filter(item => item.id !== id);

	}
</script>

<div class="space-y-6"> -->
	<!-- Teaching Excellence Card -->
	<!-- <div class="rounded-2xl border border-gray-200 p-6 shadow-card flex justify-between items-center">
	  <h1 class="font-semibold text-lg">Teaching Excellence</h1>
	  <button class="lms-btn lms-primary-btn flex items-center py-2.5" on:click={addTeachingRow}>
		<PlusIcon />
		<span class="hidden md:block ml-2">Add</span>
	  </button>
	</div>

	{#if teachingItems.length > 0}
	<div class="lms-table-wrapper rounded-2xl border border-gray-200 p-6 shadow-card">
		<table class="lms-table">
		<thead>
			<tr>
				<th>Teaching Excellence Type</th>
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
						options={getTeachingDropdown(teachingDropdown)}
						bind:selectedOptions={teachingList}
					/>
				</td>
				<td>
					<Input 
						placeholder="Description"
						bind:value={teachlink}
					/>
				</td>
				<td><input type="file" /></td>
				<td>
					<Input 
						placeholder="Link"
						bind:value={teachlink}
					/>
				</td>
				<td>
					<button class="lms-btn lms-primary-btn" on:click={() => removeTeachingRow(item.id)}>Delete</button>
				</td>
			</tr>
			{/each}
		</tbody>
		</table>
		<hr class="mt-2" />
		<div class="flex flex-row float-right mt-4">
			<button class="lms-btn lms-secondary-btn mr-8">Clear</button>
			<button class="lms-btn lms-primary-btn mr-8">Submit</button>
		</div>
	</div>	
	{/if} -->

	<!-- Meeting Stakeholders Card -->
	<!-- <div class="rounded-2xl border border-gray-200 p-6 shadow-card flex justify-between items-center">
	  <h1 class="font-semibold text-lg">Meeting Stakeholders</h1>
	  <button class="lms-btn lms-primary-btn flex items-center py-2.5" on:click={addMeetingRow}>
		<PlusIcon />
		<span class="hidden md:block ml-2">Add</span>
	  </button>
	</div>


    {#if meetingItems.length > 0}
	<div class="lms-table-wrapper rounded-2xl border border-gray-200 p-6 shadow-card">
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
						options={getMeetingDropdown(meetingDropdown)}
						bind:selectedOptions={meetingList}
					/>
				</td>
				<td>
					<Input 
						placeholder="Description"
						bind:value={teachlink}
					/>
				</td>
				<td><input type="file" /></td>
				<td>
					<Input 
						placeholder="Link"
						bind:value={meetlink}
					/>
				</td>
				<td>
					<button class="lms-btn lms-primary-btn" on:click={() => removeMeetingRow(item.id)}>Delete</button>
				</td>
			</tr>
			{/each}
		</tbody>
		</table>
		<hr class="mt-2" />
		<div class="flex flex-row float-right mt-4">
			<button class="lms-btn lms-secondary-btn mr-8">Clear</button>
			<button class="lms-btn lms-primary-btn mr-8">Submit</button>
		</div>
	</div>	
	{/if}

  
	<!-- Branding & Advertisement Card -->
	<!-- <div class="rounded-2xl border border-gray-200 p-6 shadow-card flex justify-between items-center">
	  <h1 class="font-semibold text-lg">Branding & Advertisement</h1>
	  <button class="lms-btn lms-primary-btn flex items-center py-2.5" on:click={addBrandingRow}>
		<PlusIcon />
		<span class="hidden md:block ml-2">Add</span>
	  </button>
	</div>


{#if brandingItems.length > 0}
	<div class="lms-table-wrapper rounded-2xl border border-gray-200 p-6 shadow-card">
		<table class="lms-table">
		<thead>
			<tr>
				<th>Branding & Advertisement Type</th>
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
						options={getBrandingDropdown(brandingDropdown)}
						bind:selectedOptions={brandingList}
					/>
				</td>
				<td>
					<Input 
						placeholder="Description"
						bind:value={teachlink}
					/>
				</td>
				<td><input type="file" /></td>
				<td>
					<Input 
						placeholder="Link"
						bind:value={brnadinglink}
					/>
				</td>
				<td>
					<button class="lms-btn lms-primary-btn" on:click={() => removeBrandingRow(item.id)}>Delete</button>
				</td>
			</tr>
			{/each}
		</tbody>
		</table>
		<hr class="mt-2" />
		<div class="flex flex-row float-right mt-4">
		<button class="lms-btn lms-secondary-btn mr-8">Clear</button>
		<button class="lms-btn lms-primary-btn mr-8">Submit</button>
	    </div>
	</div>	
	{/if}

</div> -->

<!-- <script lang="ts">
	import DynamicSelect from '$lib/components/ui/select/dynamic-select.svelte';
	import { PlusIcon } from '$lib/components/icons';
	import { Input } from '$lib/components/ui/input';
	import {
		getTeachingDropdown,
		getMeetingDropdown,
		getBrandingDropdown,
	} from '$lib/utils/select.helper';
	import {
	fileSchema,
		teachingItemsSchema,
		validateFiles,
		type FileReq,
		type TeachingItemsReq
	} from '$lib/schemas/modules/research/master-validations';
	import { toast } from 'svelte-sonner';
	import { validateWithZod } from '$lib/utils/validations';

	
	export let data: any;

	let teachingItems: { id: number, type: any, description: string, link: string, file: File[] | [] }[] = [];
	let meetingItems: { id: number, type: any, description: string, link: string, file: File[] | [] }[] = [];
	let brandingItems: { id: number, type: any, description: string, link: string, file: File[] | [] }[] = [];

	let teachingDropdown = data.inputData.teaching.message;
	let meetingDropdown = data.inputData.meeting.message;
	let brandingDropdown = data.inputData.branding.message; -->

	<!-- Teaching Excellence Functions -->
	<!-- function addTeachingRow() {
		teachingItems = [...teachingItems, { id: teachingItems.length, type: null, description: '', link: '', file: [] }];
	}

	function removeTeachingRow(id: number) {
		teachingItems = teachingItems.filter(item => item.id !== id);
	}

	function updateTeachingItem(id: number, field: string, value: any) {
		teachingItems = teachingItems.map(item => item.id === id ? { ...item, [field]: value } : item);
	} -->


	 <!-- Meeting Stakeholders Functions -->
	<!-- function addMeetingRow() {
		meetingItems = [...meetingItems, { id: meetingItems.length, type: null, description: '', link: '', file: [] }];
	}

	function removeMeetingRow(id: number) {
		meetingItems = meetingItems.filter(item => item.id !== id);
	}

	function updateMeetingItem(id: number, field: string, value: any) {
		meetingItems = meetingItems.map(item => item.id === id ? { ...item, [field]: value } : item);
	}

	function submitMeetingItems() {
		console.log('Meeting Items:', JSON.stringify(meetingItems));
	}

	// Branding & Advertisement Functions
	function addBrandingRow() {
		brandingItems = [...brandingItems, { id: brandingItems.length, type: null, description: '', link: '', file: [] }];
	}

	function removeBrandingRow(id: number) {
		brandingItems = brandingItems.filter(item => item.id !== id);
	}

	function updateBrandingItem(id: number, field: string, value: any) {
		brandingItems = brandingItems.map(item => item.id === id ? { ...item, [field]: value } : item);
	}

	function submitBrandingItems() {
		console.log('Branding Items:',JSON.stringify(brandingItems));
	}

	function getAllFiles(): File[] {
		return teachingItems.flatMap(item => {
			if (item.file instanceof File) {
				return [item.file]; 
			}
			return []; 
		});
	}

	let teaching_json: TeachingItemsReq = [];
	let allFiles : any;

	$: {
		
		teaching_json = teachingItems.map(item => ({
			input_type: item.type ? item.type.value : '',
			description: item.description,
			link: item.link
		}));
	
	    teachingItems.forEach(data => {
         console.log('files user multiple',data.file)
		});	

		 allFiles = getAllFiles();
		//  console.log('all files ',allFiles)
	} -->

	<!-- $: updatedTeachingItems = teachingItems;

	 function submitTeachingItems() {
		console.log('Teaching Items:', JSON.stringify(teachingItems)); -->

<!-- 	

		  const result = validateWithZod(teachingItemsSchema, teaching_json);


			updatedTeachingItems.forEach(data => { -->

	
			<!-- const fileResult = validateWithZod(fileSchema,{documents:fileArr})
			if (fileResult.errors) {
			console.log(fileResult.errors);
			const [firstPath, firstMessage] = Object.entries(fileResult.errors)[0];
			toast.error('ALERT!', {
				description: firstMessage
			});
			return;
		}
		   }) -->

			<!-- }); -->
		

		
		<!-- if (result.errors) {
			console.log(result.errors);
			const [firstPath, firstMessage] = Object.entries(result.errors)[0];
			toast.error('ALERT!', {
				description: firstMessage
			});
			return;
		}
	 } -->

    















<!-- </script>

<div class="space-y-6"> -->
	<!-- Teaching Excellence Card -->
	<!-- <div class="rounded-2xl border border-gray-200 p-6 shadow-card flex justify-between items-center">
		<h1 class="font-semibold text-lg">Teaching Excellence</h1>
		<button class="lms-btn lms-primary-btn flex items-center py-2.5" on:click={addTeachingRow}>
			<PlusIcon />
			<span class="hidden md:block ml-2">Add</span>
		</button>
	</div>

	{#if teachingItems.length > 0}
	<div class="lms-table-wrapper rounded-2xl border border-gray-200 p-6 shadow-card">
		<table class="lms-table">
			<thead>
				<tr>
					<th>Teaching Excellence Type</th>
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
						options={getTeachingDropdown(teachingDropdown)}
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
						<input type="file" bind:files={item.file} on:change={(e) => updateTeachingItem(item.id, 'file', e?.target?.files[0])} multiple/>
					</td>
					<td>
						<Input 
							placeholder="Link"
							bind:value={item.link}
							on:input={(e) => updateTeachingItem(item.id, 'link', e?.target?.value)}
						/>
					</td>
					<td>
						<button class="lms-btn lms-primary-btn" on:click={() => removeTeachingRow(item.id)}>Delete</button>
					</td>
				</tr>
				{/each}
			</tbody>
		</table>
		<hr class="mt-2" />
		<div class="flex flex-row float-right mt-4">
			<button class="lms-btn lms-secondary-btn mr-8" on:click={() => teachingItems = []}>Clear</button>
			<button class="lms-btn lms-primary-btn mr-8" on:click={submitTeachingItems}>Submit</button>
		</div>
	</div>	
	{/if} -->

	<!-- Meeting Stakeholders Card -->
	<!-- <div class="rounded-2xl border border-gray-200 p-6 shadow-card flex justify-between items-center">
		<h1 class="font-semibold text-lg">Meeting Stakeholders</h1>
		<button class="lms-btn lms-primary-btn flex items-center py-2.5" on:click={addMeetingRow}>
			<PlusIcon />
			<span class="hidden md:block ml-2">Add</span>
		</button>
	</div>

	{#if meetingItems.length > 0}
	<div class="lms-table-wrapper rounded-2xl border border-gray-200 p-6 shadow-card">
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
						placeholder="Select Teaching Type"
						options={getMeetingDropdown(meetingDropdown)}
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
						<input type="file" bind:files={item.file} on:change={(e) => updateMeetingItem(item.id, 'file', e?.target?.files[0])} multiple/>
					</td>
					<td>
						<Input 
							placeholder="Link"
							bind:value={item.link}
							on:input={(e) => updateMeetingItem(item.id, 'link', e?.target?.value)}
						/>
					</td>
					<td>
						<button class="lms-btn lms-primary-btn" on:click={() => removeMeetingRow(item.id)}>Delete</button>
					</td>
				</tr>
				{/each}
			</tbody>
		</table>
		<hr class="mt-2" />
		<div class="flex flex-row float-right mt-4">
			<button class="lms-btn lms-secondary-btn mr-8" on:click={() => meetingItems = []}>Clear</button>
			<button class="lms-btn lms-primary-btn mr-8" on:click={submitMeetingItems}>Submit</button>
		</div>
	</div>	
	{/if}

	Branding & Advertisement Card -->
	<!-- <div class="rounded-2xl border border-gray-200 p-6 shadow-card flex justify-between items-center">
		<h1 class="font-semibold text-lg">Branding & Advertisement</h1>
		<button class="lms-btn lms-primary-btn flex items-center py-2.5" on:click={addBrandingRow}>
			<PlusIcon />
			<span class="hidden md:block ml-2">Add</span>
		</button>
	</div>

	{#if brandingItems.length > 0}
	<div class="lms-table-wrapper rounded-2xl border border-gray-200 p-6 shadow-card">
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
							options={getBrandingDropdown(brandingDropdown)}
							bind:selectedOptions={item.type}
							on:change={(e) => updateBrandingItem(item.id, 'type', e.detail.value)}

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
						<input type="file" bind:files={item.file} on:change={(e) => updateBrandingItem(item.id, 'file', e?.target?.files[0])} multiple/>
					</td>
					<td>
						<Input 
							placeholder="Link"
							bind:value={item.link}
							on:input={(e) => updateBrandingItem(item.id, 'link', e.target.value)}
						/>
					</td>
					<td>
						<button class="lms-btn lms-primary-btn" on:click={() => removeBrandingRow(item.id)}>Delete</button>
					</td>
				</tr>
				{/each}
			</tbody>
		</table>
		<hr class="mt-2" />
		<div class="flex flex-row float-right mt-4">
			<button class="lms-btn lms-secondary-btn mr-8" on:click={() => brandingItems = []}>Clear</button>
			<button class="lms-btn lms-primary-btn mr-8" on:click={submitBrandingItems}>Submit</button>
		</div>
	</div>	
	{/if}
</div> -->

<script lang="ts">
	import DynamicSelect from '$lib/components/ui/select/dynamic-select.svelte';
	import { PlusIcon,MinusIcon } from '$lib/components/icons';
	import { Input } from '$lib/components/ui/input';
	import { getTeachingDropdown, getMeetingDropdown, getBrandingDropdown } from '$lib/utils/select.helper';
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
	import { optionStore } from '$lib/stores/modules/mpc/master.store';
	import { goto } from '$app/navigation';


	export let data: any;

	let teachingItems: { id: number, type: any, description: string, link: string, file: File[] }[] = [];
	let meetingItems: { id: number, type: any, description: string, link: string, file: File[] }[] = [];
	let brandingItems: { id: number, type: any, description: string, link: string, file: File[] }[] = [];

	let teachingDropdown = data.inputData.teaching.message;
	let meetingDropdown = data.inputData.meeting.message;
	let brandingDropdown = data.inputData.branding.message;

	function addTeachingRow() {
		teachingItems = [...teachingItems, { id: teachingItems.length, type: null, description: '', link: '', file: [] }];
	}

	function removeTeachingRow(id: number) {
		teachingItems = teachingItems.filter(item => item.id !== id);
	}

	function updateTeachingItem(id: number, field: string, value: any) {
		teachingItems = teachingItems.map(item => item.id === id ? { ...item, [field]: value } : item);
	}

	function addMeetingRow() {
		meetingItems = [...meetingItems, { id: meetingItems.length, type: null, description: '', link: '', file: [] }];
	}

	function removeMeetingRow(id: number) {
		meetingItems = meetingItems.filter(item => item.id !== id);
	}

	function updateMeetingItem(id: number, field: string, value: any) {
		meetingItems = meetingItems.map(item => item.id === id ? { ...item, [field]: value } : item);
	}

	function addBrandingRow() {
		brandingItems = [...brandingItems, { id: brandingItems.length, type: null, description: '', link: '', file: [] }];
	}

	function removeBrandingRow(id: number) {
		brandingItems = brandingItems.filter(item => item.id !== id);
	}

	function updateBrandingItem(id: number, field: string, value: any) {
		brandingItems = brandingItems.map(item => item.id === id ? { ...item, [field]: value } : item);
	}

	function getAllFiles(): File[] {
		return teachingItems.flatMap(item => item.file);
	}

	let teaching_json: TeachingItemsReq = [];
	let allFiles: any;

	$: {
		teaching_json = teachingItems.map(item => ({
			input_type: item.type ? item.type.value : '',
			description: item.description,
			link: item.link
		}));

		allFiles = getAllFiles();
	}

	$: updatedTeachingItems = teachingItems;
    let formData = new FormData();

  
	let meeting_json : meetingItemsReq = [];

    $: {

		meeting_json = meetingItems.map(item => ({
			input_type: item.type ? item.type.value : '',
			description: item.description,
			link: item.link
		}));

	}
   
	$: updatedMeetingItems = meetingItems;
    let meetingformData = new FormData();


    let branding_json : brandingItemsReq = [];
   
	$:{

		branding_json = brandingItems.map(item => ({
			input_type: item.type ? item.type.value : '',
			description: item.description,
			link: item.link
		}));
	}

	$: updatedBrandingItems = brandingItems;
    let brandingformData = new FormData();


	async function submitTeachingItems() {
		console.log('Teaching Items:', JSON.stringify(teachingItems));

		const result = validateWithZod(teachingItemsSchema, teaching_json);


		if (result.errors) {
			console.log(result.errors);
			const [firstPath, firstMessage] = Object.entries(result.errors)[0];
			toast.error('ALERT!', {
				description: firstMessage
			});
			return;
		}

		if(result.success){

			for (const [index, data] of updatedTeachingItems.entries()) {
			const fileResult = validateWithZod(fileSchema, { documents: data.file });
			if (fileResult.errors) {
				console.log(fileResult.errors);
				const [firstPath, firstMessage] = Object.entries(fileResult.errors)[0];
				toast.error('ALERT!', {
					description: firstMessage
				});
				return;
			}

			for (const file of data.file) {
				let abbr = data.type.value
				formData.append(`${abbr}`, file);
			}
		}



          formData.append('teaching_excellance',JSON.stringify(result.data));

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

		console.log('inserted json ',JSON.stringify(json))
		if (json[0].insert_teaching_excellance.status === '200'){
			toast.success('Inserted Successfully!');
			teachingItems = [];
			goto('/teaching-meeting-branding')
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

		if(result.success){

			for (const [index, data] of updatedMeetingItems.entries()) {
			const fileResult = validateWithZod(fileSchema, { documents: data.file });
			if (fileResult.errors) {
				console.log(fileResult.errors);
				const [firstPath, firstMessage] = Object.entries(fileResult.errors)[0];
				toast.error('ALERT!', {
					description: firstMessage
				});
				return;
			}

			for (const file of data.file) {
				let abbr = data.type.value
				meetingformData.append(`${abbr}`, file);
			}
		   }


		console.log('meeting json ',JSON.stringify(result.data))	
		meetingformData.append('meeting_stakeholders',JSON.stringify(result.data));

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

		console.log('inserted json ',JSON.stringify(json))
		if (json[0].insert_meeting_stackholder.status === '200'){
			toast.success('Inserted Successfully!');
			meetingItems = [];
			goto('/teaching-meeting-branding')
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

		if(result.success){

			for (const [index, data] of updatedBrandingItems.entries()) {
			const fileResult = validateWithZod(fileSchema, { documents: data.file });
			if (fileResult.errors) {
				console.log(fileResult.errors);
				const [firstPath, firstMessage] = Object.entries(fileResult.errors)[0];
				toast.error('ALERT!', {
					description: firstMessage
				});
				return;
			}

			for (const file of data.file) {
				let abbr = data.type.value
				brandingformData.append(`${abbr}`, file);
			}
		   }


		console.log('branding json ',JSON.stringify(result.data))	
		brandingformData.append('branding_advertisement',JSON.stringify(result.data));

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

		console.log('inserted json ',JSON.stringify(json))
		if (json[0].insert_branding_advertising.status === '200'){
			toast.success('Inserted Successfully!');
			meetingItems = [];
			goto('/teaching-meeting-branding')
		}

	   }
    }






	// Function to get available options for each row
	function getAvailableTeachingDropdown(selectedOptions: any[]) {
		const selectedValues = selectedOptions.map(option => option.type ? option.type.value : '');
		return getTeachingDropdown(teachingDropdown).filter(option => !selectedValues.includes(option.value));
	}

	// Function to get available options for meeting dropdowns
	function getAvailableMeetingDropdown(selectedOptions: any[]) {
		const selectedValues = selectedOptions.map(option => option.type ? option.type.value : '');
		return getMeetingDropdown(meetingDropdown).filter(option => !selectedValues.includes(option.value));
	}

	// Function to get available options for branding dropdowns
	function getAvailableBrandingDropdown(selectedOptions: any[]) {
		const selectedValues = selectedOptions.map(option => option.type ? option.type.value : '');
		return getBrandingDropdown(brandingDropdown).filter(option => !selectedValues.includes(option.value));
	}

</script>

<div class="space-y-6">
	<!-- Teaching Excellence Card -->
	<div class="rounded-2xl border border-gray-200 p-6 shadow-card flex justify-between items-center">
		<div class="flex flex-row gap-4 items-center">
		<i class="fa-solid fa-graduation-cap text-[30px]"></i>
		<h1 class="font-semibold text-lg">Teaching Excellence</h1>
	    </div>
		<button class="lms-btn lms-primary-btn flex items-center py-2.5" on:click={addTeachingRow}>
			<PlusIcon />
			<span class="hidden md:block ml-2">Add</span>
		</button>
	</div>

	{#if teachingItems.length > 0}
	<div class="lms-table-wrapper rounded-2xl border border-gray-200 p-6 shadow-card">
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
						<input type="file" multiple on:change={(e) => updateTeachingItem(item.id, 'file', [...e?.target?.files])} />
					</td>
					<td>
						<Input 
							placeholder="Link"
							bind:value={item.link}
							on:input={(e) => updateTeachingItem(item.id, 'link', e?.target?.value)}
						/>
					</td>
					<td>
						<button class="lms-btn lms-primary-btn" on:click={() => removeTeachingRow(item.id)}>
							<MinusIcon />
							Remove
						</button>
					</td>
				</tr>
				{/each}
			</tbody>
		</table>
		<hr class="mt-2" />
		<div class="flex flex-row float-right mt-4">
			<!-- <button class="lms-btn lms-secondary-btn mr-8" on:click={() => clearTeachingItems(teachingItems)}>Clear</button> -->
			<button class="lms-btn lms-primary-btn mr-8" on:click={submitTeachingItems}>Submit</button>
		</div>
	</div>	
	{/if}

	<!-- Meeting Stakeholders Card -->
	<div class="rounded-2xl border border-gray-200 p-6 shadow-card flex justify-between items-center">
		<div class="flex flex-row gap-4 items-center">
		<i class="fa-solid fa-people-arrows text-[30px]"></i>
		<h1 class="font-semibold text-lg">Meeting Stakeholders</h1>
		</div>
		<button class="lms-btn lms-primary-btn flex items-center py-2.5" on:click={addMeetingRow}>
			<PlusIcon />
			<span class="hidden md:block ml-2">Add</span>
		</button>
	</div>

	{#if meetingItems.length > 0}
	<div class="lms-table-wrapper rounded-2xl border border-gray-200 p-6 shadow-card">
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
						<input type="file" multiple on:change={(e) => updateMeetingItem(item.id, 'file', [...e?.target?.files])} />
					</td>
					<td>
						<Input 
							placeholder="Link"
							bind:value={item.link}
							on:input={(e) => updateMeetingItem(item.id, 'link', e?.target?.value)}
						/>
					</td>
					<td>
						<button class="lms-btn lms-primary-btn" on:click={() => removeMeetingRow(item.id)}>
						    <MinusIcon />
							Remove
						</button>
					</td>
				</tr>
				{/each}
			</tbody>
		</table>
		<hr class="mt-2" />
		<div class="flex flex-row float-right mt-4">
			<!-- <button class="lms-btn lms-secondary-btn mr-8" on:click={() => meetingItems = []}>Clear</button> -->
			<button class="lms-btn lms-primary-btn mr-8" on:click={submitMeetingItems}>Submit</button>
		</div>
	</div>	
	{/if}

	<!-- Branding & Advertisement Card -->
	<div class="rounded-2xl border border-gray-200 p-6 shadow-card flex justify-between items-center">
		<div class="flex flex-row gap-4 items-center">
		<i class="fa-solid fa-bullhorn text-[30px]"></i>
		<h1 class="font-semibold text-lg">Branding & Advertisement</h1>
		</div>
		<button class="lms-btn lms-primary-btn flex items-center py-2.5" on:click={addBrandingRow}>
			<PlusIcon />
			<span class="hidden md:block ml-2">Add</span>
		</button>
	</div>

	{#if brandingItems.length > 0}
	<div class="lms-table-wrapper rounded-2xl border border-gray-200 p-6 shadow-card">
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
						<input type="file" multiple on:change={(e) => updateBrandingItem(item.id, 'file', [...e?.target?.files])} />
					</td>
					<td>
						<Input 
							placeholder="Link"
							bind:value={item.link}
							on:input={(e) => updateBrandingItem(item.id, 'link', e?.target?.value)}
						/>
					</td>
					<td>
						<button class="lms-btn lms-primary-btn" on:click={() => removeBrandingRow(item.id)}>
						   <MinusIcon />
							Remove
						</button>
					</td>
				</tr>
				{/each}
			</tbody>
		</table>
		<hr class="mt-2" />
		<div class="flex flex-row float-right mt-4">
			<!-- <button class="lms-btn lms-secondary-btn mr-8" on:click={() => brandingItems = []}>Clear</button> -->
			<button class="lms-btn lms-primary-btn mr-8" on:click={submitBrandingItems}>Submit</button>
		</div>
	</div>	
	{/if}
</div>


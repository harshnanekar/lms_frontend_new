<script lang="ts">
	import DynamicSelect from '$lib/components/ui/select/dynamic-select.svelte';
	import { PlusIcon, MinusIcon } from '$lib/components/icons';
	import { Input,File } from '$lib/components/ui/input';
	import {
		getCommonDropdownData
	} from '$lib/utils/select.helper';
	import {
		fileSchema,
		teachingItemsSchema,
		type TeachingItemsReq
	} from '$lib/schemas/modules/research/master-validations';
	import { toast } from 'svelte-sonner';
	import { validateWithZod } from '$lib/utils/validations';
	import { PUBLIC_API_BASE_URL } from '$env/static/public';
	import { fetchFormApi } from '$lib/utils/fetcher';
	import { optionStore } from '$lib/stores/modules/research/master.store';
	import { goto } from '$app/navigation';
	import { Header } from '$lib/components/researchHeader';
	import { fileDataStore } from '$lib/stores/modules/research/master.store';


	export let data: any;

	let teachingHeader = 'Teaching Excellance';
	let meetingHeader = 'Meeting Stakeholders';
	let brandingHeader = 'Branding & Advertisement';

	$: dynamicHeader =
		data.type === 'te' ? teachingHeader : data.type === 'ms' ? meetingHeader : brandingHeader;

	fileDataStore.set([])	

	let inputItems: {
		id: number;
		type: any;
		description: string;
		link: string;
		file: File[];
		isChecked?: boolean;
		isPresent?: boolean;
	}[] | any = data.inputData.input_data ? data.inputData.input_data : [];

	console.log('items ',JSON.stringify(inputItems))
	
	let inputDropdown = data.inputData.dropdown_data
		? data.inputData.dropdown_data.message
		: [];

    console.log('dropdown data ',JSON.stringify(inputDropdown))
	
	function addNewRow() {
		inputItems = [
			...inputItems,
			{ id: inputItems.length, type: null, description: '', link: '', file: [] ,isPresent:false}
		];
	}

	function removeRow(id: number) {
		inputItems = inputItems.filter((item: { id: number; }) => item.id !== id);
	}

	function updateInputItem(id: number, field: string, value: any) {
		inputItems = inputItems.map((item: { id: number; }) =>
			item.id === id ? { ...item, [field]: value } : item
		);
	}

	function handleFiles(event: CustomEvent<{ files: File[] }>, itemId: number) {
		const files  = event.detail;
		inputItems = inputItems.map((item: { id: number; }) =>
			item.id === itemId ? { ...item, file : files } : item,
		);
	}

   function handleDeleteFiles(event: CustomEvent<{ files: File[] }>, itemId: number) {
    const  files  = event.detail;
	console.log('delete files ',files)
	updateInputItem(itemId, 'file', files);
	}

	let selectPreviewedfiles : any = [];

	function previewFiles (itemId : number){
		 selectPreviewedfiles = inputItems.filter((data: { id: number; }) => data.id === itemId).map((dt: { file: any; }) => dt.file)[0];
		console.log('selected files ',selectPreviewedfiles);
		fileDataStore.set(selectPreviewedfiles);

	}

	 let input_json: TeachingItemsReq = [];

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

				const dispFiles : any = [...data.file];

				if (data.isChecked) {
					const fileResult = validateWithZod(fileSchema, 
					{ 
					documents: dispFiles.map((f: any) => {
					return f.file;
					})
					});		

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
					formData.append(`${abbr}`, file.file);
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
				fileDataStore.set([]);
				goto('/teaching-meeting-branding');
			
		}
		}
	

	// Function to get available options for each row
	function getAvailableDropdown(selectedOptions: any[]) {
		const selectedValues = selectedOptions.map((option) => (option.type ? option.type.value : ''));
		return getCommonDropdownData(inputDropdown).filter(
			(option) => !selectedValues.includes(option.value)
		);
	}

   
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
					<div class="space-y-2">
						{#if item.isPresent}
							<label class="lms-label"
								>Click To Upload New File <input
									type="checkbox" class="accent-primary"
									bind:checked={item.isChecked}
								/></label
							><br/>
							{#if item.isChecked}
								
								                <File
													isView={false}
													isCombine={true}
													on:filesSelected={(e) => handleFiles(e,item.id)}
													on:deletedFiles={(e) => handleDeleteFiles(e,item.id)}
													on:previewFile={() => previewFiles(item.id)}
												/>	
							{:else}
								<button
									class="lms-primary-btn mt-2"
									on:click={() => downLoadFiles(item.type.value)}
									><i class="fa-solid fa-download text-md"></i></button
								>
							{/if}
						{:else}
						
							                    <File
													isView={false}
													isCombine={true}
													on:filesSelected={(e) => handleFiles(e,item.id)}
													on:deletedFiles={(e) => handleDeleteFiles(e,item.id)}
													on:previewFile={() => previewFiles(item.id)}
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

</div>

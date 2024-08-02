<script lang="ts">
	import { InfiniteScroll } from '$lib/components/layout';
	import { Input, DatePicker, DynamicSelect, File } from '$lib/components/ui';
	import { toast } from 'svelte-sonner';
	import type {
		InfiniteFacultyView,
		InfiniteMasterDataView
	} from '$lib/types/modules/research/research-types';
	import type { InfiniteScrollResult } from '$lib/types/request.types';
	import { PUBLIC_API_BASE_URL } from '$env/static/public';
	import { validateWithZod } from '$lib/utils/validations';
	import { updMasterDataDetails, type updMasterDataReq } from '$lib/schemas/modules/research/master-validations';
	import { fetchApi, fetchFormApi } from '$lib/utils/fetcher.js';
	import { goto } from '$app/navigation';
	import { getMasterInputType } from '$lib/utils/select.helper';
	import Accordian from '$lib/components/ui/accordian/accordian.svelte';
	import { Card } from '$lib/components/ui';

	export let data: any;

	// let isRequired = false;
	let isChecked: boolean = false;
	$: checkVal = isChecked;
    let disabled: boolean = true;

	let title = 'Master Data ';
	let masterTypes = data?.masterData?.masterDataList?.message;
	console.log('masterTypes ===>>>', masterTypes);
	$: master = masterTypes;

	console.log('render masterDataInput', data);

	let obj: any = {
		master_id: parseInt(data.masterData.masterDataInput[0].master_id),
		master_input_name: data.masterData.masterDataInput[0].master_input_name,
        faculty_lid :Number(data.masterData.masterDataInput[0].faculty_lid),
		master_type:
			data.masterData.masterDataInput.length > 0 && data.masterData.masterDataInput[0].input_type
				? {
						value: data.masterData.masterDataInput[0].input_type,
						label: data.masterData.masterDataInput[0].input_data_type
					}
				: null
	};

	console.log('obj ===>>>>>', obj);

	async function handleSubmit() {
		const masterObj: updMasterDataReq = {
			master_input_name: obj.master_input_name,
            faculty_lid : obj.faculty_lid,
			master_type: obj.master_type != null ? Number(obj.master_type.value) : 0
		};


		// }

		console.log(JSON.stringify(masterObj));
		const result = validateWithZod(updMasterDataDetails, masterObj);

		if (result.errors) {
			console.log(result.errors);
			const [firstPath, firstMessage] = Object.entries(result.errors)[0];
			toast.error('ALERT!', { description: firstMessage });
			return;
		}

		console.log('validated data', JSON.stringify(result.data));

        const { error, json } = await fetchApi({
			url: `${PUBLIC_API_BASE_URL}/master-input-data-update`,
			method: 'POST',
			body: {
				master_data: obj
			}
		});

		if (error) {
			toast.error(error.message || 'Something went wrong!', {
				description: error.errorId ? `ERROR-ID: ${error.errorId}` : ''
			});
			return;
		}
        if (json[0].upsert_master_data.status == 403) {
			toast.error('ALERT!', { description: json[0].upsert_master_data.message });
            goto('/master-input-data');
		} else {
			toast.success('Updated Successfully');
			goto('/master-input-data');
		}

		
	}
</script>

<Card {title}>
	<div class="modal-content p-4">
        <div class="grid grid-cols-1 gap-8 p-4 md:grid-cols-2 lg:grid-cols-3">
			<Input
				type="text"
				placeholder="Faculty Name"
				bind:value={obj.master_input_name}
			/>
            <Input
				type="number"
				placeholder="Faculty Id"
				bind:value={obj.faculty_lid}
                {disabled}
			/>
            <DynamicSelect
				isRequired={true}
				placeholder="Select Master Type"
				options={getMasterInputType(master)}
				bind:selectedOptions={obj.master_type}
				isMultiSelect={false}
			/>
			
			
		</div>
    </div>

	<div class="flex flex-row gap-[20px] p-4">
		<button class="lms-btn lms-primary-btn" on:click={handleSubmit}>Update</button>
	</div>
</Card>

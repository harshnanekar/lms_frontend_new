<script lang="ts">
	import { InfiniteScroll } from '$lib/components/layout';
	import { Input, DatePicker, DynamicSelect, File } from '$lib/components/ui';
	import { toast } from 'svelte-sonner';
	import type {
		InfiniteFacultyView,
		InfiniteMasterDataView
	} from '$lib/types/modules/research/research-types';
	import type { InfiniteScrollResult } from '$lib/types/request.types';
	import { PUBLIC_API_BASE_URL, PUBLIC_BASE_URL } from '$env/static/public';
	import { validateWithZod } from '$lib/utils/validations';
	import { masterObj, type masterDataReq } from '$lib/schemas/modules/research/master-validations';
	import { fetchApi } from '$lib/utils/fetcher.js';
	import { goto } from '$app/navigation';
	import { getMasterInputType } from '$lib/utils/select.helper';
	import Accordian from '$lib/components/ui/accordian/accordian.svelte';

	const url: URL = new URL(`${PUBLIC_API_BASE_URL}/master-input-data-scroll-paginate`);
	export let data: any;

	let masterTypes = data?.masterData?.masterInputData?.message;
	console.log('masterTypes ===>>>', masterTypes);
	$: master = masterTypes;

	let responseData: InfiniteScrollResult<InfiniteMasterDataView> = {
		data: [],
		total: 0,
		nextCursor: null
	};

	let masterData: any = [];

	$: masterData = responseData.data.map((item) => ({
		...item
	}));

	$: console.log('masterData updated ===>>>>>', masterData);

	$: responseData.data = responseData.data.map((item: any) => ({
		...item,
		input_data_type: item.input_data_type || null
	}));

	function updateMasterDataItem(id: number, key: string, value: any) {
		const item: any = responseData.data.find((item) => item.id === id);
		if (item) {
			item[key] = value;
		}
	}

	async function handleSubmit() {
		// Filter out items where input_data_type is not null
		const changedData = responseData.data.filter((item: any) => item.input_data_type != null);
		console.log('Modified masterData data:', JSON.stringify(changedData));

		let masterInputData: masterDataReq = changedData.map((data: any) => {
			return {
				master_id: Number(data.id),
				first_name: data.first_name || '',
				last_name: data.last_name || '',
				username: data.username || '',
				input_data_type: data.input_data_type ? Number(data.input_data_type.value) : 0
			};
		});

		// Validate the mapped data
		const result = validateWithZod(masterObj, masterInputData);
		if (result.errors) {
			const [firstPath, firstMessage] = Object.entries(result.errors)[0];
			toast.error('ALERT!', {
				description: firstMessage
			});
			return;
		}

		// Make API request
		const { error, json } = await fetchApi({
			url: `${PUBLIC_API_BASE_URL}/master-input-data-insert`,
			method: 'POST',
			body: {
				master_data: result.data
			}
		});

		if (error) {
			toast.error(error.message || 'Something went wrong!', {
				description: error.errorId ? `ERROR-ID: ${error.errorId}` : ''
			});
			return;
		}
		toast.success('Inserted Successfully!');
		goto(`${PUBLIC_BASE_URL}master-input-data`);
	}
</script>

<button class="lms-btn lms-primary-btn float-right" on:click={handleSubmit}>Submit</button>

<InfiniteScroll {url} showSearch bind:data={responseData}>
	<div class="lms-table-wrapper rounded-2xl p-4">
		<table class="lms-table border !border-[#e5e9f1]">
			<thead class="!bg-[#e5e9f1]">
				<tr>
					<th class="!text-[15px]">Sr.No</th>
					<th class="!text-[15px]">Firstname</th>
					<th class="!text-[15px]">Lastname</th>
					<th class="!text-[15px]">Username</th>
					<th class="!text-[15px]">Type</th>
				</tr>
			</thead>
			<tbody>
				{#if responseData.data.length > 0}
					{#each responseData.data as master_data, index}
						<tr class="border !border-[#e5e9f1]">
							<td>{index + 1}</td>
							<td>
								<input
									class="lms-input"
									disabled={false}
									value={master_data.first_name}
									on:input={(e) =>
										updateMasterDataItem(master_data.id, 'first_name', e?.target?.value)}
								/>
							</td>
							<td>
								<input
									class="lms-input"
									disabled={false}
									value={master_data.last_name}
									on:input={(e) =>
										updateMasterDataItem(master_data.id, 'last_name', e?.target?.value)}
								/>
							</td>
							<td>
								<input
									class="lms-input"
									disabled={true}
									value={master_data.username}
									on:input={(e) => updateMasterDataItem(master_data.id, 'username', e?.target?.value)}
								/>
							</td>
							<td>
								<DynamicSelect
									isRequired={true}
									placeholder="Select The Type"
									options={getMasterInputType(master)}
									on:change={(e) => {
										if (e.detail && e.detail.value !== undefined) {
											updateMasterDataItem(master_data.id, 'input_data_type', e.detail.value);
										}
									}}
									bind:selectedOptions={master_data.input_data_type}
									isMultiSelect={false}
								/>
							</td>
						</tr>
					{/each}
				{:else}
					<tr><td colspan="7">No Data Found!</td></tr>
				{/if}
			</tbody>
		</table>
	</div>
</InfiniteScroll>

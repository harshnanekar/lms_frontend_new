<script lang="ts">
	import { InfiniteScroll } from '$lib/components/layout';
	import { toast } from 'svelte-sonner';
	import type { InfiniteVcView } from '$lib/types/modules/research/research-types';
	import type { InfiniteScrollResult } from '$lib/types/request.types';
	import { PUBLIC_API_BASE_URL, PUBLIC_BASE_URL } from '$env/static/public';
	import { DynamicSelect, Input, Modal } from '$lib/components/ui';
	import { getFormLevel, getFormModules } from '$lib/utils/select.helper';
	import { writable } from 'svelte/store';
	import {tableObj} from "$lib/utils/helper"
	import {
		vcApprovalObj,
		type vcObjReq
	} from '$lib/schemas/modules/research/master-validations';
	import { fetchApi } from '$lib/utils/fetcher';
	import { validateWithZod } from '$lib/utils/validations';
	import { FormStatus } from '$lib/components/ui';
	import EyeIcon from '$lib/components/icons/base/eye-icon.svelte';
	import type { ModalSizes } from '$lib/components/ui/modal/helper.modal';


    export let data: any;
    console.log('data ',JSON.stringify(data.adminData))

		const isOpen = writable(false);
		let modalwidthPercent: ModalSizes = 'md';

		type VcApprovalDetails = {
			id : number | null,
			remarks:string | null;
			status: string | null,
		}

		const vcObj = writable<VcApprovalDetails>({id : null,remarks:null,status:null});
    

		const openModal = (size: ModalSizes,vc : VcApprovalDetails) => {
			console.log('vc object ',JSON.stringify(vc))
			modalwidthPercent = size;
			vcObj.set(vc);
			isOpen.set(true);
		};

		const closeModal = () => {
			isOpen.set(false);
		};

	// let level =
	// 	data.adminData && data.adminData.level.length > 0
	// 		? [{ id: 'All', status: 'All' }, ...data.adminData.level]
	// 		: [];
	// let modules =
	// 	data.adminData && data.adminData.modules.length > 0 ? data.adminData.modules[0].url : '';
	// let db_url =
	// 	data.adminData && data.adminData.modules.length > 0 ? data.adminData.modules[0].db_url : '';
	// let formLevel =
	// 	data.adminData && data.adminData.approvalLevel.length > 0
	// 		? data.adminData.approvalLevel[0].level
	// 		: null;

	// console.log('MODELLLLLLLLLLLLLLLLLLLLLLL>>>>>>>>>>>>>>>>>>>>>', data.id);

	$: dynamicUrl = new URL(`${PUBLIC_API_BASE_URL}/vc-approval-infinite`);

	// console.log('form level ', formLevel);

	let responseData: InfiniteScrollResult<InfiniteVcView> = {
		data: [],
		total: 0,
		nextCursor: null
	};

	// let school =
	// 	data.adminData && data.adminData.school.length > 0
	// 		? [{ id: 'All', organization_name: 'All' }, ...data.adminData.school]
	// 		: [];
	// let campus =
	// 	data.adminData && data.adminData.campus.length > 0
	// 		? [{ id: 'All', campus_name: 'All' }, ...data.adminData.campus]
	// 		: [];
	// console.log('nmims school ', JSON.stringify(data.adminData.modules));

	// let filters = [
	// 	{
	// 		name: 'school',
	// 		label: 'Select School',
	// 		options: school.map((data: any) => {
	// 			return { value: data.id, label: data.organization_name };
	// 		})
	// 	},
	// 	{
	// 		name: 'campus',
	// 		label: 'Select Campus',
	// 		options: campus.map((data: any) => {
	// 			return { value: data.id, label: data.campus_name };
	// 		})
	// 	},
	// 	{
	// 		name: 'status',
	// 		label: 'Select Status',
	// 		options: level.map((data: any) => {
	// 			return { value: data.id, label: data.status };
	// 		})
	// 	}
	// ];

	let vcData: any = [];

	$: vcData = responseData.data.map((item: any) => ({
		...item,
		is_changed : false
	}));

	 function updateFacultyStatus(form_lid: number, value: any, field: string): void {
		console.log('form status value ', value);
		vcData = vcData.map((item: { id : number }) =>
			item.id === form_lid ? { ...item, [field]: value ,is_changed :true } : item
		);
		console.log('faculty object ',JSON.stringify(vcData))
	 }

	async function handleSubmit() {
		const vcObj: vcObjReq = vcData
		    .filter((data: {is_changed : boolean}) => data.is_changed === true)
			.map((dt:any) => {
				return { id: Number(dt.id), status_lid: Number(dt.status_lid),remarks:dt.remarks != null ? dt.remarks : 'No Remarks Found !'};
			});

		const result = validateWithZod(vcApprovalObj,vcObj);
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
			url: `${PUBLIC_API_BASE_URL}/vc-approve-reject`,
			method: 'POST',
			body: {
				approval_data: result.data
			}
		});

		if (error) {
			toast.error(error.message || 'Something went wrong!', {
				description: error.errorId ? `ERROR-ID: ${error.errorId}` : ''
			});
			return;
		}
		console.log('json return ',JSON.stringify(json))
		toast.success('Status Updated Successfully !');
		dynamicUrl = dynamicUrl;
	}



</script>


<button class="lms-btn lms-primary-btn ml-auto" on:click={handleSubmit}>Submit</button>

<InfiniteScroll bind:url={dynamicUrl} showSearch bind:data={responseData}>
	<div class="lms-table-wrapper rounded-2xl p-4">
		<table class="lms-table border !border-[#e5e9f1]">
			<thead class="!bg-[#e5e9f1]">
				<tr>
					<th class="!text-[15px]">Sr.No</th>
					<th class="!text-[15px]">Chronicle Name</th>
					<th class="!text-[15px]">Start Date</th>
					<th class="!text-[15px]">End Date</th>
					<th class="!text-[15px]">Select Status</th>
					<th class="!text-[15px]">Remarks</th>
					<th class="!text-[15px]">View Chronicle</th>
				</tr>
			</thead>
			<tbody>
				{#each vcData as vc , index}
					<tr class="border !border-[#e5e9f1]">
						<td>{index + 1}</td>
						<td>{vc.name}</td>
						<td>{vc.start_date}</td>
						<td>{vc.end_date}</td>
						<td>
							{#if vc.status === 'pd'}
								<div class="mt-2.5 flex flex-row gap-[20px]">
									<div class="flex flex-row">
										<input
											type="radio"
											class="lms-input-radio w-4"
											name={vc.id}
											on:change={() =>
												updateFacultyStatus(vc.id, 2, 'status_lid')}
											value={2}
										/>
										<span class="text-sm text-[#888888]">Approve</span>
									</div>
									<div class="flex flex-row">
										<input
											type="radio"
											class="lms-input-radio w-4"
											name={vc.id}
											on:change={() =>
												updateFacultyStatus(vc.id, 3, 'status_lid')}
											value={3}
										/>
										<span class="text-sm text-[#888888]">Reject</span>
									</div>
								</div>
							{:else}
								<FormStatus status={vc.status} />
							{/if}
						</td>
						<td>
							<button class="lms-btn lms-secondary-btn" on:click={() => openModal('sm',{id : vc.id,remarks:vc.remarks,status:vc.status})}>Remarks</button>
					</td>
						<td><a href="{PUBLIC_BASE_URL}vc-chronicle-view/{vc.start_date}/{vc.end_date}"><EyeIcon fill="black"/></a></td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</InfiniteScroll> 


<Modal bind:isOpen={$isOpen} size={modalwidthPercent} on:close={closeModal}>
	<div slot="header">
		<div class="border-b p-4">
			<h2 class="text-lg font-semibold">Remarks</h2>
		</div>
	</div>
	<svalte:fragment slot="body">
		<div class="flex flex-col min-h-[50vh] p-4">
			<textarea placeholder="Enter Remarks..." class="lms-input flex-grow resize-none"
			on:input={(e) =>
			updateFacultyStatus($vcObj.id, e?.target?.value,'remarks')}
			disabled = {$vcObj.status === 'pd' ? false : true}
			>{$vcObj.remarks}</textarea>
		</div>
	</svalte:fragment>
	<div slot="footer">
		<div class="border-t flex md:flex-row gap-4 p-4">
			<button class="lms-btn lms-secondary-btn" on:click={closeModal}>Close</button>
			<!-- <button class="lms-btn lms-primary-btn" on:click={(e) => updateFacultyStatus($vcObj.form_id, e?.target?.value,'remarks')}>Add</button> -->
			{#if $vcObj.status === 'pd'}
			<button class="lms-btn lms-primary-btn" on:click={closeModal}>Submit</button>
			{/if}
		</div>
	</div>
</Modal> 
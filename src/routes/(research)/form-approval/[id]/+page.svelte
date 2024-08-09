<script lang="ts">
	import { InfiniteScroll } from '$lib/components/layout';
	import { toast } from 'svelte-sonner';
	import type { InfiniteAdminView } from '$lib/types/modules/research/research-types';
	import type { InfiniteScrollResult } from '$lib/types/request.types';
	import { PUBLIC_API_BASE_URL, PUBLIC_BASE_URL } from '$env/static/public';
	import { DynamicSelect, Input, Modal } from '$lib/components/ui';
	import { getFormLevel, getFormModules } from '$lib/utils/select.helper';
	import { writable } from 'svelte/store';
	import {tableObj} from "$lib/utils/helper"
	import {
		facultyApprovalObj,
		type facultyObjReq
	} from '$lib/schemas/modules/research/master-validations';
	import { fetchApi } from '$lib/utils/fetcher';
	import { validateWithZod } from '$lib/utils/validations';
	import { FormStatus } from '$lib/components/ui';
	import EyeIcon from '$lib/components/icons/base/eye-icon.svelte';
	import type { ModalSizes } from '$lib/components/ui/modal/helper.modal';

		const isOpen = writable(false);
		let modalwidthPercent: ModalSizes = 'md';

		type faculty = {
			form_id : number | null,
			remarks:string | null;
			status: string | null,
		}

		const facultyObj = writable<faculty>({form_id : null,remarks:null,status:null});
    

		const openModal = (size: ModalSizes,faculty : faculty) => {
			console.log('faculty object ',JSON.stringify(faculty))
			modalwidthPercent = size;
			facultyObj.set(faculty);
			isOpen.set(true);
		};

		const closeModal = () => {
			isOpen.set(false);
		};

	export let data: any;

	let level =
		data.adminData && data.adminData.level.length > 0
			? [{ id: 'All', status: 'All' }, ...data.adminData.level]
			: [];
	let modules =
		data.adminData && data.adminData.modules.length > 0 ? data.adminData.modules[0].url : '';
	let db_url =
		data.adminData && data.adminData.modules.length > 0 ? data.adminData.modules[0].db_url : '';
	let formLevel =
		data.adminData && data.adminData.approvalLevel.length > 0
			? data.adminData.approvalLevel[0].level
			: null;

	console.log('MODELLLLLLLLLLLLLLLLLLLLLLL>>>>>>>>>>>>>>>>>>>>>', data.id);

	$: dynamicUrl = new URL(`${PUBLIC_API_BASE_URL}/journal-form-infinite?tableId=${data.id}`);

	console.log('form level ', formLevel);

	let responseData: InfiniteScrollResult<InfiniteAdminView> = {
		data: [],
		total: 0,
		nextCursor: null
	};

	let school =
		data.adminData && data.adminData.school.length > 0
			? [{ id: 'All', organization_name: 'All' }, ...data.adminData.school]
			: [];
	let campus =
		data.adminData && data.adminData.campus.length > 0
			? [{ id: 'All', campus_name: 'All' }, ...data.adminData.campus]
			: [];
	console.log('nmims school ', JSON.stringify(data.adminData.modules));

	let filters = [
		{
			name: 'school',
			label: 'Select School',
			options: school.map((data: any) => {
				return { value: data.id, label: data.organization_name };
			})
		},
		{
			name: 'campus',
			label: 'Select Campus',
			options: campus.map((data: any) => {
				return { value: data.id, label: data.campus_name };
			})
		},
		{
			name: 'status',
			label: 'Select Status',
			options: level.map((data: any) => {
				return { value: data.id, label: data.status };
			})
		}
	];

	let facultyData: any = [];

	$: facultyData = responseData.data.map((item: any) => ({
		...item,
		form_status: null,
	}));

	function updateFacultyStatus(form_lid: any, value: any, field: string): void {
		console.log('form status value ', value);
		facultyData = facultyData.map((item: { research_form_id: number }) =>
			item.research_form_id === form_lid ? { ...item, [field]: value } : item
		);
		console.log('faculty object ',JSON.stringify(facultyData))
	}

	async function handleSubmit() {
		const facultyObj: facultyObjReq = facultyData
			.filter((data: any) => data.form_status != null)
			.map((dt: any) => {
				return { form_lid: Number(dt.research_form_id), form_status: Number(dt.form_status),remarks:dt.remarks != null ? dt.remarks : 'No Remarks Found !' ,form_status_id : Number(dt.form_status_id)};
			});
		console.log('zod faculty ', facultyObj);

		const result = validateWithZod(facultyApprovalObj, facultyObj);
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
			url: `${PUBLIC_API_BASE_URL}/approve-reject?tableId=${data.id}`,
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
		toast.success('Status Updated Successfully !');
		dynamicUrl = dynamicUrl;
	}

	$: console.log('response data url ', responseData.data);

	    // let textareaValue = $facultyObj.remarks;

		// function handleInput(e: Event) {
		// const target = e.target as HTMLTextAreaElement;
		// textareaValue = target.value;
		// }

		// function handleAdd() {
		// updateFacultyStatus($facultyObj.form_id, textareaValue, 'remarks');
		// }


</script>

<button class="lms-btn lms-primary-btn ml-auto" on:click={handleSubmit}>Submit</button>

<InfiniteScroll bind:url={dynamicUrl} showSearch bind:data={responseData} filterOptions={filters}>
	<div class="lms-table-wrapper rounded-2xl p-4">
		<table class="lms-table border !border-[#e5e9f1]">
			<thead class="!bg-[#e5e9f1]">
				<tr>
					<th class="!text-[15px]">Sr.No</th>
					<th class="!text-[15px]">Firstname</th>
					<th class="!text-[15px]">Lastname</th>
					<th class="!text-[15px]">Username</th>
					<th class="!text-[15px]">Select Status</th>
					<th class="!text-[15px]">Remarks</th>
					<th class="!text-[15px]">View Form</th>
				</tr>
			</thead>
			<tbody>
				{#each facultyData as faculty, index}
					<tr class="border !border-[#e5e9f1]">
						<td>{index + 1}</td>
						<td>{faculty.first_name}</td>
						<td>{faculty.last_name}</td>
						<td>{faculty.username}</td>
						<td>
							{#if faculty.status === 'pd'}
								<div class="mt-2.5 flex flex-row gap-[20px]">
									<div class="flex flex-row">
										<input
											type="radio"
											class="lms-input-radio w-4"
											name={faculty.research_form_id}
											on:change={() =>
												updateFacultyStatus(faculty.research_form_id, 2, 'form_status')}
											value={2}
										/>
										<span class="text-sm text-[#888888]">Approve</span>
									</div>
									<div class="flex flex-row">
										<input
											type="radio"
											class="lms-input-radio w-4"
											name={faculty.research_form_id}
											on:change={() =>
												updateFacultyStatus(faculty.research_form_id, 3, 'form_status')}
											value={3}
										/>
										<span class="text-sm text-[#888888]">Reject</span>
									</div>
								</div>
							{:else}
								<FormStatus status={faculty.status} />
							{/if}
						</td>
						<td>
							<button class="lms-btn lms-secondary-btn" on:click={() => openModal('sm',{form_id : faculty.research_form_id,remarks:faculty.remarks,status:faculty.status})}>Remarks</button>
					</td>
						<td><a href="{PUBLIC_BASE_URL}{tableObj[data.id].name}/view/{faculty.research_form_id}{tableObj[data.id].abbr}"><EyeIcon fill="black"/></a></td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</InfiniteScroll>


<Modal bind:isOpen={$isOpen} size={modalwidthPercent} on:close={closeModal}>
	<div slot="header">
		<div class="border-b p-4">
			<h2 class="text-lg font-semibold">Faculty Remarks</h2>
		</div>
	</div>
	<svalte:fragment slot="body">
		<div class="flex flex-col min-h-[50vh] p-4">
			<textarea placeholder="Enter Remarks..." class="lms-input flex-grow resize-none"
			on:input={(e) =>
			updateFacultyStatus($facultyObj.form_id, e?.target?.value,'remarks')}
			disabled = {$facultyObj.status === 'pd' ? false : true}
			>{$facultyObj.remarks}</textarea>
		</div>
	</svalte:fragment>
	<div slot="footer">
		<div class="border-t flex md:flex-row gap-4 p-4">
			<button class="lms-btn lms-secondary-btn" on:click={closeModal}>Close</button>
			<!-- <button class="lms-btn lms-primary-btn" on:click={(e) => updateFacultyStatus($facultyObj.form_id, e?.target?.value,'remarks')}>Add</button> -->
			{#if $facultyObj.status === 'pd'}
			<button class="lms-btn lms-primary-btn" on:click={closeModal}>Submit</button>
			{/if}
		</div>
	</div>
</Modal>

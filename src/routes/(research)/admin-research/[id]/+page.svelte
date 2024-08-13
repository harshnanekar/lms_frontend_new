<script lang="ts">
	import { PUBLIC_API_BASE_URL, PUBLIC_BASE_URL } from "$env/static/public";
	import { EyeIcon } from "$lib/components/icons";
	import { InfiniteScroll } from "$lib/components/layout";
	import { FormStatus, Modal } from "$lib/components/ui";
	import type { ModalSizes } from "$lib/components/ui/modal/helper.modal";
	import type { InfiniteResearchView } from "$lib/types/modules/research/research-types";
	import type { InfiniteScrollResult } from "$lib/types/request.types";
	import { tableObj } from "$lib/utils/helper";
	import { writable } from "svelte/store";

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

export let data : any;
console.log('research data ',JSON.stringify(data))

let level =
		data.adminData && data.adminData.level.length > 0
			? [{ id: 'All', status: 'All' }, ...data.adminData.level]
			: [];
	let formLevel =
		data.adminData && data.adminData.approvalLevel.length > 0
			? data.adminData.approvalLevel[0].level
			: null;

	console.log('MODELLLLLLLLLLLLLLLLLLLLLLL>>>>>>>>>>>>>>>>>>>>>', data.id);

	$: dynamicUrl = new URL(`${PUBLIC_API_BASE_URL}/chronicle-form-infinite?tableId=${data.id}`);

	console.log('form level ', formLevel);

	let responseData: InfiniteScrollResult<InfiniteResearchView> = {
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
		}
	];

	let facultyData: any = [];

	$: facultyData = responseData.data.map((item: any) => ({
		...item,
		form_status: null,
	}));

</script>

<InfiniteScroll bind:url={dynamicUrl} showSearch bind:data={responseData} filterOptions={filters}>
	<div class="lms-table-wrapper rounded-2xl p-4">
		<table class="lms-table border !border-[#e5e9f1]">
			<thead class="!bg-[#e5e9f1]">
				<tr>
					<th class="!text-[15px]">Sr.No</th>
					<th class="!text-[15px]">Firstname</th>
					<th class="!text-[15px]">Lastname</th>
					<th class="!text-[15px]">Username</th>
					<th class="!text-[15px]">Status</th>
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
								<FormStatus status={faculty.status} />
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

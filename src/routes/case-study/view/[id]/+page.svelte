<script lang="ts">
	import { PUBLIC_API_BASE_URL } from '$env/static/public';
	import { Card, Input ,File } from '$lib/components/ui';
	import { toast } from 'svelte-sonner';
	import { fileDataStore } from '$lib/stores/modules/research/master.store';
	import { createFileUrl } from '$lib/utils/helper';
	export let data: any;
	let title = 'Case Study';
	console.log('case study data ', JSON.stringify(data.caseData));

	let checkData = data.caseData.caseData.length > 0 ? true : false;
	let files = data.caseData.files.length > 0 ? createFileUrl(data.caseData.files) : [];
	fileDataStore.set(files);

	let obj = {
		case_study_id: checkData ? data.caseData.caseData[0].id : null,
		nmims_school:
		checkData && data.caseData.caseData[0].nmims_school
				? data.caseData.caseData[0].nmims_school
				: [],
		nmims_campus:
		checkData && data.caseData.caseData[0].nmims_campus
				? data.caseData.caseData[0].nmims_campus
				: [],
		all_authors:
		checkData && data.caseData.caseData[0].all_authors ? data.caseData.caseData[0].all_authors : [],
		nmims_authors:
		checkData && data.caseData.caseData[0].nmims_authors
				? data.caseData.caseData[0].nmims_authors
				: [],
		title: checkData && data.caseData.caseData[0].title ? data.caseData.caseData[0].title : '',
		edition: checkData && data.caseData.caseData[0].edition ? data.caseData.caseData[0].edition : '',
		publish_year:
		checkData && data.caseData.caseData[0].publish_year
				? data.caseData.caseData[0].publish_year
				: '',
		publisher:
		checkData && data.caseData.caseData[0].publisher ? data.caseData.caseData[0].publisher : '',
		publisher_category:
		checkData && data.caseData.caseData[0].publisher_category
				? Number(data.caseData.caseData[0].publisher_category)
				: null,
		url:checkData && data.caseData.caseData[0].url ? data.caseData.caseData[0].url : '',
		page_no: checkData && data.caseData.caseData[0].page_no ? data.caseData.caseData[0].page_no : '',
		nmims_authors_count:
		checkData && data.caseData.caseData[0].nmims_authors_count
				? data.caseData.caseData[0].nmims_authors_count
				: '',
		supporting_documents:
		checkData && data.caseData.caseData[0].supporting_documents
				? data.caseData.caseData[0].supporting_documents
				: '',
		volume_no:
		checkData && data.caseData.caseData[0].volume_no ? data.caseData.caseData[0].volume_no : ''
	};

	let disabled = true;

	async function downLoadFiles() {
		fetch(`${PUBLIC_API_BASE_URL}/case-study-download-files?id=${obj.case_study_id}`)
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
				a.download = 'case_study_documents.zip';
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

{#if checkData}
	<Card {title}>
		<div class="modal-content p-4">
			<!-- Adjust max-height as needed -->
			<div class="grid grid-cols-1 gap-8 p-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
				<Input type="text" placeholder="Nmims School" value={obj.nmims_school} {disabled} />
				<Input type="text" placeholder="Nmims Campus" value={obj.nmims_campus} {disabled} />
				<Input type="text" placeholder="All Authors" value={obj.all_authors} {disabled} />
			</div>

			<div class="grid grid-cols-1 gap-8 p-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
				<Input type="text" placeholder="Nmims Authors" value={obj.nmims_authors} {disabled} />
				<Input type="text" placeholder="Title Of Case Study" value={obj.title} {disabled} />
				<Input type="text" placeholder="Edition" value={obj.edition} {disabled} />
			</div>

			<div class="grid grid-cols-1 gap-8 p-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
				<Input type="text" placeholder="Page Number" value={obj.page_no} {disabled} />
				<Input type="text" placeholder="Volume No." value={obj.volume_no} {disabled} />
				<Input type="text" placeholder="Publisher" value={obj.publisher} {disabled} />
			</div>

			<div class="grid grid-cols-1 gap-8 p-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
				<Input type="number" placeholder="Publication Year" value={obj.publish_year} {disabled} />
				<div class="ml-2">
					<label class="text-sm text-[#888888]">
						Publisher Category<span class="text-danger text-sm">*</span>
					</label>
					<div class="mt-2.5 flex flex-row gap-[20px]">
						<div class="flex items-center">
							<input
								type="radio"
								id="international"
								class="lms-input-radio mr-2 w-4"
								name="publisher_category"
								value={1}
								checked={obj.publisher_category === 1}
								{disabled}
							/>
							<span class="text-sm text-[#888888]">International</span>
						</div>
						<div class="flex items-center">
							<input
								type="radio"
								id="national"
								class="lms-input-radio mr-2 w-4"
								name="publisher_category"
								value={2}
								checked={obj.publisher_category === 2}
								{disabled}
							/>
							<span class="text-sm text-[#888888]">National</span>
						</div>
					</div>
				</div>
				<Input type="text" placeholder="Url" value={obj.url} {disabled} />
			</div>

			<div class="grid grid-cols-1 gap-8 items-center p-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
				<Input
					type="number"
					placeholder="No. Of Nmims Authors"
					value={obj.nmims_authors_count}
					{disabled}
				/>
				<div class="space-y-2">
					<label for="documents" class="lms-label"
						>Download Supporting Documents
						<span>*</span>
					</label>
					<div class="flex items-center gap-2">
					<File isView={true} />	
					<button class="lms-btn lms-primary-btn" on:click={downLoadFiles}
						><i class="fa-solid fa-download text-lg"></i></button
					>
					</div>
				</div>
			</div>
		</div>
	</Card>
{:else}
	<p>No Data Found !</p>
{/if}

<script lang="ts">
	import { Input,File, DatePicker, DynamicSelect } from '$lib/components/ui';
	import { SelectDateIcon, XIcon } from '$lib/components/icons';
	import { formatDateTimeShort, formatDate } from '$lib/utils/date-formatter';
	import { tooltip } from '$lib/utils/tooltip';
	import { fly } from 'svelte/transition';
	import { Card } from '$lib/components/ui';
	import { PUBLIC_API_BASE_URL } from '$env/static/public';
	import { toast } from 'svelte-sonner';
	import { createFileUrl } from '$lib/utils/helper';
	import { fileDataStore } from '$lib/stores/modules/research/master.store';

	export let data: any;
	let title = 'Research Award';

	let disabled: boolean = true;
	let checkData = data.researchAwardData.researchAwardData.length > 0 ? true : false;
	let files = data.researchAwardData.files.length > 0 ? createFileUrl(data.researchAwardData.files) : [];
	fileDataStore.set(files)

	let publicationDate: Date | null = new Date();
	publicationDate =
		data.researchAwardData.researchAwardData[0].award_date != null ? data.researchAwardData.researchAwardData[0].award_date : null;
	$: publicationFormattedDate = publicationDate;

	console.log('research data ', JSON.stringify(data.researchAwardData));

	let obj = {
		research_award_id: checkData ? data.researchAwardData.researchAwardData[0].id : null,
		nmims_school:
		checkData && data.researchAwardData.researchAwardData[0].nmims_school != null
				? data.researchAwardData.researchAwardData[0].nmims_school
				: null,
		nmims_campus:
		checkData && data.researchAwardData.researchAwardData[0].nmims_campus != null
				? data.researchAwardData.researchAwardData[0].nmims_campus
				: null,
		faculty_name:
		checkData && data.researchAwardData.researchAwardData[0].faculty_name
				? data.researchAwardData.researchAwardData[0].faculty_name
				: '',
		award_name:
		checkData && data.researchAwardData.researchAwardData[0].award_name
				? data.researchAwardData.researchAwardData[0].award_name
				: '',
		award_details:
		checkData && data.researchAwardData.researchAwardData[0].award_details
				? data.researchAwardData.researchAwardData[0].award_details
				: '',
		award_organization:
		checkData && data.researchAwardData.researchAwardData[0].award_organization
				? data.researchAwardData.researchAwardData[0].award_organization
				: '',
		award_place:
		checkData && data.researchAwardData.researchAwardData[0].award_place
				? data.researchAwardData.researchAwardData[0].award_place
				: '',
		award_category:
		checkData && data.researchAwardData.researchAwardData[0].award_category != null
				? Number(data.researchAwardData.researchAwardData[0].award_category)
				: null,
		supporting_documents:
		checkData && data.researchAwardData.researchAwardData[0].supporting_documents
				? data.researchAwardData.researchAwardData[0].supporting_documents
				: ''
	};

	async function downLoadFiles() {
		fetch(`${PUBLIC_API_BASE_URL}/research-award-download-files?id=${obj.research_award_id}`)
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
				a.download = 'research_award_documents.zip';
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
			<div class="grid grid-cols-1 gap-8 p-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
				<Input type="text" placeholder="Nmims School" value={obj.nmims_school} {disabled} />
				<Input type="text" placeholder="Nmims Campus" value={obj.nmims_campus} {disabled} />
				<Input type="text" placeholder="Faculty Name" value={obj.faculty_name} {disabled} />
			</div>

			<div class="grid grid-cols-1 gap-8 p-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
				<Input type="text" placeholder="Award Name" value={obj.award_name} {disabled} />
				<Input type="text" placeholder="Award Details" value={obj.award_details} {disabled} />
				<Input
					type="text"
					placeholder="Organisation Conferring Award"
					value={obj.award_organization}
					{disabled}
				/>
			</div>

			<div class="grid grid-cols-1 gap-8 p-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
				<Input type="text" placeholder="Award Place" value={obj.award_place} {disabled} />
				<div class="ml-2">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="text-sm text-[#888888]">
						Award Category<span>*</span>
					</label>
					<div class="mt-2.5 flex flex-row gap-[20px]">
						<div class="flex items-center">
							<input
								type="radio"
								id="international"
								class="lms-input-radio mr-2 w-4"
								name="publisher_category"
								value={1}
								checked={obj.award_category === 1}
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
								bind:group={obj.award_category}
								value={2}
								checked={obj.award_category === 2}
								{disabled}
							/>
							<span class="text-sm text-[#888888]">National</span>
						</div>
					</div>
				</div>
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

			<div class="flex gap-4 p-4 md:flex-row">
				<div class="text-primary hover:bg-base flex items-center gap-x-3 rounded-lg px-3 py-2">
					<SelectDateIcon />
					<span class="text-body-2 font-bold">Award Date</span>
				</div>
				{#if publicationFormattedDate}
					{@const formattedDate = formatDateTimeShort(new Date(publicationFormattedDate))}
					<div
						class="bg-base text-label-md md:text-body-2 mr-3 flex items-center gap-x-4 rounded-3xl px-4 py-1 font-medium text-black md:py-3"
						in:fly={{ x: -100, duration: 300 }}
						out:fly={{ x: 100, duration: 300 }}
					>
						<p class="m-0 p-0">{formattedDate}</p>
						<button
							use:tooltip={{
								content: `<b class="text-primary">REMOVE</b> ${formattedDate}`
							}}
							on:click={() => {
								// remove the current date
								publicationFormattedDate = null;
							}}
						>
							<XIcon />
						</button>
					</div>
				{/if}
			</div>
		</div>
	</Card>
{:else}
	<p>No Data Found</p>
{/if}

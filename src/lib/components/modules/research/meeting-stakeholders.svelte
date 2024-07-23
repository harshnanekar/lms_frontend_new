<script lang="ts">
	import { PUBLIC_API_BASE_URL } from '$env/static/public';
	import { Card, Input,File } from '$lib/components/ui';
	import { fileDataStore } from '$lib/stores/modules/research/master.store';
	import { generateRandomUUID } from '$lib/utils/helper';
	import { toast } from 'svelte-sonner';
	let title = 'Meeting Stakeholders';
	let disabled: boolean = true;
	export let meetingData;
	export let meetingId: any;
	let count = 0;

	console.log('meeting data ',JSON.stringify(meetingData))

	let files = meetingData.files.length > 0 ? meetingData.files.map((data: any) => {
		return {
			file: [],
			name: data.name,
			url: data.url,
			id: generateRandomUUID(),
			abbr: data.type_abbr 
		};
	}) : [];

	let meetData = meetingData.meeting_data.length > 0 ? meetingData.meeting_data : [];

	async function downLoadFiles(abbr: any) {
		fetch(`${PUBLIC_API_BASE_URL}/meeting-download-files?id=${meetingId}&abbr=${abbr}`)
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
				a.download = 'meeting_stakeholders_documents.zip';
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

	let selectPreviewedfiles

	function previewFiles (abbr : string){
		selectPreviewedfiles = files.filter((data: any) => data.abbr === abbr).map((dt: any) => dt);
		console.log('selected meeting files ',files);
		fileDataStore.set(selectPreviewedfiles);
	}
</script>

<Card {title}>
	<div class="p-4">
		<div class="lms-table-wrapper rounded-2xl p-4">
			<table class="lms-table">
				<thead>
					<th class="!text-[15px]">Meeting Stakeholders Type</th>
					<th class="!text-[15px]">Description</th>
					<th class="!text-[15px]">Link</th>
					<th class="!text-[15px]">Documents</th>
				</thead>
				<tbody>
					{#if meetData.length > 0}
						{#each meetData as meet}
							<tr>
								<td class="!text-[15px]">{meet.type.label}</td>
								<td class="!text-[15px]">{meet.description}</td>
								<td class="!text-[15px]">{meet.link} {disabled}</td>
								<td
									>
									<!-- <button
										class="lms-btn lms-primary-btn"
										on:click={() => downLoadFiles(meet.type.value)}
										>{meet.type.label} File
										<i class="fa-solid fa-download text-md"></i></button
									> -->
									<div class="flex items-center gap-2">
										<File isView={true}
										isCombine={true}
										on:previewFile={() => previewFiles(meet.type.value)}
										/>	
									<button
										class="lms-btn lms-primary-btn"
										on:click={() => downLoadFiles(meet.type.value)}
										><i class="fa-solid fa-download text-lg"></i></button
									>
									</div>
								</td>
							</tr>
						{/each}
					{:else}
						<tr>
							<td>No Data Found!</td>
						</tr>
					{/if}
				</tbody>
			</table>
		</div>
	</div>
</Card>

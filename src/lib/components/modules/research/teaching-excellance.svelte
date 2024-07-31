<script lang="ts">
	import { PUBLIC_API_BASE_URL } from '$env/static/public';
	import { Card, Input } from '$lib/components/ui';
	import { toast } from 'svelte-sonner';
	let title = 'Teaching Excellance';
	let disabled: boolean = true;
	let count = 0;
	export let teachingData;
	export let teachingId: any;

	async function downLoadFiles(abbr: any) {
		fetch(`${PUBLIC_API_BASE_URL}/teaching-download-files?id=${teachingId}&abbr=${abbr}`)
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
				a.download = 'teaching_excellance_documents.zip';
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

<Card {title}>
	<div class="p-4">
		<div class="lms-table-wrapper rounded-2xl p-4">
			<table class="lms-table">
				<thead>
					<th class="!text-[15px]">Teaching Excellance Type</th>
					<th class="!text-[15px]">Description</th>
					<th class="!text-[15px]">Link</th>
					<th class="!text-[15px]">Documents</th>
				</thead>
				<tbody>
					{#if teachingData.length > 0}
						{#each teachingData as teach}
							<tr>
								<td class="!text-[15px]">{teach.type.label}</td>
								<td class="!text-[15px]">{teach.description}</td>
								<td class="!text-[15px]">{teach.link}</td>
								<td
									><button
										class="lms-btn lms-primary-btn"
										on:click={() => downLoadFiles(teach.type.value)}
										>{teach.type.label} File <i class="fa-solid fa-download text-md"></i></button
									></td
								>
							</tr>
						{/each}
					{:else}
						<td>No Data Found!</td>
					{/if}
				</tbody>
			</table>
		</div>
	</div>
</Card>

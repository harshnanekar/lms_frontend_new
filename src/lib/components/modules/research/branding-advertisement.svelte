<script lang="ts">
	import { PUBLIC_API_BASE_URL } from '$env/static/public';
	import { Card, Input } from '$lib/components/ui';
	import { toast } from 'svelte-sonner';
	let title = 'Branding & Advertisement';
	let disabled: boolean = true;
	export let brandingData;
	export let brandingId: any;

	async function downLoadFiles(abbr: any) {
		fetch(`${PUBLIC_API_BASE_URL}/branding-download-files?id=${brandingId}&abbr=${abbr}`)
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
				a.download = 'branding_advertisement_documents.zip';
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

	let count = 0;
</script>

<Card {title}>
	<div class="p-4">
		<div class="lms-table-wrapper rounded-2xl p-4">
			<table class="lms-table">
				<thead>
					<th class="!text-[15px]">Sr.No</th>
					<th class="!text-[15px]">Branding Advertisement Type</th>
					<th class="!text-[15px]">Description</th>
					<th class="!text-[15px]">Link</th>
					<th class="!text-[15px]">Documents</th>
				</thead>
				<tbody>
					{#if brandingData.length > 0}
						{#each brandingData as ba}
							<tr>
								<td class="!text-[15px]">{count + 1}.</td>
								<td class="!text-[15px]">{ba.type.label}</td>
								<td class="!text-[15px]">{ba.description}</td>
								<td class="!text-[15px]">{ba.link}</td>
								<td
									><button
										class="lms-btn lms-primary-btn"
										on:click={() => downLoadFiles(ba.type.value)}
										>{ba.type.label} File
										<i class="fa-solid fa-download text-md"></i></button
									></td
								>
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

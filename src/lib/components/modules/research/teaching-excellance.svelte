<script lang="ts">
	import { Card, Input } from '$lib/components/ui';
	let title = 'Teaching Excellance';
	let disabled: boolean = true;
	export let teachingData;
	export let teachingId;

	function downloadFiles() {
		console.log('Download files');
	}
</script>

<Card {title}>
	<div class="p-4">
		<div class="lms-table-wrapper shadow-card rounded-2xl border border-gray-200 p-6">
			<table class="lms-table">
				<thead>
					<th>Teaching Excellance Type</th>
					<th>Description</th>
					<th>Link</th>
					<th>Documents</th>
				</thead>
				<tbody>
                {#if teachingData.length > 0}    
                {#each teachingData as teach}
                 <td></td>
                 <td></td>
                 <td></td>
                 <td><button class="lms-btn lms-primary-"></button></td>     
                {/each}
                {:else}
                 <td>No Data Found!</td>
                {/if}
                </tbody>
			</table>
		</div>
	</div>
</Card>

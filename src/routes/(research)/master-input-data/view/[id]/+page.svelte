<script lang="ts">
	import { Input } from '$lib/components/ui';

	import { Card } from '$lib/components/ui';

	export let data: any;

	let disabled: boolean = true;
	let title = 'Author Details';
	let checkData = data.masterData.length > 0 ? true : false;
	console.log('checkData ===>>>>>>', checkData);

	console.log('data in view comming from backend ===>>>>', JSON.stringify(data));

	let obj: any = {
		faculty_name: checkData && data.masterData ? data.masterData[0].master_input_name : null,
		faculty_lid: checkData && data.masterData ? data.masterData[0].faculty_lid : null,
		faculty_type: checkData && data.masterData ? data.masterData[0].master_type : null
	};
</script>

{#if checkData}
	<Card {title}>
		<div class="modal-content p-4">
			<div class="grid grid-cols-1 gap-8 p-4 md:grid-cols-2 lg:grid-cols-2">
				<Input type="text" placeholder="Faculty Name" value={obj.faculty_name} {disabled} />
				<Input type="text" placeholder="Type" value={obj.faculty_type} {disabled} />
			</div>
		</div>
	</Card>
{:else}
	<p>No Data Found</p>
{/if}

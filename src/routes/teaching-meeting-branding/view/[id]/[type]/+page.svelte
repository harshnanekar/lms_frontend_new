<script lang="ts">
	import {
		TeachingExcellance,
		BrandingAdvertisement,
		MeetingStakeholders
	} from '$lib/components/modules/research';
	export let data: any;
	let abbr = data.inputData.type_abbr;
	console.log(JSON.stringify(data.inputData));
</script>

{#if abbr === 'te'}
	<TeachingExcellance
		teachingData={data.inputData}
		teachingId={data.inputData.teachingId}
	/>
{:else if abbr === 'ms'}
	<MeetingStakeholders
		meetingData={data.inputData}
		meetingId={data.inputData.meetingId}
	/>
{:else}
	<BrandingAdvertisement
		brandingData={data.inputData}
		brandingId={data.inputData.brandingId}
	/>
{/if}

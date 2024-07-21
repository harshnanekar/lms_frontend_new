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
		meetingData={data.inputData.meeting_data}
		meetingId={data.inputData.meetingId}
	/>
{:else}
	<BrandingAdvertisement
		brandingData={data.inputData.branding_data}
		brandingId={data.inputData.brandingId}
	/>
{/if}

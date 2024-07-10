<script lang="ts">
	import {
		TeachingExcellance,
		BrandingAdvertisement,
		MeetingStakeholders
	} from '$lib/components/modules/research';
	export let data : any;
	console.log(JSON.stringify(data.inputData));
</script>

<h1>hello</h1>
<TeachingExcellance teachingData={data.inputData.teachingData} teachingId = {data.inputData.teachingId}/>

<script lang="ts">
	import { PlusIcon } from '$lib/components/icons';
	import { MPCTableFilters } from '$lib/components/modules';
	import { MeetingAccordianList } from '$lib/components/modules/mpc';
</script>

<div class="flex justify-between items-center">
	<h1 class="text-lg font-bold md:text-xl">Multi Program Campus</h1>
	<button class="lms-btn lms-primary-btn fixed bottom-16 right-5 py-4 md:static md:py-2.5">
		<PlusIcon />
		<span class="hidden md:block">Create New Meeting</span>
	</button>
</div>
<MPCTableFilters />
<h3 class="mb-3 text-body-1 font-semibold">All Meetings</h3>
<MeetingAccordianList />

<!-- <TestComponents /> -->

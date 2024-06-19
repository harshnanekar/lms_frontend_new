<script lang="ts">
	import { CampusIcon, DownloadIcon, SelectDateIcon, XIcon } from '$lib/components/icons';
	import { Card, DatePicker, DynamicSelect, Input, Textarea } from '$lib/components/ui';
	import { formatDateTimeShort } from '$lib/utils/date-formatter';
	import { tooltip } from '$lib/utils/tooltip';
	import { writable } from 'svelte/store';

	let meetingName: string,
		meetingDescription: string,
		meetingDate: Date | null = new Date();

	const meetingDates = writable<Date[]>([new Date(), new Date()]);

	function handleDateChange(e: CustomEvent<any>) {
		if (!meetingDate) return;
		$meetingDates = [...$meetingDates, meetingDate];
	}
</script>

<h2 class="text-heading-2.5 font-medium">Create New Meeting</h2>

<div class="my-6 lg:my-14"></div>

<Card title="Meeting Details">
	<div class="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-6 space-y-5">
		<Input placeholder="Meeting Name" bind:value={meetingName} error="error message" />
		<DynamicSelect placeholder="Academic Year" />
		<div class="col-span-full">
			<Textarea value={meetingDescription} placeholder="Meeting Link & Password" />
		</div>
		<div class="col-span-full flex flex-wrap items-center gap-2">
			<DatePicker on:change={handleDateChange} bind:selectedDateTime={meetingDate}>
				<div class="flex items-center gap-x-3 rounded-lg px-3 py-2 text-primary hover:bg-base">
					<SelectDateIcon />
					<span class="text-body-2 font-bold">Add Meeting Dates</span>
				</div>
			</DatePicker>
			{#each $meetingDates as date, i}
				{@const formattedDate = formatDateTimeShort(date)}
				<div
					class="mr-3 flex items-center gap-x-4 rounded-3xl bg-base px-4 py-3 text-body-2 font-medium text-black"
				>
					<p class="m-0">{formattedDate}</p>
					<button
						use:tooltip={{
							content: `<b class="text-primary">REMOVE</b> ${formattedDate}`
						}}
						on:click={() => {
							// remove the current date
							meetingDates.update((dates) => dates.filter((_, idx) => i !== idx));
						}}
					>
						<XIcon />
					</button>
				</div>
			{/each}
		</div>
	</div>
</Card>

<div class="my-6"></div>

<Card title="Campus Details">
	<!-- each through selected campus data -->
	<div class="my-3"></div>
	<button class="flex items-center gap-x-3 rounded-lg px-3 py-2 text-primary">
		<CampusIcon />
		<span class="text-body-2 font-bold">Add Campus</span>
	</button>
</Card>

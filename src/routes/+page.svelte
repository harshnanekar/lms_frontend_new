<script lang="ts">
	import Table from './../lib/components/ui/table/table.svelte';
	import { Accordion, AccordionItem } from '$lib/components/ui';
	import { headers, obj } from '$lib/test';
	import { ActionIcon, PlusIcon } from '$lib/components/icons';
	import TestComponents from '$lib/components/test.components.svelte';
	import { MPCMeetingCard, MPCTableFilters } from '$lib/components/modules';

	const items = [
		{
			title: 'Financial Analytics-I (803AN2E001)-52245092',
			meeting_count: 14,
			content: 'Content 1'
		},
		{
			title: 'Financial Analytics-I (803AN2E001)-52245092',
			meeting_count: 14,
			content: 'Content 1'
		},
		{
			title: 'Financial Analytics-I (803AN2E001)-52245092',
			meeting_count: 14,
			content: 'Content 1'
		}
	];
</script>

<div class="flex justify-between">
	<h1 class="text-lg md:text-xl font-bold">Multi Program Campus</h1>
	<button class="py-4 md:py-2.5 fixed bottom-16 right-5 md:static lms-primary-btn">
		<PlusIcon />
		<span class="hidden md:block">Create New Meeting</span>
	</button>
</div>
<MPCTableFilters />
<h3 class="text-body-1 font-semibold">All Meetings</h3>
<Accordion collapse spaceBetween>
	{#each items as item, i}
		<AccordionItem open={items.length === 1}>
			<svelte:fragment slot="title">
				<div class="md:flex md:items-center md:justify-between">
					<div class="max-w-[22ch] md:max-w-[35ch] lg:max-w-full truncate">
						<span class="text-body-1 bold">
							{item.title}
						</span>
						<span class="pl-4 text-label-md semi-bold max-w-12 truncate">
							Master Of Business Administration (8001) - 50300366
						</span>
					</div>
					<div
						class="text-small-label sm:text-body-2 text-slate-100 sm:text-inherit text-start bold"
					>
						{item.meeting_count} Meetings
					</div>
				</div>
			</svelte:fragment>
			<svelte:fragment slot="content">
				<div class="hidden md:block">
					<Table isAction tableData={obj} tableHeaders={headers} let:actionData>
						<button>
							<ActionIcon />
						</button>
					</Table>
				</div>
				<div class="md:hidden divide-y-2 space-y-4">
					{#each obj as item}
						<MPCMeetingCard {item} />
					{/each}
				</div>
			</svelte:fragment>
		</AccordionItem>
	{/each}
</Accordion>

<!-- <TestComponents /> -->

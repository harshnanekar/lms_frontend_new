<script lang="ts">
	import { Accordion, AccordionItem } from '$lib/components/ui';

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
		},
		{
			title: 'Financial Analytics-I (803AN2E001)-52245092',
			meeting_count: 14,
			content: 'Content 1'
		}
	];
</script>

<Accordion collapse spaceBetween>
	{#each items as item, i}
		<AccordionItem open={items.length === 1}>
			<svelte:fragment slot="title">
				<div class="sm:flex sm:items-center sm:justify-between">
					<div class="max-w-[22ch] sm:max-w-[35ch] md:max-w-full truncate">
						<span class="text-body-1 bold">
							{item.title}
						</span>
						<span class="pl-4 text-label-md semi-bold">
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
			<svelte:fragment slot="content">{item.content}</svelte:fragment>
		</AccordionItem>
	{/each}
</Accordion>

<div class="p-10 font-dm-sans flex gap-10">
	<button
		class="bg-primary text-white text-cta-md py-[10px] px-[16px] rounded-xl border-none hover:bg-danger-dark"
	>
		Button
	</button>

	<button
		class="bg-white text-primary text-cta-md py-[10px] px-[16px] rounded-xl border-[1px] border-primary-light hover:bg-gray-100"
	>
		Button
	</button>
</div>

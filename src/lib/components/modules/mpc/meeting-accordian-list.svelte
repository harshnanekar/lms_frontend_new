<script>
	import { Accordion, AccordionItem } from '$lib/components/ui';
	import { MPCMeetingCard, MpcTable } from '.';
	import { headers, obj } from '$lib/test';

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

<Accordion collapse spaceBetween>
	{#each items as item, i}
		<AccordionItem>
			<svelte:fragment slot="title">
				<div class="md:flex md:items-center md:justify-between">
					<div class="lg:flex lg:items-center lg:space-x-2">
						<!-- use:tooltip={{ content: item.title }} -->
						<div
							class="bold max-w-[250px] flex-shrink-0 truncate text-left text-body-2 lg:max-w-[350px] xl:max-w-[400px] 2xl:max-w-[450px] 2xl:text-body-1"
						>
							{item.title}
						</div>
						<!-- use:tooltip={{ content: item.title }} -->
						<div
							class="semi-bold max-w-[250px] flex-shrink-0 truncate text-left text-small-label xl:max-w-[350px] 2xl:max-w-[450px] 2xl:text-label-md"
						>
							Master Of Business Administration (8001) - 50300366
						</div>
					</div>
					<div
						class="bold text-start text-small-label text-slate-100 sm:text-inherit 2xl:text-body-2"
					>
						{item.meeting_count} Meetings
					</div>
				</div></svelte:fragment
			>
			<svelte:fragment slot="content" let:open>
				{#if open}
					<div class="hidden md:block">
						<MpcTable />
					</div>
					<div class="space-y-4 divide-y-2 md:hidden">
						{#each obj as item}
							<MPCMeetingCard {item} />
						{/each}
					</div>
					<div id="scroll-anchor" style="height: 1px;"></div>
				{/if}
			</svelte:fragment>
		</AccordionItem>
	{/each}
</Accordion>

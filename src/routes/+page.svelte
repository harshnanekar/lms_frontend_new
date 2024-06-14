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
		}
	];
</script>

<button data-tooltip="This is my tooltip"> hello </button>

<Accordion collapse spaceBetween>
	{#each items as item, i}
		<AccordionItem open={items.length === 1}>
			<svelte:fragment slot="title">
				<div class="sm:flex sm:items-center sm:justify-between">
					<div class="max-w-[22ch] sm:max-w-[35ch] md:max-w-full truncate">
						<span class="text-body-2 bold">
							{item.title}
						</span>
						<span class="pl-4 text-small-label">
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
		class="bg-primary text-white text-cta-md font-medium py-[10px] px-[16px] rounded-xl border-none hover:bg-danger-hover active:bg-danger-pressed"
	>
		Button
	</button>

	<button
		class="bg-white text-primary text-cta-md font-medium py-[10px] px-[16px] rounded-xl border-[1px] border-primary-light hover:bg-gray-100 active:bg-danger-pressed active:text-white"
	>
		Button
	</button>

	<button
		class="bg-gray-250 text-white text-cta-md-no-space py-[10px] px-[16px] rounded-xl font-medium border-none leading-5 cursor-not-allowed"
	>
		Button
	</button>

	<button
		class="bg-transparent text-primary text-cta-md-no-space font-medium gap-2.5 flex items-center py-[10px] px-[16px] rounded-xl border-none cursor-pointer"
		>Button icon ghost
	</button>

	<button
		class="bg-white text-primary text-cta-md-no-space gap-2.5 font-medium py-[10px] px-[16px] rounded-xl
		border-[1px] border-primary-light cursor-pointer flex items-center hover:bg-gray-100 active:bg-danger-pressed active:text-white"
	>
		Button icon
	</button>

	<button
		class="bg-primary text-white text-cta-md-no-space gap-2.5 font-medium py-[10px] px-[16px] rounded-xl
		border-none cursor-pointer flex items-center hover:bg-danger-hover active:bg-danger-pressed"
		>icon Button
	</button>
</div>

<div class="p-10 font-dm-sans">
	<p>
		<a href="#" class="text-primary text-cta-md-no-space font-medium leading-5 no-underline"
			>Text Link</a
		>
	</p>

	<p>
		<a href="" class="text-primary text-cta-md-no-space font-medium leading-5 no-underline"
			>Text Link (icon)</a
		>
	</p>

	<p>
		<a
			href="#"
			class="text-slate-100 text-cta-md-no-space font-medium leading-5 no-underline cursor-not-allowed"
			>Text Link</a
		>
	</p>

	<!-- <div class="lms-status-success">
		<span
			class="bg-success-light text-success-dark text-cta-md font-medium leading-5 py-[3px] px-[12px]"
		>
			Scheduled
		</span>
	</div> -->
</div>

<div class="p-10 font-dm-sans flex gap-10">
	<button
		class="bg-primary text-white text-cta-md-no-space font-medium leading-5 border-none rounded-lg
		 py-[8px] px-[20px] hover:bg-danger-hover active:bg-danger-pressed">Primary</button
	>

	<button
		class="bg-danger-200 text-primary text-cta-md-no-space font-medium leading-5 rounded-lg border-[1px] border-primary
		 py-[8px] px-[20px] active:bg-danger-pressed active:text-white">Primary</button
	>
</div>

<div class="p-10 font-dm-sans flex gap-10">
	<div class="lms-status-success">
		<span
			class="bg-success-100 text-success-200 text-cta-md-no-space font-medium leading-5 py-[3px] px-[12px] rounded-[20px]
			 border-[1px] border-white"
			>Scheduled
		</span>
	</div>
	<div class="lms-status-info">
		<span
			class="bg-purple-100 text-purple-200 text-cta-md-no-space font-medium leading-5 py-[3px] px-[12px] rounded-[20px]
		border-[1px] border-white">Pending F-A</span
		>
	</div>
	<div class="lms-status-info-b">
		<span
			class="bg-info-100 text-info-200 text-cta-md-no-space font-medium leading-5 py-[3px] px-[12px] rounded-[20px]
		border-[1px] border-white">Pending F-B</span
		>
	</div>
	<div class="lms-status-done">
		<span
			class="bg-slate-200 text-slate-100 text-cta-md-no-space font-medium leading-5 py-[3px] px-[12px] rounded-[20px]
		border-[1px] border-white">Completed</span
		>
	</div>
	<div class="lms-status-warning">
		<span
			class="bg-warning-100 text-warning-200 text-cta-md-no-space font-medium leading-5 py-[3px] px-[12px] rounded-[20px]
		border-[1px] border-white">Draft</span
		>
	</div>
</div>

<div class="p-10 font-dm-sans flex gap-10">
	<div
		class="bg-base text-slate-100 py-[8px] px-[16px] rounded-xl border-[1px] border-base
		hover:bg-warning-300 hover:text-primary hover:border-[1px] hover:border-warning-400"
	>
		<span class="bg-white rounded-[90px] p-1 me-3">(i)</span>
		<span class="font-medium font-cta-md-no-space leading-[18px] me-0.5">All Meetings</span><span
			class="bg-white text-black py-[3px] px-[8px] rounded-[60px] hover:bg-warning-300">2</span
		>
	</div>

	<div
		class="bg-base text-slate-100 py-[8px] px-[16px] rounded-xl border-[1px] border-base
		hover:bg-warning-300 hover:text-primary hover:border-[1px] hover:border-warning-400"
	>
		<span class="bg-white rounded-[90px] p-1 me-3">(i)</span>
		<span class="font-medium font-cta-md-no-space leading-[18px] me-0.5">Scheduled</span><span
			class="bg-white text-black py-[3px] px-[8px] rounded-[60px] hover:bg-warning-300">2</span
		>
	</div>

	<div
		class="bg-base text-slate-100 py-[8px] px-[16px] rounded-xl border-[1px] border-base
		hover:bg-warning-300 hover:text-primary hover:border-[1px] hover:border-warning-400"
	>
		<span class="bg-white rounded-[90px] p-1 me-3">(i)</span>
		<span class="font-medium font-cta-md-no-space leading-[18px] me-0.5">Form A</span><span
			class="bg-white text-black py-[3px] px-[8px] rounded-[60px] hover:bg-warning-300">2</span
		>
	</div>

	<div
		class="bg-base text-slate-100 py-[8px] px-[16px] rounded-xl border-[1px] border-base
		hover:bg-warning-300 hover:text-primary hover:border-[1px] hover:border-warning-400"
	>
		<span class="bg-white rounded-[90px] p-1 me-3">(i)</span>
		<span class="font-medium font-cta-md-no-space leading-[18px] me-0.5">Form B</span><span
			class="bg-white text-black py-[3px] px-[8px] rounded-[60px] hover:bg-warning-300">2</span
		>
	</div>

	<div
		class="bg-base text-slate-100 py-[8px] px-[16px] rounded-xl border-[1px] border-base
		hover:bg-warning-300 hover:text-primary hover:border-[1px] hover:border-warning-400"
	>
		<span class="bg-white rounded-[90px] p-1 me-3">(i)</span>
		<span class="font-medium font-cta-md-no-space leading-[18px] me-0.5">Drafts</span><span
			class="bg-white text-black py-[3px] px-[8px] rounded-[60px] hover:bg-warning-300">3</span
		>
	</div>

	<div
		class="bg-base text-slate-100 py-[8px] px-[16px] rounded-xl border-[1px] border-base
		hover:bg-warning-300 hover:text-primary hover:border-[1px] hover:border-warning-400"
	>
		<span class="bg-white rounded-[90px] p-1 me-3">(i)</span>
		<span class="font-medium font-cta-md-no-space leading-[18px] me-0.5">Completed</span><span
			class="bg-white text-black py-[3px] px-[8px] rounded-[60px] hover:bg-warning-300">3</span
		>
	</div>
</div>

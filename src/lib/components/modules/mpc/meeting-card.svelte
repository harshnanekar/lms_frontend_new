<script lang="ts">
	import { ActionIcon } from '$lib/components/icons';
	import { STATUS_COLORS } from '$lib/constants/colors';
	import type { MpcMasterList } from '$lib/types/modules/mpc';

	export let item: MpcMasterList;
</script>

<div class="space-y-4 p-3">
	<div class="flex w-full items-center">
		<div class="mr-3 h-fit rounded-lg bg-base px-[12px] py-[2px]">{item.meeting_id}</div>
		<div class="overflow-hidden text-ellipsis whitespace-nowrap">{item.meeting_name}</div>
		<div class="ml-5 md:ml-5">
			<ActionIcon />
		</div>
	</div>
	<div class="flex justify-around text-slate-100">
		<div>
			{item.meeting_date}
		</div>
		<div>
			{item.acad_session}
		</div>
	</div>
	<div class="ml-auto {STATUS_COLORS[item.status_abbr.toString().toLocaleLowerCase()]} no-bold">
		{item.status}
	</div>
</div>

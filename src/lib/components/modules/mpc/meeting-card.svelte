<script lang="ts">
	import { ActionIcon } from '$lib/components/icons';
	import { STATUS_COLORS } from '$lib/constants/colors';
	import type { MpcMasterList } from '$lib/types/modules/mpc';

	export let item: MpcMasterList;
</script>

<div class="p-3 space-y-4">
	<div class="flex items-center w-full">
		<div class="mr-3 px-[12px] py-[2px] rounded-lg bg-base h-fit">{item.meeting_id}</div>
		<div class="overflow-hidden whitespace-nowrap text-ellipsis">{item.meeting_name}</div>
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

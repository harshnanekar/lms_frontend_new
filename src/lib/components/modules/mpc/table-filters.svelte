<script>
	import {
		DraftIcon,
		MeetingIcon,
		OpenBookIcon,
		PenIcon,
		ScheduledIcon
	} from '$lib/components/icons';
</script>

<div
	id="mpc-filter-wrapper"
	class="no-scrollbar my-[16px] flex gap-x-3 overflow-x-auto md:my-[30px]"
>
	<button class="lms-btn lms-filter-badge-container active">
		<MeetingIcon />
		<span class="lms-filter-badge-text">All Meetings</span>
		<span class="lms-filter-badge-count"> 2 </span>
	</button>

	<button class="lms-btn lms-filter-badge-container">
		<ScheduledIcon />
		<span class="lms-filter-badge-text">Scheduled</span>
		<span class="lms-filter-badge-count"> 2 </span>
	</button>

	<button class="lms-btn lms-filter-badge-container">
		<PenIcon />
		<span class="lms-filter-badge-text">Form A</span>
		<span class="lms-filter-badge-count"> 2 </span>
	</button>

	<button class="lms-btn lms-filter-badge-container">
		<PenIcon fill="#2995E9" />
		<span class="lms-filter-badge-text">Form B</span>
		<span class="lms-filter-badge-count"> 2 </span>
	</button>

	<button class="lms-btn lms-filter-badge-container">
		<DraftIcon />
		<span class="lms-filter-badge-text">Drafts</span>
		<span class="lms-filter-badge-count"> 2 </span>
	</button>

	<button class="lms-btn lms-filter-badge-container">
		<OpenBookIcon />
		<span class="lms-filter-badge-text">Completed</span>
		<span class="lms-filter-badge-count"> 2 </span>
	</button>
</div>

<script lang="ts">
	import { COLORS } from '$lib/constants/colors';

	export let topFill = '#7C8798';
	export let bottomFill = '#7C8798';
	export let width = 16;
	export let height = 16;
	export let sortOrder: "asc" | "desc" | "none" = "none";
	
	$: topFill = sortOrder === 'asc' ? COLORS.PRIMARY_COLOR : '#7C8798';
	$: bottomFill = sortOrder === 'desc' ? COLORS.PRIMARY_COLOR : '#7C8798';
</script>

<svg {width} {height} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
	<path d="M8 2.5L10.5981 7H5.40192L8 2.5Z" fill={topFill} />
	<path d="M8 14.5L5.40192 10L10.5981 10L8 14.5Z" fill={bottomFill} />
</svg>

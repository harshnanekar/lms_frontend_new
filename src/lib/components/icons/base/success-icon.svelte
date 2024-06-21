<script lang="ts">
	import { COLORS } from '$lib/constants/colors';

	export let fill = COLORS.PRIMARY_COLOR;
	export let width = 20;
	export let height = 20;
</script>

<svg {width} {height} viewBox="0 0 {width} {height}" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10Z" 
    fill="#7C8798"/>
    <path d="M6.5 10.5L7.85426 11.8543C8.21998 12.22 8.80422 12.2465 9.20155 11.9154L14.5 7.5" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
        
    
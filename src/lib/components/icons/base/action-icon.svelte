<script lang="ts">
	export let fill = 'black';
	export let width = 24;
	export let height = 24;
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<svg
	class="action-icon"
	{width}
	{height}
	viewBox="0 0 24 24"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
>
	<circle class="dot" cx="12" cy="5.5" r="1.5" {fill} />
	<circle class="dot" cx="12" cy="12.5" r="1.5" {fill} />
	<circle class="dot" cx="12" cy="19.5" r="1.5" {fill} />
</svg>

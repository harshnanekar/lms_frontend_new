<script lang="ts">
	import { setAccordionOptions } from './context';

	// by default more than one accordion can be open
	export let collapse = false;
	export let spaceBetween = false;

	// the context API avoids passing data through components as props
	setAccordionOptions({ collapse });
</script>

<div class="accordion {spaceBetween && 'space-y-4'}">
	<slot />
</div>

<style>
	.accordion {
		width: var(--accordion-width, 100%);
	}
</style>

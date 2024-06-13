<script lang="ts">
	import { slide } from 'svelte/transition';
	import { getAccordionOptions } from './context';

	// by default the accordion item is closed
	export let open = false;
	// assign a unique identifier for the component
	const componentId = crypto.randomUUID();

	// get the accordion options using the context api
	const { collapse, activeComponentId } = getAccordionOptions();

	function setActive() {
		// update the store value in the context
		if($activeComponentId === componentId) {
			$activeComponentId = null;
		} else {
			$activeComponentId = componentId;
		}
	}

	function toggleOpen() {
		open = !open;
	}

	function handleClick() {
		// if `collapse` is passed only one item can be active
		collapse ? setActive() : toggleOpen();
	}

	// the accordion item to be open by default
	$: open && collapse && setActive();
	// compare if the active id matches the component id
	$: isActive = $activeComponentId === componentId;
	// if `collapse`, set one item as active, otherwise use `open`
	$: isOpen = collapse ? isActive : open;
</script>

<div class="accordion-item">
	<button
		on:click={handleClick}
		class="accordion-toggle"
		class:active={isOpen}
		class:bg-base={isOpen}
		aria-expanded={isOpen}
		aria-controls="accordion-{componentId}"
	>
		<div class="accordion-title flex-none sm:flex-1">
			<slot name="title" />
		</div>

		<div class="accordion-caret" class:open={isOpen} >
			<svg
				width="18"
				height="18"
				viewBox="0 0 18 18"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M14.0304 6.59457C13.8898 6.45397 13.699 6.37498 13.5002 6.37498C13.3013 6.37498 13.1106 6.45397 12.9699 6.59457L9.53041 10.0341C9.38781 10.1709 9.19781 10.2474 9.00016 10.2474C8.80251 10.2474 8.61251 10.1709 8.46991 10.0341L5.03041 6.59457C4.88896 6.45796 4.69951 6.38236 4.50286 6.38407C4.30621 6.38578 4.1181 6.46465 3.97905 6.60371C3.83999 6.74277 3.76111 6.93088 3.7594 7.12752C3.7577 7.32417 3.83329 7.51362 3.96991 7.65507L7.40866 11.0946C7.83737 11.5037 8.4072 11.7319 8.99979 11.7319C9.59238 11.7319 10.1622 11.5037 10.5909 11.0946L14.0304 7.65507C14.171 7.51443 14.25 7.3237 14.25 7.12482C14.25 6.92595 14.171 6.73522 14.0304 6.59457Z"
					fill="#374957"
				/>
			</svg>
		</div>
	</button>

	{#if isOpen}
		<!-- local transitions only play when the block they belong to is created or destroyed -->
		<div
			transition:slide|local
			class="accordion-content"
			role="region"
			class:open={isOpen}
			aria-hidden={!isOpen}
			aria-labelledby="accordion-{componentId}"
		>
			<slot name="content" />
		</div>
	{/if}
</div>

<style>
	.accordion-toggle {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 12px;
		padding: var(--accordion-padding, 17px 24px);
		cursor: pointer;
		/* transition: background-color 0.1s ease; */
		transition: font-weight 3s ease-in-out;
		border: 1px solid rgba(229, 233, 241, 1);
		border-radius: 8px 8px 0px 0px;
	}

	:global(.accordion-toggle.active .bold) {
		-webkit-text-stroke: .7px black;
	}

	.accordion-caret {
		transition: rotate 0.3s ease;
	}

	.accordion-content {
		padding: var(--accordion-content-padding, 1rem);
	}

	.accordion-content.open {
		border: 1px solid rgba(229, 233, 241, 1);
		border-radius: 0px 0px 8px 8px;
		box-shadow: 0px 2px 8px 0px #00000012;
	}

	.accordion-caret.open {
		rotate: -180deg;
	}
</style>

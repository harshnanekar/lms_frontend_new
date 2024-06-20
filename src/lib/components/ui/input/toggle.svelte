<script>
	import { generateRandomUUID } from '$lib/utils/helper';

	export let isTrue = false;

	const id = generateRandomUUID();
</script>

<div>
	<input on:change type="checkbox" {id} bind:checked={isTrue} class="lms-toggle-checkbox" />
	<label for={id} class="lms-toggle-label"></label>
</div>

<style>
	.lms-toggle-checkbox {
		display: none;
		/* Hide the default checkbox */
	}

	.lms-toggle-label {
		display: block;
		width: 44px;
		height: 24px;
		background-color: #c5cddb;
		border-radius: 30px;
		position: relative;
		cursor: pointer;
		transition: background-color 0.3s ease;
	}

	.lms-toggle-label::before {
		content: '';
		display: block;
		width: 20px;
		height: 20px;
		background-color: #fff;
		border-radius: 50%;
		position: absolute;
		top: 2px;
		left: 2px;
		transition: transform 0.3s ease;
	}

	.lms-toggle-checkbox:checked + .lms-toggle-label {
		background-color: #d2232a;
	}

	.lms-toggle-checkbox:checked + .lms-toggle-label::before {
		transform: translateX(20px);
	}
</style>

<script lang="ts">
	import { writable, derived } from 'svelte/store';
	import { ArrowIcon } from '../icons';
	import { Modal } from '../ui'; // Replace with your Modal component

	// Export selectedDateTime so it can be used outside the component
	export let selectedDateTime;

	// Define writable stores for selectedDate and selectedTime
	const selectedDate = writable<Date | null>(null);
	const selectedTime = writable<{ hours: number; minutes: number; period: 'AM' | 'PM' }>({
		hours: 0,
		minutes: 0,
		period: 'AM'
	});

	let currentMonth: number = new Date().getMonth();
	let currentYear: number = new Date().getFullYear();
	const monthsOfYear = Array.from({ length: 12 }, (_, i) =>
		new Date(0, i).toLocaleString('default', { month: 'short' })
	);
	const yearsRange = Array.from({ length: 10 }, (_, i) => currentYear - 5 + i);

	const daysOfWeek = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

	// Function to get days in a specific month and year
	function getDaysInMonth(month: number, year: number): number[] {
		const date = new Date(year, month, 1);
		const days = [];
		while (date.getMonth() === month) {
			days.push(new Date(date).getDate());
			date.setDate(date.getDate() + 1);
		}
		return days;
	}

	// Function to change the displayed month
	function changeMonth(direction: 'prev' | 'next') {
		if (direction === 'prev') {
			if (currentMonth === 0) {
				currentMonth = 11;
				currentYear -= 1;
			} else {
				currentMonth -= 1;
			}
		} else {
			if (currentMonth === 11) {
				currentMonth = 0;
				currentYear += 1;
			} else {
				currentMonth += 1;
			}
		}
	}

	// Function to select a date
	function selectDate(day: number) {
		selectedDate.set(new Date(currentYear, currentMonth, day));
	}

	// Function to select a time
	function selectTime(hours: number, minutes: number, period: 'AM' | 'PM') {
		selectedTime.set({ hours, minutes, period });
	}

	// Initialize hours and minutes input elements
	let hoursInput: HTMLInputElement;
	let minutesInput: HTMLInputElement;

	// Define a writable store for modal open/close state
	const isModalOpen = writable(false);

	// Combine selectedDate and selectedTime into a single derived store
	const combinedDateTime = derived(
		[selectedDate, selectedTime],
		([$selectedDate, $selectedTime]) => {
			if ($selectedDate && $selectedTime) {
				const { hours, minutes, period } = $selectedTime;
				const selectedDateTime = new Date($selectedDate);
				selectedDateTime.setHours(period === 'PM' && hours < 12 ? hours + 12 : hours);
				selectedDateTime.setMinutes(minutes);
				selectedDateTime.setSeconds(0);
				return selectedDateTime;
			}
			return null;
		}
	);

	// Function to handle the 'Select' button click
	function handleSelect() {
		const selectedDateTime = $combinedDateTime;
		if (selectedDateTime) {
			console.log('Selected Date and Time:', selectedDateTime);
			// You can perform further actions with selectedDateTime, like emitting an event or passing it to a parent component
		}
		isModalOpen.set(false);
	}

	// State management for current view (days, months, years)
	const view = writable<'days' | 'months' | 'years'>('days');

	// Function to change the view
	function changeView(newView: 'days' | 'months' | 'years') {
		view.set(newView);
	}

	// Function to change the displayed year
	function changeYear(direction: 'prev' | 'next') {
		if (direction === 'prev') {
			currentYear -= 10;
		} else {
			currentYear += 10;
		}
	}
</script>

<!-- Button to open the modal -->
<button on:click={() => isModalOpen.set(true)} class="lms-btn lms-primary-btn">
	Select date and time
</button>

<!-- Modal component -->
<Modal isOpen={$isModalOpen} closeOnOutsideClick={false} position="top-bottom" size="fluid">
	<svelte:fragment slot="body">
		<!-- Your existing datepicker UI -->
		<div class="datepicker w-[100vw] rounded-md bg-white px-6 py-3 shadow-md sm:w-[356px]">
			<!-- Header with navigation buttons -->
			<div class="header mb-4 flex items-center justify-between">
				<button on:click={() => changeMonth('prev')} class="rounded-md p-2 hover:bg-base">
					<ArrowIcon />
				</button>
				<div class="current-month-year flex gap-x-3 text-center">
					{#if $view === 'days'}
						<button
							on:click={() => changeView('months')}
							class="lms-btn block rounded-md border border-base px-2"
							>{new Date(currentYear, currentMonth).toLocaleString('default', {
								month: 'long'
							})}</button
						>
						<button
							on:click={() => changeView('years')}
							class="lms-btn block rounded-md border border-base px-2">{currentYear}</button
						>
					{:else if $view === 'months'}
						<button
							on:click={() => changeView('days')}
							class="lms-btn block rounded-md border border-base px-2"
							>{new Date(currentYear, currentMonth).getFullYear()}</button
						>
					{:else if $view === 'years'}
						<div class="flex items-center gap-x-2">
							<button on:click={() => changeYear('prev')} class="rounded-md p-2 hover:bg-base"
								><ArrowIcon /></button
							>
							{currentYear}
							<button
								on:click={() => changeYear('next')}
								class="rotate-180 rounded-md p-2 hover:bg-base"><ArrowIcon /></button
							>
						</div>
					{/if}
				</div>
				<button
					on:click={() => changeMonth('next')}
					class="rotate-180 rounded-md p-2 hover:bg-base"
				>
					<ArrowIcon />
				</button>
			</div>

			<!-- Days of the week header -->
			<div
				class="days-of-week mb-2 grid grid-cols-7 rounded-md bg-base p-3 text-center text-cta-sm-lh"
				style="display: {$view === 'days' ? 'grid' : 'none'}"
			>
				{#each daysOfWeek as day}
					<div>{day}</div>
				{/each}
			</div>

			<!-- Grid to display days in the selected month -->
			<div
				class="days-grid grid grid-cols-7 gap-1 text-center"
				style="display: {$view === 'days' ? 'grid' : 'none'}"
			>
				{#each getDaysInMonth(currentMonth, currentYear) as day}
					<div
						class="cursor-pointer rounded-lg p-2.5 hover:bg-primary-light"
						class:active={new Date(currentYear, currentMonth, day).toDateString() ===
							$selectedDate?.toDateString()}
						class:bg-base={new Date(currentYear, currentMonth, day).toDateString() ===
							new Date().toDateString()}
						on:click={() => selectDate(day)}
					>
						{day}
					</div>
				{/each}
			</div>

			<!-- Months grid -->
			<div
				class="months-grid grid grid-cols-4 gap-1 text-center"
				style="display: {$view === 'months' ? 'grid' : 'none'}"
			>
				{#each monthsOfYear as month, index}
					<div
						class="cursor-pointer rounded-lg p-2.5 hover:bg-primary-light"
						on:click={() => {
							currentMonth = index;
							changeView('days');
						}}
					>
						{month}
					</div>
				{/each}
			</div>

			<!-- Years grid -->
			<div
				class="years-grid grid grid-cols-4 gap-1 text-center"
				style="display: {$view === 'years' ? 'grid' : 'none'}"
			>
				{#each Array.from({ length: 12 }, (_, i) => currentYear - 5 + i) as year}
					<div
						class="cursor-pointer rounded-lg p-2.5 hover:bg-primary-light"
						on:click={() => {
							currentYear = year;
							changeView('months');
						}}
					>
						{year}
					</div>
				{/each}
			</div>

			<!-- Time selection section -->
			<div class="time-selection mt-3 text-center">
				<p class="cta-sm-lh mb-1.5 font-medium">Select Time</p>
				<div class="time-inputs flex items-center justify-center space-x-2">
					<input
						type="number"
						min="1"
						max="12"
						value="00"
						bind:this={hoursInput}
						class="mr-1 h-11 w-11 rounded border border-base p-1 text-center"
						on:input={() =>
							selectTime(
								hoursInput.valueAsNumber,
								minutesInput.valueAsNumber,
								$selectedTime.period
							)}
					/>
					:
					<input
						type="number"
						min="0"
						max="59"
						value="00"
						bind:this={minutesInput}
						class="!ml-1 h-11 w-11 rounded border border-base p-1 text-center"
						on:input={() =>
							selectTime(
								hoursInput.valueAsNumber,
								minutesInput.valueAsNumber,
								$selectedTime.period
							)}
					/>

					<!-- Period selection buttons -->
					<div class="period flex flex-col">
						<button
							class="rounded-t-md border-[1px] border-b-0 border-base px-1.5 py-px text-cta-md"
							class:active={$selectedTime.period === 'AM'}
							on:click={() =>
								selectTime(hoursInput.valueAsNumber, minutesInput.valueAsNumber, 'AM')}>AM</button
						>
						<button
							class="rounded-b-md border-[1px] border-t-0 px-1.5 py-px text-cta-md"
							class:active={$selectedTime.period === 'PM'}
							on:click={() =>
								selectTime(hoursInput.valueAsNumber, minutesInput.valueAsNumber, 'PM')}>PM</button
						>
					</div>
				</div>
			</div>

			<!-- Action buttons (Select and Cancel) -->
			<div class="actions mt-4 flex justify-between">
				<button
					on:click={() => isModalOpen.set(false)}
					class="rounded-xl border border-primary px-12 py-3.5 text-primary">Cancel</button
				>
				<button on:click={handleSelect} class="lms-btn lms-primary-btn rounded-xl px-12 py-3.5"
					>Select</button
				>
			</div>
		</div>
	</svelte:fragment>
</Modal>

<style>
	.datepicker {
		max-width: 100%;
	}

	/* Styling for active state of selected date and time */
	.period .active,
	.days-grid .active {
		background-color: var(--lms--color-primary);
		color: white;
	}

	/* Remove default spinner in number inputs */
	input[type='number']::-webkit-inner-spin-button,
	input[type='number']::-webkit-outer-spin-button {
		-webkit-appearance: none;
		-moz-appearance: none;
		appearance: none;
		margin: 0;
	}
</style>

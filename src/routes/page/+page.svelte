<script lang="ts">
	import { CampusIcon, SelectDateIcon, XIcon } from '$lib/components/icons';
	import { AddCampusModal } from '$lib/components/modules/mpc';
	import { Card, DatePicker, DynamicSelect, Input, Textarea } from '$lib/components/ui';
	import { formatDateTimeShort } from '$lib/utils/date-formatter';
	import { getAcadYear } from '$lib/utils/select.helper';
	import { tooltip } from '$lib/utils/tooltip';
	import { writable } from 'svelte/store';
	import { fly } from 'svelte/transition';
	import { toast } from 'svelte-sonner';
	import { defaultMasterStoreValue, masterFormStore } from '$lib/stores/modules/mpc/master.store';
	import { CampusDetailCard } from '$lib/components/modules/mpc/master-form';
	import { validateWithZod } from '$lib/utils/validations';
	import { meetingSchema, type MasterFormReq } from '$lib/schemas/modules/mpc/master-form';
	import { fetchApi } from '$lib/utils/fetcher';
	import { PUBLIC_API_BASE_URL } from '$env/static/public';
	import type { MeetingSubjectStore } from '$lib/types/modules/mpc/master-form';
	
	let meetingName: string = ''
	let meetingDescription: string = ''
	let meetingDate: Date | null = new Date();
	function handleDateChange(e: CustomEvent<any>) {
		if (!meetingDate) return;
		$masterFormStore.meetingDate = [...$masterFormStore.meetingDate, meetingDate];
	}

	const isModalOpen = writable(false);

	function handleAddCampus() {
		if (!$masterFormStore?.acadYear.value) {
			toast.info('Alert!', {
				description: 'Please select an academic year',
			});
			return;
		}
		campusDataToPopulate = undefined;
		$isModalOpen = !$isModalOpen;
	}

	async function clearForm() {
		console.log("Clear form is loaded");
		
		$masterFormStore = defaultMasterStoreValue;
		$masterFormStore.meetingDate  = []
		$masterFormStore.meetingSubject  = []
		meetingName = ''
		meetingDescription = ''
		console.log("$masterFormStore>>>>>>>>", $masterFormStore);
	}

	async function handlePublishMeeting() {
		console.log('Publish Meeting');
		
		const meetingObject: MasterFormReq = {
			meeting_name: meetingName,
			acad_year: $masterFormStore.acadYear.value.toString(),
			link_password: meetingDescription,
			meeting_date: $masterFormStore.meetingDate,
			meeting_subject: $masterFormStore.meetingSubject.map((v) => {
				return {
					campus_lid: v.campusOption.value.toString(),
					program_lid: v.programOption.value.toString(),
					acad_session: v.sessionOption.value.toString(),
					subject_lid: v.subjectOption.value.toString(),
					is_parent: v.isParent,
					program_anchor: v.programAnchor.map((u) => u.user_lid.toString()),
					course_anchor: v.courseAnchor.map((u) => u.user_lid.toString()),
					attendees: v.attendees.map((u) => u.user_lid.toString())
				};
			})
		};

		console.log('objectToSend>>>>>', meetingObject);
		const result = validateWithZod(meetingSchema, meetingObject);
		
    if (result.errors) {
			const [firstPath, firstMessage] = Object.entries(result.errors)[0];
			toast.error("ALERT!", {
				description: firstMessage
			});
			return;
    }

		// API CALL
		const {error, json} = await fetchApi({
			url: `${PUBLIC_API_BASE_URL}/faculty/insert-master-form`,
			method: 'POST',
			body: {
				master_meeting: result.data
			},
		});

		if(error) {
			toast.error(error.message || 'Something went wrong!', {
				description: error.errorId ? `ERROR-ID: ${error.errorId}` : ''
			});
			return;
		}

		

		toast.success('Meeting Published Successfully');
		clearForm();
	}

	let campusDataToPopulate: MeetingSubjectStore | undefined = undefined;
</script>

<h2 class="text-heading-2.5 font-medium">Create New Meeting</h2>

<div class="my-6 lg:my-14"></div>

<Card title="Meeting Details">
	<div class="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-6">
		<Input placeholder="Meeting Name" bind:value={meetingName} />
		<DynamicSelect
			placeholder="Academic Year"
			options={getAcadYear()}
			bind:selectedOption={$masterFormStore.acadYear}
		/>
		<div class="col-span-full">
			<Textarea bind:value={meetingDescription} placeholder="Meeting Link & Password" />
		</div>
		<div class="col-span-full flex flex-wrap items-center gap-2">
			<DatePicker 
				on:change={handleDateChange} bind:selectedDateTime={meetingDate}
				disabled={(date) =>
					date.getTime() < new Date().setHours(0, 0, 0, 0)
				}	
			>
				<div class="text-primary hover:bg-base flex items-center gap-x-3 rounded-lg px-3 py-2">
					<SelectDateIcon />
					<span class="text-body-2 font-bold">Add Meeting Dates</span>
				</div>
			</DatePicker>
			{#each $masterFormStore.meetingDate as date, i}
				{@const formattedDate = formatDateTimeShort(date)}
				<div
					class="bg-base text-label-md md:text-body-2 mr-3 flex items-center gap-x-4 rounded-3xl px-4 py-1 md:py-3 font-medium text-black"
					in:fly={{ x: -100, duration: 300 }}
					out:fly={{ x: 100, duration: 300 }}
				>
					<p class="m-0">{formattedDate}</p>
					<button
						use:tooltip={{
							content: `<b class="text-primary">REMOVE</b> ${formattedDate}`
						}}
						on:click={() => {
							// remove the current date
							$masterFormStore.meetingDate = $masterFormStore.meetingDate.filter((_, idx) => i !== idx);
						}}
					>
						<XIcon />
					</button>
				</div>
			{/each}
		</div>
	</div>
</Card>

<div class="my-6"></div>

<Card title="Campus Details">
	{#each $masterFormStore.meetingSubject as sub}
		<CampusDetailCard bind:campusJson={sub} bind:isModalOpen={$isModalOpen} bind:dataToPopulate={campusDataToPopulate} />
	{/each}
	<div class="my-3"></div>
	<button
		class="text-primary flex items-center gap-x-3 rounded-lg px-3 py-2"
		on:click={handleAddCampus}
	>
		<CampusIcon />
		<span class="text-body-2 font-bold">Add Campus</span>
	</button>
</Card>

<div class="w-full flex gap-x-4 justify-end items-center mt-6 ">
	<button class="lms-btn lms-secondary-btn px-8 py-3" on:click={clearForm}>Clear Form</button>
	<button class="lms-btn lms-primary-btn px-12 py-3" on:click={handlePublishMeeting}>Publish</button>
</div>

{#if $isModalOpen}
	<AddCampusModal bind:isModalOpen={$isModalOpen} bind:dataToPopulate={campusDataToPopulate} />
{/if}


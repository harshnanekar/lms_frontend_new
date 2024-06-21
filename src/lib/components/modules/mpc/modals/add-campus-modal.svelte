<script lang="ts">
	import { AddAnchor, AddAttendees, userList } from '../';
	import { DynamicSelect, Modal } from '$lib/components/ui';
	import type { CustomOptions } from '$lib/components/ui/select/helper.select';
	import { masterFormStore } from '$lib/stores/modules/mpc/master.store';
	import type { AnchorWithSelection, MeetingSubjectStore } from '$lib/types/modules/mpc/master-form';
	import { generateRandomUUID } from '$lib/utils/helper';

	export let isModalOpen = false;

	let campusOption: CustomOptions | undefined;
	let programOption: CustomOptions | undefined;
	let sessionOption: CustomOptions | undefined;
	let subjectOption: CustomOptions | undefined;
	let programAnchor: AnchorWithSelection[] | undefined;
	let courseAnchor: AnchorWithSelection[] | undefined;
	let attendees: AnchorWithSelection[] | undefined;

	function add() {

		if(!campusOption || !sessionOption || !programOption || !subjectOption || !programAnchor || !courseAnchor || !attendees) {
			// TODO: add zod validations
			return
		}

		const obj: MeetingSubjectStore = {
			uid: generateRandomUUID(),
			campusOption,
			programOption,
			sessionOption,
			subjectOption,
			programAnchor,
			courseAnchor,
			attendees,
			isParent: $masterFormStore?.meetingSubject.length === 0 ? true : false
		};

		console.log(obj);
		$masterFormStore.meetingSubject = [...$masterFormStore.meetingSubject, obj]

		campusOption = undefined;
		programOption  = undefined;
		sessionOption = undefined;
		subjectOption = undefined;
		programAnchor = undefined;
		courseAnchor = undefined;
		attendees = undefined;
		isModalOpen = false;
	}
</script>

<Modal isOpen={isModalOpen} closeOnOutsideClick={false} size="xl" position="top-bottom">
	<svelte:fragment slot="body">
		<div class="grid min-h-[65vh] grid-cols-1 gap-6 overflow-y-auto p-6 xl:grid-cols-3">
			<div class="flex flex-col items-center justify-between">
				<div class="grid w-full grid-cols-1 gap-y-6">
					<h2 class="text-heading-2.5 font-bold">Add Campus</h2>
					<DynamicSelect
						placeholder="Campus"
						url="faculty/campus"
						bind:selectedOption={campusOption}
					/>
					<DynamicSelect
						placeholder="Program"
						url="faculty/programs"
						bind:selectedOption={programOption}
						dependsOn={[
							{
								key: 'campusLid',
								value: campusOption?.value
							}
						]}
					/>
					<DynamicSelect
						placeholder="Academic Session"
						url="faculty/acad-session"
						bind:selectedOption={sessionOption}
						dependsOn={[
							{
								key: 'campusLid',
								value: campusOption?.value
							},
							{
								key: 'programLid',
								value: programOption?.value
							}
						]}
					/>
					<DynamicSelect
						placeholder="Course"
						url="faculty/subject"
						bind:selectedOption={subjectOption}
						dependsOn={[
							{
								key: 'acadYear',
								value: $masterFormStore.acadYear?.value
							},
							{
								key: 'campusLid',
								value: campusOption?.value
							},
							{
								key: 'programLid',
								value: programOption?.value
							},
							{
								key: 'sessionLid',
								value: sessionOption?.value
							}
						]}
					/>
				</div>
				<div class="hidden w-full justify-evenly xl:flex">
					<button
						class="lms-btn border-primary text-primary rounded-xl border px-12 py-2.5"
						on:click={() => (isModalOpen = !isModalOpen)}
					>
						Cancel
					</button>
					<button class="lms-btn lms-primary-btn rounded-xl px-16" on:click={add}> ADD </button>
				</div>
			</div>
			<div>
				<AddAnchor
					bind:userList={programAnchor}
					type="program"
					dependsOn={[
						{
							key: 'programLid',
							value: programOption?.value
						},
						{
							key: 'sessionLid',
							value: sessionOption?.value
						},
						{
							key: 'subjectLid',
							value: subjectOption?.value
						}
					]}
				/>
				<div class="my-2"></div>
				<AddAnchor
					bind:userList={courseAnchor}
					type="course"
					dependsOn={[
						{
							key: 'programLid',
							value: programOption?.value
						},
						{
							key: 'sessionLid',
							value: sessionOption?.value
						},
						{
							key: 'subjectLid',
							value: subjectOption?.value
						}
					]}
				/>
			</div>
			<div class="h-full">
				<AddAttendees
					bind:userList={attendees}
					dependsOn={[
						{
							key: 'programLid',
							value: programOption?.value
						},
						{
							key: 'sessionLid',
							value: sessionOption?.value
						},
						{
							key: 'subjectLid',
							value: subjectOption?.value
						}
					]}
				/>
			</div>
			<div class="xl:hidden">
				<div class="bottom-3 flex w-full justify-start gap-x-5">
					<button
						class="lms-btn border-primary text-primary rounded-xl border px-12 py-2.5"
						on:click={() => (isModalOpen = !isModalOpen)}
					>
						Cancel
					</button>
					<button class="lms-btn lms-primary-btn px-16" on:click={add}> ADD </button>
				</div>
			</div>
		</div>
	</svelte:fragment>
</Modal>

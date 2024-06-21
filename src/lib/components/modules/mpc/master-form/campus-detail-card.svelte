<script lang="ts">
	import UserList from './user-list.svelte';
	import { fade } from 'svelte/transition';
	import type { MeetingSubjectStore } from '$lib/types/modules/mpc/master-form';
	import Avatar from '$lib/components/ui/avatar.svelte';
	import { masterFormStore } from '$lib/stores/modules/mpc/master.store';

	export let campusJson: MeetingSubjectStore;
    function handlePrimaryClick() {

        if(campusJson.isParent) return;

        masterFormStore.update((form) => {
            form.meetingSubject.forEach((sub) => {
                if(sub.uid === campusJson.uid) {
                    sub.isParent = true;
                } else {
                    sub.isParent = false;
                }
            })

            return form;
        })
    }
</script>

<div
	transition:fade
	class="shadow-card relative mt-6 space-y-5 overflow-hidden rounded-2xl border-[1px] border-[#E5E9F1] p-2.5 !pt-3 sm:p-6"
>
	<button
		class="absolute right-0 top-0 flex items-center gap-x-1.5 rounded-bl-xl rounded-tr-lg px-3 py-1"
		class:bg-slate-250={!campusJson.isParent}
		class:bg-success-100={campusJson.isParent}
		class:text-success-200={campusJson.isParent}
        on:click={handlePrimaryClick}
	>
		{#if campusJson.isParent}
			<svg
				width="14"
				height="10"
				viewBox="0 0 14 10"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M1 6.25L4 9.25L12.5 0.75"
					stroke="#3BB155"
					stroke-width="1.5"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
		{/if}
		{campusJson.isParent ? 'Primary' : 'Make Primary'}
	</button>
	<b class="">{campusJson.campusOption.label}</b>
	<div class="flex flex-wrap gap-x-5 gap-y-2">
		<div
			class="bg-base text-body-2 mr-3 items-center gap-x-4 rounded-3xl px-4 py-3 font-medium text-black"
		>
			{campusJson.subjectOption.label}
		</div>
		<div
			class="bg-base text-body-2 mr-3 items-center gap-x-4 rounded-3xl px-4 py-3 font-medium text-black"
		>
			{campusJson.programOption.label}
		</div>
		<div
			class="bg-base text-body-2 mr-3 items-center gap-x-4 rounded-3xl px-4 py-3 font-medium text-black"
		>
			{campusJson.subjectOption.label}
		</div>
	</div>
	<div class="grid grid-cols-1 gap-x-5 gap-y-3 lg:grid-cols-3">
		<div class="text-start">
			<span class="text-sm text-slate-500"> Program Anchor </span>
			<div class="mt-3">
				{#each campusJson.programAnchor as userAvtar}
					<UserList user={userAvtar} />
				{/each}
			</div>
		</div>
		<div class="text-start">
			<span class="text-sm text-slate-500"> Course Anchor </span>
			<div class="mt-3">
				{#each campusJson.courseAnchor as userAvtar}
					<UserList user={userAvtar} />
				{/each}
			</div>
		</div>
		<div class="text-start min-h-20">
			<span class="text-sm text-slate-500"> Attendees </span>
			<div class="relative flex items-center">
				{#each campusJson.attendees as attendees, i}
					{#if i < 4}
                        <div class="absolute" style="left: {i * 3 * 8}px;">
                            <Avatar src={attendees.avatar} name={attendees.full_name} />
                        </div>
					{/if}
				{/each}
				{#if campusJson.attendees.length > 4}
					<div class="absolute mt-10" style="left: 120px">
						+ {campusJson.attendees.length - 4} More ...
					</div>
				{/if}
			</div>
		</div>
	</div>
</div>

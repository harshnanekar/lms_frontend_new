import type { MasterMeetingStore } from '$lib/types/modules/mpc/master-form';
import { writable } from 'svelte/store';

export const defaultMasterStoreValue = {
    MeetingId : 0,
    acadYear: {
        value: new Date().getFullYear().toString(),
        label: new Date().getFullYear().toString(),
    },
    linkPassword: '',
    meetingDate: [],
    meetingName: '',
    meetingSubject: [],
}

export const masterFormStore = writable<MasterMeetingStore>(defaultMasterStoreValue);

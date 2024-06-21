import type { MasterMeetingStore } from '$lib/types/modules/mpc/master-form';
import { writable } from 'svelte/store';

const defaultMasterStoreValue = {
    acadYear: '',
    linkPassword: '',
    meetingDate: [],
    meetingName: '',
    meetingSubject: [],
}

export const masterFormStore = writable<MasterMeetingStore>(defaultMasterStoreValue);

import type { MasterMeetingStore } from '$lib/types/modules/mpc/master-form';
import { writable } from 'svelte/store';

export const MasterFormStore = writable<MasterMeetingStore | null>(null);

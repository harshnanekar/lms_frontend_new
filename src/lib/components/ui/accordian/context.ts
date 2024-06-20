import { writable } from 'svelte/store';
import { setContext, getContext } from 'svelte';
import type { AccordionOptions, ActiveId, ActiveIdContext, CollapseContext } from './types';

export function setAccordionOptions({ collapse }: AccordionOptions) {
	const activeComponentId = writable<ActiveId>(null);
	setContext<CollapseContext>('collapseAccordian', collapse);
	setContext<ActiveIdContext>('activeAccordianId', activeComponentId);
}

export function getAccordionOptions() {
	const collapse = getContext<CollapseContext>('collapseAccordian');
	const activeComponentId = getContext<ActiveIdContext>('activeAccordianId');
	return { collapse, activeComponentId };
}

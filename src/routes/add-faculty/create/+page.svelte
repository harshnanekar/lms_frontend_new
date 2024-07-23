<script lang="ts">
    import { InfiniteScroll } from '$lib/components/layout';
    import { fetchApi } from '$lib/utils/fetcher';
    import { onMount } from 'svelte';
    import { toast } from 'svelte-sonner';
	import type { JournalView } from '$lib/types/modules/research/research-types';

</script>


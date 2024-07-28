<script lang="ts">
    import { InfiniteScroll } from '$lib/components/layout';
    import { toast } from 'svelte-sonner';
    import type { InfiniteFacultyView } from '$lib/types/modules/research/research-types';
    import type { InfiniteScrollResult } from '$lib/types/request.types';
    
    
export let data;
console.log('admin data ',JSON.stringify(data.adminData))
</script>

<h1>form</h1>
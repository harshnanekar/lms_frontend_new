<script lang="ts">
	import BrandingIcon from '$lib/components/icons/layout/branding-icon.svelte';
	import ResearchIcon from '$lib/components/icons/layout/research-icon.svelte';
  import { MeetingIcon } from '$lib/components/icons/modules/mpc';
	import type { ChronicleModules } from '$lib/types/modules/research/research-types';

    export let data: ChronicleModules;
    console.log("DATA:::::::",data);
    

</script>

<div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 sm:grid-cols-2 gap-8">
  {#each data?.json as item}
  <a href={item.url}>
      <div class=" p-8 border shadow-card rounded-2xl flex items-center">
        <MeetingIcon fill="black" />
          <p class="text-center font-semibold ml-4">{item.module_name}</p>
      </div>
  </a>
  {/each}
</div>
 
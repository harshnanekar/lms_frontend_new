<script lang="ts">
	import { PUBLIC_BASE_URL } from '$env/static/public';
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
  <a href='{PUBLIC_BASE_URL}view-chronicles'>
    <div class=" p-8 border shadow-card rounded-2xl flex items-center">
      <MeetingIcon fill="black" />
        <p class="text-center font-semibold ml-4">View Chronicles</p>
    </div>
</a>
<a href='{PUBLIC_BASE_URL}chronicle-approval'>
  <div class=" p-8 border shadow-card rounded-2xl flex items-center">
    <MeetingIcon fill="black" />
      <p class="text-center font-semibold ml-4">Chronicle Approval</p>
  </div>
</a>
</div>
 
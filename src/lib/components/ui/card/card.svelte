<script lang="ts">
  export let title;
</script>
<div class="p-2.5 sm:p-6 !pt-0 border-[1px] border-[#E5E9F1] shadow-card rounded-2xl">
  <h2 class="text-body-2 sm:text-body-1 font-medium px-6 py-[11px] bg-base w-fit rounded-b-xl">{title}</h2>
  <slot />
</div>
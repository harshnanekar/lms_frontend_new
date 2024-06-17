<script lang="ts">
	export let title;
</script>

<div class="rounded-2xl border-[1px] border-[#E5E9F1] p-2.5 !pt-0 shadow-card sm:p-6">
	<h2 class="w-fit rounded-b-xl bg-base px-6 py-[11px] text-body-2 font-medium sm:text-body-1">
		{title}
	</h2>
	<slot />
</div>

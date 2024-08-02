<script lang="ts">
// @ts-nocheck

    import { Header, Sidebar } from '$lib/components/layout';
    import { cubicInOut } from 'svelte/easing';
    import { fade, fly, slide } from 'svelte/transition';

    export let data;
    console.log('data inside profifle ==>>.', JSON.stringify(data))
</script>

<Sidebar />
<main class="transition-all md:ml-[62px] lg:ml-[260px]">
    <Header userData={data.json} />
    <main
        id="lms-main-wrapper"
        class="small-scrollbar relative overflow-y-auto overflow-x-hidden bg-white px-[13px] py-[22px] md:rounded-tl-[20px] md:p-[30px]"
    >
        {#key data.pathname}
            <div 
            in:fly={{ x: 200, duration: 300, delay: 300 }}
            out:fly={{ x: -200, duration: 300 }}
            >
                <slot />
            </div>
        {/key}
    </main>
</main>
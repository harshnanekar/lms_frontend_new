<script lang="ts">
	import { goto } from "$app/navigation";
    import { PUBLIC_API_BASE_URL, PUBLIC_BASE_URL } from "$env/static/public";
	import { ToastAlert } from "$lib/components/ui";
	import { fetchApi } from "$lib/utils/fetcher";
    import { onMount } from 'svelte';
	import { toast } from "svelte-sonner";

    export let data: any;
    // console.log('chronicle json ', JSON.stringify(data));
    let chronicleData = data.chronicleData.length > 0 ? data.chronicleData : [];

    onMount(() => {
        const ulElements = document.querySelectorAll("ol");
        ulElements.forEach((ol) => {
            ol.style.listStyleType = "disc";
            ol.style.paddingLeft = "20px"; 
            ol.style.marginTop = "15px"
        });

        const headElements = document.querySelectorAll("h2");
        headElements.forEach((h) => {
            h.style.fontWeight = "bold"; 
            h.style.marginTop = "20px"
            h.style.fontSize = "18px"
        });

        const hElements = document.querySelectorAll("h5");
        hElements.forEach((h) => {
            h.style.fontWeight = "bold"; 
            h.style.marginTop = "20px"
            h.style.fontSize = "18px"
        });
    });

    async function sendForApproval() {      
     
      
      let obj = {
      start_date : chronicleData[0].start_date,
      end_date : chronicleData[0].end_date,
      chronicle_name : chronicleData[0].vc_chronicle.length > 0 ? chronicleData[0].vc_chronicle[0].chronicle_name : '',
      chronicle_id : [...chronicleData[0].vc_chronicle.map((data : {id : number}) => data.id),
                     ...chronicleData[0].research_chronicle.map((data : {id : number}) => data.id),
                     ...chronicleData[0].meeting_chronicle.map((data : {id:number}) => data.id),
                     ...chronicleData[0].news_chronicle.map((data : {id : number}) => data.id )]
      }

      console.log('chronicle json ',JSON.stringify(obj)) 
      
      const { error, json } = await fetchApi({
        url: `${PUBLIC_API_BASE_URL}/chronicle-approval-data`,
        method: 'POST',
        body: {
            "chronicle_approval_details" : obj
        }
      });
    
        if (error) {
            toast.error(error.message || 'Something went wrong!', {
                description: error.errorId ? `ERROR-ID: ${error.errorId}` : ''
            });
            return;
        }

        const jsonStatus = json as {status:string,message:string}
        console.log('jsonStatus',jsonStatus)
        if(jsonStatus.status === '200'){
         toast.success('Chronicle sent for approval successfully!')
         goto(`${PUBLIC_BASE_URL}chronicle-approval`)
        }

    }
</script>

{#if chronicleData[0].master_id !== null}
<div class='mb-8'>
    <ToastAlert header='Chronicle has been sent for approval'/>
</div>
{/if}

<div class="flex justify-center items-center">
<div class="bg-[#b7d1eb] w-2/4  p-4 space-y-4">
<div class=" p-4 w-full flex justify-center">
    <!-- svelte-ignore a11y-img-redundant-alt -->
    <img class="w-[100%]" src="{PUBLIC_BASE_URL}images/layout/nmims-chronicle.png" alt="nmims image" >
</div>

<div class="space-y-4 p-4">
    <p class="font-bold text-lg">NMIMS Monday Morning Chronicle</p>
    {#if chronicleData.length > 0}
    {#each chronicleData as chro}
    
    {#if chro.vc_chronicle}
    <div class="py-4">
    <p class="font-bold text-lg py-4">From Vice Chancellor's Desk</p>
    {#each chro.vc_chronicle as vc}
     <p class="text-md">{@html vc.chronicle_text}</p>
    {/each}
    {#if chro.vc_chronicle.length > 0}
    <!-- svelte-ignore a11y-img-redundant-alt -->
    <div class="flex justify-center items-center p-4">
    <img class="w-[50%]" src="{PUBLIC_BASE_URL}images/layout/coin.jpg" alt="nmims image" >
    </div> 
    {/if}
    </div>
    {/if}

    <hr class="border-black border-t-2 mx-auto my-4" />

    {#if chro.research_chronicle}
    <div class="py-4">
    <p class="font-bold text-lg text-gray-600 font-['Sans-Serif'] py-4">Research</p>
    {#each chro.research_chronicle as rc}
     <p class="text-md">{@html rc.chronicle_text}</p>
    {/each}
    </div>
    {/if}

    <hr class="border-black border-t-2 mx-auto my-4" />

    {#if chro.meeting_chronicle}
    <div class="py-4">
    <p class="font-bold text-lg text-gray-600 font-['Sans-Serif'] py-4">Meeting Stakeholders Aspiration</p>
    {#each chro.meeting_chronicle as mc}
     <div>{@html mc.chronicle_text}</div>
    {/each}
    </div>
    {/if}

    <hr class="border-black border-t-2 mx-auto my-4" />


    {#if chro.news_chronicle}
    <div class="py-4">
    <p class="font-bold text-lg text-gray-600 font-['Sans-Serif'] py-4">News Of The Week</p>
    {#each chro.news_chronicle as nc}
     <p class="text-md">{@html nc.chronicle_text}</p>
    {/each}
    </div>
    {/if}
     
    {/each}
    {:else}
    <p class="text-md">No Data Found !</p>
    {/if}
</div>
<section class="space-y-4 p-4">
    <p class="text-sm font-bold">© NMIMS Deemed-to-be University</p>
    <p class="text-sm">Mumbai | Shirpur | Bengaluru | Hyderabad | Indore | Navi Mumbai | Dhule | Chandigarh</p>
    <a class="text-blue-500 hover:text-blue-700 underline" href="https://www.nmims.edu">www.nmims.edu</a>
</section> 
</div>
</div>

<div>
    {#if chronicleData[0].master_id === null}
    <div class='flex justify-center'>
    <button class="lms-btn lms-primary-btn mt-4" on:click={() => sendForApproval()}>Send To Approval</button>
    </div>
    {/if}
</div>
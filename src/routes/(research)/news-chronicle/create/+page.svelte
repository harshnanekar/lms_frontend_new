<script lang="ts">

    import { fetchApi } from '$lib/utils/fetcher';
    import { PUBLIC_API_BASE_URL, PUBLIC_BASE_URL } from '$env/static/public';
    import { toast } from 'svelte-sonner';
    import { generateRandomNumberUUID } from '$lib/utils/helper';
    import  { CkEditor,Card, DatePicker, Input } from "$lib/components/ui";
    import { SelectDateIcon, XIcon } from '$lib/components/icons';
    import { formatDateTimeShort, formatDate } from '$lib/utils/date-formatter';
    import { tooltip } from '$lib/utils/tooltip';
    import { fly } from 'svelte/transition';
	import { goto } from '$app/navigation';
	import { validateWithZod } from '$lib/utils/validations';
	import { chronicleDetails, type chronicleReq } from '$lib/schemas/modules/research/master-validations';
	import type { CkEditorInstanceType } from '$lib/types/components/ck-editor';
    
    let vcEditor = ``;
    let editorInstance: CkEditorInstanceType;


    let chronicleName : string = `chronicle${generateRandomNumberUUID()}`;
    
    let startDate: Date | null = new Date();
    startDate = null;
    $: startFormattedDate = startDate; 
    
    let endDate : Date | null = new Date() ;
    endDate = null;
    $: endFormattedDate  = endDate;
    
    function handleStartDateChange(e: CustomEvent<any>) {
            if (!startDate) return;
            startFormattedDate = startDate;
            console.log('start date ', startDate);
    }
    
    function handleEndDateChange(e: CustomEvent<any>) {
            if (!endDate) return;
            endFormattedDate = endDate;
            console.log('start date ', endDate);

            if(startFormattedDate === null) {
                toast.error('Start date is required')
                return 
            }

            if(endFormattedDate === null) {
                toast.error('End date is required')
                return 
            }

            if(startFormattedDate > endFormattedDate) {
            toast.error('End date should be greater than end date');
            return
            }   
    
    }
    
    $: console.log('vc ',vcEditor)
    editorInstance?.setData(vcEditor);

    
    async function handleSubmit(){
        let obj : chronicleReq = {
            startDate : startFormattedDate != null ? formatDate(startFormattedDate) : '',
            endDate : endFormattedDate != null ? formatDate(endFormattedDate) : '',
            chronicleName,
            chronicleText : vcEditor,
            chronicle_module_id : 7
        }
    
        console.log("VC Office Editor  :", obj );

        const result = validateWithZod(chronicleDetails, obj);

		if (result.errors) {
			console.log(result.errors);
			const [firstPath, firstMessage] = Object.entries(result.errors)[0];
			toast.error('ALERT!', {
				description: firstMessage
			});
			return;
		}
    
        const { error, json } = await fetchApi({
                url: `${PUBLIC_API_BASE_URL}/chronicle-submit`,
                method: 'POST',
                body: {
                    "chro" : obj
                }
            });
    
            if (error) {
                toast.error(error.message || 'Something went wrong!', {
                    description: error.errorId ? `ERROR-ID: ${error.errorId}` : ''
                });
                return;
            }
            toast.success('Chronicle created successfully');
            goto(`${PUBLIC_BASE_URL}news-chronicle`);
        
    }
    
    
    </script>
    
    <div class ="space-y-4">
        <p class="text-center font-bold text-[30px]">News Of The Week</p>
    <Card title="Chronicle Details">
    
    
        <div class="space-y-4 py-8">
    
         <div class="grid grid-cols grid-cols-1">
            <Input type="text" placeholder="Chronicle Name" bind:value={chronicleName} />
         </div>   
    
         <div  class="grid grid-cols lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-4"> 
        <div class="flex gap-4 md:flex-row">
            <DatePicker
                on:change={handleStartDateChange}
                bind:selectedDateTime={startDate}
                disabled={(publicationDate) => publicationDate.getTime() < new Date().setHours(0, 0, 0, 0)}
            >
                <div class="text-primary hover:bg-base flex items-center gap-x-3 rounded-lg px-3 py-2">
                    <SelectDateIcon />
                    <span class="text-body-2 font-bold">Add Start Date</span>
                </div>
            </DatePicker>
            {#if startFormattedDate}
                {@const formattedDate = formatDateTimeShort(new Date(startFormattedDate))}
                <div
                    class="bg-base text-label-md md:text-body-2 mr-3 flex items-center gap-x-4 rounded-3xl px-4 py-1 font-medium text-black md:py-3"
                    in:fly={{ x: -100, duration: 300 }}
                    out:fly={{ x: 100, duration: 300 }}
                >
                    <p class="m-0 p-0">{formattedDate}</p>
                    <button
                        use:tooltip={{
                            content: `<b class="text-primary">REMOVE</b> ${formattedDate}`
                        }}
                        on:click={() => {
                            startFormattedDate = null;
                        }}
                    >
                        <XIcon />
                    </button>
                </div>
            {/if}
        </div>
    
    
        <div class="flex gap-4 md:flex-row">
            <DatePicker
                on:change={handleEndDateChange}
                bind:selectedDateTime={endDate}
                disabled={(publicationDate) => publicationDate.getTime() < new Date().setHours(0, 0, 0, 0)}
            >
                <div class="text-primary hover:bg-base flex items-center gap-x-3 rounded-lg px-3 py-2">
                    <SelectDateIcon />
                    <span class="text-body-2 font-bold">Add End Date</span>
                </div>
            </DatePicker>
            {#if endFormattedDate}
                {@const formattedDate = formatDateTimeShort(new Date(endFormattedDate))}
                <div
                    class="bg-base text-label-md md:text-body-2 mr-3 flex items-center gap-x-4 rounded-3xl px-4 py-1 font-medium text-black md:py-3"
                    in:fly={{ x: -100, duration: 300 }}
                    out:fly={{ x: 100, duration: 300 }}
                >
                    <p class="m-0 p-0">{formattedDate}</p>
                    <button
                        use:tooltip={{
                            content: `<b class="text-primary">REMOVE</b> ${formattedDate}`
                        }}
                        on:click={() => {
                            endFormattedDate = null;
                        }}
                    >
                        <XIcon />
                    </button>
                </div>
            {/if}
        </div>
    </div>
        <div class="flex justify-end"><button class="lms-btn lms-primary-btn" on:click={handleSubmit}>Submit</button></div>
        
    </div>
    
    
    
    </Card>
    <div>
        <CkEditor bind:editorInstance={editorInstance} bind:value={vcEditor}/>
    </div>
    </div>
    
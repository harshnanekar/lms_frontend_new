<script lang="ts">
	import { writable } from 'svelte/store';
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
	import type { CkEditorInstanceType } from '$lib/types/components/ck-editor';
	import { validateWithZod } from '$lib/utils/validations';
	import { chronicleDetails, type chronicleReq } from '$lib/schemas/modules/research/master-validations';
    
    let vcEditor = '';
    const formattedChronicleText = writable<string>(vcEditor);
    let jsonDataForCron: any;
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
    
    async function handleEndDateChange(e: CustomEvent<any>) {
            vcEditor = ''
            formattedChronicleText.set(vcEditor);
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

            const timeDifference : number = endFormattedDate.getTime() - startFormattedDate.getTime();
            const dayDifference : number = timeDifference / (1000 * 60 * 60 * 24);

            if(dayDifference !== 7) { 
             toast.error('Difference between two dates must be of one week')
             return;
            } 

            let obj= {
                startDate : startFormattedDate,
                endDate : endFormattedDate
            }

            const { error, json } = await fetchApi({
                url: `${PUBLIC_API_BASE_URL}/chronicle-research-list`,
                method: 'POST',
                body: {
                    "research_dates" : obj
                }
            });
    
            if (error) {
                toast.error(error.message || 'Something went wrong!', {
                    description: error.errorId ? `ERROR-ID: ${error.errorId}` : ''
                });
                return;
            }
            jsonDataForCron = json;
            getFormattedHtml(jsonDataForCron);

    }

    function getFormattedHtml(data : any){
        let dataObj = data;
    
    vcEditor += '<div><h2>Journal Articles</h2>';
   for (const ja of dataObj.journal_article) {

    // Adding NMIMS school details
    for (const school of ja.nmims_school) {
        vcEditor += `<b> ${school} </b>`;
    }

    for(const ca of ja.nmims_campus){
        vcEditor += `<b> ${ca} </b>`;
    }
    vcEditor +=   `<ol>`
    for(const la of ja.all_authors){
        vcEditor+= ` <li>${la} `
    }
    vcEditor+= `,"${ja.journal_name}" (${ja.publish_year}) , ${ja.title}, Impact factor : ${ja.impact_factor}, <a href="${ja.doi_no}">Link</a> , (`
    for(const na of ja.nmims_authors){
        vcEditor+= ` ${na} `
    }
    vcEditor+=`) </li></ol></div><hr>`;
}

// Book Chapter Publications
vcEditor += '<div><h2>Book Chapter Publications</h2>';
for (const bcp of dataObj.book_chapter_publication) {

//     // Adding NMIMS school details
    for (const school of bcp.nmims_school) {
        vcEditor += `<b> ${school} </b>`;
    }

    for(const campus of bcp.nmims_campus){
        vcEditor += `<b> ${campus} </b>`;
    }
    vcEditor +=   `<ol>`
    for(const author of bcp.all_authors){
        vcEditor+= ` <li>${author} `
    }
    vcEditor+= `,"${bcp.book_title}" (${bcp.publish_year}) ,${bcp.chapter_title},${bcp.edition},${bcp.volume_no},${bcp.chapter_page_no},${bcp.publisher}, <a href="${bcp.web_link}">Link</a>,${bcp.isbn_no} , (`
    for(const na of bcp.nmims_authors){
        vcEditor+= ` ${na} `
    }
    vcEditor+=`) </li></ol></div><hr>`;
}

// Conference 
 vcEditor += '<div><h2>Conference Presentations</h2>';
 for (const conf of dataObj.conference) {

    // Adding NMIMS school details
    for (const school of conf.nmims_school) {
        vcEditor += `<b> ${school} </b>`;
    }

    // Adding NMIMS Campus details
    for (const campus of conf.nmims_campus) {
        vcEditor += `<b>${campus}</b>`;
    }
    
    vcEditor += `<ol>`;
    
    // List all authors
    for (const ifd of conf.internal_faculty_details) {
        vcEditor += `<li> ${ifd} `;
    }
    
    // Conference details
    vcEditor += `, "${conf.conference_name}" (${conf.publication_date}), 
                      ${conf.paper_title},${conf.place}, 
                      ${conf.volume_no},
                      <a href="${conf.doi_no}">Link</a>, 
                      ${conf.organizing_body}, (`;
    
    // NMIMS authors
    for (const efd of conf.external_faculty_details) {
        vcEditor += ` ${efd} `;
    }
    
    vcEditor += `)</li></ol></div><hr>`;
}

// Research Seminars
    vcEditor += '<div><h2>Research Seminars</h2>';
    for (const rs of dataObj.research_seminar) {

    // Adding NMIMS school details
    for (const school of rs.nmims_school) {
        vcEditor += `<strong> ${school} </strong>`;
    }

     // Adding NMIMS Campus details
    for (const campus of rs.nmims_campus) {
        vcEditor += `<b> ${campus} </b>`;
    }
    
    vcEditor += `<ol>`;
    
    // Seminar Topic and Resource Person
    vcEditor += `<li>Topic: ${rs.topic}, Resource Person: ${rs.resource_person}`;
    
    // Seminar details
    vcEditor += `,"${rs.journal_name}" (${rs.publication_date}), 
                     ${rs.paper_title}, 
                     ${rs.publisher}, ${rs.issn_no},${rs.scopus_site_score}, 
                      Impact Factor: ${rs.impact_factor}, <a href="${rs.doi_no}">Link</a>, 
                      (`;
    
    // NMIMS authors
    for (const na of rs.nmims_authors) {
        vcEditor += ` ${na} `;
    }
    
    vcEditor += `)</li></ol></div><hr>`;
   }
   editorInstance?.setData(vcEditor);
}

    async function handleSubmit(){
        let obj : chronicleReq = {
            startDate : startFormattedDate != null ? formatDate(startFormattedDate) : '',
            endDate : endFormattedDate != null ? formatDate(endFormattedDate) : '',
            chronicleName,
            chronicleText : vcEditor,
            chronicle_module_id : 2
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

            formattedChronicleText.set('');

            toast.success('Chronicle created successfully')
            goto(`${PUBLIC_BASE_URL}chronicle-research`)
        
    }
    let editorInstance: CkEditorInstanceType;
    </script>
    
    <div class ="space-y-4">
    <p class="text-center font-bold text-[30px]">Research</p>
    <Card title="Chronicle Details">
    
    
        <div class="space-y-4 py-8">
     
         <div  class="grid grid-cols grid-cols-1">
            <Input type="text" placeholder="Chronicle Name" bind:value={chronicleName} />
         </div>   
    
         <div  class="grid grid-cols lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-4">
        <div class="flex gap-4 md:flex-row">
            <DatePicker
                on:change={handleStartDateChange}
                bind:selectedDateTime={startDate}
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
    <!-- <CkEditor bind:value={$formattedChronicleText}/> -->
    <CkEditor bind:editorInstance={editorInstance} bind:value={vcEditor}/>
    </div>
    </div>
    
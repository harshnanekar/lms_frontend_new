<script lang="ts">

    import { Input, DatePicker, DynamicSelect } from '$lib/components/ui';

    import { SelectDateIcon, XIcon } from '$lib/components/icons';

    import { formatDateTimeShort, formatDate } from '$lib/utils/date-formatter';

    import { tooltip } from '$lib/utils/tooltip';

    import { fly } from 'svelte/transition';

    import { Card } from '$lib/components/ui';




    import {

        getEnternalAuthors,
        getExternalAuthors,
        getInventionType,
        getSdgGoals,
        getPatentStatus

    } from '$lib/utils/select.helper';

    import { validateWithZod } from '$lib/utils/validations';

    import {

        patentDetails,

        type patentDetailsReq

    } from '$lib/schemas/modules/research/master-validations';

    import { type FileReq, fileSchema } from '$lib/schemas/modules/research/master-validations';

    import { toast } from 'svelte-sonner';

    import { fetchApi, fetchFormApi } from '$lib/utils/fetcher';

    import { PUBLIC_API_BASE_URL } from '$env/static/public';

    import type { any } from 'zod';

    import { goto } from '$app/navigation';




    export let data: any;

    // let isRequired = false;
    let isChecked: boolean = false;
	$: checkVal = isChecked;

    let title = 'Patent Submission And Grant';





    let enternalAuthors = data?.patentDataList?.internalAuthors?.message;

    let externalAuthors = data?.patentDataList?.externalAuthors?.message;

    let sdgGoals = data?.patentDataList?.sdgGoals?.message;

    let patetntStatus = data?.patentDataList?.status?.message;

    let inventionType = data?.patentDataList?.inventionType?.message;




    // let isRequired = false;

    console.log('render patentDataList', data.patentDataList.patentDataList[0]);
    let facultyDetails = data.patentDataList.patentDataList[0].faculty_details || [];
    console.log('facultyDetails ==>>>>', facultyDetails);

    


    $: patetntStatus = patetntStatus;

    $: sdgGoals = sdgGoals;

    $: inventionType = inventionType;

    $: external = externalAuthors;
	$: internal = enternalAuthors;



    console.log('data.patentDataList.iprdata[0].patent_id ==>>', data.patentDataList.patentDataList[0].patent_id)

    let obj: any = {
        patent_id: parseInt(
			data.patentDataList.patentDataList[0].patent_id
		),

    invention_type: data.patentDataList.patentDataList.length > 0 && data.patentDataList.patentDataList[0].invention_type
        ? { value: data.patentDataList.patentDataList[0].invention_id, label: data.patentDataList.patentDataList[0].invention_type }
        : null,
    sdg_goals: data.patentDataList.patentDataList.length > 0 && data.patentDataList.patentDataList[0].sdg_goals != null
        ? data.patentDataList.patentDataList[0].sdg_goals.map((dt: any) => {
            return { value: dt.id, label: dt.goals_name };
        })
        : [],
    patent_status: data.patentDataList.patentDataList.length > 0 && data.patentDataList.patentDataList[0].patent_status
        ? { value: data.patentDataList.patentDataList[0].status_id, label: data.patentDataList.patentDataList[0].patent_status }
        : null,
    title:data.patentDataList.patentDataList.length > 0 && data.patentDataList.patentDataList[0].title? data.patentDataList.patentDataList[0].title : '',
    appln_no: data.patentDataList.patentDataList.length > 0 && data.patentDataList.patentDataList[0].appln_no? data.patentDataList.patentDataList[0].appln_no : '',
    publication_date: data.patentDataList.patentDataList.length > 0 && data.patentDataList.patentDataList[0].publication_date? data.patentDataList.patentDataList[0].publication_date : '',

    internal_authors: data.patentDataList.patentDataList.length > 0 && facultyDetails.filter((author: any) => author.abbr === 'int').map((author: any) => ({ value: author.id, label: author.faculty_name })),
    external_authors: data.patentDataList.patentDataList.length > 0 && facultyDetails.filter((author: any) => author.abbr === 'ext').map((author: any) => ({ value: author.id, label: author.faculty_name }))
};

    let publicationDate: Date | null = new Date();
    publicationDate = data.patentDataList.patentDataList.length > 0 && data.patentDataList.patentDataList[0].publication_date!= null ? new Date(data.patentDataList.patentDataList[0].publication_date) : null;
    ;
    $: publicationFormattedDate = publicationDate ? formatDate(publicationDate) : '';

    function handleDateChange(e: CustomEvent<any>) {
        if (!publicationDate) return;
        publicationFormattedDate = formatDate(publicationDate);
        console.log('publication date ', publicationDate);
    }



    let files: any = [];

    let showInternal = false;
	let showExternal = false;




    //submit function for sending data 
    console.log('obj.invention_type ==>>>>', obj.invention_type)

    async function handleSubmit() {
    const patentObject : patentDetailsReq =  {
        invention_type: obj.invention_type != null ? Number(obj.invention_type.value) : 0,
        sdg_goals: obj.sdg_goals != null ? obj.sdg_goals.map((data: { value: any }) => Number(data.value)) : [],
        patent_status: obj.patent_status != null ? Number(obj.patent_status.value) : 0,
        title: obj.title,
        appln_no: Number(obj.appln_no),
        publication_date: publicationFormattedDate,
        internal_authors: obj.internal_authors != null ? obj.internal_authors.map((data: { value: any }) => Number(data.value)) : [],
        external_authors: obj.external_authors != null ? obj.external_authors.map((data: { value: any }) => Number(data.value)) : [],
    };

   


    

    if (checkVal) {
			const fileObject: FileReq = {
				documents: Array.from(files)
			};
			const fileresult = validateWithZod(fileSchema, fileObject);
			if (fileresult.errors) {
				console.log(fileresult.errors);
				const [firstPath, firstMessage] = Object.entries(fileresult.errors)[0];
				toast.error('ALERT!', {
					description: firstMessage
				});
				return;
			}
		}

    const formData = new FormData();
    formData.append('update_patent_data', JSON.stringify(patentObject));
    formData.append('patent_id', obj.patent_id);

    Array.from(files).forEach((file) => {
        formData.append('supporting_documents', file);
    });

    for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
    }

    console.log(JSON.stringify(patentObject));
    const result = validateWithZod(patentDetails, patentObject);

    if (result.errors) {
        console.log(result.errors);
        const [firstPath, firstMessage] = Object.entries(result.errors)[0];
        toast.error('ALERT!', { description: firstMessage });
        return;
    }

    console.log('validated data', JSON.stringify(result.data));

    const { error, json } = await fetchFormApi({
        url: `${PUBLIC_API_BASE_URL}/patent-submission-and-grant-update`,
        method: 'POST',
        body: formData
    });

    if (error) {
        toast.error(error.message || 'Something went wrong!', {
            description: error.errorId ? `ERROR-ID: ${error.errorId}` : ''
        });
        return;
    }

    if (json[0].upsert_patent_grant.status == 403) {
        toast.error('ALERT!', { description: json[0].upsert_patent_grant.message });
    } else {
        toast.success('Updated Successfully');
        goto('/patent-submission-and-grant');
    }
}



async function downLoadFiles() {
		fetch(`${PUBLIC_API_BASE_URL}/patent-submission-and-grant-download-files?id=${obj.patent_id }`)
			.then((response) => {
				if (response.ok) {
					return response.blob();
				}
				throw new Error('Network response was not ok.');
			})
			.then((blob) => {
				const url = window.URL.createObjectURL(blob);
				const a = document.createElement('a');
				a.style.display = 'none';
				a.href = url;
				a.download = 'patent_document.zip';
				document.body.appendChild(a);
				a.click();
				window.URL.revokeObjectURL(url);
			})
			.catch((error) => {
				toast.error(error.message || 'Something went wrong!', {
					description: error.errorId ? `ERROR-ID: ${error.errorId}` : ''
				});
			});
	}



</script>





<Card {title}>

    <div class="modal-content p-4">
        <div class="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
            <Input type="text" placeholder="Title of Invention" bind:value={obj.title} />

            <DynamicSelect
            isRequired={true}
            placeholder="Type of Invention(IPR) "
            options={getInventionType(inventionType)}
            bind:selectedOptions={obj.invention_type} isMultiSelect={false}/>
            <DynamicSelect
            isRequired={true}
            placeholder="Patent Status"
            options={getPatentStatus(patetntStatus)}
            bind:selectedOptions={obj.patent_status}
            isMultiSelect={false}/>

        </div>





        <div class="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
            <DynamicSelect
            isRequired={true}
            placeholder="Sustainable Development Goals (SDG)?"
            options={getSdgGoals(sdgGoals)}
            bind:selectedOptions={obj.sdg_goals}
            isMultiSelect={true}/>

            <Input type="number" placeholder="Patent/Invention Application Number" bind:value={obj.appln_no} />
            <div>
				<label for="supporting-documents"
					>Upload Supporting Documents <i style="color: red;">*</i><br /></label
				>
				<label>Click To Upload New File <input type="checkbox" bind:checked={isChecked} /></label>
				{#if checkVal}
					<input type="file" bind:files multiple />
				{:else}
					<button class="lms-primary-btn mt-2" on:click={downLoadFiles}
						><i class="fa-solid fa-download text-md"></i></button
					>
				{/if}
			</div>
           

        </div>

        <div class="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
            
            <div class="ml-2">
				<!-- svelte-ignore a11y-label-has-associated-control -->
				<label class="text-sm text-[#888888]"
					>Name Of Co-Authors<span class="text-danger text-sm">*</span>
				</label>
				<div class="mt-2.5 flex md:flex-row gap-[20px]">
					<div class="flex md:flex-row items-center">
						<input
							id="internal-checkbox"
							type="checkbox"
							class="lms-input-radio w-4"
                            bind:checked={showInternal}
						/>
						<label for="internal-checkbox" class="ml-2 text-sm font-medium text-gray-900"
							>Internal</label
						>
					</div>
					<div class="flex md:flex-row items-center">
						<input
							id="external-checkbox"
							type="checkbox"
							class="lms-input-radio w-4"
                            bind:checked={showExternal}
						/>
						<label for="external-checkbox" class="ml-2 text-sm font-medium text-gray-900"
							>External</label
						>
					</div>
				</div>
				<div class="grid grid-row-2 items-center mt-2 gap-4">
					{#if showInternal}
						<DynamicSelect
							isRequired={true}
							placeholder="Internal Authors"
							options={getEnternalAuthors(internal)}
							bind:selectedOptions={obj.internal_authors}
							isMultiSelect={true}
						/>
					{/if}
					{#if showExternal}
						<DynamicSelect
							isRequired={true}
							placeholder="External Authors"
							options={getExternalAuthors(external)}
							bind:selectedOptions={obj.external_authors}
							isMultiSelect={true}
						/>
					{/if}
				</div>
			</div>
            <div class="flex flex-row gap-[40px] p-4">
				<DatePicker
					on:change={handleDateChange}
					bind:selectedDateTime={publicationDate}
					disabled={(publicationDate) =>
						publicationDate.getTime() < new Date().setHours(0, 0, 0, 0)}
				>
					<div class="text-primary hover:bg-base flex items-center gap-x-3 rounded-lg px-3 py-2">
						<SelectDateIcon />
						<span class="text-body-2 font-bold">
                           Add Patent Filed Date </span>
					</div>
				</DatePicker>
				{#if publicationFormattedDate}
					{@const formattedDate = formatDateTimeShort(new Date(publicationFormattedDate))}
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
								// remove the current date
								publicationFormattedDate = '';
							}}
						>
							<XIcon />
						</button>
					</div>
				{/if}
			</div>

           

        </div>
       

    </div>

    <div class="flex flex-row gap-[20px] p-4">


        <button class="lms-btn lms-primary-btn" on:click={handleSubmit}>Update</button>

    </div>

</Card>
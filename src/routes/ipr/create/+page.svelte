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
        getPatentStatus,
        getSchool,
        getCampus,

        

    } from '$lib/utils/select.helper';

    import { validateWithZod } from '$lib/utils/validations';

    import {

        iprDetails,

        type iprDetailsReq

    } from '$lib/schemas/modules/research/master-validations';

    import { type FileReq, fileSchema } from '$lib/schemas/modules/research/master-validations';

    import { toast } from 'svelte-sonner';

    import { fetchApi, fetchFormApi } from '$lib/utils/fetcher';

    import { PUBLIC_API_BASE_URL } from '$env/static/public';

    import type { any } from 'zod';

    import { goto } from '$app/navigation';




    export let data: any;

    let isRequired = false;

    let title = 'IPR';






    let nmimsSchool = data?.iprDataList?.school?.message;

    let nmimsCampus = data?.iprDataList?.campus?.message;

    let internalAuthors = data?.iprDataList?.internalAuthors?.message;

    let externalAuthors = data?.iprDataList?.externalAuthors?.message;

    let sdgGoals = data?.iprDataList?.sdgGoals?.message;

    let patetntStatus = data?.iprDataList?.status?.message;

    let inventionType = data?.iprDataList?.inventionType?.message;




    // let isRequired = false;

    console.log('render iprDataList', data.iprDataList);

    

    $: school = nmimsSchool;

    $: campus = nmimsCampus;

    $: status = patetntStatus;

    $: sdgGoals = sdgGoals;

    $: inventionType = inventionType;

    $: internalAuthors = internalAuthors;

    $: externalAuthors = externalAuthors;








    let publicationDate: Date | null = new Date();

    publicationDate = null;

    $: publicationFormattedDate = publicationDate;

    function handleDateChange(e: CustomEvent<any>) {

        if (!publicationDate) return;

        publicationFormattedDate = publicationDate;

        console.log('publication date ', publicationDate);

    }




    let obj = {

        nmims_school: null,

        nmims_campus: null,

        invention_type : null,

        sdg_goals : null,

        patent_status: null,

        title: '',

        appln_no: '',

        filed_date:'',

        grant_date:'', 

        published_date: '',

        publication_no: '',

        granted_no: '',

        institue_affiliation: '',

        applicant_names : '',

        internal_authors: null,

        external_authors: null

    };




    let files: any = [];




    async function handleSubmit() {

        const iprObject: iprDetailsReq = {

            nmims_school:

                obj.nmims_school != null ? obj.nmims_school.map((data: { value: any }) => data.value) : [],

            nmims_campus:

                obj.nmims_campus != null ? obj.nmims_campus.map((data: { value: any }) => data.value) : [],

            invention_type: obj.invention_type != null

                    ? obj.invention_type.map((data: { value: any }) => Number(data.value))

                    : [],

            sdg_goals: obj.sdg_goals != null

                    ? obj.sdg_goals.map((data: { value: any }) => Number(data.value))

                    : [],

            patent_status:  obj.patent_status != null

                    ? obj.patent_status.map((data: { value: any }) => Number(data.value))

                    : [],

            title: obj.title,

            appln_no: Number(obj.appln_no),

            filed_date: obj.filed_date,

            grant_date: obj.grant_date,

            published_date: obj.published_date,

            publication_no: Number(obj.publication_no),

            granted_no: Number(obj.granted_no),

            institue_affiliation: obj.institue_affiliation,

            internal_authors: obj.internal_authors != null

                    ? obj.internal_authors.map((data: { value: any }) => Number(data.value))

                    : [],

            external_authors: obj.external_authors != null

                    ? obj.external_authors.map((data: { value: any }) => Number(data.value))

                    : [],

            

        };




        const fileObject: FileReq = {

            documents: Array.from(files)

        };




        console.log('files object ',files)

        const fileresult = validateWithZod(fileSchema, fileObject);

        if (fileresult.errors) {

            console.log(fileresult.errors);

            const [firstPath, firstMessage] = Object.entries(fileresult.errors)[0];

            toast.error('ALERT!', {

                description: firstMessage

            });

            return;

        }




        const formData = new FormData();




        formData.append('ipr_data', JSON.stringify(iprObject));




        // Append each file to the FormData

        Array.from(files).forEach((file) => {

            formData.append('supporting_documents', file);

        });




        for (let [key, value] of formData.entries()) {

            console.log(`${key}: ${value}`);

        }




        console.log(JSON.stringify(iprObject));

        const result = validateWithZod(iprDetails, iprObject);




        if (result.errors) {

            console.log(result.errors);

            const [firstPath, firstMessage] = Object.entries(result.errors)[0];

            toast.error('ALERT!', {

                description: firstMessage

            });

            return;

        }




        console.log('validated data', JSON.stringify(result.data));




        const { error, json } = await fetchFormApi({

            url: `${PUBLIC_API_BASE_URL}/ipr-insert`,

            method: 'POST',

            body: formData

        });




        if (error) {

            toast.error(error.message || 'Something went wrong!', {

                description: error.errorId ? `ERROR-ID: ${error.errorId}` : ''

            });

            return;

        }




        if (json[0].insert_journal_article.status == 403) {

            toast.error('ALERT!', {

                description: json[0].insert_ipr.message

            });

        } else {

            toast.success('Inserted Successfully');

            publicationFormattedDate = null;

            clearForm();

            goto('/ipr');

        }

    }




    function clearForm() {

        obj = {

            nmims_school: null,

            nmims_campus: null,

            invention_type : null,

            sdg_goals : null,

            patent_status: null,

            title: '',

            appln_no: '',

            filed_date:'',

            grant_date:'', 

            published_date: '',

            publication_no: '',

            granted_no: '',

            institue_affiliation: '',

            applicant_names : '',

            internal_authors: null,

            external_authors: null

        };




        publicationFormattedDate = null;

    }

</script>




<!-- <div class="shadow-card rounded-2xl border-[1px] border-[#E5E9F1] p-4 !pt-0 sm:p-6"> -->

<Card {title}>

    <div class="scroll small-scrollbar modal-content max-h-[70vh] min-h-[50vh] overflow-auto p-4">

        <!-- Adjust max-height as needed -->

        <div class="grid grid-cols-3 gap-[40px] p-4">

            <DynamicSelect

                isRequired={true}

                placeholder="Nmims School"

                options={getSchool(school)}

                bind:selectedOptions={obj.nmims_school}

                isMultiSelect={true}

            />

            <DynamicSelect

                isRequired={true}

                placeholder="Nmims Campus"

                options={getCampus(campus)}

                bind:selectedOptions={obj.nmims_campus}

                isMultiSelect={true}

            />




            <DynamicSelect

            isRequired={true}

            placeholder="Type of Invention(IPR) "

            options={getInventionType(inventionType)}

            bind:selectedOptions={obj.invention_type}

            isMultiSelect={true}

        />

        </div>




        <div class="grid grid-cols-3 gap-[40px] p-4">

            <DynamicSelect

                isRequired={true}

                placeholder="Sustainable Development Goals (SDG)?"

                options={getSdgGoals(sdgGoals)}

                bind:selectedOptions={obj.sdg_goals}

                isMultiSelect={true}

            />

            <DynamicSelect

                isRequired={true}

                placeholder=""

                options={getPatentStatus(status)}

                bind:selectedOptions={obj.patent_status}

                isMultiSelect={true}

            />

            <Input type="text" placeholder="Title of Patent / Invention" bind:value={obj.title} />

        </div>




        <div class="grid grid-cols-3 gap-[40px] p-4">

            <Input type="number" placeholder="Patent/Invention Application Number" bind:value={obj.appln_no} />




            <Input type="number" placeholder="Patent/Invention Publication Number" bind:value={obj.publication_no} />

            <Input type="number" placeholder="Institute Affiliation" bind:value={obj.granted_no} />

        </div>

        

        

    




        <div class="flex flex-row gap-[40px] p-4">

            <input type="file" bind:files multiple />




        </div>

    </div>

    <div class="flex flex-row gap-[20px] p-4">

        <button class="lms-btn lms-secondary-btn" on:click={clearForm}>Clear Form</button>

        <button class="lms-btn lms-primary-btn" on:click={handleSubmit}>Submit</button>

    </div>

</Card>
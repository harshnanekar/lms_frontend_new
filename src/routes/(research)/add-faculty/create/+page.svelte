<script lang="ts">
    import { InfiniteScroll } from '$lib/components/layout';
    import { toast } from 'svelte-sonner';
    import type { InfiniteFacultyView } from '$lib/types/modules/research/research-types';
    import type { InfiniteScrollResult } from '$lib/types/request.types';
    import { PUBLIC_API_BASE_URL } from '$env/static/public';
    import { validateWithZod } from '$lib/utils/validations';
	import {
		facultyObj,
		type facultyReq
	} from '$lib/schemas/modules/research/master-validations';
	import { fetchApi } from '$lib/utils/fetcher.js';
	import { goto } from '$app/navigation';

    const url: URL = new URL(`${PUBLIC_API_BASE_URL}/faculty-scroll-paginate`);
    export let data;

    let responseData: InfiniteScrollResult<InfiniteFacultyView> = {
        data: [],
        total: 0,
        nextCursor: null
    };

    console.log('responseData.data ===>>> ===>>>>>', responseData.data)
   
    let facultyData: any = [];

    $: facultyData = responseData.data.map((item) => ({
        ...item,
        changed: false
    }));

    function updateTeachingItem(id: number, field: string, value: any) {
        facultyData = facultyData.map((item: { id: number; }) =>
            item.id === id ? { ...item, [field]: value, changed: true } : item
        );
        console.log('')
    }

    
    async function handleSubmit() {
        const changedData = facultyData.filter((item: { changed: any; }) => item.changed);
        console.log('Modified faculty data:', JSON.stringify(changedData));

        let faculty : facultyReq = changedData.map((data : any) => {
            return {
                faculty_id : Number(data.id),
                first_name : data.first_name ? data.first_name : '',
                last_name : data.last_name ? data.last_name : '',
                username : data.username ? data.username : '',
                institute : data.institute ? data.institute : '',
                address : data.address ? data.address : '',
                designation : data.address ? data.designation : '',
                faculty_type : data.faculty_type ? Number(data.faculty_type) : 0
            }
        })

        const result = validateWithZod(facultyObj,faculty);
        if (result.errors) {
			console.log(result.errors);
			const [firstPath, firstMessage] = Object.entries(result.errors)[0];
			toast.error('ALERT!', {
				description: firstMessage
			});
			return;
		}
		console.log('validated data', JSON.stringify(result.data));

        const { error, json } = await fetchApi({
			url: `${PUBLIC_API_BASE_URL}/faculty-insert`,
			method: 'POST',
			body: {
               faculty_data : result.data 
            }
		});

		if (error) {
			toast.error(error.message || 'Something went wrong!', {
				description: error.errorId ? `ERROR-ID: ${error.errorId}` : ''
			});
			return;
		}
        toast.success('Inserted Successfully !');
        goto('/add-faculty');


    }
</script>

<button class="lms-btn lms-primary-btn float-right" on:click={handleSubmit}>Submit</button>

<InfiniteScroll {url} showSearch bind:data={responseData}>
    <div class="lms-table-wrapper rounded-2xl p-4">
        <table class="lms-table !border-[#e5e9f1] border">
            <thead class="!bg-[#e5e9f1]">
                <tr>
                    <th class="!text-[15px]">Sr.No</th>
                    <th class="!text-[15px]">Firstname</th>
                    <th class="!text-[15px]">Lastname</th>
                    <th class="!text-[15px]">Username</th>
                    <th class="!text-[15px]">Institute</th>
                    <th class="!text-[15px]">Address</th>
                    <th class="!text-[15px]">Designation</th>
                    <th class="!text-[15px]">Faculty Type</th>
                </tr>
            </thead>
            <tbody>
                {#if responseData.data.length > 0}
                    {#each responseData.data as faculty, index}
                        <tr class="!border-[#e5e9f1] border">
                            <td>{index + 1}</td>
                            <td>
                                <input
                                    class="lms-input"
                                    disabled={false}
                                    value={faculty.first_name}
                                    on:input={(e) => updateTeachingItem(faculty.id, 'first_name', e?.target?.value)}
                                />
                            </td>
                            <td>
                                <input
                                    class="lms-input"
                                    disabled={false}
                                    value={faculty.last_name}
                                    on:input={(e) => updateTeachingItem(faculty.id, 'last_name', e?.target?.value)}
                                />
                            </td>
                            <td>
                                <input
                                    class="lms-input"
                                    disabled={true}
                                    value={faculty.username}
                                    on:input={(e) => updateTeachingItem(faculty.id, 'username', e?.target?.value)}
                                />
                            </td>
                            <td>
                                <input
                                    class="lms-input"
                                    disabled={false}
                                    on:input={(e) => updateTeachingItem((faculty.id), 'institute', e?.target?.value)}
                                />
                            </td>
                            <td>
                                <input
                                    class="lms-input"
                                    disabled={false}
                                    on:input={(e) => updateTeachingItem(faculty.id, 'address', e?.target?.value)}
                                />
                            </td>
                            <td>
                                <input
                                    class="lms-input"
                                    disabled={false}
                                    on:input={(e) => updateTeachingItem(faculty.id, 'designation', e?.target?.value)}
                                />
                            </td>
                            <td>
                                <div class="mt-2.5 flex flex-row gap-[20px]">
                                    <div class="flex flex-row">
                                        <input
                                            type="radio"
                                            class="lms-input-radio w-4"
                                            name="{faculty.username}"
                                            on:change={() => updateTeachingItem(faculty.id, 'faculty_type', 1)}
                                            value={1}
                                        />
                                        <span class="text-sm text-[#888888]">Internal</span>
                                    </div>
                                    <div class="flex flex-row">
                                        <input
                                            type="radio"
                                            class="lms-input-radio w-4"
                                            name="{faculty.username}"
                                            on:change={() => updateTeachingItem(faculty.id, 'faculty_type', 2)}
                                            value={2}
                                        />
                                        <span class="text-sm text-[#888888]">External</span>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    {/each}
                {:else}
                    <tr><td colspan="7">No Data Found!</td></tr>  
                {/if}
            </tbody>
        </table>
    </div>
</InfiniteScroll>

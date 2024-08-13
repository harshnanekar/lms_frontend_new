<script lang="ts">
	import { error } from '@sveltejs/kit';
	import { PUBLIC_API_BASE_URL } from '$env/static/public';
	import { onMount } from 'svelte';
	import { Header, Sidebar } from '$lib/components/layout';
	import { fetchApi } from '$lib/utils/fetcher';
	import { toast } from 'svelte-sonner';
	let role : string;

	async function fetchModules(){
			const { error , json } = await fetchApi({
				url: `${PUBLIC_API_BASE_URL}/user-role`,
				method: 'GET',
			});
			if (error) {
			toast.error(error.message || 'Something went wrong!', {
				description: error.errorId ? `ERROR-ID: ${error.errorId}` : ''
			});
			return;
	    	}
			
			console.log('user role ',JSON.stringify(json))
			role = json.length > 0 ? json[0].role : '';
	}
	fetchModules();

	let profilData: any;
	onMount(async ()=>{
		const { error , json } = await fetchApi({
				url: `${PUBLIC_API_BASE_URL}/profile`,
				method: 'GET',
		});

		if(error){
			toast.error(error.message || 'Something went wrong!', {
				description: error.errorId ? `ERROR-ID: ${error.errorId}` : ''
			});
		}

		profilData = await json;
        console.log("profilData: ", profilData);
	});

</script>

<head>
	<title>Research</title>
</head>

<Sidebar {role}/>
<main class="transition-all md:ml-[62px] lg:ml-[260px]">
	<Header {profilData}/>
	<main
		id="lms-main-wrapper"
		class="small-scrollbar relative overflow-y-auto overflow-x-hidden bg-white px-[13px] py-[22px] md:rounded-tl-[20px] md:p-[30px]"
	>
		<slot />
	</main>
</main>

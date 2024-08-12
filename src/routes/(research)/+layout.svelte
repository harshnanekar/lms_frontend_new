<script lang="ts">
	import Backpack from './../../../node_modules/lucide-svelte/dist/icons/backpack.svelte';
	import { ArrowIcon } from '$lib/components/icons';
	import Button from './../../lib/components/ui/button/button.svelte';
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
			console.log("error in header data:::::", error);
			
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
	<button class="backbtn flex py-2.5 mb-3" on:click={() => window.history.back()}>
		<ArrowIcon />
		<span class="backtext ml-1.5">Back</span>
	</button>
		<slot />
	</main>
</main>

<style>
	.backtext{
		color:#7c8798;
		font-size: .875rem;
		font-weight:600;
		line-height: 1.5rem;
	}
	.backtext:hover{
		color:#0f172a;
	}

	.backbtn:hover {
		color: #0f172a; /* Change to black on hover */
	}
	
	.backbtn {
		border-radius: 50%;
        cursor: pointer;
		align-items: center;
	}

	.backbtn:hover {
		/* border: 1px solid #6d6d6d;
		background-color: #f5f5f5;
        border: 1px solid #f5f5f5; */
		/* color:#0f172a; */
	}
	.arrowIcon:hover{
		color:#0f172a;
	}
	</style>
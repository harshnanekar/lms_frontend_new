<script lang="ts">
	import { string } from 'zod';
	import CirclePlus from "lucide-svelte/icons/circle-plus";
	import Cloud from "lucide-svelte/icons/cloud";
	import CreditCard from "lucide-svelte/icons/credit-card";
	import Github from "lucide-svelte/icons/github";
	import Keyboard from "lucide-svelte/icons/keyboard";
	import LifeBuoy from "lucide-svelte/icons/life-buoy";
	import LogOut from "lucide-svelte/icons/log-out";
	import Mail from "lucide-svelte/icons/mail";
	import MessageSquare from "lucide-svelte/icons/message-square";
	import Plus from "lucide-svelte/icons/plus";
	import Settings from "lucide-svelte/icons/settings";
	import User from "lucide-svelte/icons/user";
	import UserPlus from "lucide-svelte/icons/user-plus";
	import Users from "lucide-svelte/icons/users";
	import { ProfileIcon} from "../icons";
	import { fetchApi } from '$lib/utils/fetcher';
	import { toast } from 'svelte-sonner';
	import { PUBLIC_API_BASE_URL, PUBLIC_BASE_URL } from '$env/static/public';
	import { goto } from '$app/navigation';
   
	import { Button } from "$lib/components/ui/button/index.js";
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";

	export let src:string
	export let name:string
	export let email:string
	export let username:string

	async function handleLogout() {
		const { error, json } = await fetchApi({
			url: `${PUBLIC_API_BASE_URL}/logout`,
			method: 'GET'
		});

		if (error) {
			toast.error(error.message || 'Something went wrong!', {
				description: error.errorId ? `ERROR-ID: ${error.errorId}` : ''
			});
			return;
		}
		goto(`${PUBLIC_BASE_URL}login`);
	}
  </script>
   
	<DropdownMenu.Root>
		<DropdownMenu.Trigger asChild let:builder>
		  <Button class="border-0" builders={[builder]} variant="outline">
			<ProfileIcon />
		  </Button>
		</DropdownMenu.Trigger>
		<DropdownMenu.Content class="w-56 bg-white">
			<div class="">
			<DropdownMenu.Label>{name ?? ''}</DropdownMenu.Label>
			<DropdownMenu.Label class="text-xs font-normal italic py-0 mb-1">{email ?? ''}</DropdownMenu.Label>
			<DropdownMenu.Label class="text-xs font-normal italic py-0 mb-1">{username ?? ''}</DropdownMenu.Label>
			</div>

			<DropdownMenu.Separator />
			<hr>
			  <DropdownMenu.Item>
				<User class="mr-2 h-4 w-4" />
				<a href="{PUBLIC_BASE_URL}profile" class="font-semibold"><span>Profile</span></a>
				
			  </DropdownMenu.Item>
			<DropdownMenu.Item on:click={handleLogout}>
			  <LogOut class="mr-2 h-4 w-4" />
			  <span class="font-semibold cursor-pointer">Log out</span>
			  
			</DropdownMenu.Item>
		  </DropdownMenu.Content>
	  </DropdownMenu.Root>
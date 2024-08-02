<script lang="ts">
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
    import Avatar from "$lib/components/ui/avatar.svelte";
	import { Button } from "./button";
	import { fetchApi } from "$lib/utils/fetcher";
	import { MODULE_BASE_URL } from "$lib/constants/modules.urls.constants";
	import { goto } from "$app/navigation";

    export let name: string;
    export let email: string = '';
	export let src: string = '';

    async function logout(){
        const { error, json } = await fetchApi({
                url: `${MODULE_BASE_URL.AUTH}/auth/logout`,
                method: 'POST'
        });

        goto('/login');
    } 
</script>
<DropdownMenu.Root>
	<DropdownMenu.Trigger asChild let:builder>
		<Button variant="ghost" builders={[builder]} class="relative h-8 w-8 rounded-full">
			<Avatar src={src} name={name} />
		</Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content class="w-56 z-[999999999] bg-white" align="end">
		<DropdownMenu.Label class="font-normal">
			<div class="flex flex-col space-y-1">
				<p class="text-sm font-medium leading-none">{name}</p>
				<p class="text-xs leading-none text-muted-foreground">{email}</p>
			</div>
		</DropdownMenu.Label>
		<DropdownMenu.Separator />
		<DropdownMenu.Group>
			<DropdownMenu.Item href="/profile" class="hover:bg-slate-50 cursor-pointer">
				Profile
				<DropdownMenu.Shortcut>⇧⌘P</DropdownMenu.Shortcut>
			</DropdownMenu.Item>
			<!-- <DropdownMenu.Item  class="hover:bg-slate-50 cursor-pointer">
				Settings
				<DropdownMenu.Shortcut>⌘S</DropdownMenu.Shortcut>
			</DropdownMenu.Item> -->
		</DropdownMenu.Group>
		<DropdownMenu.Separator />
		<DropdownMenu.Item class="hover:bg-slate-50 cursor-pointer" on:click={logout}>
			Log out
			<DropdownMenu.Shortcut>⇧⌘Q</DropdownMenu.Shortcut>
		</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>

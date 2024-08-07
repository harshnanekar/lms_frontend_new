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
   
	import { Button } from "$lib/components/ui/button/index.js";
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";

	export let src:string
	export let name:string
	export let email:string
	export let username:string
  </script>
   
	<DropdownMenu.Root>
		<DropdownMenu.Trigger asChild let:builder>
		  <Button builders={[builder]} variant="outline">
			<ProfileIcon />
		  </Button>
		</DropdownMenu.Trigger>
		<DropdownMenu.Content class="w-56 bg-white">
			<DropdownMenu.Label >{name}</DropdownMenu.Label>
			<DropdownMenu.Label class="text-xs font-bold">{email}</DropdownMenu.Label>
			<DropdownMenu.Label class="text-xs font-bold">{username}</DropdownMenu.Label>

			<DropdownMenu.Separator />
			<hr>
			  <DropdownMenu.Item>
				<User class="mr-2 h-4 w-4" />
				<a href="/profile"><span>Profile</span></a>
				<!-- <DropdownMenu.Shortcut>⇧⌘P</DropdownMenu.Shortcut> -->
			  </DropdownMenu.Item>
			<DropdownMenu.Item>
			  <LogOut class="mr-2 h-4 w-4" />
			  <span>Log out</span>
			  <!-- <DropdownMenu.Shortcut>⇧⌘Q</DropdownMenu.Shortcut> -->
			</DropdownMenu.Item>
		  </DropdownMenu.Content>
	  </DropdownMenu.Root>
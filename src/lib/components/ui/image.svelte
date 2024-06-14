<script lang="ts">
	import { onMount } from 'svelte';

	export let name: string;
	export let width: number = 44;
	export let round: boolean = true;
	export let src: string = '';
	export let classes: string = '';

	let avatarImage: HTMLImageElement;

	function getInitials(name: string): string {
		const nameSplit = name.toUpperCase().split(' ');
		if (nameSplit.length === 1) {
			return nameSplit[0].charAt(0);
		}
		return nameSplit[0].charAt(0) + nameSplit[1].charAt(0);
	}

	function LetterAvatar(name: string, size: number): string {
		const initials = getInitials(name);

		const canvas = document.createElement('canvas');
		canvas.width = size;
		canvas.height = size;
		const context = canvas.getContext('2d');

		if (context) {
			context.fillStyle = '#D2232A';
			context.fillRect(0, 0, size, size);
			context.font = `${Math.round(size / 2)}px Arial`;
			context.textAlign = 'center';
			context.fillStyle = '#FFF';
			context.fillText(initials, size / 2, size / 1.5);
		}

		return canvas.toDataURL();
	}

	$: avatarImage && (avatarImage.src = src ? src : LetterAvatar(name, width));
</script>

<div class="avatar-container">
	<img
		bind:this={avatarImage}
		class:round
		class={classes}
		{width}
		height={width}
		alt={name}
		on:error={() => (src = '')}
	/>
</div>

<style>
	.avatar-container {
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
		border-radius: 50%;
		overflow: hidden;
		position: relative;
	}

	img {
		object-fit: cover;
	}

	.round {
		border-radius: 50%;
	}
</style>

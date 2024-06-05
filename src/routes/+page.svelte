<script lang="ts">
	import { Input, TextArea, Text, Title, Button, Card } from 'sveltekev';
	import { superForm } from 'sveltekit-superforms';
	import type { PageData } from './$types';

	export let data: PageData;
	const { form, errors, message, enhance, delayed } = superForm(data.mapForm);
</script>

<svelte:head><title>New MarkMap</title></svelte:head>

<div class="bg-[#191919] min-h-[100vh] px-10 py-10 flex flex-col items-center gap-8">
	<Title size="lg" color="gray">Create a mind map!</Title>
	{#if $message}
		<Card color="danger" radius="lg" tailwindClass="w-[50%] p-2">
			<Text size="sm" color="white">{$message}</Text>
		</Card>
	{/if}
	<form
		action="?/create_map"
		method="POST"
		class="w-[50%] flex flex-col items-center gap-4"
		use:enhance
	>
		<div class="w-full flex flex-col gap-2">
			<Input
				placeholder="Title..."
				size="lg"
                name="title"
				tailwindClass="w-full {$errors.title ? 'border border-red-500' : ''}"
				radius="lg"
				bind:value={$form.title}
			/>
			{#if $errors.title}
				<Text color="danger" size="xs">{$errors.title}</Text>
			{/if}
		</div>
		<div class="w-full flex flex-col gap-2">
			<TextArea
				size="lg"
                name="markdown"
				radius="lg"
				placeholder="#..."
                bind:value={$form.markdown}
				tailwindClass="w-full {$errors.markdown ? 'border border-red-500' : ''}"
			/>
			{#if $errors.markdown}
				<Text color="danger" size="xs">{$errors.markdown}</Text>
			{/if}
		</div>
		<Button color="primary" type="submit" radius="lg" tailwindClass="px-8">Save</Button>
	</form>
</div>

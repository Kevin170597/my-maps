<script lang="ts">
	import { Transformer } from 'markmap-lib';
	import { Title, Text, Button } from 'sveltekev';
	import type { PageData } from './$types';
	import * as markmap from 'markmap-view';
	import { onMount } from 'svelte';

	export let data: PageData;

	onMount(() => {
		const transformer = new Transformer();
		const { root, features } = transformer.transform(data.markdown);
		const { scripts, styles } = transformer.getUsedAssets(features);
		const { Markmap, loadCSS, loadJS } = markmap;

		if (styles) loadCSS(styles);
		if (scripts) loadJS(scripts, { getMarkMap: () => markmap });

		Markmap.create('#markmap', undefined, root);
	});

	const copyLink = () => {
		const url = window.location.href;
		navigator.clipboard
			.writeText(url)
			.then(() => console.log('copied'))
			.catch((err) => console.log('Failed to copy'));
	};
</script>

<svelte:head><title>{data.title}</title></svelte:head>

<div class="bg-[#191919] min-h-[100vh]">
	<div class="flex items-center justify-between p-4">
		<div>
			<Title size="lg" color="white">{data.title}</Title>
			<Text color="gray">{data.short_id}</Text>
		</div>
		<Button radius="lg" onClick={copyLink}>Copy url</Button>
	</div>
	<svg id="markmap"></svg>
</div>

<style>
	svg {
		width: 100%;
		height: 100vh;
		color: #fff;
	}
</style>

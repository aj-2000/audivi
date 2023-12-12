<!-- src/routes/index.svelte -->
<script lang="ts">
	import { onMount } from 'svelte';

	import { createFFmpeg } from '@ffmpeg/ffmpeg';
	import type { FFmpeg } from '@ffmpeg/ffmpeg';

	import { fetchAndConvertToUint8Array, convertBufferToURL } from '$lib';
	import FileInput from '../components/FileInput.svelte';

	type Log = {
		type: string;
		message: string;
	};

	let video: string = '';
	let message = $state('Click Start to Transcode');
	let ffmpeg: FFmpeg;
	let logs: Log[] = $state([]);

	onMount(async () => {
		ffmpeg = createFFmpeg({
			log: true,
			logger: (log: Log) => {
				console.log(log);
				logs = [...logs, log];
			}
		});
	});

	async function transcode() {
		try {
			message = 'Loading ffmpeg-core.js';
			if (!ffmpeg.isLoaded()) {
				await ffmpeg.load();
			}
			const res = await fetchAndConvertToUint8Array('video.avi');

			message = 'Start transcoding';
			ffmpeg.FS('writeFile', 'test.avi', res!);
			await ffmpeg.run('-i', 'test.avi', '-c:v', 'libx264', '-c:a', 'aac', 'output.mp4');
			message = 'Complete transcoding';
			const data = ffmpeg.FS('readFile', 'output.mp4');
			video = (await convertBufferToURL(data.buffer, 'video/mp4')) as string;
		} catch (e) {
			console.error(e);
		}
	}
</script>

<main>
	<!-- <FileInput /> -->
	heelo
</main>

<style>
	/* Your styles here */
</style>

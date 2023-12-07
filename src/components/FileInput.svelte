<script lang="ts">
	import { AppState } from '$lib';
	import axios from 'axios';
	let appState = AppState.instance;

	function onFileChange(e: Event) {
		const target = e.target as HTMLInputElement;
		if (target.files) {
			if (target.files.length > 0) {
				appState.inputFile = target.files[0];
				console.log(appState.inputFile);
			}
		}
	}

	async function getTranscript(event: Event) {
		const formEl = event.target as HTMLFormElement;
		const data = new FormData(formEl);
		console.log(data);

		const res = await axios.post(formEl.action, data, {
			headers: { 'Content-Type': 'multipart/form-data' }
		});

		if (res.status === 200) {
			appState.transcript = res.data.result;
		} else {
			alert('can not get transcript');
		}
		formEl.reset();
	}
</script>

<section>
	<form
		method="post"
		on:submit|preventDefault={getTranscript}
		action="/api/transcribe"
		enctype="multipart/form-data"
	>
		<input
			onchange={onFileChange}
			type="file"
			id="inputAudioFile"
			name="inputAudioFile"
			accept="audio/mp3,audio/wav,audio/*;capture=microphone"
		/>
		<input type="submit" value="Submit" />
	</form>
</section>

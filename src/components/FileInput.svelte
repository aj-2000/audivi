<script lang="ts">
	import { AppState } from '$lib';

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
</script>

<section>
	<input
		onchange={onFileChange}
		type="file"
		id="input-file"
		name="input"
		accept="audio/mp3,audio/*;capture=microphone"
	/>
</section>

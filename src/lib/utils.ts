export async function fetchAndConvertToUint8Array(url: string) {
	try {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}
		const blob = await response.blob();
		const arrayBuffer = await blob.arrayBuffer();
		const uint8Array = new Uint8Array(arrayBuffer);
		return uint8Array;
	} catch (error) {
		console.error('Error fetching and converting video:', error);
		return null;
	}
}

export async function convertBufferToURL(buffer: ArrayBufferLike, type: string) {
	return new Promise((resolve, reject) => {
		try {
			const blob = new Blob([buffer], { type: type });
			const url = URL.createObjectURL(blob);
			resolve(url);
		} catch (error) {
			reject(error);
		}
	});
}

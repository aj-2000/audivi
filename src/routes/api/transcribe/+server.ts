// import { createClient } from '@deepgram/sdk';
// import { json } from '@sveltejs/kit';

// export async function POST({ request }) {
// 	const data = Object.fromEntries(await request.formData());
// 	const inputAudioFile = data.inputAudioFile;
// 	const DEEPGRAM_API_KEY = process.env.DEEPGRAM_API_KEY;

// 	if (!DEEPGRAM_API_KEY) {
// 		console.error('DEEPGRAM_API_KEY is required');
// 		return json(
// 			{
// 				message: ' Something went wrong!',
// 				success: false
// 			},
// 			{ status: 500 }
// 		);
// 	}

// 	if (!inputAudioFile) {
// 		return json(
// 			{
// 				message: 'You must provide a file to upload',
// 				success: false
// 			},
// 			{ status: 400 }
// 		);
// 	}
// 	try {
// 		const deepgram = createClient(DEEPGRAM_API_KEY);

// 		const response = await deepgram.listen.prerecorded.transcribeFile(
// 			//@ts-expect-error
// 			Buffer.from(await inputAudioFile.arrayBuffer()),
// 			{
// 				model: 'nova',
// 				punctuate: true,
// 				utterances: true,
// 				smart_format: true
// 			}
// 		);

// 		if (response.error) {
// 			console.error('Deepgram transcript failed: ', response.error.message);
// 			return json(
// 				{
// 					message: 'Something went wrong!',
// 					success: false
// 				},
// 				{ status: 500 }
// 			);
// 		}

// 		return json(
// 			{
// 				result: response.result.results.channels[0].alternatives[0].words,
// 				success: true
// 			},
// 			{ status: 200 }
// 		);
// 	} catch (err) {
// 		console.error('An error occurred: ', err);
// 		return json(
// 			{
// 				message: 'Something went wrong!',
// 				success: false
// 			},
// 			{ status: 500 }
// 		);
// 	}
// }

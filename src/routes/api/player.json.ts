import type { RequestHandler } from "@sveltejs/kit";

export const get: RequestHandler = async ({ url }) => {
	const query = url.searchParams;
	const videoId = query.get("videoId") || "";
	const playlistId = query.get("list") || "";
	const playerParams = query.get("playerParams") || "";
	try {
		const response = await fetch(
			"https://music.youtube.com/youtubei/v1/player?key=AIzaSyBAETezhkwP0ZWA02RsqT1zu78Fpt0bC_s",
			{
				method: "POST",
				body: JSON.stringify({
					videoId: `${videoId}`,
					context: {
						client: {
							hl: "en",
							clientName: "ANDROID",
							clientVersion: "16.20"
							// deviceModel: "iPhone14,3"
						},
						user: {
							lockedSafetyMode: false
						},
						captionParams: {}
					},
					params: playerParams ? playerParams : "",
					playlistId: `${playlistId}`
				}),
				headers: {
					"Content-Type": "application/json; charset=utf-8",
					Origin: "https://music.youtube.com"
				}
			}
		);

		if (!response.ok) {
			return { status: response.status, body: response.statusText };
		}
		const data = await response.json();
		// const {
		// 	streamingData = {},
		// 	videoDetails = {},
		// 	playabilityStatus = {}
		// } = data;
		return {
			status: 200,
			body: data
		};
	} catch (error) {
		console.error(error);
		return {
			status: 500,
			error: new Error(error.message)
		};
	}
};

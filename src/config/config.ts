export const API_URL =
	(typeof window !== "undefined" ? window.origin : (process.env.NEXT_PUBLIC_BASE_URL ?? "")) +
	"/api";

export const config = {
	API_URL: API_URL,
	MIN_PANORAMA_SIZE: 1,
	MAX_PANORAMA_SIZE: 16,
	MIN_GUI_SCALE: 1,
	MAX_GUI_SCALE: 4,
};

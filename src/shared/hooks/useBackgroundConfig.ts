/** Persistent background configuration hook used by the shared layout. */
import { config } from "@/config/config";
import { useEffect, useState } from "react";
import { getStorageItem, setStorageItem } from "../storage/utils";

/** Supported startup behaviors for panorama selection. */
export const DISPLAY_MODE = {
	RANDOM: "random",
	SELECT: "select",
};

const DEFAULT = {
	panorama: config.MAX_PANORAMA_SIZE,
	blur: 5,
	displayMode: DISPLAY_MODE.SELECT,
};

const VALUES = {
	PANORAMA: "panorama",
	DISPLAY_MODE: "displayMode",
	BLUR: "blur",
};

/**
 * Handles panorama, blur and display mode persisted configuration.
 *
 * @returns Current background settings together with their update callbacks.
 */
export function useBackgroundConfig() {
	const [panorama, setPanorama] = useState<number>(DEFAULT.panorama);
	const [displayMode, setDisplayMode] = useState<string>(DEFAULT.displayMode);
	const [blur, setBlur] = useState<number>(DEFAULT.blur);

	useEffect(() => {
		setPanorama(Number(getStorageItem(VALUES.PANORAMA, String(DEFAULT.panorama))));
		setDisplayMode(getStorageItem(VALUES.DISPLAY_MODE, DEFAULT.displayMode));
		setBlur(Number(getStorageItem(VALUES.BLUR, String(DEFAULT.blur))));
	}, []);

	/**
	 * Updates the panorama index and persists it when selector mode is active.
	 *
	 * @param panorama Panorama index between 1 and 10.
	 */
	const changePanorama = (panorama: number) => {
		setPanorama(panorama);
		if (displayMode === DISPLAY_MODE.SELECT) setStorageItem(VALUES.PANORAMA, panorama.toString());
	};
	/**
	 * Changes the panorama startup mode and restores the saved panorama when selector mode is chosen.
	 *
	 * @param newMode Requested display mode.
	 */
	const changeDisplayMode = (newMode: string) => {
		setDisplayMode(newMode);
		setStorageItem(VALUES.DISPLAY_MODE, newMode);
		if (newMode === DISPLAY_MODE.SELECT) {
			const saved = Number(getStorageItem(VALUES.PANORAMA, String(DEFAULT.panorama)));
			setPanorama(saved);
		}
	};
	/**
	 * Updates and persists the background blur intensity.
	 *
	 * @param blur Blur level between 0 and 10.
	 */
	const changeBlur = (blur: number) => {
		setBlur(blur);
		setStorageItem(VALUES.BLUR, blur.toString());
	};

	useEffect(() => {
		if (displayMode === DISPLAY_MODE.RANDOM) {
			const rng = Math.floor(Math.random() * 10) + 1;
			setPanorama(rng);
		}
	}, [displayMode]);

	return {
		panorama,
		blur,
		displayMode,
		changePanorama,
		changeBlur,
		changeDisplayMode,
	};
}

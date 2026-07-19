import { config } from "@/config/config";
import { useEffect, useState } from "react";
import { getStorageItem, setStorageItem } from "../storage/utils";
import { useBackgroundConfig } from "./useBackgroundConfig";
import { useWindowSize } from "./useWindowSize";

const GUI_SCALE_STORAGE_KEY = "gui-scale";
const DEFAULT_GUI_SCALE = config.DEFAULT_GUI_SCALE;

export function useUIConfig() {
	const { blur, displayMode, panorama, changeBlur, changeDisplayMode, changePanorama } =
		useBackgroundConfig();

	const { width } = useWindowSize();

	const [guiScale, setGuiScale] = useState<number>(DEFAULT_GUI_SCALE);
	// Depends on the window size, so we need to set it on mount
	const [maxGuiScale, setMaxGuiScale] = useState<number>(DEFAULT_GUI_SCALE);

	useEffect(() => {
		setGuiScale(Number(getStorageItem(GUI_SCALE_STORAGE_KEY, String(DEFAULT_GUI_SCALE))));
	}, []);

	useEffect(() => {
		if (width < 320) {
			setMaxGuiScale(1);
		} else if (width < 640) {
			setMaxGuiScale(2);
		} else if (width < 768) {
			setMaxGuiScale(3);
		} else {
			setMaxGuiScale(4);
		}

		if (guiScale > maxGuiScale) {
			setGuiScale(maxGuiScale);
		}
	}, [width]);

	const changeGuiScale = (newGuiScale: number) => {
		setGuiScale(newGuiScale);
		setStorageItem(GUI_SCALE_STORAGE_KEY, newGuiScale.toString());
	};

	return {
		blur,
		displayMode,
		panorama,
		changeGuiScale,
		changeBlur,
		changeDisplayMode,
		changePanorama,
		guiScale,
		maxGuiScale,
	};
}

"use client";

/** Client wrapper for the terminal route. */
import { Terminal } from "@/features/terminal/components/Terminal";
import { useLayoutConfig } from "@/shared/layout/Layout";

/**
 * Keeps the terminal route in a client boundary so it can receive mutable background callbacks.
 *
 * @returns Layout wrapper that injects background configuration callbacks into the terminal.
 */
export function TerminalPageClient() {
	const { changePanorama, changeBlur, changeDisplayMode, guiScale } = useLayoutConfig();

	const guiScaleWidthClassName = (() => {
		switch (guiScale) {
			case 1:
				return "max-w-3xl";
			case 2:
				return "max-w-4xl";
			case 3:
				return "max-w-5xl";
			default:
				return "max-w-5xl";
		}
	})();

	return (
		<div className={`w-full ${guiScaleWidthClassName}`}>
			<Terminal
				setPanorama={changePanorama}
				setBlur={changeBlur}
				setDisplayMode={changeDisplayMode}
				guiScale={guiScale}
			/>
		</div>
	);
}

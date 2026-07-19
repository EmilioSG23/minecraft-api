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
	const { changePanorama, changeBlur, changeDisplayMode } = useLayoutConfig();

	return (
		<div className="w-full max-w-6xl">
			<Terminal
				setPanorama={changePanorama}
				setBlur={changeBlur}
				setDisplayMode={changeDisplayMode}
			/>
		</div>
	);
}

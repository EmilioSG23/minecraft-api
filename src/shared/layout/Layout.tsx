"use client";

/** Shared layout that applies background configuration, header and fixed action buttons. */
import { ConfigButton } from "@/shared/components/buttons/ConfigButton";
import { GitHubButton } from "@/shared/components/buttons/GitHubButton";
import { Header } from "@/shared/components/Header";
import { createContext, useContext, useEffect } from "react";
import MinecraftPanorama from "../components/panorama/MinecraftPanorama";
import { useUIConfig } from "../hooks/useUIConfig";

/**
 * Plays the selector sound effect when the user clicks links or buttons.
 *
 * @returns Null because the component only installs a side effect.
 */
function SelectionSoundEffect() {
	useEffect(() => {
		const sound = new Audio("/gui/selection.m4a");
		sound.volume = 0.5;
		const handleClick = (event: MouseEvent) => {
			const anchor = (event.target as HTMLElement).closest("a, button");
			if (anchor) {
				sound.play();
				sound.currentTime = 0;
			}
		};
		document.addEventListener("click", handleClick);
		return () => {
			document.removeEventListener("click", handleClick);
		};
	}, []);
	return null;
}

/** Background manipulation callbacks exposed to child render props. */
export interface UIConfig {
	guiScale: number;
	changePanorama: (panorama: number) => void;
	changeBlur: (blur: number) => void;
	changeDisplayMode: (displayMode: string) => void;
	changeGuiScale: (guiScale: number) => void;
}

interface LayoutProps {
	children: React.ReactNode;
	className?: string;
	childrenWidth?: string;
}

const UIConfigContext = createContext<UIConfig | null>(null);

/**
 * Wraps route content with the common app chrome and background controls.
 *
 * @param props.children Child nodes or a render prop receiving background callbacks.
 * @param props.className Optional class names applied to the root main element.
 * @param props.childrenWidth Width class applied to the inner content wrapper.
 * @returns Shared application layout.
 */
export function Layout({ children, className = "", childrenWidth = "max-w-6xl" }: LayoutProps) {
	const {
		panorama,
		blur,
		displayMode,
		changePanorama,
		changeBlur,
		changeDisplayMode,
		guiScale,
		maxGuiScale,
		changeGuiScale,
	} = useUIConfig();

	const config: UIConfig = {
		changePanorama,
		changeBlur,
		changeDisplayMode,
		changeGuiScale,
		guiScale,
	};

	return (
		<UIConfigContext.Provider value={config}>
			<MinecraftPanorama panorama={panorama} blur={blur} />
			<SelectionSoundEffect />
			<Header guiScale={guiScale} />
			<main className={`relative isolate overflow-x-hidden font-main ${className}`.trim()}>
				<main className="relative z-10 w-full flex items-center justify-center my-4! py-4!">
					<div className={`w-full ${childrenWidth} items-center justify-center flex`}>
						{children}
					</div>
				</main>
				<ConfigButton
					panorama={panorama}
					blur={blur}
					display={displayMode}
					guiScale={guiScale}
					maxGuiScale={maxGuiScale}
					setGuiScale={changeGuiScale}
					setPanorama={changePanorama}
					setBlur={changeBlur}
					setDisplayMode={changeDisplayMode}
				/>
				<GitHubButton guiScale={guiScale} />
			</main>
		</UIConfigContext.Provider>
	);
}

/**
 * Returns the config callbacks needed by Terminal page.
 * Usage: const { ref, ...config } = useLayoutConfig();
 *
 * @returns Same configuration API exposed internally by the layout component.
 */
export function useLayoutConfig() {
	const config = useContext(UIConfigContext);

	if (!config) {
		throw new Error("useLayoutConfig must be used inside Layout");
	}

	return config;
}

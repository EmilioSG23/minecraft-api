/** Floating configuration button used to customize the background experience. */
import { config } from "@/config/config";
import { DISPLAY_MODE } from "@/shared/hooks/useConfigBackground";
import { useEffect, useState } from "react";

/**
 * Closes the configuration panel when the user clicks outside of it.
 *
 * @param event Browser click event.
 * @param setDisplayOption State setter controlling the panel visibility.
 */
const handleDisplay = (event: MouseEvent, setDisplayOption: (value: boolean) => void) => {
	const configuration = document.getElementById("configuration");
	if (configuration && !configuration.contains(event.target as Node)) {
		setDisplayOption(false);
	}
};

interface ConfigButtonProps {
	panorama: number;
	blur: number;
	display: string;
	setPanorama: (value: number) => void;
	setBlur: (value: number) => void;
	setDisplayMode: (value: string) => void;
}

/**
 * Renders the floating configuration panel for panorama mode, selected panorama and blur.
 *
 * @param props.panorama Current panorama index.
 * @param props.blur Current blur intensity.
 * @param props.display Current display mode.
 * @param props.setPanorama Callback used to update the panorama index.
 * @param props.setBlur Callback used to update the blur intensity.
 * @param props.setDisplayMode Callback used to update the display mode.
 * @returns Floating settings button and conditional configuration panel.
 */
export function ConfigButton({
	panorama,
	blur,
	display,
	setPanorama,
	setBlur,
	setDisplayMode,
}: ConfigButtonProps) {
	const [displayOption, setDisplayOption] = useState(false);

	useEffect(() => {
		let timeout: NodeJS.Timeout;
		const handleClickOutside = (event: MouseEvent) => handleDisplay(event, setDisplayOption);
		if (displayOption) {
			timeout = setTimeout(() => {
				document.addEventListener("click", handleClickOutside);
			}, 0);
		}
		return () => {
			clearTimeout(timeout);
			document.removeEventListener("click", handleClickOutside);
		};
	}, [displayOption]);

	return (
		<>
			<button
				type="button"
				className="mc-mini-selector fixed bottom-5 left-5 cursor-pointer z-50"
				onClick={() => {
					setDisplayOption(!displayOption);
				}}
			>
				<img
					src="/gui/config.png"
					className="p-2 w-[48px] h-12"
					alt="Config button for custom blur, panorama and display mode"
				/>
			</button>
			<div
				id="configuration"
				className={`${displayOption ? "fixed" : "hidden"} 
				bg-[#a0a0a0] bottom-19 left-5 p-2! text-center border-3 border-black
				z-50`}
			>
				<h1 className="font-bold">Configuration</h1>
				<section className="mb-2!">
					<h2 className="underline">Initial Display Mode</h2>
					<div className="flex justify-center w-full px-1 gap-x-1">
						<button
							type="button"
							className={`w-1/2 ${display === DISPLAY_MODE.RANDOM ? "bg-[#8f8f8f]" : "bg-[#5f5f5f]"} hover:outline-2 hover:outline-white cursor-pointer`}
							onClick={() => {
								if (display !== DISPLAY_MODE.RANDOM) setDisplayMode(DISPLAY_MODE.RANDOM);
							}}
						>
							Random
						</button>
						<button
							type="button"
							className={`w-1/2 ${display === DISPLAY_MODE.SELECT ? "bg-[#8f8f8f]" : "bg-[#5f5f5f]"} hover:outline-2 hover:outline-white cursor-pointer`}
							onClick={() => {
								if (display !== DISPLAY_MODE.SELECT) setDisplayMode(DISPLAY_MODE.SELECT);
							}}
						>
							Selector
						</button>
					</div>
				</section>
				<section
					className={`mb-2! ${display === DISPLAY_MODE.SELECT ? "opacity-100" : "opacity-50"}`}
				>
					<h2 className="underline">Select Panorama</h2>
					<div className="flex justify-center">
						<button
							type="button"
							className={`flex-1 bg-black/25 ${display === DISPLAY_MODE.SELECT ? "cursor-pointer hover:outline-2 hover:outline-white" : ""}`}
							disabled={display === DISPLAY_MODE.RANDOM}
							onClick={() => {
								if (panorama > config.MIN_PANORAMA_SIZE) {
									const result = panorama - 1;
									setPanorama(result);
								} else setPanorama(config.MAX_PANORAMA_SIZE);
							}}
						>
							{"<"}
						</button>
						<p className="text-center flex-1">{panorama}</p>
						<button
							type="button"
							className={`flex-1 bg-black/25 ${display === DISPLAY_MODE.SELECT ? "cursor-pointer hover:outline-2 hover:outline-white" : ""}`}
							disabled={display === DISPLAY_MODE.RANDOM}
							onClick={() => {
								if (panorama < config.MAX_PANORAMA_SIZE) {
									const result = panorama + 1;
									setPanorama(result);
								} else setPanorama(1);
							}}
						>
							{">"}
						</button>
					</div>
				</section>
				<section className="items-center justify-center">
					<h2 className="underline">Config Blur</h2>
					<div className="flex w-full">
						<input
							className="mx-auto w-[200%]"
							type="range"
							min="0"
							max="10"
							value={blur}
							onChange={(e) => {
								setBlur(Number(e.target.value));
							}}
						/>
						<p className="w-full text-center text-black">{blur}</p>
					</div>
					<small className="italic text-[60%] text-gray-700">(not display in Menu)</small>
				</section>
			</div>
		</>
	);
}

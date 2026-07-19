/** Interactive terminal view that executes client-side helper commands against the API. */
import { executeCommand } from "@/features/terminal/commands/command-executor";
import { TerminalOutputRenderer } from "@/features/terminal/components/TerminalOutputRenderer";
import { useTerminalSession } from "@/features/terminal/hooks/useTerminalSession";
import { useChangeSection } from "@/shared/hooks/useSection";
import { useEffect, useRef } from "react";

interface TerminalProps {
	setPanorama: (value: number) => void;
	setBlur: (value: number) => void;
	setDisplayMode: (value: string) => void;
	guiScale?: number;
}

/**
 * Renders the terminal interface and wires command execution to UI/background controls.
 *
 * @param props.setPanorama Callback that updates the selected panorama background.
 * @param props.setBlur Callback that updates blur intensity.
 * @param props.setDisplayMode Callback that changes the panorama selection mode.
 * @returns Terminal UI with history and command input.
 */
export function Terminal({ setPanorama, setBlur, setDisplayMode, guiScale = 4 }: TerminalProps) {
	const {
		inputCommand,
		setInputCommand,
		displayCommands,
		addHistoryCommand,
		addResultCommand,
		clearOutput,
		previousHistoryCommand,
		nextHistoryCommand,
	} = useTerminalSession();

	const scrollRef = useRef<HTMLDivElement>(null);
	useEffect(() => {
		if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
	}, [displayCommands]);

	/**
	 * Executes the current terminal command, stores it in history and appends the structured result.
	 *
	 * @param command Raw command text entered by the user.
	 * @returns Promise resolved once the command output has been appended.
	 */
	const executeInputCommand = async (command: string) => {
		const normalizedCommand = command.trim();
		if (!normalizedCommand) return;

		addHistoryCommand(normalizedCommand);
		const result = await executeCommand(command, {
			clearOutput,
			setBlur,
			setDisplayMode,
			setPanorama,
		});
		setInputCommand("");
		if (result) addResultCommand(result);
	};

	useChangeSection("terminal");

	const guiScaleH2TextClassName = (() => {
		switch (guiScale) {
			case 1:
				return "text-[16px]";
			case 2:
				return "text-[18px]";
			case 3:
				return "text-[20px]";
			default:
				return "text-[24px]";
		}
	})();

	const guiScaleInputTextClassName = (() => {
		switch (guiScale) {
			case 1:
				return "text-[14px]";
			case 2:
				return "text-[16px]";
			case 3:
				return "text-[18px]";
			default:
				return "text-[20px]";
		}
	})();

	const guiScaleOutputTextClassName = (() => {
		switch (guiScale) {
			case 1:
				return "text-[10px]";
			case 2:
				return "text-[12px]";
			case 3:
				return "text-[14px]";
			default:
				return "text-[16px]";
		}
	})();

	return (
		<section className="flex flex-col bg-black/75 mx-auto w-full justify-center items-center mt-10 h-[82vh] xl:h-[85vh] border-4 border-gray-400 text-white">
			<h2
				className={`flex-none text-white w-full border-b-4 border-gray-400 p-2! ${guiScaleH2TextClassName} bg-gray-700 font-bold text-center`}
			>
				Minecraft API - Terminal
			</h2>
			<div ref={scrollRef} className="flex-1 w-full p-1! overflow-y-scroll text-left">
				{displayCommands.map((display) => (
					<article className={`*:font-main! mb-1 ${guiScaleOutputTextClassName}`} key={display.id}>
						<TerminalOutputRenderer output={display.content} />
					</article>
				))}
			</div>
			<input
				className={`flex-none bg-gray-900 bottom-0 text-white w-full border-t-4 border-gray-400
					 ${guiScaleInputTextClassName} p-2! focus:outline-none`}
				type="text"
				placeholder="Write a command..."
				value={inputCommand}
				onChange={(e) => setInputCommand(e.target.value)}
				onKeyDown={(e) => {
					if (e.key === "Enter") {
						e.preventDefault();
						executeInputCommand(e.currentTarget.value);
					}
					if (e.key === "ArrowUp") {
						e.preventDefault();
						previousHistoryCommand();
						setTimeout(() => {
							const target = e.target as HTMLInputElement;
							target.setSelectionRange(target.value.length, target.value.length);
						}, 0);
					}
					if (e.key === "ArrowDown") {
						e.preventDefault();
						nextHistoryCommand();
						setTimeout(() => {
							const target = e.target as HTMLInputElement;
							target.setSelectionRange(target.value.length, target.value.length);
						}, 0);
					}
				}}
			/>
		</section>
	);
}

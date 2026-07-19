import {
	createErrorOutput,
	createTextOutput,
	validateArgs,
} from "@/features/terminal/commands/command-helpers";
import { DISPLAY_MODE } from "@/shared/hooks/useBackgroundConfig";

/**
 * Changes how the terminal background is selected and displayed.
 *
 * @param args Command arguments containing the desired display mode.
 * @param setDisplayMode Callback used to update the display mode in UI state.
 * @returns A confirmation message or an error when the mode is unsupported.
 */
export function executeDisplay(args: string[], setDisplayMode: (mode: string) => void) {
	const err = validateArgs(1, args, '/setdisplay "<random|select>"');
	if (err) return err;
	const mode = args[0].toLowerCase();
	if (mode === DISPLAY_MODE.SELECT || mode === DISPLAY_MODE.RANDOM) {
		setDisplayMode(mode);
		return createTextOutput(`The display mode has changed to ${mode} mode`);
	}
	return createErrorOutput(
		"Input Error: The input mode is not valid, choose between random or select.",
	);
}

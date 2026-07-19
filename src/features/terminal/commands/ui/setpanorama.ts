import { config } from "@/config/config";
import {
	createErrorOutput,
	createTextOutput,
	validateArgs,
} from "@/features/terminal/commands/command-helpers";

/**
 * Selects the panorama image used by the terminal background.
 *
 * @param args Command arguments containing the panorama number.
 * @param setPanorama Callback used to update the selected panorama in UI state.
 * @returns A confirmation message or an error when the panorama number is invalid.
 */
export function executePanorama(args: string[], setPanorama: (panorama: number) => void) {
	const err = validateArgs(1, args, '/setpanorama "<panorama>" (1-10)');
	if (err) return err;

	const panorama = Number(args[0]);
	if (!Number.isFinite(panorama)) {
		return createErrorOutput(
			`Input Error: The input value must be a number between ${config.MIN_PANORAMA_SIZE} and ${config.MAX_PANORAMA_SIZE}.`,
		);
	}
	if (panorama >= config.MIN_PANORAMA_SIZE && panorama <= config.MAX_PANORAMA_SIZE) {
		setPanorama(panorama);
		return createTextOutput(`The panorama has changed to a new panorama: ${panorama}`);
	}
	return createErrorOutput(
		`Input Error: The input value must be a number between ${config.MIN_PANORAMA_SIZE} and ${config.MAX_PANORAMA_SIZE}.`,
	);
}

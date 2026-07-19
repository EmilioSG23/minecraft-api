/** Floating button that links to the public GitHub repository. */
import { GitHubIcon } from "@/icons/GitHubIcon";

/**
 * Renders the fixed GitHub shortcut shown in the layout.
 *
 * @returns External repository link button.
 */
export function GitHubButton({ guiScale = 4 }: { guiScale?: number }) {
	const guiScaleClassName = (() => {
		switch (guiScale) {
			case 1:
				return "scale-70";
			case 2:
				return "scale-80";
			case 3:
				return "scale-90";
			default:
				return "scale-100";
		}
	})();

	return (
		<a
			href="https://github.com/EmilioSG23/MinecraftAPI"
			target="_blank"
			rel="noreferrer"
			type="button"
			className={`mc-mini-selector fixed bottom-5 right-5 cursor-pointer ${guiScaleClassName}`}
		>
			<GitHubIcon className="p-2 size-12" role="img" aria-label="GitHub repository" />
		</a>
	);
}

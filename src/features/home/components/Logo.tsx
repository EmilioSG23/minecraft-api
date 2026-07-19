/** Homepage logo component with a randomized Minecraft-style splash text. */
import { MENU_TEXTS } from "@/features/home/constants";
import { useEffect, useState } from "react";

/**
 * Renders the project logo and chooses a random splash message on mount.
 *
 * @returns Logo image with animated splash text.
 */
export function Logo({ guiScale }: { guiScale?: number }) {
	const [splash, setSplash] = useState<string>("");
	useEffect(() => {
		setSplash(MENU_TEXTS[Math.floor(Math.random() * MENU_TEXTS.length)]);
	}, []);

	const guiScaleLogoClassName = (() => {
		switch (guiScale) {
			case 1:
				return "max-w-lg";
			case 2:
				return "max-w-xl";
			case 3:
				return "max-w-2xl";
			default:
				return "mx-auto";
		}
	})();

	const guiScaleTextClassName = (() => {
		switch (guiScale) {
			case 1:
				return "text-[8px] xs:text-[10px] sm:text-[12px] lg:text-[14px] xl:text-[16px]";
			case 2:
				return "text-[10px] xs:text-[12px] sm:text-[16px] lg:text-[20px] xl:text-[20px]";
			case 3:
				return "text-[12px] xs:text-[14px] sm:text-[18px] lg:text-[22px] xl:text-[24px]";
			default:
				return "text-[14px] xs:text-[16px] sm:text-[20px] lg:text-[24px] xl:text-[28px]";
		}
	})();

	return (
		<div className={`relative ${guiScaleLogoClassName} mt-5 mb-10 pointer-events-none`}>
			<img src="minecraft.webp" alt="Minecraft API Logo" />
			<span
				className={`absolute -right-28 bottom-0 text-yellow-300 text-center
      ${guiScaleTextClassName}
      w-lg leading-snug whitespace-normal wrap-break-word -rotate-12
      animate-text-menu
    `}
			>
				{splash}
			</span>
		</div>
	);
}

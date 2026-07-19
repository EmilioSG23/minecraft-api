/** Main menu shown on the homepage. */
import { Logo } from "@/features/home/components/Logo";
import { useChangeSection } from "@/shared/hooks/useSection";
import { useLayoutConfig } from "@/shared/layout/Layout";
import Link from "next/link";

interface SelectorProps {
	id: string;
	name: string;
	guiScale?: number;
}

/**
 * Renders a single menu selector button.
 *
 * @param props.id Target route segment.
 * @param props.name Label shown to the user.
 * @returns Link styled as a Minecraft selector.
 */
function Selector({ id, name, guiScale }: SelectorProps) {
	const guiScaleClassName = (() => {
		switch (guiScale) {
			case 1:
				return "max-w-sm text-[15px]";
			case 2:
				return "max-w-md text-[20px]";
			case 3:
				return "max-w-lg text-[25px]";
			default:
				return "max-w-xl text-[30px]";
		}
	})();

	return (
		<>
			<Link
				href={`/${id}`}
				className={`mc-selector ${guiScaleClassName} bg-gray-300 text-center w-full p-2 text-white cursor-default`}
			>
				{name}
			</Link>
		</>
	);
}

/**
 * Renders the landing menu and marks the home section as active.
 *
 * @returns Home menu with logo and navigation shortcuts.
 */
export function Menu() {
	useChangeSection("home");
	const { guiScale } = useLayoutConfig();

	return (
		<div className="h-[80vh] w-full max-w-3xl flex flex-col items-center justify-center gap-20">
			<Logo guiScale={guiScale} />
			<div className="flex flex-col items-center justify-center w-full px-8! my-32 gap-y-5">
				<Selector id="information" name="Information" guiScale={guiScale} />
				<Selector id="terminal" name="Terminal" guiScale={guiScale} />
				<Selector id="documentation" name="Documentation" guiScale={guiScale} />
			</div>
		</div>
	);
}

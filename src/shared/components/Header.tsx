"use client";

/** Sticky top navigation shared by all non-home routes. */
import { useActiveSection } from "@/shared/hooks/useSection";
import Link from "next/link";

interface HeaderLinkProps {
	path: string;
	section: string;
	icon: string;
	text?: string;
	width?: string;
	guiScale?: number;
}

/**
 * Renders a single navigation link and highlights it when its section is active.
 *
 * @param props.path Target route path.
 * @param props.section Section identifier tracked by the header context.
 * @param props.icon Font Awesome icon class.
 * @param props.text Optional desktop label.
 * @param props.width Width classes for the link container.
 * @returns Styled navigation link.
 */
function HeaderLink({
	path,
	section,
	icon,
	text,
	width = "min-w-12 sm:min-w-32 lg:min-w-64",
	guiScale = 4,
}: HeaderLinkProps) {
	const { activeSection } = useActiveSection();
	const isActive = section === activeSection;

	const guiScaleTextClassName = (() => {
		switch (guiScale) {
			case 1:
				return "text-[12px]";
			case 2:
				return "text-[16px]";
			case 3:
				return "text-[20px]";
			default:
				return "text-[24px]";
		}
	})();

	return (
		<Link
			href={path}
			className={`group ${width} flex items-center justify-center
				text-white text-center ${guiScaleTextClassName}
				${isActive ? "border-t-2 border-x-2 border-white h-full" : "h-3/4"} outline-2 outline-gray-400/25 py-1`}
		>
			<div
				className={`mx-1 pb-1 w-full flex items-end justify-center outline-2 outline-transparent ${isActive ? "h-full" : ""}`}
			>
				<div className={`block ${text ? "sm:hidden" : ""} group-hover:outline-1 outline-white`}>
					<i className={`fa ${icon}`} aria-hidden="true" />
				</div>
				{text && (
					<p
						className={`hidden sm:flex items-center justify-center 
							${!isActive ? "group-hover:underline" : ""}
						h-full ${isActive ? "border-b-2 border-white" : ""}`}
					>
						{text}
					</p>
				)}
			</div>
		</Link>
	);
}

/**
 * Renders the application header except on the homepage.
 *
 * @returns Sticky navigation bar or null when the home section is active.
 */
export function Header({ guiScale = 4 }: { guiScale?: number }) {
	const { activeSection } = useActiveSection();

	if (activeSection === "home") return null;

	const guiScaleHeightClassName = (() => {
		switch (guiScale) {
			case 1:
				return "h-10";
			case 2:
				return "h-12";
			case 3:
				return "h-14";
			default:
				return "h-16";
		}
	})();

	const guiScaleWidthClassName = (() => {
		switch (guiScale) {
			case 1:
				return "max-w-lg";
			case 2:
				return "max-w-xl";
			case 3:
				return "max-w-2xl";
			default:
				return "max-w-3xl";
		}
	})();

	return (
		<header className={`sticky top-0 z-50 font-main`}>
			<nav className="w-full flex justify-center border-b-2 border-gray-400 bg-black/25">
				<div
					className={`w-full flex items-end
						${guiScaleWidthClassName} px-5 gap-x-4 ${guiScaleHeightClassName}`}
				>
					<HeaderLink path="/" section="home" width="max-w-8" icon="fa-home" guiScale={guiScale} />
					<HeaderLink
						path="/information"
						section="information"
						width="flex-1"
						icon="fa-list"
						text="Information"
						guiScale={guiScale}
					/>
					<HeaderLink
						path="/terminal"
						section="terminal"
						width="flex-1"
						icon="fa-terminal"
						text="Terminal"
						guiScale={guiScale}
					/>
					<HeaderLink
						path="/documentation"
						section="documentation"
						width="flex-1"
						icon="fa-book"
						text="Documentation"
						guiScale={guiScale}
					/>
				</div>
			</nav>
		</header>
	);
}

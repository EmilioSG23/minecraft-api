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
}: HeaderLinkProps) {
	const { activeSection } = useActiveSection();
	const isActive = section === activeSection;

	return (
		<Link
			href={path}
			className={`group ${width} flex items-center justify-center
				text-white text-center text-[16px] xl:text-[24px]
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
export function Header() {
	const { activeSection } = useActiveSection();

	if (activeSection === "home") return null;

	return (
		<header className="sticky top-0 z-50 font-main">
			<nav className="w-full flex items-center justify-center border-b-2 border-gray-400 bg-black/25">
				<div className="flex justify-between items-end gap-x-4 max-w-6xl px-5 mx-auto h-8 sm:h-12 md:h-16">
					<HeaderLink path="/" section="home" width="min-w-8" icon="fa-home" />
					<div className="h-full flex items-end">
						<HeaderLink
							path="/information"
							section="information"
							icon="fa-list"
							text="Information"
						/>
						<HeaderLink path="/terminal" section="terminal" icon="fa-terminal" text="Terminal" />
						<HeaderLink
							path="/documentation"
							section="documentation"
							icon="fa-book"
							text="Documentation"
						/>
					</div>
					<div className="w-8" />
				</div>
			</nav>
		</header>
	);
}

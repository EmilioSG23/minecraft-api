"use client";

/** Client wrapper used by the information index route. */
import { InformationSection } from "@/features/information/components/InformationSection";

/**
 * Renders the information hub inside the shared layout.
 *
 * @returns Information root view wrapped with layout chrome.
 */
export function InformationPageClient() {
	return (
		<div className="w-full max-w-3xl">
			<InformationSection />
		</div>
	);
}

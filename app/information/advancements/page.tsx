/** Advancements information route. */
import { AdvancementsInformationClient } from "@/features/information/entry/AdvancementsInformationClient";
import {
	createInformationMetadata,
	renderInformationRoute,
} from "@/features/information/lib/route";
import { Fallback } from "@/shared/components/Fallback";
import type { Metadata } from "next";
import { Suspense } from "react";

/** SEO metadata for the advancements page. */
export const metadata: Metadata = createInformationMetadata({
	title: "Advancements",
	description: "Browse all Minecraft advancements and API endpoints.",
	path: "/information/advancements",
	pageName: "Minecraft Advancements",
});

/**
 * Renders the advancements catalogue page.
 *
 * @returns Layout-wrapped advancements client view.
 */
export default function AdvancementsPage() {
	return renderInformationRoute(
		{
			title: "Advancements",
			description: "Browse all Minecraft advancements and API endpoints.",
			path: "/information/advancements",
			pageName: "Minecraft Advancements",
		},
		<Suspense
			fallback={
				<Fallback
					definition={{
						title: "Advancements",
						description: "Browse all Minecraft advancements and API endpoints.",
						path: "/information/advancements",
						pageName: "Minecraft Advancements",
					}}
					message="Loading page..."
				/>
			}
		>
			<AdvancementsInformationClient />
		</Suspense>,
	);
}

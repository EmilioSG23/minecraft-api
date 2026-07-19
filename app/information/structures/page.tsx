/** Structures information route. */
import { StructuresInformationClient } from "@/features/information/entry/StructuresInformationClient";
import {
	createInformationMetadata,
	renderInformationRoute,
} from "@/features/information/lib/route";
import { Fallback } from "@/shared/components/Fallback";
import type { Metadata } from "next";
import { Suspense } from "react";

/** SEO metadata for the structures page. */
export const metadata: Metadata = createInformationMetadata({
	title: "Structures",
	description: "Browse all Minecraft structures and API endpoints.",
	path: "/information/structures",
	pageName: "Minecraft Structures",
});

/**
 * Renders the structures catalogue page.
 *
 * @returns Layout-wrapped structures client view.
 */
export default function StructuresPage() {
	return renderInformationRoute(
		{
			title: "Structures",
			description: "Browse all Minecraft structures and API endpoints.",
			path: "/information/structures",
			pageName: "Minecraft Structures",
		},
		<Suspense
			fallback={
				<Fallback
					definition={{
						title: "Structures",
						description: "Browse all Minecraft structures and API endpoints.",
						path: "/information/structures",
						pageName: "Minecraft Structures",
					}}
					message="Loading page..."
				/>
			}
		>
			<StructuresInformationClient />
		</Suspense>,
	);
}

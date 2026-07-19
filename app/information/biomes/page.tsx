/** Biomes information route. */
import { BiomesInformationClient } from "@/features/information/entry/BiomesInformationClient";
import {
	createInformationMetadata,
	renderInformationRoute,
} from "@/features/information/lib/route";
import { Fallback } from "@/shared/components/Fallback";
import type { Metadata } from "next";
import { Suspense } from "react";

/** SEO metadata for the biomes page. */
export const metadata: Metadata = createInformationMetadata({
	title: "Biomes",
	description: "Browse all Minecraft biomes with weather and API endpoints.",
	path: "/information/biomes",
	pageName: "Minecraft Biomes",
});

/**
 * Renders the biomes catalogue page.
 *
 * @returns Layout-wrapped biomes client view.
 */
export default function BiomesPage() {
	return renderInformationRoute(
		{
			title: "Biomes",
			description: "Browse all Minecraft biomes with weather and API endpoints.",
			path: "/information/biomes",
			pageName: "Minecraft Biomes",
		},
		<Suspense
			fallback={
				<Fallback
					definition={{
						title: "Biomes",
						description: "Browse all Minecraft biomes with weather and API endpoints.",
						path: "/information/biomes",
						pageName: "Minecraft Biomes",
					}}
					message="Loading page..."
				/>
			}
		>
			<BiomesInformationClient />
		</Suspense>,
	);
}

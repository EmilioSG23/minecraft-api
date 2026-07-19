/** Mobs information route. */
import { MobsInformationClient } from "@/features/information/entry/MobsInformationClient";
import {
	createInformationMetadata,
	renderInformationRoute,
} from "@/features/information/lib/route";
import { Fallback } from "@/shared/components/Fallback";
import type { Metadata } from "next";
import { Suspense } from "react";

/** SEO metadata for the mobs page. */
export const metadata: Metadata = createInformationMetadata({
	title: "Mobs",
	description: "Browse all Minecraft mobs with behavior and API endpoints.",
	path: "/information/mobs",
	pageName: "Minecraft Mobs",
});

/**
 * Renders the mobs catalogue page.
 *
 * @returns Layout-wrapped mobs client view.
 */
export default function MobsPage() {
	return renderInformationRoute(
		{
			title: "Mobs",
			description: "Browse all Minecraft mobs with behavior and API endpoints.",
			path: "/information/mobs",
			pageName: "Minecraft Mobs",
		},
		<Suspense
			fallback={
				<Fallback
					definition={{
						title: "Mobs",
						description: "Browse all Minecraft mobs with behavior and API endpoints.",
						path: "/information/mobs",
						pageName: "Minecraft Mobs",
					}}
					message="Loading page..."
				/>
			}
		>
			<MobsInformationClient />
		</Suspense>,
	);
}

/** Items information route. */
import { ItemsInformationClient } from "@/features/information/entry/ItemsInformationClient";
import {
	createInformationMetadata,
	renderInformationRoute,
} from "@/features/information/lib/route";
import { Fallback } from "@/shared/components/Fallback";
import type { Metadata } from "next";
import { Suspense } from "react";

/** SEO metadata for the items page. */
export const metadata: Metadata = createInformationMetadata({
	title: "Items",
	description: "Browse all Minecraft items with properties and API endpoints.",
	path: "/information/items",
	pageName: "Minecraft Items",
});

/**
 * Renders the items catalogue page.
 *
 * @returns Layout-wrapped items client view.
 */
export default function ItemsPage() {
	return renderInformationRoute(
		{
			title: "Items",
			description: "Browse all Minecraft items with properties and API endpoints.",
			path: "/information/items",
			pageName: "Minecraft Items",
		},
		<Suspense
			fallback={
				<Fallback
					definition={{
						title: "Items",
						description: "Browse all Minecraft items with properties and API endpoints.",
						path: "/information/items",
						pageName: "Minecraft Items",
					}}
					message="Loading page..."
				/>
			}
		>
			<ItemsInformationClient />
		</Suspense>,
	);
}

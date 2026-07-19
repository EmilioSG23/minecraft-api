/**
 * Root application layout that loads global styles, metadata and the header section context.
 */
import { HeaderProvider } from "@/shared/contexts/HeaderProvider";
import { Layout } from "@/shared/layout/Layout";
import "@/styles/App.css";
import "@/styles/globals.css";
import "@/styles/index.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

/** SEO metadata shared by the entire application. */
export const metadata: Metadata = {
	title: "Minecraft API",
	description:
		"Minecraft API with information of blocks, mobs, items, structures, advancements and biomes.",
	metadataBase: new URL(siteUrl),
	icons: {
		icon: "/page.png",
	},
	openGraph: {
		title: "Minecraft API",
		description:
			"Minecraft API with information of blocks, mobs, items, structures, advancements and biomes.",
		type: "website",
		url: "/",
		images: [
			{
				url: "/page.png",
				width: 512,
				height: 512,
				alt: "Minecraft API icon",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "Minecraft API",
		description:
			"Minecraft API with information of blocks, mobs, items, structures, advancements and biomes.",
		images: ["/page.png"],
	},
};

/**
 * Wraps every route with the shared section provider required by the header/navigation system.
 *
 * @param props.children Route content rendered by the App Router.
 * @returns Root HTML structure for the application.
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body>
				<HeaderProvider>
					<Layout>{children}</Layout>
				</HeaderProvider>
			</body>
		</html>
	);
}

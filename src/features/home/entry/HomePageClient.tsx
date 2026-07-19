"use client";

/** Client wrapper used by the home route. */
import { Menu } from "@/features/home/components/Menu";

/**
 * Renders the home page inside the shared layout.
 *
 * @returns Home menu wrapped with the shared background and controls.
 */
export function HomePageClient() {
	return <Menu />;
}

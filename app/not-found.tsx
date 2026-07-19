"use client";

/** Custom 404 route rendered for unknown URLs. */
import { ErrorPage } from "@/features/not-found/ErrorPage";

/**
 * Renders the Minecraft-themed not found experience.
 *
 * @returns Error page wrapped with the shared layout.
 */
export default function NotFound() {
	return <ErrorPage />;
}

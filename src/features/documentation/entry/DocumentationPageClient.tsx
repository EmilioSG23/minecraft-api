"use client";

/** Client wrapper for the long-form documentation route. */
import { Documentation } from "@/features/documentation/components/Documentation";

/**
 * Renders the documentation overview inside the shared layout.
 *
 * @returns Documentation view wrapped with layout chrome.
 */
export function DocumentationPageClient() {
	return <Documentation />;
}

"use client";

import { ApiDocsExplorer } from "@/features/documentation/components/ApiDocsExplorer";

/**
 * Client entrypoint for the dedicated API documentation route.
 *
 * @returns Documentation page rendered inside the shared application layout.
 */
export function ApiDocsPageClient() {
	return (
		<div className="w-full max-w-6xl">
			<ApiDocsExplorer
				title="Minecraft API Docs"
				description="Reference every GET endpoint, inspect parameter templates and execute live requests without leaving the app."
			/>
		</div>
	);
}

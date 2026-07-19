"use client";

import {
	DOCUMENTED_ENTITIES,
	getApiEndpointDefinitions,
	getExamplePath,
	type ApiEndpointDefinition,
} from "@/api/openapi";
import { Container } from "@/shared/components/Container";
import { useChangeSection } from "@/shared/hooks/useSection";
import { useLayoutConfig } from "@/shared/layout/Layout";
import { ENTITY_LABELS, type EntityType } from "@/shared/minecraft/constants";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

interface ApiDocsExplorerProps {
	title?: string;
	description?: string;
	compact?: boolean;
	defaultEntity?: EntityType;
}

interface RequestState {
	status: number | null;
	body: string;
	contentType: string;
	url: string;
}

/**
 * Builds the concrete request path for the selected endpoint and user-provided path params.
 *
 * @param endpoint Selected endpoint template.
 * @param parameterValues Current parameter values from the form.
 * @returns Relative URL ready to be opened or fetched.
 */
function buildResolvedPath(
	endpoint: ApiEndpointDefinition,
	parameterValues: Record<string, string>,
): string {
	return endpoint.path.replace(/:([a-z]+)/g, (_segment, parameterName: string) => {
		return encodeURIComponent(parameterValues[parameterName] || "");
	});
}

/**
 * Renders a built-in API explorer that replaces the previous Swagger integration.
 *
 * @param props Optional layout and default selection settings.
 * @returns Interactive endpoint browser and response preview.
 */
export function ApiDocsExplorer({
	title = "Minecraft API Explorer",
	description = "Browse the API contract, inspect route patterns and execute real GET requests against the current deployment.",
	compact = false,
	defaultEntity = "blocks",
}: ApiDocsExplorerProps) {
	useChangeSection("docs");
	const { guiScale } = useLayoutConfig();

	const endpoints = useMemo(() => getApiEndpointDefinitions(), []);
	const [selectedEntity, setSelectedEntity] = useState<EntityType>(defaultEntity);
	const entityEndpoints = useMemo(
		() => endpoints.filter((endpoint) => endpoint.entity === selectedEntity),
		[endpoints, selectedEntity],
	);
	const [selectedEndpointId, setSelectedEndpointId] = useState(entityEndpoints[0]?.id || "");
	const selectedEndpoint =
		entityEndpoints.find((endpoint) => endpoint.id === selectedEndpointId) || entityEndpoints[0];
	const [parameterValues, setParameterValues] = useState<Record<string, string>>({});
	const [requestState, setRequestState] = useState<RequestState>({
		status: null,
		body: "Run a request to inspect the live response.",
		contentType: "text/plain",
		url: "",
	});

	useEffect(() => {
		if (entityEndpoints.length > 0) {
			setSelectedEndpointId(entityEndpoints[0].id);
		}
	}, [entityEndpoints]);

	useEffect(() => {
		if (!selectedEndpoint) return;

		const nextValues = (selectedEndpoint.parameters || []).reduce<Record<string, string>>(
			(accumulator, parameter) => {
				accumulator[parameter.name] = parameter.example;
				return accumulator;
			},
			{},
		);

		setParameterValues(nextValues);
		setRequestState((previous) => ({
			...previous,
			url: buildResolvedPath(selectedEndpoint, nextValues),
		}));
	}, [selectedEndpoint]);

	const resolvedPath = selectedEndpoint
		? buildResolvedPath(selectedEndpoint, parameterValues)
		: "/api";

	const runRequest = async () => {
		if (!selectedEndpoint) return;

		const response = await fetch(resolvedPath);
		const contentType = response.headers.get("content-type") || "application/octet-stream";
		let body = "";

		if (contentType.startsWith("image/")) {
			body = `Binary image response. Open ${resolvedPath} in a new tab to inspect the asset.`;
		} else {
			const payload = await response.json();
			body = JSON.stringify(payload, null, 2);
		}

		setRequestState({
			status: response.status,
			body,
			contentType,
			url: resolvedPath,
		});
	};

	const guiScaleH2TextClassName = (() => {
		switch (guiScale) {
			case 1:
				return "text-[20px]";
			case 2:
				return "text-[24px]";
			case 3:
				return "text-[28px]";
			default:
				return "text-[32px]";
		}
	})();

	const guiScaleMaxWidthClassName = (() => {
		switch (guiScale) {
			case 1:
				return "max-w-3xl";
			case 2:
				return "max-w-4xl";
			case 3:
				return "max-w-5xl";
			default:
				return "max-w-full";
		}
	})();

	const guiScaleTextClassName = (() => {
		switch (guiScale) {
			case 1:
				return "text-[12px]";
			case 2:
				return "text-[14px]";
			case 3:
				return "text-[16px]";
			default:
				return "text-[18px]";
		}
	})();

	const guiScaleSubTextClassName = (() => {
		switch (guiScale) {
			case 1:
				return "text-[10px]";
			case 2:
				return "text-[12px]";
			case 3:
				return "text-[14px]";
			default:
				return "text-[16px]";
		}
	})();

	return (
		<Container width={guiScaleMaxWidthClassName} className={`${compact ? "gap-y-4" : "gap-y-6"}`}>
			<div className="flex flex-col gap-y-2 text-center">
				<h2 className={`font-bold ${guiScaleH2TextClassName}`}>{title}</h2>
				<p className={`${guiScaleTextClassName} text-black/90`}>{description}</p>
				<p className={`${guiScaleSubTextClassName} text-black/75`}>
					Machine-readable contract available at{" "}
					<Link className="text-blue-500 hover:underline" href="/api/openapi" target="_blank">
						/api/openapi
					</Link>
					.
				</p>
			</div>

			<div className="grid gap-4 lg:grid-cols-[240px_minmax(0,1fr)] h-[65vh] min-h-0">
				<aside className="bg-black/40 border border-white/20 rounded-xl p-4! flex flex-col gap-y-3 min-h-0 h-full overflow-auto">
					<label className="flex flex-col gap-y-1">
						<span className="text-sm uppercase tracking-wide text-white/75">Entity</span>
						<select
							className={`bg-black/60 border border-white/20 rounded-md p-2! text-white/75 ${guiScaleTextClassName}`}
							value={selectedEntity}
							onChange={(event) => setSelectedEntity(event.target.value as EntityType)}
						>
							{DOCUMENTED_ENTITIES.map((entity) => (
								<option key={entity} value={entity}>
									{ENTITY_LABELS[entity]}
								</option>
							))}
						</select>
					</label>

					<div className="flex flex-col gap-y-2">
						<span className="text-sm uppercase tracking-wide text-white/75">Endpoints</span>
						{entityEndpoints.map((endpoint) => (
							<button
								key={endpoint.id}
								type="button"
								className={`text-left rounded-lg border p-3! cursor-pointer
									${selectedEndpoint?.id === endpoint.id ? "border-green-400 bg-green-500/20" : "border-white/15 bg-white/5 hover:bg-white/10"}`}
								onClick={() => setSelectedEndpointId(endpoint.id)}
							>
								<p className="text-xs text-green-300 font-semibold">{endpoint.method}</p>
								<p className="text-sm break-all">{endpoint.path}</p>
								<p className="text-xs text-white/70 mt-1">{endpoint.summary}</p>
							</button>
						))}
					</div>
				</aside>

				<section className="bg-black/40 border border-white/20 rounded-xl p-4! flex flex-col gap-y-4 min-h-0 h-full overflow-auto">
					{selectedEndpoint && (
						<>
							<header className="flex flex-col gap-y-2">
								<div className="flex flex-wrap items-center gap-2">
									<span className="bg-green-600 text-white text-xs font-bold px-2! py-1! rounded-md">
										{selectedEndpoint.method}
									</span>
									<code className="bg-black/60 border text-white border-white/15 rounded-md px-2! py-1! break-all text-xs">
										{selectedEndpoint.path}
									</code>
								</div>
								<h3 className="text-white text-[18px] sm:text-[24px] font-bold">
									{selectedEndpoint.summary}
								</h3>
								<p className="text-white/80">{selectedEndpoint.description}</p>
								<p className="text-sm text-white/60">
									Example: <span className="text-blue-300">{getExamplePath(selectedEndpoint)}</span>
								</p>
							</header>

							{selectedEndpoint.parameters && selectedEndpoint.parameters.length > 0 && (
								<div className="grid gap-3 sm:grid-cols-2">
									{selectedEndpoint.parameters.map((parameter) => (
										<label key={parameter.name} className="flex flex-col gap-y-1">
											<span className="text-sm text-white/75">
												{parameter.name}: {parameter.description}
											</span>
											<input
												className="text-white/75 bg-black/60 border border-white/20 rounded-md p-2!"
												value={parameterValues[parameter.name] || ""}
												onChange={(event) => {
													setParameterValues((previous) => ({
														...previous,
														[parameter.name]: event.target.value,
													}));
												}}
											/>
										</label>
									))}
								</div>
							)}

							<div className="flex flex-wrap gap-3">
								<button
									type="button"
									className="bg-green-600 hover:bg-green-500 rounded-md px-4! py-2! font-semibold cursor-pointer"
									onClick={runRequest}
								>
									Run GET
								</button>
								<Link
									href={resolvedPath}
									target="_blank"
									className="bg-white/10 hover:bg-white/15 rounded-md px-4! py-2! border border-white/20"
								>
									Open in new tab
								</Link>
							</div>

							<div className="bg-black/60 border border-white/15 rounded-xl p-4! flex flex-col gap-y-2 overflow-hidden">
								<div className="flex flex-wrap gap-3 text-sm text-white/70">
									<span>
										Status: {requestState.status === null ? "Not executed" : requestState.status}
									</span>
									<span>Content-Type: {requestState.contentType}</span>
								</div>
								<p className="text-xs text-white/60 break-all">
									{requestState.url || resolvedPath}
								</p>
								<pre className="font-main text-white/60 overflow-auto text-[12px] sm:text-[14px] whitespace-pre-wrap break-words">
									{requestState.body}
								</pre>
							</div>

							<div className="text-sm text-white/70">
								Expected response: {selectedEndpoint.responseDescription}
							</div>
						</>
					)}
				</section>
			</div>
		</Container>
	);
}

export default ApiDocsExplorer;

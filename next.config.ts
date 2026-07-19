/** Next.js configuration for the Minecraft API web app and API routes. */
import type { NextConfig } from "next";

/** Enables strict checks, unoptimized images and shared cache/CORS headers for API routes. */
const nextConfig: NextConfig = {
	reactStrictMode: false,
	typescript: {
		ignoreBuildErrors: false,
	},
	eslint: {
		ignoreDuringBuilds: false,
	},
	images: {
		unoptimized: true,
	},
	/**
	 * Adds cache and CORS headers to all API routes.
	 *
	 * @returns Header definitions consumed by Next.js during route generation.
	 */
	async headers() {
		return [
			{
				source: "/api/:path*",
				headers: [
					{ key: "Access-Control-Allow-Origin", value: "*" },
					{ key: "Access-Control-Allow-Methods", value: "GET, OPTIONS" },
					{ key: "Access-Control-Allow-Headers", value: "Content-Type" },
					{
						key: "Cache-Control",
						value: "public, max-age=3600, stale-while-revalidate=86400",
					},
				],
			},
		];
	},
};

export default nextConfig;

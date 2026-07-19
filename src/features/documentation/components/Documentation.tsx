import { API_URL } from "@/config/config";
import { ApiDocsExplorer } from "@/features/documentation/components/ApiDocsExplorer";
import { Container } from "@/shared/components/Container";
import { useChangeSection } from "@/shared/hooks/useSection";
import { useLayoutConfig } from "@/shared/layout/Layout";
import Link from "next/link";

interface CodeProps {
	code: string;
}

/**
 * Displays a copyable code block with quick actions for opening the URL.
 *
 * @param props.code URL or endpoint example that should be copied/opened.
 * @returns Formatted code snippet with action buttons.
 */
function Code({ code }: CodeProps) {
	const { guiScale } = useLayoutConfig() || { guiScale: 4 };

	const guiScaleTextClassName = (() => {
		switch (guiScale) {
			case 1:
				return "text-[10px]";
			case 2:
				return "text-[10px]";
			case 3:
				return "text-[12px]";
			default:
				return "text-[12px]";
		}
	})();

	return (
		<code
			className={`flex items-center justify-center p-2! text-white ${guiScaleTextClassName} bg-black border-2 border-purple-700 gap-x-2 rounded-xl`}
		>
			<p className="overflow-x-auto">{code}</p>
			<button
				type="button"
				className="flex flex-col items-center justify-center p-1! text-center border-2 border-black rounded-lg bg-white/25 hover:bg-white/50 cursor-pointer"
				onClick={() => {
					navigator.clipboard.writeText(code);
				}}
			>
				<i className="fa-regular fa-copy text-[14px] sm:text-[20px]" />
			</button>
			<a
				href={code}
				target="_blank"
				rel="noreferrer"
				className="flex flex-col items-center justify-center p-1! text-center border-2 border-black rounded-lg bg-white/25 hover:bg-white/50 cursor-pointer"
			>
				<i className="fa-regular fa-eye text-[14px] sm:text-[20px]" />
			</a>
		</code>
	);
}

/**
 * Resolves the current deployment origin so the docs can show a fully qualified base URL.
 *
 * @returns Base API endpoint rendered as an actionable code block.
 */
function ApiUrlCode() {
	return <Code code={`${API_URL}/`} />;
}

/**
 * Renders the long-form project documentation page embedded in /documentation.
 *
 * @returns Overview, route reference, community notes and an integrated API playground.
 */
export function Documentation() {
	useChangeSection("documentation");
	const { guiScale } = useLayoutConfig();

	const guiScaleH1ClassName = (() => {
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

	const guiScaleH2TextClassName = (() => {
		switch (guiScale) {
			case 1:
				return "text-[18px]";
			case 2:
				return "text-[20px]";
			case 3:
				return "text-[22px]";
			default:
				return "text-[24px]";
		}
	})();

	const guiScaleTextClassName = (() => {
		switch (guiScale) {
			case 1:
				return "text-[14px]";
			case 2:
				return "text-[16px]";
			case 3:
				return "text-[18px]";
			default:
				return "text-[20px]";
		}
	})();

	const guiScaleMaxWidthClassName = (() => {
		switch (guiScale) {
			case 1:
				return "max-w-2xl";
			case 2:
				return "max-w-3xl";
			case 3:
				return "max-w-4xl";
			default:
				return "max-w-5xl";
		}
	})();

	return (
		<Container className="max-h-[85vh]" width={guiScaleMaxWidthClassName}>
			<h1 className={`font-bold ${guiScaleH1ClassName} text-center p-2!`}>
				💎⛏️ Minecraft API - Documentation 💎⛏️
			</h1>
			<div className="overflow-x-hidden overflow-y-scroll px-2!">
				<header className="flex flex-col items-center justify-center">
					<p className={guiScaleTextClassName}>
						Welcome to the <b>Minecraft API</b> documentation. Here you will find all the
						information you need to use our API and application.This API only make GET actions
						because we only give information about Minecraft datas. You can access to the API using
						the next <b>endpoint</b>.
					</p>
					<ApiUrlCode />
				</header>
				<section className={guiScaleTextClassName}>
					<h2 className={`font-bold ${guiScaleH2TextClassName} mt-5! underline`}>⚒ Introduction</h2>
					<p>
						The Minecraft API allows you to access various data types related to the game, such as
						advancements, biomes, blocks, items, mobs, and structures. There are two components:
						This that show all information of the game where you can access to this with the
						information section or with the terminal, and the API which you can use into your
						projects. The dedicated API reference now lives in{" "}
						<Link className="text-blue-600 hover:underline" href="/docs">
							/docs
						</Link>
						, where you can inspect the available route templates and execute real requests.
					</p>
				</section>
				<section className={guiScaleTextClassName}>
					<h2 className={`font-bold ${guiScaleH2TextClassName} mt-5! underline`}>💎 API Routes</h2>
					<p>Here are the available API routes:</p>
					<ul className="">
						{["advancements", "biomes", "blocks", "items", "mobs", "structures"].map((entity) => {
							return (
								<li key={entity}>
									<a
										href={`${API_URL}/${entity}`}
										className="font-bold bg-black/15 rounded p-1! cursor-pointer"
									>
										/api/{entity}
									</a>{" "}
									Get information about {entity}
								</li>
							);
						})}
					</ul>
					<p className="mt-5">
						Also, for each API controller, you can access to the next endpoints:
					</p>
					<ul className="">
						{[
							{ endpoint: "/", description: "Access to all the information of a entity" },
							{ endpoint: "/count", description: "Give the amount of datas present in a entity" },
							{ endpoint: "/keys", description: "Obtain the keys availables of a entity" },
							{ endpoint: "/:id", description: "Get the information of a entity by Id" },
							{ endpoint: "/:id/image", description: "Get the image of a entity" },
							{ endpoint: "/all/:key", description: "Show all datas only with a key" },
							{
								endpoint: "/all/:key/:value",
								description: "Filter datas by a key and value",
							},
							{ endpoint: "/:id/:key", description: "Show the value of the key of a data" },
						].map((entity) => {
							return (
								<li key={entity.endpoint}>
									<span className="font-bold bg-black/15 rounded p-1!">{entity.endpoint}</span>{" "}
									{entity.description}
								</li>
							);
						})}
					</ul>
				</section>

				<section className={guiScaleTextClassName}>
					<h2 className={`font-bold ${guiScaleH2TextClassName} mt-5! underline`}>
						⚔️ Examples of Use
					</h2>
					<p>
						You can test the Minecraft API directly from this page or open the dedicated endpoint
						explorer in{" "}
						<Link className="text-blue-600 hover:underline" href="/docs">
							/docs
						</Link>
						. Both experiences are backed by the same live routes and the generated OpenAPI
						specification exposed in /api/openapi.
					</p>
					<div className="mt-4 hidden xs:block">
						<ApiDocsExplorer
							compact
							title="Try the API"
							description="Pick an entity, adjust the path parameters and inspect the live response body or asset route."
						/>
					</div>
				</section>

				<section className={guiScaleTextClassName}>
					<h2 className={`font-bold ${guiScaleH2TextClassName} mt-5! underline`}>⛏ Issues</h2>
					<p>
						If you found some bugs with the application and the API, you can open a Issue in the{" "}
						<a
							className="text-blue-600 hover:underline"
							href="https://github.com/EmilioSG23/MinecraftAPI/issues/new"
							target="_blank"
							rel="noreferrer"
						>
							GitHub repository
						</a>
						.
					</p>
				</section>

				<section className={guiScaleTextClassName}>
					<h2 className={`font-bold ${guiScaleH2TextClassName} mt-5! underline`}>👷 Community</h2>
					<p>
						Because the application manages <b>large amounts</b> of data and variables of the
						entities present in Minecraft, many of the data presented in the application{" "}
						<b>are not correct</b>. Therefore, I encourage them to collaborate with the correction
						of data, especially corrected data of the blocks and items, add more information to each
						entity. For example, for the blocks and items it is necessary to fill the information
						with crafts, and in other entities there are empty fields that need to be filled. Also,
						it is necessary to add the data of the new versions of Minecraft. So far there is data
						until 1.19. Preferably, the information present in{" "}
						<a
							className="text-blue-600 hover:underline"
							href="https://minecraft.wiki/"
							target="_blank"
							rel="noreferrer"
						>
							Minecraft Wiki
						</a>{" "}
						must be taken as a basis. If you want to collaborate with the development of the
						application, visit the{" "}
						<a
							className="text-blue-600 hover:underline"
							href="https://github.com/EmilioSG23/MinecraftAPI"
							target="_blank"
							rel="noreferrer"
						>
							GitHub repository
						</a>
						, you can create a new branch with git, develop your contribution and upload the PR like
						an Issue. The <b>objective</b> of this application is that it is a more accessible
						information base for the community and developers. Likewise, any code improvement
						contribution will be welcome.
					</p>
				</section>

				<section className={guiScaleTextClassName}>
					<h2 className={`font-bold ${guiScaleH2TextClassName} mt-5! underline`}>
						🏹 Special Thanks
					</h2>
					<ul className="list-disc list-inside">
						<li>
							<b>Minecraft Wiki:</b> Some of the assets provides by the API has been obtained from
							the{" "}
							<a
								className="text-blue-600 hover:underline"
								href="https://minecraft.wiki/"
								target="_blank"
								rel="noreferrer"
							>
								Minecraft Wiki
							</a>
						</li>
						<li>
							<b>anish-shanbhag:</b> Some values and assets of the datas provides by the API has
							been obtained from the Minecraft API by anish-shanbhag. You can check the link for the
							API, clicking{" "}
							<a
								href="https://anish-shanbhag.stoplight.io/docs/minecraft-api/8e768e6831f6c-the-minecraft-api"
								target="_blank"
								rel="noreferrer"
								className="text-blue-600 hover:underline"
							>
								{" "}
								here!
							</a>{" "}
							<br />
							And you can check the GitHub repository!:{" "}
							<a
								href="https://github.com/anish-shanbhag/minecraft-api"
								target="_blank"
								rel="noreferrer"
								className="text-blue-600 hover:underline"
							>
								https://github.com/anish-shanbhag/minecraft-api
							</a>
						</li>
						<li>
							<b>SkylaDev:</b> She created a concept for a Minecraft panorama on the web using
							ThreeJS, so I decided to <span className="line-through">steal</span> *ejem* borrow her
							code and adapt it into a React component. You can check her example{" "}
							<a
								href="https://panorama.skyla.moe/"
								target="_blank"
								rel="noreferrer"
								className="text-blue-600 hover:underline"
							>
								here!
							</a>
							<br />
							And the GitHub repository!:{" "}
							<a
								href="https://github.com/SkylaDev/threejs-minecraft-menu-panorama"
								target="_blank"
								rel="noreferrer"
								className="text-blue-600 hover:underline"
							>
								https://github.com/SkylaDev/threejs-minecraft-menu-panorama
							</a>
						</li>
					</ul>
				</section>
			</div>
		</Container>
	);
}

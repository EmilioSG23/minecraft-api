"use client";

/** Grid of entity shortcuts displayed on the information hub route. */
import { Container } from "@/shared/components/Container";
import { useLayoutConfig } from "@/shared/layout/Layout";
import { MINECRAFT_ENTITY_TYPES } from "@/shared/minecraft/constants";
import Image from "next/image";
import Link from "next/link";

interface InfoHomeCardProps {
	id: string;
}

/**
 * Displays a single information hub card that links to an entity section.
 *
 * @param props.id Entity identifier used for the route and preview image.
 * @returns Clickable entity shortcut card.
 */
function InfoHomeCard({ id }: InfoHomeCardProps) {
	const { guiScale } = useLayoutConfig() || { guiScale: 4 };

	const guiScaleH2TextClassName = (() => {
		switch (guiScale) {
			case 1:
				return "text-[20px]";
			case 2:
				return "text-[30px]";
			case 3:
				return "text-[35px]";
			default:
				return "text-[40px]";
		}
	})();

	const guiScaleSpanTextClassName = (() => {
		switch (guiScale) {
			case 1:
				return "text-[12px]";
			case 2:
				return "text-[14px]";
			case 3:
				return "text-[16px]";
			default:
				return "text-[20px]";
		}
	})();

	const guiScaleImageSize = (() => {
		switch (guiScale) {
			case 1:
				return "size-12";
			case 2:
				return "size-16";
			case 3:
				return "size-18";
			default:
				return "size-20";
		}
	})();

	return (
		<Link
			href={`/information/${id}`}
			className="flex items-center p-1 bg-green-500 border-green-900 rounded-lg gap-x-5 border-3 hover:bg-green-400 hover:border-green-700"
		>
			<div className="mx-2">
				<Image
					src={`/information/${id}.png`}
					className={`info-card ${guiScaleImageSize} object-contain`}
					width={80}
					height={80}
					alt={id}
					style={{ objectFit: "contain", imageRendering: "pixelated" }}
				/>
			</div>
			<div className="text-left">
				<h2 className={`uppercase text-white ${guiScaleH2TextClassName} font-bold`}>{id}</h2>
				<span className={`italic text-gray-700 ${guiScaleSpanTextClassName}`}>
					Click to see information about all the {id}
				</span>
			</div>
		</Link>
	);
}

/**
 * Renders the full set of information shortcuts for each supported entity type.
 *
 * @returns Container with all information section cards.
 */
export function InformationHome() {
	const { guiScale } = useLayoutConfig() || { guiScale: 4 };

	const guiScaleH1TextClassName = (() => {
		switch (guiScale) {
			case 1:
				return "text-[16px]";
			case 2:
				return "text-[20px]";
			case 3:
				return "text-[24px]";
			default:
				return "text-[32px]";
		}
	})();

	const guiScaleMaxWidthClassName = (() => {
		switch (guiScale) {
			case 1:
				return "max-w-lg";
			case 2:
				return "max-w-xl";
			case 3:
				return "max-w-2xl";
			default:
				return "max-w-full";
		}
	})();

	return (
		<Container width={guiScaleMaxWidthClassName}>
			<h1 className={`text-red-700 ${guiScaleH1TextClassName} font-bold text-center`}>
				Choose a section for information
			</h1>
			<article className="flex flex-col mt-2 sm:mt-5 gap-y-2">
				{Object.values(MINECRAFT_ENTITY_TYPES).map((dataType) => (
					<InfoHomeCard key={dataType} id={dataType} />
				))}
			</article>
		</Container>
	);
}

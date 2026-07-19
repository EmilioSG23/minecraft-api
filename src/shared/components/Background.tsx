/** Full-screen panoramic background used by the shared layout. */
import { useActiveSection } from "@/shared/hooks/useSection";

interface BackgroundProps {
	panorama: number;
	blur: number;
}
// marcar como deprecated

/**
 * @deprecated Renders the layered backdrop and blur overlay for the active layout.
 *
 * @param props.panorama Panorama index used to select the background image.
 * @param props.blur Blur intensity applied outside the home route.
 * @returns Fixed background layers.
 */
export function Background({ panorama, blur }: BackgroundProps) {
	const { activeSection } = useActiveSection();
	return (
		<>
			<div
				className="fixed -z-40 bg-black/25 h-full w-full top-0 left-0 pointer-events-none backdrop-blur-[0px]"
				style={{ filter: `blur(${activeSection === "home" ? 0 : blur}px)` }}
			/>
			<div
				className="background fixed -z-50 bg-black h-full w-full top-0 left-0 pointer-events-none"
				style={{
					backgroundImage: `url('/panorama/panorama_${panorama}.webp')`,
				}}
			/>
		</>
	);
}

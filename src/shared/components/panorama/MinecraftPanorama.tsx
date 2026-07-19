"use client";

import PanoramaScene from "@/shared/components/panorama/PanoramaScene";
import { useActiveSection } from "@/shared/hooks/useSection";
import { Canvas } from "@react-three/fiber";
import { memo } from "react";

export interface MinecraftPanoramaProps {
	panorama?: number;

	autoRotate?: boolean;

	rotationSpeed?: number;

	verticalAngle?: number;

	horizontalAngle?: number;

	fov?: number;

	blur?: number;

	className?: string;
}

interface PanoramaCanvasProps {
	panorama: number;

	autoRotate: boolean;

	rotationSpeed: number;

	fov: number;
}

const PanoramaCanvas = memo(function PanoramaCanvas({
	panorama,
	autoRotate,
	rotationSpeed,
	fov,
}: PanoramaCanvasProps) {
	return (
		<Canvas
			camera={{
				fov,
				near: 0.1,
				far: 1000,
			}}
		>
			<PanoramaScene panorama={panorama} autoRotate={autoRotate} rotationSpeed={rotationSpeed} />
		</Canvas>
	);
});

export default function MinecraftPanorama({
	panorama = 0,
	autoRotate = true,
	rotationSpeed = 0.05,
	fov = 85,
	blur = 0,
	className,
}: MinecraftPanoramaProps) {
	const { activeSection } = useActiveSection();

	return (
		<>
			<div
				className={`fixed inset-0 overflow-hidden z-0 ${activeSection !== "home" ? "bg-black/20 pointer-events-none" : ""}`}
			/>
			<div
				className={`fixed inset-0 overflow-hidden -z-1 bg-black pointer-events-none ${className}`}
				style={{
					filter: blur > 0 ? `blur(${activeSection === "home" ? 0 : blur}px)` : undefined,
				}}
			>
				<PanoramaCanvas
					panorama={panorama}
					autoRotate={autoRotate}
					rotationSpeed={rotationSpeed}
					fov={fov}
				/>
			</div>
		</>
	);
}

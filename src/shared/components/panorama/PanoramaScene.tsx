"use client";

import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { memo, useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

interface PanoramaProps {
	panorama: number;

	autoRotate: boolean;

	rotationSpeed: number;

	verticalAngle?: number;

	horizontalAngle?: number;

	imageExtension?: "webp" | "png";
}

function PanoramaScene({
	panorama,
	autoRotate,
	rotationSpeed,
	verticalAngle = 0.25,
	horizontalAngle = Math.PI,
	imageExtension = "png",
}: PanoramaProps) {
	const { scene, camera } = useThree();

	const pivot = useRef<THREE.Object3D>(new THREE.Object3D());

	const images = useMemo(() => {
		const base = `/panorama/${panorama}`;

		return [
			`${base}/1.${imageExtension}`,
			`${base}/3.${imageExtension}`,
			`${base}/4.${imageExtension}`,
			`${base}/5.${imageExtension}`,
			`${base}/0.${imageExtension}`,
			`${base}/2.${imageExtension}`,
		];
	}, [panorama]);

	const [cubeTexture] = useLoader(THREE.CubeTextureLoader, [images]);

	useEffect(() => {
		scene.background = cubeTexture;

		pivot.current.add(camera);

		camera.position.set(0, 0, 0.1);

		camera.rotation.x = verticalAngle;
		camera.rotation.y = horizontalAngle;

		scene.add(pivot.current);

		return () => {
			scene.background = null;

			pivot.current.remove(camera);

			scene.remove(pivot.current);
		};
	}, [scene, cubeTexture, camera, verticalAngle]);

	useFrame((_, delta) => {
		if (!autoRotate) return;

		pivot.current.rotation.y -= rotationSpeed * delta;
	});

	return null;
}

export default memo(PanoramaScene);

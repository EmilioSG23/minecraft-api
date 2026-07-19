import { useEffect, useState } from "react";

export function useWindowSize() {
	const [windowSize, setWindowSize] = useState({
		width: typeof window !== "undefined" ? window.innerWidth : 0,
		height: typeof window !== "undefined" ? window.innerHeight : 0,
	});

	useEffect(() => {
		// Función que actualiza el estado
		function handleResize() {
			setWindowSize({
				width: window.innerWidth,
				height: window.innerHeight,
			});
		}

		// Escuchar el evento de cambio de tamaño
		window.addEventListener("resize", handleResize);

		// Limpiar el evento al desmontar el componente
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return windowSize;
}

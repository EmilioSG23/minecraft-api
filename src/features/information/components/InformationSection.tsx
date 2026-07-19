/** Root information view rendered by the /information route. */
import { InformationHome } from "@/features/information/components/InformationHome";
import { useChangeSection } from "@/shared/hooks/useSection";

/**
 * Marks the information section as active and renders the entity hub.
 *
 * @returns Information home content.
 */
export function InformationSection() {
	useChangeSection("information");

	return (
		<section className="w-full flex justify-center items-center">
			<InformationHome />
		</section>
	);
}

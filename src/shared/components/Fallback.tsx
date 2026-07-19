import { renderInformationRoute } from "@/features/information/lib/route";
import { AlertMessage } from "@/shared/components/AlertMessage";

interface Definition {
	title?: string;
	description?: string;
	path?: string;
	pageName?: string;
}

interface Props {
	definition?: Definition;
	message?: string;
}

export function Fallback({ definition, message = "Loading page..." }: Props) {
	const content = <AlertMessage message={message} />;
	return definition && definition.title
		? renderInformationRoute(
				{
					title: definition.title || "",
					description: definition.description || "",
					path: definition.path || "",
					pageName: definition.pageName || definition.title || "",
				},
				content,
			)
		: content;
}

import { Container } from "@/shared/components/Container";

/** Shared alert overlays used for loading and error states. */
interface AlertMessageProps {
	message: string;
	fontSize?: string;
	textColor?: string;
	width?: string;
	actions?: React.ReactNode;
}

/**
 * Renders a centered alert box with optional actions.
 *
 * @param props.message Main message shown to the user.
 * @param props.fontSize Optional typography classes.
 * @param props.textColor Optional text color classes.
 * @param props.actions Optional action buttons rendered below the message.
 * @returns Overlay alert box.
 */
export function AlertMessage(props: AlertMessageProps) {
	const {
		message,
		fontSize = "text-[24px] sm:text-[36px]",
		textColor = "text-black",
		width = "max-w-lg",
		actions,
	} = props;

	return (
		<Container
			className={`fixed left-1/2 top-1/2 -translate-1/2
				${textColor} text-center p-10! ${fontSize} ${width}`}
		>
			{message}
			{actions && <div className="mt-4! flex justify-center">{actions}</div>}
		</Container>
	);
}

/**
 * Renders the default data loading alert.
 *
 * @returns Loading message overlay.
 */
export function AlertLoadingMessage() {
	return <AlertMessage message="Loading the information..." />;
}

/**
 * Renders the default image loading alert.
 *
 * @returns Loading message overlay for image-heavy views.
 */
export function AlertImageLoading() {
	return <AlertMessage message="Loading the images..." />;
}

interface AlertErrorMessageProps {
	onRetry?: () => void;
	message?: string;
}

/**
 * Renders an error alert with an optional retry action.
 *
 * @param props.onRetry Optional callback triggered by the retry button.
 * @param props.message Optional custom error message.
 * @returns Error message overlay.
 */
export function AlertErrorMessage({ onRetry, message }: AlertErrorMessageProps = {}) {
	return (
		<AlertMessage
			message={message || "Error with the fetching of the datas :(, go back and try again..."}
			fontSize="text-[16px] sm:text-[32px]"
			textColor="text-red-900"
			width="max-w-2xl"
			actions={
				onRetry ? (
					<button type="button" className="mc-selector text-white px-4! py-2!" onClick={onRetry}>
						Retry
					</button>
				) : null
			}
		/>
	);
}

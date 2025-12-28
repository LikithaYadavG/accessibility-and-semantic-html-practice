import { useEffect, useRef } from "react";

interface ModalProps {
	message: string;
	onClose: () => void;
}

export function Modal({ message, onClose }: ModalProps) {
	const modalRef = useRef<HTMLDivElement>(null);
	const closeButtonRef = useRef<HTMLButtonElement>(null);
	const onCloseRef = useRef(onClose);

	useEffect(() => {
		onCloseRef.current = onClose;
	}, [onClose]);

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				onCloseRef.current();
			}
		};

		document.addEventListener("keydown", handleKeyDown);
		return () => document.removeEventListener("keydown", handleKeyDown);
	}, []);

	useEffect(() => {
		closeButtonRef.current?.focus();
	}, []);

	const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
		if (event.target === event.currentTarget) {
			onClose();
		}
	};

	const handleBackdropKeyDown = (
		event: React.KeyboardEvent<HTMLDivElement>,
	) => {
		if (event.key === "Enter" || event.key === " ") {
			if (event.target === event.currentTarget) {
				onClose();
			}
		}
	};

	return (
		<div
			aria-labelledby="modal-title"
			aria-modal="true"
			className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
			onClick={handleBackdropClick}
			onKeyDown={handleBackdropKeyDown}
			role="dialog"
		>
			<div
				className="bg-white rounded-lg p-6 max-w-sm w-full mx-4"
				ref={modalRef}
				role="document"
			>
				<header>
					<h2
						className="text-lg font-semibold text-gray-800 mb-4"
						id="modal-title"
					>
						{message}
					</h2>
				</header>

				<footer className="flex justify-center">
					<button
						aria-label="Close modal"
						className="bg-blue-500 text-white px-6 py-2 rounded-md cursor-pointer hover:bg-blue-600"
						onClick={onClose}
						ref={closeButtonRef}
						type="button"
					>
						Close
					</button>
				</footer>
			</div>
		</div>
	);
}

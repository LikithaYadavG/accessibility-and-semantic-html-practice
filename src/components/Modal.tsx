import type { MouseEvent, ReactNode } from "react";
import { useEffect, useRef } from "react";

interface ModalProps {
	message: string;
	onClose: () => void;
	children?: ReactNode;
}

export function Modal({ message, onClose, children }: ModalProps) {
	const modalRef = useRef<HTMLDivElement>(null);
	const closeButtonRef = useRef<HTMLButtonElement>(null);
	const previousActiveElement = useRef<HTMLElement | null>(null);

	useEffect(() => {
		const active = document.activeElement;
		previousActiveElement.current =
			active instanceof HTMLElement ? active : null;

		closeButtonRef.current?.focus();

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				onClose();
				return;
			}

			if (event.key !== "Tab" || !modalRef.current) return;

			const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
				'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
			);

			if (focusableElements.length === 0) return;

			const firstElement = focusableElements[0];
			const lastElement = focusableElements[focusableElements.length - 1];

			if (event.shiftKey && document.activeElement === firstElement) {
				event.preventDefault();
				lastElement.focus();
			} else if (!event.shiftKey && document.activeElement === lastElement) {
				event.preventDefault();
				firstElement.focus();
			}
		};

		document.addEventListener("keydown", handleKeyDown);

		return () => {
			document.removeEventListener("keydown", handleKeyDown);
			previousActiveElement.current?.focus();
		};
	}, [onClose]);

	const handleBackdropClick = (event: MouseEvent<HTMLDivElement>): void => {
		if (event.target === event.currentTarget) {
			onClose();
		}
	};

	return (
		<div
			aria-labelledby="modal-title"
			aria-modal="true"
			className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
			onMouseDown={handleBackdropClick}
			role="dialog"
		>
			<div
				className="bg-white rounded-lg p-6 max-w-sm w-full mx-4"
				ref={modalRef}
			>
				<header>
					<h2
						className="text-lg font-semibold text-gray-800 mb-4"
						id="modal-title"
					>
						{message}
					</h2>
				</header>

				{children}

				<footer className="flex justify-center">
					<button
						aria-label="Close modal"
						className="bg-blue-500 text-white px-6 py-2 rounded-md cursor-pointer hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
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

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Modal } from "./Modal";

interface ModalProps {
	message: string;
	onClose: () => void;
	children?: React.ReactNode;
}

function createProps(overrides?: Partial<ModalProps>): ModalProps {
	return {
		message: "Test Modal Message",
		onClose: vi.fn(),
		...overrides,
	};
}

function renderModal(props?: Partial<ModalProps>) {
	const finalProps = createProps(props);
	return {
		...render(<Modal {...finalProps} />),
		props: finalProps,
	};
}

describe("Modal", () => {
	const user = userEvent.setup();

	it("should render the modal message", () => {
		renderModal();

		expect(screen.getByText(/test modal message/i)).toBeInTheDocument();
	});

	it("should focus the close button on mount", () => {
		renderModal();

		const closeButton = screen.getByRole("button", { name: /close modal/i });
		expect(document.activeElement).toBe(closeButton);
	});

	it("should call onClose when the close button is clicked", async () => {
		const { props } = renderModal();

		const closeButton = screen.getByRole("button", { name: /close modal/i });
		await user.click(closeButton);

		expect(props.onClose).toHaveBeenCalledTimes(1);
	});

	it("should call onClose when Escape key is pressed", async () => {
		const { props } = renderModal();

		await user.keyboard("{Escape}");

		expect(props.onClose).toHaveBeenCalledTimes(1);
	});

	it("should call onClose when clicking the backdrop", async () => {
		const { props } = renderModal();

		const backdrop = screen.getByRole("dialog");
		await user.click(backdrop);

		expect(props.onClose).toHaveBeenCalledTimes(1);
	});

	it("should NOT call onClose when clicking inside the modal content", async () => {
		const { props } = renderModal();

		const heading = screen.getByText(/test modal message/i);
		await user.click(heading);

		expect(props.onClose).not.toHaveBeenCalled();
	});

	it("should trap focus inside the modal when tabbing forward", async () => {
		renderModal();

		const closeButton = screen.getByRole("button", { name: /close modal/i });
		closeButton.focus();

		await user.keyboard("{Tab}");
		expect(document.activeElement).toBe(closeButton);
	});

	it("should trap focus inside the modal when tabbing backward (Shift+Tab)", async () => {
		renderModal();

		const closeButton = screen.getByRole("button", { name: /close modal/i });
		closeButton.focus();

		await user.keyboard("{Shift>}{Tab}{/Shift}");
		expect(document.activeElement).toBe(closeButton);
	});

	it("should cycle focus from last to first element when tabbing forward", async () => {
		const onClose = vi.fn();
		render(
			<Modal message="Test" onClose={onClose}>
				<input data-testid="input-1" type="text" />
				<button data-testid="button-1" type="button">
					Extra Button
				</button>
			</Modal>,
		);

		const closeButton = screen.getByRole("button", { name: /close modal/i });
		const inputElement = screen.getByTestId("input-1");

		closeButton.focus();
		expect(document.activeElement).toBe(closeButton);

		await user.keyboard("{Tab}");
		expect(document.activeElement).toBe(inputElement);
	});

	it("should cycle focus from first to last element when tabbing backward", async () => {
		const onClose = vi.fn();
		render(
			<Modal message="Test" onClose={onClose}>
				<input data-testid="input-1" type="text" />
				<button data-testid="button-1" type="button">
					Extra Button
				</button>
			</Modal>,
		);

		const closeButton = screen.getByRole("button", { name: /close modal/i });
		const inputElement = screen.getByTestId("input-1");

		inputElement.focus();
		expect(document.activeElement).toBe(inputElement);

		await user.keyboard("{Shift>}{Tab}{/Shift}");
		expect(document.activeElement).toBe(closeButton);
	});
});

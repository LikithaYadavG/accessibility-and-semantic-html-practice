import { describe, it, beforeEach, expect } from "vitest";
import { useModalStore } from "./useModalStore";

describe("useModalStore", () => {
	beforeEach(() => {
		useModalStore.setState({
			isOpen: false,
			message: "",
		});
	});

	describe("Modal state", () => {
		it("should initialize with modal closed", () => {
			const state = useModalStore.getState();
			expect(state.isOpen).toBe(false);
			expect(state.message).toBe("");
		});

		it("should open modal with provided message", () => {
			useModalStore.getState().openModal("Test message");

			const state = useModalStore.getState();
			expect(state.isOpen).toBe(true);
			expect(state.message).toBe("Test message");
		});

		it("should open modal with any message content", () => {
			useModalStore.getState().openModal("Any message");

			const state = useModalStore.getState();
			expect(state.isOpen).toBe(true);
			expect(state.message).toBeTruthy();
		});

		it("should close modal and clear message", () => {
			useModalStore.getState().openModal("Test message");
			expect(useModalStore.getState().isOpen).toBe(true);

			useModalStore.getState().closeModal();

			const state = useModalStore.getState();
			expect(state.isOpen).toBe(false);
			expect(state.message).toBe("");
		});

		it("should reset state completely when closing", () => {
			useModalStore.getState().openModal("Important message");
			useModalStore.getState().closeModal();

			const state = useModalStore.getState();
			expect(state).toEqual({
				isOpen: false,
				message: "",
				openModal: expect.any(Function),
				closeModal: expect.any(Function),
			});
		});

		it("should be safe to call closeModal when already closed", () => {
			useModalStore.getState().closeModal();

			const state = useModalStore.getState();
			expect(state.isOpen).toBe(false);
			expect(state.message).toBe("");
		});
	});
});

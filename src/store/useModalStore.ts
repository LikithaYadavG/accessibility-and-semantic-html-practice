import { create } from "zustand";

interface ModalStore {
	isOpen: boolean;
	message: string;
	openModal: (message: string) => void;
	closeModal: () => void;
}

export const useModalStore = create<ModalStore>((set) => ({
	isOpen: false,
	message: "",

	openModal: (message: string): void =>
		set({
			isOpen: true,
			message,
		}),

	closeModal: (): void =>
		set({
			isOpen: false,
			message: "",
		}),
}));

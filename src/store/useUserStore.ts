import { create } from "zustand";
import type { User } from "../types/user";
import { generateId } from "../utils/uuid";
import { validateUserInput } from "../utils/validation";
import { useModalStore } from "./useModalStore";

interface UserStore {
	users: User[];
	addUser: (name: string, email: string) => void;
	deleteUser: (id: string) => void;
}

export const useUserStore = create<UserStore>((set) => ({
	users: [],

	addUser: (name: string, email: string): void => {
		const { openModal } = useModalStore.getState();

		try {
			const validated = validateUserInput(name, email);

			const newUser: User = {
				id: generateId(),
				name: validated.name,
				email: validated.email,
			};

			set((state) => ({
				users: [...state.users, newUser],
			}));

			openModal("User added successfully!");
		} catch (error) {
			openModal(error instanceof Error ? error.message : "Failed to add user");
		}
	},

	deleteUser: (id: string): void => {
		const { openModal } = useModalStore.getState();

		const currentUsers = useUserStore.getState().users;
		const userExists = currentUsers.some((user) => user.id === id);

		if (!userExists) {
			openModal("User not found");
			return;
		}

		set((state) => ({
			users: state.users.filter((user) => user.id !== id),
		}));

		openModal("User deleted successfully!");
	},
}));

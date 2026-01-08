import { create } from "zustand";
import type { User } from "../types/user";
import { generateId } from "../utils/uuid";
import { validateUserInput } from "../utils/validation";

interface UserStore {
	users: User[];
	modalOpen: boolean;
	modalMessage: string;
	addUser: (name: string, email: string) => void;
	deleteUser: (id: string) => void;
	setModalOpen: (open: boolean) => void;
}

export const useUserStore = create<UserStore>((set) => ({
	users: [],
	modalOpen: false,
	modalMessage: "",

	addUser: (name, email) => {
		try {
			const validated = validateUserInput(name, email);

			const newUser: User = {
				id: generateId(),
				name: validated.name,
				email: validated.email,
			};

			set((state) => ({
				users: [...state.users, newUser],
				modalMessage: "User added successfully!",
				modalOpen: true,
			}));
		} catch (error) {
			set({
				modalMessage:
					error instanceof Error ? error.message : "Failed to add user",
				modalOpen: true,
			});
		}
	},

	deleteUser: (id) => {
		set((state) => ({
			users: state.users.filter((user) => user.id !== id),
			modalMessage: "User deleted successfully!",
			modalOpen: true,
		}));
	},

	setModalOpen: (open) =>
		set((state) => ({
			modalOpen: open,
			modalMessage: open ? state.modalMessage : "",
		})),
}));

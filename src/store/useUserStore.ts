import { create } from "zustand";
import type { User } from "../types/user";

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
		const newUser: User = {
			id: crypto.randomUUID(),
			name,
			email,
		};

		set((state) => ({
			users: [...state.users, newUser],
			modalMessage: "User added successfully!",
			modalOpen: true,
		}));
	},

	deleteUser: (id) => {
		set((state) => ({
			users: state.users.filter((user) => user.id !== id),
			modalMessage: "User deleted successfully!",
			modalOpen: true,
		}));
	},

	setModalOpen: (open) => {
		set({ modalOpen: open });
	},
}));

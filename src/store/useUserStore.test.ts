import { describe, it, beforeEach, expect } from "vitest";
import { useUserStore } from "./useUserStore";

describe("useUserStore", () => {
	beforeEach(() => {
		useUserStore.setState({
			users: [],
			modalOpen: false,
			modalMessage: "",
		});
	});

	it("should initialize with empty state", () => {
		expect(useUserStore.getState().users.length).toBe(0);
	});

	it("should add a user to the store", () => {
		useUserStore.getState().addUser("Alice", "alice@example.com");
		expect(useUserStore.getState().users.length).toBe(1);
	});

	it("should open modal after adding a user", () => {
		useUserStore.getState().addUser("Alice", "alice@example.com");
		expect(useUserStore.getState().modalOpen).toBe(true);
	});

	it("should remove a user by id", () => {
		useUserStore.getState().addUser("Bob", "bob@example.com");
		const id = useUserStore.getState().users[0].id;

		useUserStore.getState().deleteUser(id);
		expect(useUserStore.getState().users.length).toBe(0);
	});
});

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

	it("should open modal after removing a user", () => {
		useUserStore.getState().addUser("Bob", "bob@example.com");
		const id = useUserStore.getState().users[0].id;

		useUserStore.getState().deleteUser(id);
		expect(useUserStore.getState().modalOpen).toBe(true);
	});

	it("should set an error when name is empty", () => {
		useUserStore.getState().addUser("", "valid@example.com");

		const state = useUserStore.getState();
		expect(state.users.length).toBe(0);
		expect(state.modalOpen).toBe(true);
		expect(state.modalMessage.length).toBeGreaterThan(0);
	});

	it("should set an error when name is whitespace-only", () => {
		useUserStore.getState().addUser("   ", "valid@example.com");

		const state = useUserStore.getState();
		expect(state.users.length).toBe(0);
		expect(state.modalOpen).toBe(true);
		expect(state.modalMessage.length).toBeGreaterThan(0);
	});

	it("should set an error when email is invalid", () => {
		useUserStore.getState().addUser("John Doe", "invalid-email");

		const state = useUserStore.getState();
		expect(state.users.length).toBe(0);
		expect(state.modalOpen).toBe(true);
		expect(state.modalMessage.length).toBeGreaterThan(0);
	});

	it("should set an error when email is empty", () => {
		useUserStore.getState().addUser("John Doe", "");

		const state = useUserStore.getState();
		expect(state.users.length).toBe(0);
		expect(state.modalOpen).toBe(true);
		expect(state.modalMessage.length).toBeGreaterThan(0);
	});

	it("should trim whitespace from valid inputs", () => {
		useUserStore.getState().addUser("  Alice  ", "  alice@example.com  ");

		const state = useUserStore.getState();
		expect(state.users.length).toBe(1);
		expect(state.users[0].name).toBe("Alice");
		expect(state.users[0].email).toBe("alice@example.com");
	});

	it("should generate unique IDs for different users", () => {
		useUserStore.getState().addUser("Alice", "alice@example.com");
		useUserStore.getState().addUser("Bob", "bob@example.com");

		const state = useUserStore.getState();
		expect(state.users[0].id).not.toBe(state.users[1].id);
	});
});

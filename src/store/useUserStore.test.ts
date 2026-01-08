import { describe, it, beforeEach, expect, vi } from "vitest";
import { useUserStore } from "./useUserStore";
import { useModalStore } from "./useModalStore";

describe("useUserStore", () => {
	beforeEach(() => {
		useUserStore.setState({
			users: [],
		});
		useModalStore.setState({
			isOpen: false,
			message: "",
		});
		vi.clearAllMocks();
	});

	it("should initialize with empty state", () => {
		expect(useUserStore.getState().users.length).toBe(0);
	});

	it("should add a user to the store", () => {
		useUserStore.getState().addUser("Alice", "alice@example.com");
		expect(useUserStore.getState().users.length).toBe(1);
		expect(useUserStore.getState().users[0].name).toBe("Alice");
		expect(useUserStore.getState().users[0].email).toBe("alice@example.com");
	});

	it("should remove a user by id", () => {
		useUserStore.getState().addUser("Bob", "bob@example.com");
		const id = useUserStore.getState().users[0].id;

		useUserStore.getState().deleteUser(id);
		expect(useUserStore.getState().users.length).toBe(0);
	});

	it("should not remove any user when id does not exist", () => {
		useUserStore.getState().addUser("Bob", "bob@example.com");
		useUserStore.getState().addUser("Alice", "alice@example.com");

		const nonExistentId = "non-existent-id-12345";
		useUserStore.getState().deleteUser(nonExistentId);

		expect(useUserStore.getState().users.length).toBe(2);
	});

	it("should show error message when deleting non-existent user", () => {
		useUserStore.getState().addUser("Bob", "bob@example.com");

		const nonExistentId = "non-existent-id-12345";
		useUserStore.getState().deleteUser(nonExistentId);

		expect(useModalStore.getState().isOpen).toBe(true);
		expect(useModalStore.getState().message.length).toBeGreaterThan(0);
	});

	it("should not add user when name is empty", () => {
		useUserStore.getState().addUser("", "valid@example.com");

		expect(useUserStore.getState().users.length).toBe(0);
		expect(useModalStore.getState().isOpen).toBe(true);
		expect(useModalStore.getState().message.length).toBeGreaterThan(0);
	});

	it("should not add user when name is whitespace-only", () => {
		useUserStore.getState().addUser("   ", "valid@example.com");

		expect(useUserStore.getState().users.length).toBe(0);
		expect(useModalStore.getState().isOpen).toBe(true);
		expect(useModalStore.getState().message.length).toBeGreaterThan(0);
	});

	it("should not add user when email is invalid", () => {
		useUserStore.getState().addUser("John Doe", "invalid-email");

		expect(useUserStore.getState().users.length).toBe(0);
		expect(useModalStore.getState().isOpen).toBe(true);
		expect(useModalStore.getState().message.length).toBeGreaterThan(0);
	});

	it("should not add user when email is empty", () => {
		useUserStore.getState().addUser("John Doe", "");

		expect(useUserStore.getState().users.length).toBe(0);
		expect(useModalStore.getState().isOpen).toBe(true);
		expect(useModalStore.getState().message.length).toBeGreaterThan(0);
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

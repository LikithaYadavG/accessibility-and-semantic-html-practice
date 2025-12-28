import { useState } from "react";

import { Modal } from "./components/Modal";
import { UserForm } from "./components/UserForm";
import { UserList } from "./components/UserList";

export interface User {
	id: number;
	name: string;
	email: string;
}

function App() {
	const [users, setUsers] = useState<User[]>([
		{ id: 1, name: "John Doe", email: "john@example.com" },
		{ id: 2, name: "Jane Smith", email: "jane@example.com" },
	]);
	const [modalOpen, setModalOpen] = useState(false);
	const [modalMessage, setModalMessage] = useState("");

	const addUser = (name: string, email: string) => {
		const newUser: User = {
			id: Date.now(),
			name,
			email,
		};
		setUsers([...users, newUser]);
		setModalMessage("User added successfully!");
		setModalOpen(true);
	};

	const deleteUser = (id: number) => {
		setUsers(users.filter((user) => user.id !== id));
		setModalMessage("User deleted successfully!");
		setModalOpen(true);
	};

	return (
		<div className="min-h-screen bg-gray-50 py-8 px-4">
			<main className="max-w-4xl mx-auto">
				<header className="mb-8">
					<h1 className="text-3xl font-bold text-gray-800">User Management</h1>
				</header>

				<section
					aria-labelledby="add-user-heading"
					className="bg-white rounded-lg shadow-md p-6 mb-6"
				>
					<h2
						className="text-xl font-semibold text-gray-700 mb-4"
						id="add-user-heading"
					>
						Add New User
					</h2>
					<UserForm onAddUser={addUser} />
				</section>

				<section
					aria-labelledby="users-list-heading"
					className="bg-white rounded-lg shadow-md p-6"
				>
					<h2
						className="text-xl font-semibold text-gray-700 mb-4"
						id="users-list-heading"
					>
						Users List
					</h2>
					<UserList onDeleteUser={deleteUser} users={users} />
				</section>
			</main>

			{modalOpen && (
				<Modal message={modalMessage} onClose={() => setModalOpen(false)} />
			)}
		</div>
	);
}

export default App;

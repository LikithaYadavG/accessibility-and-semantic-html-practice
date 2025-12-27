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
			<div className="max-w-4xl mx-auto">
				<div className="text-3xl font-bold text-gray-800 mb-8">
					User Management
				</div>

				<div className="bg-white rounded-lg shadow-md p-6 mb-6">
					<div className="text-xl font-semibold text-gray-700 mb-4">
						Add New User
					</div>
					<UserForm onAddUser={addUser} />
				</div>

				<div className="bg-white rounded-lg shadow-md p-6">
					<div className="text-xl font-semibold text-gray-700 mb-4">
						Users List
					</div>
					<UserList onDeleteUser={deleteUser} users={users} />
				</div>
			</div>

			{modalOpen && (
				<Modal message={modalMessage} onClose={() => setModalOpen(false)} />
			)}
		</div>
	);
}

export default App;

import { useShallow } from "zustand/react/shallow";
import { Modal } from "./components/Modal";
import { UserForm } from "./components/UserForm";
import { UserList } from "./components/UserList";
import { useUserStore } from "./store/useUserStore";

function App() {
	const { users, modalOpen, modalMessage, addUser, deleteUser, setModalOpen } =
		useUserStore(
			useShallow((state) => ({
				users: state.users,
				modalOpen: state.modalOpen,
				modalMessage: state.modalMessage,
				addUser: state.addUser,
				deleteUser: state.deleteUser,
				setModalOpen: state.setModalOpen,
			})),
		);

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

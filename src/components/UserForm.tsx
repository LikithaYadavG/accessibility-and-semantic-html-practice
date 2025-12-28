import { useState } from "react";

interface UserFormProps {
	onAddUser: (name: string, email: string) => void;
}

export function UserForm({ onAddUser }: UserFormProps) {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (name && email) {
			onAddUser(name, email);
			setName("");
			setEmail("");
		}
	};

	return (
		<form
			aria-label="Add new user"
			className="flex flex-col gap-4"
			onSubmit={handleSubmit}
		>
			<div>
				<label
					className="block text-sm font-medium text-gray-700 mb-1"
					htmlFor="user-name"
				>
					Name
				</label>
				<input
					aria-required="true"
					className="w-full px-4 py-2 border border-gray-300 rounded-md"
					id="user-name"
					onChange={(event) => setName(event.target.value)}
					placeholder="Enter user name"
					required
					type="text"
					value={name}
				/>
			</div>

			<div>
				<label
					className="block text-sm font-medium text-gray-700 mb-1"
					htmlFor="user-email"
				>
					Email
				</label>
				<input
					aria-required="true"
					className="w-full px-4 py-2 border border-gray-300 rounded-md"
					id="user-email"
					onChange={(event) => setEmail(event.target.value)}
					placeholder="Enter user email"
					required
					type="email"
					value={email}
				/>
			</div>

			<button
				className="bg-blue-500 text-white px-6 py-2 rounded-md cursor-pointer hover:bg-blue-600 text-center"
				type="submit"
			>
				Add User
			</button>
		</form>
	);
}

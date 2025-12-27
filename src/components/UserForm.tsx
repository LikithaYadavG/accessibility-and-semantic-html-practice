import { useState } from "react";

interface UserFormProps {
	onAddUser: (name: string, email: string) => void;
}

export function UserForm({ onAddUser }: UserFormProps) {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");

	return (
		<div className="flex flex-col gap-4">
			<div>
				<input
					className="w-full px-4 py-2 border border-gray-300 rounded-md"
					onChange={(e) => setName(e.target.value)}
					placeholder="Name"
					type="text"
					value={name}
				/>
			</div>

			<div>
				<input
					className="w-full px-4 py-2 border border-gray-300 rounded-md"
					onChange={(e) => setEmail(e.target.value)}
					placeholder="Email"
					type="text"
					value={email}
				/>
			</div>

			<div
				className="bg-blue-500 text-white px-6 py-2 rounded-md cursor-pointer hover:bg-blue-600 text-center"
				onClick={() => {
					if (name && email) {
						onAddUser(name, email);
						setName("");
						setEmail("");
					}
				}}
			>
				Add User
			</div>
		</div>
	);
}

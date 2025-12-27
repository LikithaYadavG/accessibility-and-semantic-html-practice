import { X } from "lucide-react";

import type { User } from "../App";

interface UserListProps {
	users: User[];
	onDeleteUser: (id: number) => void;
}

export function UserList({ users, onDeleteUser }: UserListProps) {
	if (users.length === 0) {
		return (
			<div className="text-gray-500 text-center py-8">
				No users found. Add a user to get started.
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-3">
			{users.map((user) => (
				<div
					className="flex items-center justify-between p-4 border border-gray-200 rounded-md hover:bg-gray-50"
					key={user.id}
				>
					<div className="flex flex-col">
						<div className="font-medium text-gray-800">{user.name}</div>
						<div className="text-sm text-gray-500">{user.email}</div>
					</div>

					<div
						className="text-red-500 hover:text-red-700 cursor-pointer p-2"
						onClick={() => onDeleteUser(user.id)}
					>
						<X size={20} />
					</div>
				</div>
			))}
		</div>
	);
}

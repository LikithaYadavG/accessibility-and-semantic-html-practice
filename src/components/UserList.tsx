import { X } from "lucide-react";

import type { User } from "../types/user";

interface UserListProps {
	users: User[];
	onDeleteUser: (id: string) => void;
}

export function UserList({ users, onDeleteUser }: UserListProps) {
	if (users.length === 0) {
		return (
			<p aria-live="polite" className="text-gray-500 text-center py-8">
				No users found. Add a user to get started.
			</p>
		);
	}

	return (
		<section aria-label="User list">
			<ul className="flex flex-col gap-3">
				{users.map((user) => (
					<li key={user.id}>
						<article className="flex items-center justify-between p-4 border border-gray-200 rounded-md hover:bg-gray-50">
							<div className="flex flex-col">
								<h3 className="font-medium text-gray-800">{user.name}</h3>
								<p className="text-sm text-gray-500">{user.email}</p>
							</div>

							<button
								aria-label={`Delete user ${user.name}`}
								className="text-red-500 hover:text-red-700 cursor-pointer p-2"
								onClick={() => onDeleteUser(user.id)}
								type="button"
							>
								<X aria-hidden="true" size={20} />
							</button>
						</article>
					</li>
				))}
			</ul>
		</section>
	);
}

interface ModalProps {
	message: string;
	onClose: () => void;
}

export function Modal({ message, onClose }: ModalProps) {
	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
			<div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
				<div className="text-lg font-semibold text-gray-800 mb-4">
					{message}
				</div>

				<div
					className="bg-blue-500 text-white px-6 py-2 rounded-md cursor-pointer hover:bg-blue-600 text-center"
					onClick={onClose}
				>
					Close
				</div>
			</div>
		</div>
	);
}

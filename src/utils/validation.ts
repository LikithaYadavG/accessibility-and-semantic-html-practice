/**
 * Validates that a string is not empty and contains non-whitespace characters
 */
export const isValidName = (name: string): boolean => {
	return typeof name === "string" && name.trim().length > 0;
};

/**
 * Validates that an email string matches a basic email format
 */
export const isValidEmail = (email: string): boolean => {
	if (typeof email !== "string" || email.trim().length === 0) {
		return false;
	}

	const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailPattern.test(email.trim());
};

/**
 * Validates user input for name and email
 * @throws {Error} if validation fails with a descriptive message
 */
export const validateUserInput = (
	name: string,
	email: string,
): { name: string; email: string } => {
	if (!isValidName(name)) {
		throw new Error("Name is required and cannot be empty or whitespace");
	}

	if (!isValidEmail(email)) {
		throw new Error("A valid email address is required");
	}

	return {
		name: name.trim(),
		email: email.trim(),
	};
};

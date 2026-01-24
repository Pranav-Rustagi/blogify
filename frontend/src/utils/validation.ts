export interface ValidationErrors {
    username?: string;
    email?: string;
    password?: string;
    general?: string;
}

export const validateEmail = (email: string): string | null => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
        return 'Email is required';
    }

    if (!emailRegex.test(email)) {
        return 'Please enter a valid email address';
    }

    return null;
};

export const validatePassword = (password: string): string | null => {
    if (!password) {
        return 'Password is required';
    }

    if (password.length < 8) {
        return 'Password must be at least 8 characters';
    }

    if (!/[A-Z]/.test(password)) {
        return 'Password must contain at least one uppercase letter';
    }

    if (!/[a-z]/.test(password)) {
        return 'Password must contain at least one lowercase letter';
    }

    if (!/[0-9]/.test(password)) {
        return 'Password must contain at least one number';
    }

    if (!/[^A-Za-z0-9]/.test(password)) {
        return 'Password must contain at least one special character';
    }

    return null;
};

export const validateUsername = (username: string): string | null => {
    if (!username) {
        return 'Username is required';
    }

    if (username.trim().length < 3) {
        return 'Username must be at least 3 characters';
    }

    if (username.length > 20) {
        return 'Username must be at most 20 characters';
    }

    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
        return 'Username can only contain letters, numbers, and underscores';
    }

    return null;
};

export const validateSignupForm = (
    username: string,
    email: string,
    password: string
): ValidationErrors => {
    const errors: ValidationErrors = {};

    const nameError = validateUsername(username);
    if (nameError) errors.username = nameError;

    const emailError = validateEmail(email);
    if (emailError) errors.email = emailError;

    const passwordError = validatePassword(password);
    if (passwordError) errors.password = passwordError;

    return errors;
};

export const validateLoginForm = (
    email: string,
    password: string
): ValidationErrors => {
    const errors: ValidationErrors = {};

    const emailError = validateEmail(email);
    if (emailError) errors.email = emailError;

    const passwordError = validatePassword(password);
    if (passwordError) errors.password = passwordError;

    return errors;
};

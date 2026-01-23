const ERRORS = {
    USER_ALREADY_EXISTS: {
        statusCode: 409,
        message: "User already exists with this email"
    },
    USER_NOT_FOUND: {
        statusCode: 404,
        message: "User not found"
    },
    INVALID_CREDENTIALS: {
        statusCode: 401,
        message: "Invalid email or password"
    },
    UNAUTHORIZED: {
        statusCode: 401,
        message: "Unauthorized access"
    },
    FORBIDDEN: {
        statusCode: 403,
        message: "Forbidden - insufficient permissions"
    },
    VALIDATION_ERROR: {
        statusCode: 400,
        message: "Validation error"
    },
    INTERNAL_SERVER_ERROR: {
        statusCode: 500,
        message: "Internal server error"
    },
    BAD_REQUEST: {
        statusCode: 400,
        message: "Bad request"
    },
    NOT_FOUND: {
        statusCode: 404,
        message: "Resource not found"
    },
    CONFLICT: {
        statusCode: 409,
        message: "Resource conflict"
    }
};

const ERROR_TYPES = {
    USER_ALREADY_EXISTS: "USER_ALREADY_EXISTS",
    USER_NOT_FOUND: "USER_NOT_FOUND",
    INVALID_CREDENTIALS: "INVALID_CREDENTIALS",
    UNAUTHORIZED: "UNAUTHORIZED",
    FORBIDDEN: "FORBIDDEN",
    VALIDATION_ERROR: "VALIDATION_ERROR",
    INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR",
    BAD_REQUEST: "BAD_REQUEST",
    NOT_FOUND: "NOT_FOUND",
    CONFLICT: "CONFLICT"
}

export {
    ERRORS,
    ERROR_TYPES
};
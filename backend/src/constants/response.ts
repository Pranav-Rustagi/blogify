const RESPONSES = {
    SIGN_UP_SUCCESS: {
        statusCode: 201,
        message: "Signed up successfully"
    },
    SIGN_IN_SUCCESS: {
        statusCode: 200,
        message: "Signed in successfully"
    },
    SIGN_OUT_SUCCESS: {
        statusCode: 200,
        message: "Signed out successfully"
    },
    USER_CREATED: {
        statusCode: 201,
        message: "User created successfully"
    },
    USER_UPDATED: {
        statusCode: 200,
        message: "User updated successfully"
    },
    USER_DELETED: {
        statusCode: 200,
        message: "User deleted successfully"
    },
    USER_RETRIEVED: {
        statusCode: 200,
        message: "User retrieved successfully"
    },
    PROFILE_UPDATED: {
        statusCode: 200,
        message: "Profile updated successfully"
    },
    PASSWORD_CHANGED: {
        statusCode: 200,
        message: "Password changed successfully"
    },
    EMAIL_VERIFIED: {
        statusCode: 200,
        message: "Email verified successfully"
    },
    POST_CREATED: {
        statusCode: 201,
        message: "Blog post created successfully"
    },
    POST_UPDATED: {
        statusCode: 200,
        message: "Blog post updated successfully"
    },
    POST_DELETED: {
        statusCode: 200,
        message: "Blog post deleted successfully"
    },
    POST_PUBLISHED: {
        statusCode: 200,
        message: "Blog post published successfully"
    },
    POST_UNPUBLISHED: {
        statusCode: 200,
        message: "Blog post unpublished successfully"
    },
    POST_RETRIEVED: {
        statusCode: 200,
        message: "Blog post retrieved successfully"
    },
    COMMENT_CREATED: {
        statusCode: 201,
        message: "Comment created successfully"
    },
    COMMENT_UPDATED: {
        statusCode: 200,
        message: "Comment updated successfully"
    },
    COMMENT_DELETED: {
        statusCode: 200,
        message: "Comment deleted successfully"
    },
    CATEGORY_CREATED: {
        statusCode: 201,
        message: "Category created successfully"
    },
    CATEGORY_UPDATED: {
        statusCode: 200,
        message: "Category updated successfully"
    },
    CATEGORY_DELETED: {
        statusCode: 200,
        message: "Category deleted successfully"
    },
    TAG_CREATED: {
        statusCode: 201,
        message: "Tag created successfully"
    },
    TAG_UPDATED: {
        statusCode: 200,
        message: "Tag updated successfully"
    },
    TAG_DELETED: {
        statusCode: 200,
        message: "Tag deleted successfully"
    }
};

const RESPONSE_TYPES = {
    SIGN_UP_SUCCESS: "SIGN_UP_SUCCESS",
    SIGN_IN_SUCCESS: "SIGN_IN_SUCCESS",
    SIGN_OUT_SUCCESS: "SIGN_OUT_SUCCESS",
    USER_CREATED: "USER_CREATED",
    USER_UPDATED: "USER_UPDATED",
    USER_DELETED: "USER_DELETED",
    USER_RETRIEVED: "USER_RETRIEVED",
    PROFILE_UPDATED: "PROFILE_UPDATED",
    PASSWORD_CHANGED: "PASSWORD_CHANGED",
    EMAIL_VERIFIED: "EMAIL_VERIFIED",
    POST_CREATED: "POST_CREATED",
    POST_UPDATED: "POST_UPDATED",
    POST_DELETED: "POST_DELETED",
    POST_PUBLISHED: "POST_PUBLISHED",
    POST_UNPUBLISHED: "POST_UNPUBLISHED",
    POST_RETRIEVED: "POST_RETRIEVED",
    COMMENT_CREATED: "COMMENT_CREATED",
    COMMENT_UPDATED: "COMMENT_UPDATED",
    COMMENT_DELETED: "COMMENT_DELETED",
    CATEGORY_CREATED: "CATEGORY_CREATED",
    CATEGORY_UPDATED: "CATEGORY_UPDATED",
    CATEGORY_DELETED: "CATEGORY_DELETED",
    TAG_CREATED: "TAG_CREATED",
    TAG_UPDATED: "TAG_UPDATED",
    TAG_DELETED: "TAG_DELETED"
};

export {
    RESPONSES,
    RESPONSE_TYPES
};

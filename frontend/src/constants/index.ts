export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL as string;

export const AUTH_URL = `${BASE_URL}/api/auth`;
export const BLOG_URL = `${BASE_URL}/api/blogs`;

export const AUTH_ROUTES = {
    SIGNUP: AUTH_URL + '/signup',
    SIGNIN: AUTH_URL + '/signin',
    VERIFY_TOKEN: AUTH_URL + '/verify',
    LOGOUT: AUTH_URL + '/logout'
}

export const BLOG_ROUTES = {
    FETCH: BLOG_URL,
    CREATE: BLOG_URL + '/create'
}
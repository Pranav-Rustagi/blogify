export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL as string;

export const AUTH_URL = `${BASE_URL}/api/auth`;

export const AUTH_ROUTES = {
    SIGNUP: AUTH_URL + '/signup',
    SIGNIN: AUTH_URL + '/signin'
}
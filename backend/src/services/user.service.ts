import logger from "../config/logger";
import { ERROR_TYPES, ERRORS } from "../constants/errors";
import { pool } from "../database/db";
import bcrypt from "bcrypt";

interface newUserProps {
    username: string,
    email: string,
    password: string
};


const checkExistingUser = async (email: string) => {
    try {
        const query = "SELECT id FROM users WHERE email = $1";
        const records = await pool.query(query, [email]);

        if ((records.rowCount ?? 0) > 0) {
            return true;
        }

        return false;
    } catch (err: any) {
        logger.error(err.message);
        logger.error("Error occurred in checkExistingUser()");
        throw err;
    }
}

const addNewUser = async ({ username, email, password: hashedPassword }: newUserProps) => {
    try {
        const query = "INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING id";
        const result = await pool.query(query, [username, email, hashedPassword]);
        return result.rows[0].id;
    } catch (err: any) {
        logger.error(err.message);
        logger.error("Error occurred in addNewUser()");
        throw err;
    }
}


const registerUser = async ({ username, email, password }: newUserProps) => {
    try {
        const userExists = await checkExistingUser(email);
        if (userExists) {
            logger.error(ERRORS.USER_ALREADY_EXISTS.message);
            throw new Error(ERROR_TYPES.USER_ALREADY_EXISTS);
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const result = await addNewUser({ username, email, password: hashedPassword });
        return result;
    } catch (err) {
        logger.error("Error occurred in registerUser()");
        throw err;
    }
}

interface signInProps {
    email: string,
    password: string
}

const signInUser = async ({ email, password }: signInProps) => {
    try {
        const query = "SELECT id, username, email, password_hash FROM users WHERE email = $1";
        const records = await pool.query(query, [email]);
        
        if ((records.rowCount ?? 0) === 0) {
            logger.error(ERRORS.INVALID_CREDENTIALS.message);
            throw new Error(ERROR_TYPES.INVALID_CREDENTIALS);
        }
        
        const user = records.rows[0];
        const isPasswordValid = await bcrypt.compare(password, user.password_hash);

        if (!isPasswordValid) {
            logger.error(ERRORS.INVALID_CREDENTIALS.message);
            throw new Error(ERROR_TYPES.INVALID_CREDENTIALS);
        }

        return {
            id: user.id,
            email: user.email,
            username: user.username
        };

    } catch (err: any) {
        logger.error(err.message);
        logger.error("Error occurred in signInUser()");
        throw err;
    }
}

const getUserById = async (userId: string) => {
    try {
        const query = "SELECT id, username, email FROM users WHERE id = $1";
        const records = await pool.query(query, [userId]);
        
        if ((records.rowCount ?? 0) === 0) {
            logger.error(ERRORS.INVALID_CREDENTIALS.message);
            throw new Error(ERROR_TYPES.INVALID_CREDENTIALS);
        }
        
        const user = records.rows[0];
        return {
            id: user.id,
            username: user.username,
            email: user.email
        };

    } catch (err: any) {
        logger.error(err.message);
        logger.error("Error occurred in getUserById()");
        throw err;
    }
}

export {
    registerUser,
    signInUser,
    getUserById
};

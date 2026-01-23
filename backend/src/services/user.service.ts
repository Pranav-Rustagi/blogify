import logger from "../config/logger";
import { ERROR_TYPES, ERRORS } from "../constants/errors";
import { pool } from "../database/db";
import bcrypt from "bcrypt";

interface newUserProps {
    name: string,
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
    } catch (err) {
        logger.error("Error occurred in checkExistingUser()");
        throw err;
    }
}

const addNewUser = async ({ name, email, password: hashedPassword }: newUserProps) => {
    try {
        const query = "INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3)";
        await pool.query(query, [name, email, hashedPassword]);
    } catch (err) {
        logger.error("Error occurred in addNewUser()");
        throw err;
    }
}


const registerUser = async ({ name, email, password }: newUserProps) => {
    try {
        const userExists = await checkExistingUser(email);
        if (userExists) {
            logger.error(ERRORS.USER_ALREADY_EXISTS.message);
            throw new Error(ERROR_TYPES.USER_ALREADY_EXISTS);
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        await addNewUser({ name, email, password: hashedPassword });
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
        const query = "SELECT id, name, email, password_hash FROM users WHERE email = $1";
        const records = await pool.query(query, [email]);

        if ((records.rowCount ?? 0) === 0) {
            throw new Error(ERROR_TYPES.INVALID_CREDENTIALS);
        }

        const user = records.rows[0];
        const isPasswordValid = await bcrypt.compare(password, user.password_hash);

        if (!isPasswordValid) {
            throw new Error(ERROR_TYPES.INVALID_CREDENTIALS);
        }

        return {
            userId: user.id,
            email: user.email
        };

    } catch (err) {
        logger.error("Error occurred in signInUser()");
        throw err;
    }
}


export {
    registerUser,
    signInUser
};
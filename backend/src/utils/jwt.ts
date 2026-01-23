import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

const signToken = (payload: { userId: string; email: string }) => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

const verifyToken = (token: string) => {
    return jwt.verify(token, JWT_SECRET) as {
        userId: string;
        email: string;
    };
}

export {
    signToken,
    verifyToken
};
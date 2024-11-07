import { NextFunction, Request, Response } from 'express';
import jwt, { SignOptions } from 'jsonwebtoken'

const SECRET = process.env.JWT_SCRET as string
const sign = (payload: { id: number, name: string, email: string, role: string }, expiresIn = '5d') => {
    const jwtConfig: SignOptions = {
        algorithm: 'HS256',
        expiresIn
    }

    return jwt.sign(payload, SECRET, jwtConfig);

}

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization');
        if(!token) return res.status(401).json({message: "Sem autorização"});
        const decoded = jwt.verify(token, SECRET);
        res.locals.user = decoded;
        next()
    } catch (error) {
        next(error)
    }
}

export {sign, verifyToken}
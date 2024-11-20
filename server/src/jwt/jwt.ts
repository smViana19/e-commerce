import { NextFunction, Request, Response } from 'express';
import jwt, { SignOptions } from 'jsonwebtoken'

const SECRET = process.env.JWT_SECRET as string

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
        if (!token) {
            res.status(401).json({ message: "Sem autorização" });
            return
        }
        const tokenValue = token.split(' ')[1];
        if (!tokenValue) {
            res.status(401).json({ message: "Token inválido" });
            return;
        }

        console.log("Token recebido:", tokenValue);

        const decoded = jwt.verify(token, SECRET);
        console.log("Token decodificado:", decoded);
        res.locals.user = decoded;
        next()
    } catch (error) {
        console.error("Erro na verificação do token:", error);
        next(error)
    }
}

export { sign, verifyToken }
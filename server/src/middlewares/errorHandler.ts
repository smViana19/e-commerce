import { NextFunction, Request, Response } from "express";

function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    const statusCode = err.status || 500;
    res.status(statusCode).json({
        message: err.message || 'Erro interno do servidor',
    })
}

export default errorHandler;
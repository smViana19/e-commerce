import { NextFunction, Request, Response } from "express";
import UserService from "../services/user-service";

class UserController {
    private service = new UserService();

    async getAllUsers(req: Request, res: Response, next: NextFunction) {
        try {
            const { status, message } = await this.service.getAllUsers()
            res.status(status).json(message);
        } catch (error) {
            next(error)
        }
    }

    async createUser(req: Request, res: Response, next: NextFunction) {
        try {
            const { name, email, password, role } = req.body;
            const response = await this.service.createUser({ name, email, password, role });
            res.status(response.status).json(response.message)
        } catch (error) {
            next(error)
        }
    }

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { status, message } = await this.service.login(req.body);
            res.status(status).json(message);
        } catch (error) {
            next(error)
        }
    }
}

export default UserController
import { NextFunction, Request, Response } from "express";
import OrderService from "../services/order-service";

class OrderController {
    private service = new OrderService;

    async createOrder(req: Request, res: Response, next: NextFunction) {
        try {
            const { status, message } = await this.service.createOrder(req.body);
            res.status(status).json(message);
        } catch (error) {
            console.error(error)
            next(error);
        }
    }

}

export default OrderController;
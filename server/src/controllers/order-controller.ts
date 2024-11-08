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

    async getAllOrders(req: Request, res: Response, next: NextFunction) {
        try {
            const { status, message } = await this.service.getAllOrders();
            res.status(status).json(message);
        } catch (error) {
            next(error);
        }
    }
    async getOrderById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const { status, message } = await this.service.getOrderById(id);
            res.status(status).json(message);
        } catch (error) {
            next(error);
        }
    }
    async updateOrder(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const orderData = { ...req.body }
            const { status, message } = await this.service.updateOrder(orderData, id);
            res.status(status).json(message);
        } catch (error) {
            next(error)
        }
    }

}

export default OrderController;
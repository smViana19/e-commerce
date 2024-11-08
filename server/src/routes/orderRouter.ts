import { Router } from 'express';
import OrderController from '../controllers/order-controller';

const orderController = new OrderController();
const orderRouter = Router();

orderRouter.post('/order', orderController.createOrder.bind(orderController));


export default orderRouter;
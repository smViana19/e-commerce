import { Router } from 'express';
import OrderController from '../controllers/order-controller';

const orderController = new OrderController();
const orderRouter = Router();

orderRouter.post('/order', orderController.createOrder.bind(orderController));
orderRouter.get('/order', orderController.getAllOrders.bind(orderController));
orderRouter.get('/order/:id', orderController.getOrderById.bind(orderController));


export default orderRouter;
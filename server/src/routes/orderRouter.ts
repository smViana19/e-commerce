import { Router } from 'express';
import OrderController from '../controllers/order-controller';

const orderController = new OrderController();
const orderRouter = Router();

orderRouter.post('/order', orderController.createOrder.bind(orderController));
orderRouter.get('/order', orderController.getAllOrders.bind(orderController));
orderRouter.get('/order/:userId', orderController.getOrderByUser.bind(orderController));
orderRouter.get('/order/:id', orderController.getOrderById.bind(orderController));
orderRouter.post('/order/confirm', orderController.confirmOrderPayment.bind(orderController));


export default orderRouter;
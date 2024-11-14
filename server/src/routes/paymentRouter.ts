import { NextFunction, Request, Response, Router } from 'express';
import PaymentController from '../controllers/payment-controller';
const paymentController = new PaymentController();
const paymentRouter = Router();

paymentRouter.post('/checkout-session', paymentController.createCheckoutSession.bind(paymentController));

export default paymentRouter;
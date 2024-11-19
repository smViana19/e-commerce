import { NextFunction, Request, Response } from "express";
import PaymentService from "../services/payment-service";

class PaymentController {
  private service = new PaymentService;
  
  async createCheckoutSession(req: Request, res: Response, next: NextFunction) {
    try {
      const { lineItems, orderId } = req.body;
      const session = await this.service.createCheckoutSession(lineItems, orderId);
      res.json({ id: session.id });
    } catch (error) {
      next(error)
    }
  }

}


export default PaymentController;
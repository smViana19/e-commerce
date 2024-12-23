import { Router } from "express";
import userRouter from "./userRouter";
import categoryRouter from "./categoryRouter";
import productRouter from "./productRouter";
import orderRouter from "./orderRouter";
import paymentRouter from "./paymentRouter";
const router = Router();

router.use(userRouter);
router.use(categoryRouter);
router.use(productRouter);
router.use(orderRouter);
router.use(paymentRouter);

export default router;
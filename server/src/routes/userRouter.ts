import { Router } from "express";
import UserController from "../controllers/user-controller";

const userController = new UserController();

const userRouter = Router();

userRouter.get('/users', userController.getAllUsers.bind(userController))
userRouter.post('/users', userController.createUser.bind(userController))

export default userRouter;
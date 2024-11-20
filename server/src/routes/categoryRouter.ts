import { Router } from 'express';
import CategoryController from '../controllers/category-controller';
const categoryController = new CategoryController();
const categoryRouter = Router();

categoryRouter.post('/category', categoryController.createCategory.bind(categoryController));
categoryRouter.get('/category', categoryController.getAllCategories.bind(categoryController));
categoryRouter.get('/category/:id', categoryController.getCategoryById.bind(categoryController));

export default categoryRouter;
import { NextFunction, Request, Response } from "express";
import CategoryService from "../services/category-service";
import { respM } from "../utils/resp";

class CategoryController {
    private service = new CategoryService;

    async createCategory(req: Request, res: Response, next: NextFunction) {
        try {
            const { name } = req.body;
            const response = await this.service.createCategory({ name });
            res.status(response.status).json(response.message);
        } catch (error) {
            next(error);
        }
    }

    async getAllCategories(req: Request, res: Response, next: NextFunction) {
        try {
            const { status, message } = await this.service.getAllCategories();
            res.status(status).json(message)
        } catch (error) {
            next(error);
        }
    }

    async getCategoryById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const category = await this.service.getCategoryById(id);
            res.status(category.status).json(category.message)
        } catch (error) {
            console.error(error)
            next(error);
        }
    }
    

}

export default CategoryController;
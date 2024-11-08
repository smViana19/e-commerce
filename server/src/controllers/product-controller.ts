import { NextFunction, Request, Response } from "express";
import ProductService from "../services/product-service";

class ProductController {
    private service = new ProductService();
    async createProduct(req: Request, res: Response, next: NextFunction) {
        try {
            const { categoryId, name, description, price, image, stockQuantity } = req.body;
            const response = await this.service.createProduct({ categoryId, name, description, price, image, stockQuantity });
            res.status(response.status).json(response.message);
        } catch (error) {
            next(error);
        }
    }
    async getAllProducts(req: Request, res: Response, next: NextFunction) {
        try {
            const { status, message } = await this.service.getAllProducts();
            res.status(status).json(message);
        } catch (error) {
            next(error);
        }
    }
    async getProductById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const product = await this.service.getProductById(id);
            res.status(product.status).json(product.message);
        } catch (error) {
            next(error);
        }
    }
    async updateProduct(req: Request, res: Response, next: NextFunction) {
        //TODO: FAZER METODO
    }
    async deleteProduct(req: Request, res: Response, next: NextFunction) {
        //TODO: FAZER METODO
    }


}

export default ProductController;
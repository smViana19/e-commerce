import { Router } from 'express';
import ProductController from '../controllers/product-controller';

const productController = new ProductController();
const productRouter = Router();

productRouter.post('/product', productController.createProduct.bind(productController));
productRouter.get('/product', productController.getAllProducts.bind(productController));
productRouter.get('/product/:id', productController.getProductById.bind(productController));
productRouter.put('/product/:id', productController.updateProduct.bind(productController));
productRouter.delete('/product/:id', productController.deleteProduct.bind(productController));

export default productRouter;
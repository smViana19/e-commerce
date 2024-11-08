import { ModelStatic } from "sequelize";
import Product from "../models/product";
import IProduct from "../interfaces/IProduct";
import { resp, respM } from "../utils/resp";

class ProductService {
    private model: ModelStatic<Product> = Product;
    async createProduct(product: IProduct) {
        try {
            const createdProduct = await this.model.create({ ...product });
            return resp(201, createdProduct);
        } catch (error) {
            throw new Error("Erro ao criar produto");
        }
    }
    async getAllProducts() {
        try {
            const products = await this.model.findAll();
            return resp(200, products);
        } catch (error) {
            throw new Error("Erro ao listar os produtos");
        }
    }
    async getProductById(id: string) {
        try {
            const product = await this.model.findByPk(id);
            if (!product) return respM(400, "Produto não encontrado");
            return resp(200, product);
        } catch (error) {
            throw new Error("Erro ao buscar o produto");
        }
    }
    async updateProduct(productData: IProduct, id: string) {
        try {
            const product = await this.model.findByPk(id);
            if (!product) return respM(400, "Produto não encontrado");
            await product.update({ ...productData });
            return resp(200, product)
        } catch (error) {
            throw new Error("Erro ao editar o produto");
        }
    }
    async deleteProduct(id: string) {
        try {
            const product = await this.model.findByPk(id);
            if (!product) return respM(400, "Produto não encontrado");
            await product.destroy();
            return resp(204, "")
        } catch (error) {
            console.error(error);
            throw new Error("Erro ao deletar produto");
        }
    }
}

export default ProductService
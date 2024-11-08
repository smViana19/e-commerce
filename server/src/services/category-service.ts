import { ModelStatic } from "sequelize";
import Category from "../models/category";
import { resp, respM } from "../utils/resp";
import { log } from "console";
import Product from "../models/product";

class CategoryService {
    private model: ModelStatic<Category> = Category;
    async createCategory(category: { name: string }) {
        try {
            const createdCategory = await this.model.create({ ...category })
            return resp(201, createdCategory);
        } catch (error) {
            throw new Error("Erro ao criar categoria");
        }

    }
    async getAllCategories() {
        try {
            const categories = await this.model.findAll({
                include: [{
                    model: Product,
                    as: 'products'
                }]
            });
            return resp(200, categories)
        } catch (error) {
            throw new Error("Erro ao listar as categorias")
        }
    }
    async getCategoryById(id: string) {
        try {
            const category = await this.model.findByPk(id, {
                include: [{
                    model: Product,
                    as: 'products'
                }]
            })
            if (!category) return respM(400, "Categoria não encontrada");
            return resp(200, category)
        } catch (error) {
            console.error(error)
            throw new Error("Erro ao buscar a categoria")
        }
    }

}
export default CategoryService;
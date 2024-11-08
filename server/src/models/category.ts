import { Model } from "sequelize";
import db from '.';
import sequelize from "sequelize";
import Product from "./product";

class Category extends Model {
    declare id: number
    declare name: string
}

Category.init({
    id: {
        type: sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: sequelize.STRING,
        allowNull: false,
    }
}, {
    sequelize: db,
    modelName: 'categories',
    timestamps: false
});

// Category.hasMany(Product, {
//     foreignKey: 'categoryId',
//     as: 'products',  // Alias para quando se referir à relação de categorias com produtos
// });



export default Category;
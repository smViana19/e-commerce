import { Model } from "sequelize";
import db from '.'
import sequelize from "sequelize";
import Category from "./category";

//TODO: TALVEZ ADICIONAR COLUNA DE PRODUTOS DISPONIVEL PARA DECREMENTAR O STOCK_QUANTITY
class Product extends Model {
    declare id: number
    declare categoryId: number
    declare name: string
    declare description: string
    declare price: number
    declare image: string
    declare stockQuantity: number


}

Product.init({
    id: {
        type: sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    categoryId: {
        type: sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'categories',
            key: 'id',
        },
    },
    name: {
        type: sequelize.STRING,
        allowNull: false
    },
    description: {
        type: sequelize.STRING,
        allowNull: false
    },
    price: {
        type: sequelize.FLOAT,
        allowNull: false
    },
    stockQuantity: {
        type: sequelize.INTEGER,
        allowNull: false,
    },
    image: {
        type: sequelize.STRING,
        allowNull: true
    }
}, {
    sequelize: db,
    tableName: 'products',
    timestamps: false,
    underscored: true
});

Category.hasMany(Product, {
    foreignKey: 'categoryId',
    as: 'products'
});
Product.belongsTo(Category, {
    foreignKey: 'categoryId',
    as: 'category'
});

export default Product;
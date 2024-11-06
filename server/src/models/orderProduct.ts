import { Model } from "sequelize";
import db from '.'
import sequelize from "sequelize";
import Order from "./order";
import Product from "./product";

class OrderProduct extends Model {
    declare id: number
    declare orderId: number
    declare productId: number
    declare price: number
    declare quantity: number
}
OrderProduct.init({
    id: {
        type: sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    orderId: {
        type: sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'orders',
            key: 'id'
        },
    },
    productId: {
        type: sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'products',
            key: 'id'
        }
    },
    price: {
        type: sequelize.FLOAT,
        allowNull: false,
    },
    quantity: {
        type: sequelize.INTEGER,
        allowNull: false,
    },
}, {
    sequelize: db,
    tableName: 'order_products',
    timestamps: false,
})

Order.belongsToMany(Product, {
    foreignKey: 'productId',
    otherKey: 'orderId',
    as: 'products',
    through: OrderProduct
})

Order.belongsToMany(Order, {
    foreignKey: 'orderId',
    otherKey: 'productId',
    as: 'orders',
    through: OrderProduct
})


export default OrderProduct;
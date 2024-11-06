import { Model } from "sequelize";
import db from '.';
import sequelize from "sequelize";
import User from "./user";

class Order extends Model {
    declare id: number
    declare userId: number
    declare paymentStatus: string
    declare totalAmount: number
}

Order.init({
    id: {
        type: sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    userId: {
        type: sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    paymentStatus: {
        type: sequelize.ENUM('pending', 'confirmed', 'failed'),
        defaultValue: 'pending'
    },
    totalAmount: {
        type: sequelize.FLOAT,
        allowNull: false,
    }
}, {
    sequelize: db,
    tableName: 'orders',
    timestamps: false,
    underscored: true
});

Order.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user'
});


export default Order;
import { Model } from "sequelize";
import db from '.';
import sequelize from "sequelize";

class User extends Model {
    declare id: number
    declare name: string
    declare email: string
    declare password: string
    declare role: string
}

User.init({
    id: {
        type: sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: sequelize.STRING,
        allowNull: false,
    },
    role: {
        type: sequelize.ENUM('admin', 'guest'),
        allowNull: false,
        defaultValue: 'guest'
    }
}, {
    sequelize: db,
    tableName: 'users',
    timestamps: false,
})

export default User;
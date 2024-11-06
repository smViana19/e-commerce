import { ModelStatic } from "sequelize";
import User from "../models/user";
import { resp } from "../utils/resp";
import bcrypt from 'bcryptjs'
import { password } from "../database/config/database";
class UserService {
    private model: ModelStatic<User> = User;

    async createUser(data: { name: string, email: string, password: string, role: string }) {
        try {
            const hashedPassword = await bcrypt.hash(data.password, 10)
            const user = await this.model.create({
                name: data.name,
                email: data.email,
                password: hashedPassword,
                role: data.role
            })
            return resp(201, user)
        } catch (error) {
            throw new Error("Erro ao criar usuário");
        }
    }

    async getAllUsers() {
        try {
            const users = await this.model.findAll({
                attributes: ["id", "name", "email", "role"]
            });
            return resp(200, users)
        } catch (error) {
            throw new Error("Erro ao buscar usuários");
        }

    }


}

export default UserService;
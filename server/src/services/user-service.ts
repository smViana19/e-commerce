import { ModelStatic } from "sequelize";
import User from "../models/user";
import { resp } from "../utils/resp";
import bcrypt from 'bcryptjs'
import { sign } from "../jwt/jwt";
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

    async login(body: { email: string, password: string }) {

        const user = await this.model.findOne({
            where: {
                email: body.email
            }
        })

        if (!user) return resp(404, "Usuario não encontrado");

        const { id, name, email, role } = user
        const token = sign({ id, name, email, role })
        return resp(200, {
            id,
            email,
            role,
            token
        })
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
import { ModelStatic } from "sequelize";
import User from "../models/user";
import { resp, respM } from "../utils/resp";
import bcrypt from 'bcryptjs'
import { sign } from "../jwt/jwt";
import dotenv from 'dotenv'
import IUser from "../interfaces/IUser";
import schema from "./validations/schema";

class UserService {
    private model: ModelStatic<User> = User;

    async createUser(user: IUser) {
        try {
            const { error } = schema.user.validate(user);
            if (error) return respM(422, error.message)
            const hashedPassword = await bcrypt.hash(user.password, 10)
            const createdUser = await this.model.create({
                name: user.name,
                email: user.email,
                password: hashedPassword,
                role: user.role
            })
            return resp(201, createdUser);
        } catch (error) {
            throw new Error("Erro ao criar usuário");
        }
    }

    async login(body: { email: string, password: string }) {

        const user = await this.model.findOne({
            where: {
                email: body.email,
            }
        })

        if (!user) return respM(404, "Usuario não encontrado");

        const validPassword = await bcrypt.compare(body.password, user.password);
        if (!validPassword) return respM(401, "Senha incorreta");

        const { id, name, email, role } = user
        const token = sign({ id, name, email, role })
        return resp(200, {
            id,
            name,
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
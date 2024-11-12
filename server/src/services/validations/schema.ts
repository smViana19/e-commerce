import joi from 'joi'
import { password } from '../../database/config/database'

const user = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
    name: joi.string().min(3).required(),
    role: joi.string()
})

const order = joi.object({
    userId: joi.number().required(),
    paymentStatus: joi.string().required(),
    totalAmout: joi.number(),
    products: joi.array().items(joi.object({
        productId: joi.number().required(),
        quantity: joi.number().integer().min(1).required()
    })).required(),

})

export = { user, order }
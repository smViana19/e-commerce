import joi from 'joi'

const user = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
    name: joi.string().min(3).required(),
    role: joi.string()
})

const order = joi.object({
    userId: joi.number().required(),
    paymentStatus: joi.string(),
    totalAmout: joi.number(),
    products: joi.array().items(joi.object({
        productId: joi.number().required(),
        quantity: joi.number().integer().min(1).required()
    })).required(),

})

const payment = joi.object({
    sessionId: joi.string().required()
});

export = { user, order, payment }
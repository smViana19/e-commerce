import { ModelStatic, or } from "sequelize";
import Order from "../models/order";
import IOrder from "../interfaces/IOrder";
import { resp, respM } from "../utils/resp";
import schema from "./validations/schema";
import e from "express";
import OrderProduct from "../models/orderProduct";
import Product from "../models/product";

class OrderService {
    private model: ModelStatic<Order> = Order;


    async createOrder(order: IOrder) {
        try {
            const { error } = schema.order.validate(order)
            if (error) return respM(422, error.message);
            const createdOrder = await this.model.create({ ...order });

            if (!order.totalAmount) {
                const products = await Product.findAll({
                    where: { id: order.products }
                });
                order.totalAmount = products.reduce((total, product) => {
                    const productPrice = product.price || 0;
                    return total + productPrice;
                }, 0)
            }

            const orderProduct = order.products!.map((e) => ({
                orderId: createdOrder.id,
                productId: e
            }))

            await OrderProduct.bulkCreate(orderProduct)

            for (const productId of order.products!) {
                const product = await Product.findByPk(productId);
                if (product) {
                    product.stockQuantity -= 1;
                    await product.save();
                }
            }

            return resp(201, createdOrder);
        } catch (error) {
            throw new Error("Erro ao criar pedido");
        }

    }
    async getAllOrders() {
        try {
            const orders = await this.model.findAll();
            return resp(200, orders);
        } catch (error) {
            throw new Error("Erro ao listar os pedidos");
        }
    }
    async getOrderById(id: string) {
        try {
            const order = await this.model.findByPk(id);
            if (!order) return respM(400, "Pedido não encontrado");
            return resp(200, order);
        } catch (error) {
            throw new Error("Erro ao buscar o pedido");
        }
    }
    async updateOrder() { }
}

export default OrderService;
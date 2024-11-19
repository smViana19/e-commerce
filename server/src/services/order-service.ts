import { ModelStatic } from "sequelize";
import IOrder from "../interfaces/IOrder";
import Order from "../models/order";
import OrderProduct from "../models/orderProduct";
import Product from "../models/product";
import { resp, respM } from "../utils/resp";
import schema from "./validations/schema";

class OrderService {
    private model: ModelStatic<Order> = Order;

    async createOrder(order: IOrder) {
        try {
            const { error } = schema.order.validate(order);
            if (error) return respM(422, error.message);

            if (!order.products?.length) {
                throw new Error("A lista de produtos está ausente ou no formato incorreto.");
            }

            const productIds = order.products.map(p => p.productId);

            const products = await Product.findAll({
                where: { id: productIds }
            });

            order.totalAmount = order.products.reduce((total, p) => {
                const product = products.find(prod => prod.id === p.productId);
                return total + (product?.price || 0) * p.quantity;
            }, 0);

            const createdOrder = await this.model.create({ ...order });

            const orderProductData = order.products.map((p) => {
                const product = products.find((product) => product.id === p.productId);
                return {
                    orderId: createdOrder.id,
                    productId: p.productId,
                    price: product?.price || 0,
                    quantity: p.quantity
                };
            });

            await OrderProduct.bulkCreate(orderProductData);

            for (const p of order.products) {
                const product = await Product.findByPk(p.productId);
                if (product) {
                    product.stockQuantity -= p.quantity;
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

    async getOrderByUser(userId: string) {
        try {
            const orders = await this.model.findAll({
                where: { userId },
                include: [
                    {
                        model: Product,
                        as: "products",
                        through: { attributes: ['price', 'quantity'] },
                    },
                ],
            })

            return resp(200, orders);

        } catch (error) {
            console.log("Erro ao buscar pedido do usuário: ", error);
            throw new Error("Erro ao buscar pedido do usuário")
        }
    }

    async updateOrder(orderData: IOrder, id: string) {
        try {
            const order = await this.model.findByPk(id);
            if (!order) return respM(400, "Pedido não encontrado");

            await order.update({ ...orderData });
            return resp(200, order)
        } catch (error) {
            throw new Error("Erro ao editar o pedido")
        }
    }



}

export default OrderService;
interface IOrder {
    id?: number
    userId: number
    paymentStatus: string
    totalAmount: number
    products?: {
        productId: number;
        quantity: number;
    }[]
}

export default IOrder;
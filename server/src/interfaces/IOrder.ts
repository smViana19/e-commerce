interface IOrder {
    id?: number
    userId: number
    paymentStatus: string
    totalAmount: number
    products?: number[]
}

export default IOrder;
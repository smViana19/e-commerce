interface IProduct {
    id?: number
    categoryId: number
    name: string
    description: string
    price: number
    image: string
    stockQuantity: number
}

export default IProduct;
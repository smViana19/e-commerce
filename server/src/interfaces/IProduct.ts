interface IProduct {
    id?: number
    categoryId: number
    name: string
    description: string
    price: number
    image: string
    stockQuantity: number
    //categories: Category[]
}

export default IProduct;
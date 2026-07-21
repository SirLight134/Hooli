

export type Product = {
    name: string;
    description: string;
    price: number;
    stock: number;
    images?: string[];
    seller: string;
    category?: string;
    slug?: string;
}

//Data the client is allowed to send when creating product
export type CreateProductInput = Omit<Product, 'seller' | 'slug'>


//Makes all creation fields optional.
export type UpdateProductInput = Partial<CreateProductInput>
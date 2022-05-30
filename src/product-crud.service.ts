import { Product, products } from "./product";

export const createProduct = async (product: Product) : Promise<Product> => {
    products.push(product);

    return product;
}


export const getAllProducts = async () : Promise<Product[]> => {
    return products;
}

export const updateProduct = async ( updates: Product ): Promise<Product> => {
    let index = products.findIndex( prod => prod.id === updates['id'] );

    if( index > 0 || index == 0)
    
        products[index].productName = updates.productName,products[index].proddescription = updates.proddescription, products[index].productCode = updates.productCode, products[index].prodRating = updates.prodRating 

    return products[index]
}

export const deleteProduct = async ( id: number) : Promise<Product> => {
    const index = products.findIndex( prod => prod.id == id );

    if( index > 0 || index == 0) products.splice(index,1)
    
    return products[index]
}
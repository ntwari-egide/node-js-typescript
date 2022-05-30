import { Product } from '../product';
import * as productServices from '../services/product-crud.service'

export const getAllProductsList = async ( req: any, res: any) => {
    const productsList : Product[] = await productServices.getAllProducts();

    sendResponseHandler( res, "Successfully found list of products", productsList )
}

export const createProduct = async ( req: any, res: any) => {

    const product: Product = req.body

    let createdProduct = await productServices.createProduct(product);

    sendResponseHandler( res, "Successfully added new product", createProduct )

}

export const updateProduct = async ( req: any, res: any) => {
    const updates: Product = req.body

    const updatedProduct = await productServices.updateProduct( updates )

    sendResponseHandler( res, "successfully updated a product" , updatedProduct)
}

export const deleteProduct = async ( req: any, res: any ) => {
    const prodId : number = req.body.id;

    const deletedProduct = await productServices.deleteProduct( prodId )

    sendResponseHandler( res ,"Successfully deleted a product", deleteProduct)
}

const sendResponseHandler = ( res: any, messag: any, data: any ) => {
    try {
        res
            .status(200)
            .send( {
                message: 'Successfully found',
                data: data,
                length: 0 
            } )

    }catch (e) {
        res.status(404).send(e.message);
    }
}
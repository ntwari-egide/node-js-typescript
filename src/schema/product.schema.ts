import { number, object, string } from "zod";


export const createProductSchema = object({

    body: object({
        prodName: string({ required_error: "Product name is required!"}),
        prodDescription: string({ required_error: "Product description is required! " }),
        prodRating: number({ required_error: "Product rating is required!" })
    }).refine( data => data.prodRating < 0, {
        path: ['prodRating'],
        message: 'Product rating can not bee less than 0'
    }),

})


export const updateProductSchema = object({

    body: object({
        prodName: string({ required_error: 'Product name is required!'}),
        prodDescription: string({ required_error: 'Product description  is required!'}),
        prodRating: number({ required_error: 'Product rating is rquired!'})
    }).refine( data => data.prodRating < 0 , {
        path: ['prodRating'],
        message: 'Product rating is required!'
    })

})
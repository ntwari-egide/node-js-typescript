import * as dbProductService from '../services/product-crud-mongo'
import express from 'express'

const dbRouter = express.Router()

dbRouter.route('/')
    .get(dbProductService.getProductList)
    .post(dbProductService.createProduct)

dbRouter.route('/:id')
    .delete( dbProductService.deleteproduct )
    .put( dbProductService.updateroduct )

export default dbRouter
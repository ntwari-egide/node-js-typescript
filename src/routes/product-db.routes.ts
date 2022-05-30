import * as dbProductService from '../services/product-crud-mongo'
import express from 'express'

const router = express.Router()

router.route('/')
    .get(dbProductService.getProductList)
    .post(dbProductService.createProduct)

router.route('/:id')
    .delete( dbProductService.deleteproduct )
    .put( dbProductService.updateroduct )
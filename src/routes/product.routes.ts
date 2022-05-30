import express from "express"
import * as productServices from '../services/product-crud.service'

const router = express.Router()

router.route('/')
    .get(productServices.getAllProducts)
    .post(productServices.createProduct)

router.route('/:id')
    .put(productServices.updateProduct)
    .delete(productServices.deleteProduct)

export default router
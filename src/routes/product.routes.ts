import express from "express"
import * as productController from '../controllers/products'

const router = express.Router()

router.route('/')
    .get(productController.getAllProductsList)
    .post(productController.createProduct)

router.route('/:id')
    .put(productController.updateProduct)
    .delete(productController.deleteProduct)

export default router
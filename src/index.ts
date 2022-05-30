import './server'
import cors from 'cors'
import helmet from 'helmet'
import * as dotenv from  'dotenv'
import mongoose from 'mongoose'
import express from 'express'
import * as productController from  './controllers/products'
import * as dbProductController from './services/product-crud-mongo'

dotenv.config();

if( ! process.env.PORT) {
    console.log('Error to get ports')
    process.exit(1)
}

const PORT = parseInt( process.env.PORT as string, 10)
// const PORT = 8080

const app = express()

app.use(helmet())
app.use(cors())
app.use(express.json())

const server = app.listen(PORT, () => console.log(`[SERVER] listening on a port ${PORT}`));

app.get('/', (req,res) => res.send('Welcome to Node js with typescript template'))

// allowing headers in request

app.use(( req, res, next) => {
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PUT, DELETE, OPTIONS'
    )

    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.header('Access-Control-Allow-Credentials', "true");
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');

    next()
})


/**
 * routing the requests
 */

app.get('/products', productController.getAllProductsList)
app.post('/products', productController.createProduct)
app.put('/products', productController.updateProduct)
app.delete('/products', productController.deleteProduct)



app.get('/mongo/products', dbProductController.getProductList)
app.post('/mongo/products', dbProductController.createProduct)
app.put('/mongo/products', dbProductController.updateroduct)
app.delete('/mongo/products', dbProductController.deleteproduct)

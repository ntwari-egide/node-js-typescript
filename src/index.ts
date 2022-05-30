import cors from 'cors'
import helmet from 'helmet'
import * as dotenv from  'dotenv'
import mongoose from 'mongoose'
import express from 'express'
import * as productController from  './controllers/products'

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


/**
 * routing the requests
 */

app.get('/products', productController.getAllProductsList)
app.post('/products', productController.createProduct)
app.put('/products', productController.updateProduct)
app.delete('/products', productController.deleteProduct)
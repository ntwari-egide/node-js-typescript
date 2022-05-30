import './server'
import cors from 'cors'
import helmet from 'helmet'
import * as dotenv from  'dotenv'
import mongoose from 'mongoose'
import express from 'express'
import * as productController from  './controllers/products'
import * as dbProductController from './services/product-crud-mongo'
import router from './routes/product.routes'
import dbRouter from './routes/product-db.routes'
import { loggerMiddleWare } from './middlewares/logging'
import { setHeaderMiddleWare } from './middlewares/setHeaders'

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

app.use(( req, res, next) =>  setHeaderMiddleWare (req, res, next) )

app.use((req,res,next) => loggerMiddleWare(req,res,next))

/**
 * routing the requests
 */

app.use('/api/v3/products', router)


app.use('api/v3/mongo/products', dbRouter)

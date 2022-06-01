import './server'
import cors from 'cors'
import helmet from 'helmet'
import * as dotenv from  'dotenv'
import mongoose from 'mongoose'
import express, { NextFunction, Request, Response } from 'express'
import * as productController from  './controllers/products'
import * as dbProductController from './services/product-crud-mongo'
import router from './routes/product.routes'
import dbRouter from './routes/product-db.routes'
import { loggerMiddleWare } from './middlewares/logging'
import { setHeaderMiddleWare } from './middlewares/setHeaders'
import config from 'config';
import userRouter from './routes/user.routes';
import authRouter from './routes/auth.routes';
import cookieParser from 'cookie-parser';
import morgan from 'morgan'
import * as Redis from 'redis'
import axios from 'axios'


dotenv.config();

if( ! process.env.PORT) {
    console.log('Error to get ports')
    process.exit(1)
}

const PORT = parseInt( process.env.PORT as string, 10)
// const PORT = 8080

const app = express()

app.use(helmet())
app.use(express.json())

// Middleware

// 1. Body Parser
app.use(express.json({ limit: '10kb' }));

// 2. Cookie Parser
app.use(cookieParser());

// 3. Logger
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

// 4. Cors
app.use(
  cors({
    origin: config.get<string>('origin'),
    credentials: true,
  })
);


const server = app.listen(PORT, () => console.log(`[SERVER] listening on a port ${PORT}`));

app.get('/', (req,res) => res.send('Welcome to Node js with typescript template'))

// allowing headers in request

app.use(( req, res, next) =>  setHeaderMiddleWare (req, res, next) )

app.use((req,res,next) => loggerMiddleWare(req,res,next))

// use of redis in caching
const REDIS_EXPERATION_TIME = 20;
const redisClient = Redis.createClient()

app.get('/api/v3/photos', async ( req, res ) => {
  const albumId = req.query.albumId

  const { data } = await axios.get('https://jsonplaceholder.typicode.com/photos', {
    params: {albumId}
  })

  redisClient.setEx('photos', REDIS_EXPERATION_TIME, JSON.stringify(data))

  res.json(data)

})



/**
 * routing the requests
 */

app.use('/api/v3/products', router)


app.use('api/v3/mongo/products', dbRouter)

app.use(
    cors({
      origin: config.get<string>('origin'),
      credentials: true,
    })
);

// 5. Routes
app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);

// Global Error Handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    err.status = err.status || 'error';
    err.statusCode = err.statusCode || 500;
  
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
});


// UnKnown Routes
app.all('*', (req: Request, res: Response, next: NextFunction) => {
    const err = new Error(`Route ${req.originalUrl} not found`) as any;
    err.statusCode = 404;
    next(err);
});
  
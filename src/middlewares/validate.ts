import { AnyZodObject, ZodError } from "zod";
import * as express from 'express'

export const validate = 
    (  schema: AnyZodObject ) => {
        (req: express.Request, res: express.Response, next: express.NextFunction) => {
            try{
                schema.parse({
                    params: req.params,
                    query: req.query,
                    body: req.body
                })

                next();
            } catch( err: any) {
                if( err instanceof ZodError) {
                    return res.status(400).json(({
                        status: 'fail',
                        error: err.errors
                    }))
                }

                next()
            }
        }
    }
import * as express from  'express'

export const loggerMiddleWare = ( req: express.Request, res: express.Response, next: any ) => {
    console.log(`[LOGGING]: ${req.method} on ${req.path} ... `);
    next();
}
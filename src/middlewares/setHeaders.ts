import * as express from 'express'

export const setHeaderMiddleWare = ( req: express.Request, res: express.Response, next: any) => {
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

    console.log('[SERVER] finished setting up the headers of the application ...');
    

    next()
}
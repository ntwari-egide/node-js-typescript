import mongoose from "mongoose";

const uri: string = process.env.database

mongoose.connect( uri, (err) => {
    if( err ) console.log('Error: ', err.message)  
    else console.log('[DATABASE] server connected to database')
});
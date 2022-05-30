import mongoose from "mongoose";

const uri: string = 'mongodb+srv://ntwari:123@cluster0.y3jhx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

mongoose.connect( uri, (err) => {
    if( err ) console.log('Error: ', err.message)  
    else console.log('[DATABASE] server connected to database')
});
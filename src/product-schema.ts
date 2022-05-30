import mongoose, { Schema } from "mongoose";

export const Product = new Schema({
    id: { type: mongoose.Types.ObjectId, required: false },
    productName: String,
    productCode: String,
    proddescription: String,
    prodRating: Number,
});

const products = mongoose.model('products', Product )
export default products
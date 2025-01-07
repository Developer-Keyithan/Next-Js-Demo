import { Model, models, Schema } from "mongoose";

const productSchema = new Schema(
    name: {type: String, requied: true},
    price: {type: String, requied: true},
)
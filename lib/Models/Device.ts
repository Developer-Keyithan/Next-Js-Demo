import { Schema, model, models } from "mongoose";

const deviceSchema = new Schema({
    name: { type: String, required: true },
    price: { type: String, required: true },
    category: { type: String, required: true }
},{ timestamps: true });

const deviceModel = models.Device || model('Device', deviceSchema);

export default deviceModel;
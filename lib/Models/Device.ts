import { Schema, model, models } from "mongoose";

const deviceSchema = new Schema({

    device: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true }
}, { timestamps: true });

const deviceModel = models.Device || model('Device', deviceSchema);

export default deviceModel;
import { models, Schema, model } from "mongoose"
import mongoose from "mongoose"

const itemSchema = new Schema({

    creator: {
        type: mongoose.Schema.Types.ObjectId,
      },
    tripId: String,
    bagId: String,
    categoryId: String,
    name: { type: String, trim: true},
    qty: { type: Number, min: 1 },
    description: { type: String, trim: true },
    weight: { type: Number, min: 0.1 },
    wgtOpt: {type: String},
    priority: { type: String, trim: true, default: "low" },
    link: String,
    worn: {type: Boolean, default: false},
   

}, { timestamps: true })



const item = models.items || model("items", itemSchema)

module.exports = item
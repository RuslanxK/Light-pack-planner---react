import { models, Schema, model } from "mongoose"
import mongoose from "mongoose"

const categorySchema = new Schema({

    creator: {
        type: mongoose.Schema.Types.ObjectId,
      },
    tripId: String,
    bagId: String,
    name: { type: String, trim: true },
   
})


const category = models.categories || model("categories", categorySchema)

module.exports = category
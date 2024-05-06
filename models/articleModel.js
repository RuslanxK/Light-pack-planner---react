import { models, Schema, model } from "mongoose"


const articleSchema = new Schema({

    title: { type: String, trim: true },
    description: { type: String, trim: true },
    image: { type: Number, min: 0, default: 0 },
   
  },
  
  { timestamps: true }
  
);


const article = models.articles || model("articles", articleSchema)

module.exports = article
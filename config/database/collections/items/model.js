import mongoose from "mongoose";

// create schema 
const itemSchema = new mongoose.Schema({
    item: String
});

module.exports = {
    itemSchema: itemSchema,
    itemModel: mongoose.model('itemModel', itemSchema)
}

import mongoose from "mongoose";
import {itemSchema} from '../items/model'


const userSchema = new mongoose.Schema({
    userName: String,
    account: String,
    password: String,
    toDoList: [itemSchema]
});

module.exports = {
    userSchema: userSchema,
    userModel: mongoose.model('userModel', userSchema)
}
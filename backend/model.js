//import { mongoose } from "./app";
import mongoose from "mongoose"

export const create_account_Schema = new mongoose.Schema({
    id : Number,
    username : String,
    balance : Number,
    time : Date
});

export const create_account = mongoose.model("createAccount", create_account_Schema);

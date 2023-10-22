//import { mongoose } from "./app";
import mongoose from "mongoose"

export const account_Schema = new mongoose.Schema({
    id : Number,
    username : String,
    balance : Number,
    createAt : {type: Date, default: Date.now()},
    updateAt : {type: Date, default: Date.now()}
});
export const account = mongoose.model("Account", account_Schema);

export const money_transfer_Schema = new mongoose.Schema({
    type : {type: String, default: "transfer"},
    receiverid : Number,
    senderid : Number,
    amount : Number,
    receiverbalance : Number,
    senderbalance : Number,
    createAt : {type: Date, default: Date.now()}
});
export const money_transfer = mongoose.model("Transfer", money_transfer_Schema, 'moneyTransfer');

export const deposit_Schema = new mongoose.Schema({
    type : {type: String, default: "deposit"},
    userid : Number,
    amount : Number,
    balance : Number,
    createAt : {type: Date, default: Date.now()}
});
export const deposit = mongoose.model("deposit", deposit_Schema, 'moneyTransfer');

export const withdraw_Schema = new mongoose.Schema({
    type : {type: String, default: "withdraw"},
    userid : Number,
    amount : Number,
    balance : Number,
    createAt : {type: Date, default: Date.now()}
});
export const withdraw = mongoose.model("withdraw", withdraw_Schema, 'moneyTransfer');

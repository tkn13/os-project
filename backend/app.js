import { create_account } from "./model.js"

import express from "express"
import bodyParser from "body-parser"
import mongoose from "mongoose"
// const express = require("express");
// const bodyParser = require("body-parser");
const port = 3000;
// const mongoose = require("mongoose");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
mongoose.connect('mongodb://mongodb:27017/MymongoDB', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.get('/all', (req, res) => {
  create_account.find({})
});

app.post('/create-account', (req, res) => {
  const account = new create_account({
    id: 0,
    account: req.body.account,
    amount: req.body.amount,
    time: Date.now
  });

  account.save();
  res.send("201");
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
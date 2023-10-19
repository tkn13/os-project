const express = require("express");
const bodyParser = require("body-parser");
const port = 3000;
const mongoose = require("mongoose");
const app = express();

app.use(bodyParser.urlencoded({extended : true}));
mongoose.connect('mongodb://mongodb:27017/MymongoDB', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.get('/', (req, res) => {
  res.send('Hello, MongoDB!');
});

app.post('/test', (req, res) => {
    var name = req.body.Fname + " " + req.body.Lname
    res.send("Thank!: " + name)
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
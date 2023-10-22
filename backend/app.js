import { account, deposit, money_transfer, withdraw } from "./model.js"
import { autoIncrement, getBalance } from "./common.js"
import { BadRequest, Create } from "./constant.js"

import express from "express"
import bodyParser from "body-parser"
import mongoose from "mongoose"
const port = 3000;
const app = express();

// const mongoose = require("mongoose");
// const express = require("express");
// const bodyParser = require("body-parser");

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
//test
app.get('/all-account', (req, res) => {
  account.find({}, (err, accounts) => {
    if (err) res.status(ServerError)
    else res.json(accounts)
  })
});
//test
app.get('/all-money-transfer', (req, res) => {
  money_transfer.find({}, (err, accounts) => {
    if (err) res.status(ServerError)
    else res.json(accounts)
  })
});
//finish
app.post('/create-account', (req, res) => {
  const { username, balance } = req.body;
  var id;
  autoIncrement().then((count) => {
    id = count;

    var newAccount = new account({
      id,
      username,
      balance,
    });

    newAccount.save()
      .then(() => {
        res.sendStatus(Create);
      })
      .catch((err) => {
        res.sendStatus(ServerError);
      });
  })
})
//finish
app.post('/transfer', (req, res) => {
  const { receiverid, senderid, balance } = req.body;

  var transfer = new money_transfer({
    receiverid,
    senderid,
    balance
  })

  getBalance(senderid).then((senderAccountBlance, err) => {
    if (err) res.sendStatus(ServerError)
    else if (senderAccountBlance == null) res.sendStatus(BadRequest)
    else if (senderAccountBlance < balance) res.sendStatus(BadRequest)
    else {
      getBalance(receiverid).then((receiverAccountBalance, err) => {
        const updateReceiver = {
          $set: {
            balance: receiverAccountBalance + balance,
            updateAt: Date.now()
          }
        }

        const updateSender = {
          $set: {
            balance: senderAccountBlance - balance,
            updateAt: Date.now()
          }
        }
        const senderQuery = { id: senderid };
        const receiverQuery = { id: receiverid };

        account.updateOne(senderQuery, updateSender, (err, result) => {
          if (err) {
            throw (err)
          } else {
            console.log('Document updated successfully.');
          }
        })

        account.updateOne(receiverQuery, updateReceiver, (err, result) => {
          if (err) {
            throw (err)
          } else {
            console.log('Document updated successfully.');
          }
        })

        transfer.save()
          .then(() => {
            res.send(Create);
          })
          .catch((err) => {
            res.status(ServerError);
          })
      })
    }
  })
})
//finish
app.put('/deposit', (req, res) => {
  const { userid, balance } = req.body;

  var depositInfo = new deposit({
    userid,
    balance
  })

  getBalance(userid).then((accountBalance, err) => {
    if (err) res.sendStatus(ServerError);
    else if (accountBalance == null) res.sendStatus(BadRequest);
    else {
      const update = {
        $set: {
          balance: balance + accountBalance,
          updateAt: Date.now()
        }
      }

      const myQuery = { id: userid };

      account.updateOne(myQuery, update, (err, result) => {
        if (err) {
          throw (err)
        } else {
          console.log('Document updated successfully.');
        }
      })

      depositInfo.save();
      res.send(Create);
    }
  })
})
//finish
app.put('/withdraw', (req, res) => {
  const { userid, balance } = req.body;

  var withdrawInfo = new withdraw({
    userid,
    balance: balance
  })

  getBalance(userid).then((accountBalance, err) => {
    if (err) res.sendStatus(ServerError);
    else if (accountBalance == null) res.sendStatus(BadRequest);
    else if (accountBalance < balance) res.sendStatus(BadRequest);
    else {
      const update = {
        $set: {
          balance: accountBalance - balance,
          updateAt: Date.now()
        }
      }

      const myQuery = { id: userid };

      account.updateOne(myQuery, update, (err, result) => {
        if (err) {
          throw (err)
        } else {
          console.log('Document updated successfully.');
        }
      })

      withdrawInfo.save();
      res.send(Create);
    }
  })
})

//test
app.post('/create-account-manual', (req, res) => {
  const { id, username, balance } = req.body;

  var create_account = new account({
    id,
    username,
    balance
  });

  create_account.save()
    .then(() => {
      res.sendStatus(Create)
    })
    .catch((err) => {
      res.sendStatus(ServerError)
    });
})

//test
app.get('/view-collection', (req, res) => {
  mongoose.connection.db.listCollections().toArray((err, collections) => {
    if (err) {
      console.error('เกิดข้อผิดพลาดในการดึงรายชื่อคอลเลกชัน:', err);
    } else {
      collections.forEach((collection) => {
        console.log('คอลเลกชัน:', collection.name);
      });
    }
  })
  res.send(OK);
})
//test
app.delete('/delete-all-account', (req, res) => {
  account.deleteMany({}, (err) => {
    if (err) {
      console.error('Error deleting data:', err);
    } else {
      console.log('All data deleted successfully.');
    }
  });
  res.send(OK);
})
//test
app.delete('/delete-all-moneytransfer', (req, res) => {
  money_transfer.deleteMany({}, (err) => {
    if (err) {
      console.error('Error deleting data:', err);
    } else {
      console.log('All data deleted successfully.');
    }
  });
  res.send(OK);
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
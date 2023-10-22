import { account, deposit, money_transfer, withdraw } from "./model.js"
import { autoIncrement, getBalance } from "./common.js"
import { BadRequest, Create, OK, ServerError } from "./constant.js"

import express from "express"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import cors from "cors"
const port = 3000;
const app = express();

app.use(cors())

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

//finish
app.get('/os-project/get-account', (req, res) => {
  account.find({}, (err, accounts) => {
    if (err) {
      res.send(err);
      res.status(ServerError);
      return;
    }
    else {
      res.json(accounts);
      return;
    }
  })
});

//finish
app.post('/os-project/create-account', (req, res) => {
  const { username, balance } = req.body;
  if(typeof(balance) != 'number') {
    res.sendStatus(BadRequest);
    return;
  }
  var id;
  autoIncrement().then((count) => {
    id = count;

    var newAccount = new account({
      id,
      username,
      balance,
    });

    newAccount.save();
    res.sendStatus(ServerError);
    return;
  })
})
//finish
app.post('/os-project/transfer', (req, res) => {
  const { receiverid, senderid, amount } = req.body;
  if(typeof(amount) != 'number') {
    res.sendStatus(BadRequest);
    return;
  }

  getBalance(senderid).then((senderAccountBlance, err) => {
    if (err) {
      res.send(err);
      res.sendStatus(ServerError);
      return;
    }
    else if (senderAccountBlance == null) {
      res.sendStatus(BadRequest);
      return;
    }
    else if (senderAccountBlance < amount) {
      res.sendStatus(BadRequest);
      return;
    }
    else {
      getBalance(receiverid).then((receiverAccountBalance, err) => {
        var transfer = new money_transfer({
          receiverid,
          senderid,
          amount,
          receiverbalance: receiverAccountBalance + amount,
          senderbalance: senderAccountBlance - amount
        })

        const updateReceiver = {
          $set: {
            balance: receiverAccountBalance + amount,
            updateAt: Date.now()
          }
        }

        const updateSender = {
          $set: {
            balance: senderAccountBlance - amount,
            updateAt: Date.now()
          }
        }
        const senderQuery = { id: senderid };
        const receiverQuery = { id: receiverid };

        account.updateOne(senderQuery, updateSender, (err, result) => {
          if (err) {
            res.send(err);
            res.sendStatus(BadRequest)
            return;
          } else {
            console.log('Document updated successfully.');
          }
        })

        account.updateOne(receiverQuery, updateReceiver, (err, result) => {
          if (err) {
            res.send(err);
            res.sendStatus(BadRequest)
            return;
          } else {
            console.log('Document updated successfully.');
          }
        })

        transfer.save();
        res.sendStatus(Create);
        return;
      })
    }
  })
})
//finish
app.put('/os-project/deposit', (req, res) => {
  const { userid, amount } = req.body;
  if(typeof(amount) != 'number') {
    res.sendStatus(BadRequest);
    return;
  }

  getBalance(userid).then((accountBalance, err) => {
    if (err) {
      res.send(err);
      res.sendStatus(ServerError);
      return;
    }
    else if (accountBalance == null) {
      res.sendStatus(BadRequest);
      return;
    }
    else {
      var depositInfo = new deposit({
        userid,
        amount,
        balance: accountBalance + amount
      })

      const update = {
        $set: {
          balance: accountBalance + amount,
          updateAt: Date.now()
        }
      }

      const myQuery = { id: userid };

      account.updateOne(myQuery, update, (err, result) => {
        if (err) {
          res.send(err);
          res.sendStatus(BadRequest)
          return;
        } else {
          console.log('Document updated successfully.');
        }
      })

      depositInfo.save();
      res.send(Create);
      return;
    }
  })
})
//finish
app.put('/os-project/withdraw', (req, res) => {
  const { userid, amount } = req.body;
  if(typeof(amount) != 'number') {
    res.sendStatus(BadRequest);
    return;
  }

  getBalance(userid).then((accountBalance, err) => {
    if (err) {
      res.send(err);
      res.sendStatus(ServerError);
      return;
    }
    else if (accountBalance == null) {
      res.sendStatus(BadRequest);
      return;
    }
    else if (accountBalance < amount) {
      res.sendStatus(BadRequest);
      return;
    }
    else {
      var withdrawInfo = new withdraw({
        userid,
        amount,
        balance: accountBalance - amount
      })

      const update = {
        $set: {
          balance: accountBalance - amount,
          updateAt: Date.now()
        }
      }

      const myQuery = { id: userid };

      account.updateOne(myQuery, update, (err, result) => {
        if (err) {
          res.send(err);
          res.sendStatus(ServerError);
          return;
        } else {
          console.log('Document updated successfully.');
        }
      })

      withdrawInfo.save();
      res.send(Create);
      return;
    }
  })
})

app.get('/os-project/transaction', async (req, res) => {
  const { userid } = req.body;
  if(typeof(userid) != 'number') {
    res.sendStatus(BadRequest);
    return;
  }

  const documents = db.collection('moneyTransfer').find({})
  let transactions = [];

  await documents.forEach(async (doc) => {
    //if type is deposit and withdraw
    if(doc.type != "transfer"){
      if(doc.userid == userid){
        //create transaction to add to array
        const newTransaction = {
          userid,
          deposit: (doc.type == "deposit") ? doc.amount : null,
          withdraw: (doc.type == "withdraw") ? doc.amount : null,
          balance: doc.balance,
          timestamp: doc.createAt
        }

        transactions.push(Object.assign({}, newTransaction));
      }
    }
    //if type is transfer
    else {
      //if this user is receiver
      if(doc.receiverid == userid){
        const newTransaction = {
          userid,
          deposit: doc.amount,
          withdraw: null,
          balance: doc.receiverbalance,
          timestamp: doc.createAt
        }

        transactions.push(Object.assign({}, newTransaction));
      }
      //if this user is sender
      else if(doc.senderid == userid){
        const newTransaction = {
          userid,
          deposit: null,
          withdraw: doc.amount,
          balance: doc.senderbalance,
          timestamp: doc.createAt
        }

        transactions.push(Object.assign({}, newTransaction));
      }
    }
  })
  res.json(transactions);
  return;
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
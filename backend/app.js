import { account, deposit, money_transfer, withdraw } from "./model.js"
import { autoIncrement, getBalance } from "./common.js"
import { BadRequest, Create, OK, ServerError, minTransaction } from "./constant.js"

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

app.get('/os-project/get-account', async (req, res) => {
  try {
    const accounts = await account.find({});
    res.json(accounts);
    return;
  } catch (err) {
    console.error('Error:', err);
    res.status(ServerError).send(err);
  }
});

app.post('/os-project/create-account', async (req, res) => {
  const { username, balance } = req.body;

  if (typeof (balance) != 'number') {
    res.sendStatus(BadRequest);
    return;
  }
  var id;

  const session = await mongoose.startSession();
  session.startTransaction({
    "readConcern": { "level": "snapshot" },
    "writeConcern": { "w": "majority" }
  })
  try {
    autoIncrement().then(async (count) => {
      id = count;

      var newAccount = new account({
        id,
        username,
        balance,
      });

      await newAccount.save();
      await session.commitTransaction();
      session.endSession();
      res.sendStatus(Create);
      return;
    })
  } catch (err) {
    res.status(ServerError).send(err);
    return;
  }
})

app.post('/os-project/transfer', async (req, res) => {
  const { receiverid, senderid, amount } = req.body;
  if (typeof (amount) != 'number') {
    res.sendStatus(BadRequest);
    return;
  }
  if(amount < minTransaction || receiverid == senderid) {
    res.sendStatus(BadRequest);
    return;
  }

  getBalance(senderid).then((senderAccountBlance, err) => {
    if (err) {
      res.sendStatus(ServerError).send(err);
      return;
    }
    else if (senderAccountBlance == null || senderAccountBlance < amount) {
      res.sendStatus(BadRequest);
      return;
    }
    else {
      getBalance(receiverid).then(async (receiverAccountBalance, err) => {
        if (err) {
          res.sendStatus(ServerError).send(err);
          return;
        }
        else if (receiverAccountBalance == null || receiverAccountBlance < amount) {
          res.sendStatus(BadRequest);
          return;
        }

        const session = await mongoose.startSession();
        session.startTransaction({
          "readConcern": { "level": "snapshot" },
          "writeConcern": { "w": "majority" }
        });

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
        try {
          await account.updateOne(senderQuery, updateSender);
          await account.updateOne(receiverQuery, updateReceiver);

          await transfer.save();

          await session.commitTransaction();
          session.endSession();
          res.sendStatus(Create);
          return;
        } catch (err) {
          await session.abortTransaction();
          session.endSession();

          console.error('Error:', err);
          res.status(ServerError).send(err);
          return;
        }
      })
    }
  })
})

app.put('/os-project/deposit', async (req, res) => {
  const { userid, amount } = req.body;
  if (typeof (amount) != 'number') {
    res.sendStatus(BadRequest);
    return;
  }
  if(amount < minTransaction) {
    res.sendStatus(BadRequest);
    return;
  }

  getBalance(userid).then(async (accountBalance, err) => {
    if (err) {
      res.sendStatus(ServerError).send(err);
      return;
    }
    else if (accountBalance == null) {
      res.sendStatus(BadRequest);
      return;
    }
    else {
      const session = await mongoose.startSession();
      session.startTransaction({
        "readConcern": { "level": "snapshot" },
        "writeConcern": { "w": "majority" }
      });
      try {
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

        await account.updateOne(myQuery, update);

        await depositInfo.save();

        await session.commitTransaction();
        session.endSession();
        res.sendStatus(Create);
        return;
      } catch (err) {
        await session.abortTransaction();
        session.endSession();

        console.error('Error:', err);
        res.status(ServerError).send(err);
        return;
      }
    }
  })
})

app.put('/os-project/withdraw', (req, res) => {
  const { userid, amount } = req.body;
  if (typeof (amount) != 'number') {
    res.sendStatus(BadRequest);
    return;
  }
  if(amount < minTransaction) {
    res.sendStatus(BadRequest);
    return;
  }

  getBalance(userid).then(async (accountBalance, err) => {
    if (err) {
      res.sendStatus(ServerError).send(err);
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
      const session = await mongoose.startSession();
      session.startTransaction({
        "readConcern": { "level": "snapshot" },
        "writeConcern": { "w": "majority" }
      });

      try {
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

        await account.updateOne(myQuery, update);

        await withdrawInfo.save();

        await session.commitTransaction();
        session.endSession();
        res.sendStatus(Create);
        return;
      } catch (err) {
        await session.abortTransaction();
        session.endSession();

        console.error('Error:', err);
        res.status(ServerError).send(err);
        return;
      }
    }
  })
})

app.get('/os-project/transaction', async (req, res) => {
  const { userid } = req.body;
  if (typeof (userid) != 'number') {
    res.sendStatus(BadRequest);
    return;
  }

  try {
    const documents = db.collection('moneyTransfer').find({})
    let transactions = [];

    await documents.forEach(async (doc) => {
      //if type is deposit and withdraw
      if (doc.type != "transfer") {
        if (doc.userid == userid) {
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
        if (doc.receiverid == userid) {
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
        else if (doc.senderid == userid) {
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
  } catch (err) {
    res.status(ServerError).send(err);
    return;
  }

})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
import { account } from "./model.js";

export async function autoIncrement() {
    return new Promise((resolve, reject) => {
      account.countDocuments({}, (err, count) => {
          resolve(count + 1);
      });
    });
}

export async function getBalance(accountId) {
    return new Promise((resolve, reject) => {
        account.findOne({id: accountId}, (err, accountInfo) => {
            if(err) reject(err)
            else if(accountInfo == null) {
                resolve(null)
            }
            else resolve(accountInfo.balance)
        })
    });
}
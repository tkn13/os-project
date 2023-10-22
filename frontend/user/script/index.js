var transfer_btn = document.getElementById("money-transfer-btn");
var deposit_btn = document.getElementById("deposit-btn");
var withdrawal_btn = document.getElementById("withdrawal-btn");
var transaction_btn = document.getElementById("transaction-history-btn");

var transfer_receiverid = document.getElementById("receiverid-input")
var transfer_senderid = document.getElementById("senderid-input")
var transfer_balance = document.getElementById("balance-input");

var deposit_userid = document.getElementById("deposit-userid-input");
var deposit_balance = document.getElementById("deposit-balance-input");

var withdrawal_userid = document.getElementById("withdrawal-userid-input");
var withdrawal_balance = document.getElementById(" withdrawal-balance-input");


transfer_btn.addEventListener('click', async () => {
    try{
        const account = {
            receiverid : transfer_receiverid.value,
            senderid : transfer_senderid.value,
            balance : transfer_balance.value
        };
        const jsonDataString = JSON.stringify(account);

        const res = await fetch('http://localhost:3000/os-project/transfer',{
            method : "POST",
            body : jsonDataString
        });

        if(res.status != 200){
            window.location.href = '../error.html';
        }else{
            window.location.href = '../success.html';
        }
    } catch (error) {
        console.error('An error occurred:', error);
    }
});

deposit_btn.addEventListener('click', async () => {
    try{
        const account = {
            userid : deposit_userid.value,
            balance : deposit_balance.value
        };
        const jsonDataString = JSON.stringify(account);

        const res = await fetch('http://localhost:3000/os-project/deposit',{
            method : "PUT",
            body : jsonDataString
        });

        if(res.status != 200){
            window.location.href = '../error.html';
        }else{
            window.location.href = '../success.html';
        }
    } catch (error) {
        console.error('An error occurred:', error);
    }
});

withdrawal_btn.addEventListener('click', async () => {
    try{
        const account = {
            user : withdrawal_userid.value,
            balance : withdrawal_userid.value
        };
        const jsonDataString = JSON.stringify(account);

        const res = await fetch('http://localhost:3000/os-project/withdrawal',{
            method : "PUT",
            body : jsonDataString
        });

        if(res.status != 200){
            window.location.href = '../error.html';
        }else{
            window.location.href = '../success.html';
        }
    } catch (error) {
        console.error('An error occurred:', error);
    }
});

transaction_btn.addEventListener('click', async () => {
    window.location.href = '../transaction.html';
});
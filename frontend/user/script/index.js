var transfer_btn = document.getElementById("money-transfer");
var deposit_btn = document.getElementById("deposit");
var withdrawal_btn = document.getElementById("withdrawal");
var transaction_btn = document.getElementById("transaction-history");

var transfer_receiverid = document.getElementById("receiverid")
var transfer_senderid = document.getElementById("senderid")
var transfer_balance = document.getElementById("balance");

var deposit_userid = document.getElementById("deposit_userid");
var deposit_balance = document.getElementById("deposit_balance");

var withdrawal_userid = document.getElementById("withdrawal_userid");
var withdrawal_balance = document.getElementById(" withdrawal_balance");


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
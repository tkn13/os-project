var transfer_but = document.getElementById("money-transfer");
var deposit_but = document.getElementById("deposit");
var withdrawal_but = document.getElementById("withdrawal");

var transfer_receiverid = document.getElementById("receiverid")
var transfer_senderid = document.getElementById("senderid")
var transfer_balance = document.getElementById("balance");

var deposit_userid = document.getElementById("userid");
var deposit_balance = document.getElementById("balance");

var withdrawal_userid = document.getElementById("userid");
var withdrawal_balance = document.getElementById("balance");

transfer_but.addEventListener('click', async () => {
    try{
        const res = await fetch('http://localhost:3000/os-project/transfer',{
            method : "POST",
            body : jsonDataString
        });

        const account = {
            receiverid : transfer_receiverid.value,
            senderid : transfer_senderid.value,
            balance : transfer_balance.value
        };
        const jsonDataString = JSON.stringify(account);
    } catch (error) {
        console.error('An error occurred:', error);
    }
});

deposit_but.addEventListener('click', async () => {
    try{
        const res = await fetch('http://localhost:3000/os-project/deposit',{
            method : "PUT",
            body : jsonDataString
        });

        const account = {
            userid : deposit_userid.value,
            balance : deposit_balance.value
        };
        const jsonDataString = JSON.stringify(account);
    } catch (error) {
        console.error('An error occurred:', error);
    }
});

withdrawal_but.addEventListener('click', async () => {
    try{
        const res = await fetch('http://localhost:3000/os-project/withdrawal',{
            method : "PUT",
            body : jsonDataString
        });

        const account = {
            user : withdrawal_userid.value,
            balance : withdrawal_userid.value
        };
        const jsonDataString = JSON.stringify(account);
    } catch (error) {
        console.error('An error occurred:', error);
    }
});
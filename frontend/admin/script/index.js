var button = document.getElementById("test-button");
var create_account_but = document.getElementById("create-account");
var get_account_but = document.getElementById("get-account");
var transfer_but = document.getElementById("money-transfer");
var deposit_but = document.getElementById("deposit");
var withdrawal_but = document.getElementById("withdrawal");
var create_account_username = document.getElementById("username");
var create_account_balance = document.getElementById("balance");
var get_account_id = document.getElementById("id")
var get_account_username = document.getElementById("username");
var get_account_balance = document.getElementById("balance");
var transfer_receiverid = document.getElementById("receiverid")
var transfer_senderid = document.getElementById("senderid")
var transfer_balance = document.getElementById("balance");
var deposit_userid = document.getElementById("userid");
var deposit_balance = document.getElementById("balance");
var withdrawal_userid = document.getElementById("userid");
var withdrawal_balance = document.getElementById("balance");

button.addEventListener('click', async () => {
    try {
        const res = await fetch('http://localhost:3000/test',{
            method : "GET"
        });

        // if (res.status !== 200) {
        //     alert('Something went wrong');
        //     return;
        // }

        const jsonData = await res.json();
        const jsonDataString = encodeURIComponent(JSON.stringify(jsonData));
        window.location.href = 'succesfully.html?data=' + jsonDataString;
    } catch (error) {
        console.error('An error occurred:', error);
    }
});

create_account_but.addEventListener('click', async () => {

    try{
        const res = await fetch('http://localhost:3000/os-project/create-account',{
            method : "POST",
            body : jsonDataString
        });

        const data = {
            username : create_account_username.value,
            balance : create_account_balance.value
        };
        const jsonDataString = JSON.stringify(data);
    } catch (error) {
        console.error('An error occurred:', error);
    }
});

get_account_but.addEventListener('click', async () => {
    try{
        const res = await fetch('http://localhost:3000/os-project/get-account',{
            method : "GET"
        });

    } catch (error) {
        console.error('An error occurred:', error);
    }
});

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
var create_account_but = document.getElementById("create-account");
var get_account_but = document.getElementById("get-account");
var create_account_username = document.getElementById("username");
var create_account_balance = document.getElementById("balance");
var get_account_id = document.getElementById("id")
var get_account_username = document.getElementById("username");
var get_account_balance = document.getElementById("balance");

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
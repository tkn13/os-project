var create_account_but = document.getElementById("create-account");
var get_account_but = document.getElementById("get-account");
var create_account_username = document.getElementById("create_account_username");
var create_account_balance = document.getElementById("create_account_balance");

create_account_but.addEventListener('click', async () => {

    const data = {
        username: create_account_username.value,
        balance: create_account_balance.value
    };
    const jsonDataString = JSON.stringify(data);

    try {
        const res = await fetch('http://localhost:3000/os-project/create-account', {
            method: "POST",
            body: jsonDataString
        });

        if (res.status != 200) {
            window.location.href = '../error.html'
            return
        } else {
            window.location.href = '../suceess.html'
        }
    } catch (error) {
        console.error('An error occurred:', error);
    }
});

get_account_but.addEventListener('click', async () => {
    window.location.href = 'get-account.html'
});
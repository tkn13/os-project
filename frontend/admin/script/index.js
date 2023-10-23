var create_account_btn = document.getElementById("create-account-btn");
var get_account_btn = document.getElementById("get-account-btn");
var create_account_username = document.getElementById("create-account-username-input");
var create_account_balance = document.getElementById("create-account-balance-input");

create_account_btn.addEventListener('click', async () => {

    try {
        const data = {
            username: create_account_username.value,
            balance: parseInt(create_account_balance.value)
        };
        const jsonDataString = JSON.stringify(data)
        console.log(jsonDataString)
        const res = await fetch('http://localhost:3000/os-project/create-account', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
              },
            body: jsonDataString
        });

        if (res.status != 201) {
            window.location.href = 'error.html'
            return
        } else {
            window.location.href = 'success.html'
        }
    } catch (error) {
        console.error('An error occurred:', error);
    }
});

get_account_btn.addEventListener('click', async () => {
    window.location.href = 'get-account.html'
});
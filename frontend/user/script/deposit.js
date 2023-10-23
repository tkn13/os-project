var deposit_btn = document.getElementById("deposit-btn");

var deposit_userid = document.getElementById("deposit-userid-input");
var deposit_balance = document.getElementById("deposit-balance-input");

deposit_btn.addEventListener('click', async () => {
    try{
        const account = {
            userid : parseInt(deposit_userid.value),
            amount : parseInt(deposit_balance.value)
        };
        const jsonDataString = JSON.stringify(account);

        const res = await fetch('http://localhost:3000/os-project/deposit',{
            method : "PUT",
            headers: {
                "Content-Type": "application/json",
              },
            body : jsonDataString
        });

        if(res.status != 201){
            window.location.href = 'error.html';
        }else{
            window.location.href = 'success.html';
        }
    } catch (error) {
        console.error('An error occurred:', error);
    }
});
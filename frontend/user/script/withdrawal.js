var withdrawal_btn = document.getElementById("withdrawal-btn");

var withdrawal_userid = document.getElementById("withdrawal-userid-input");
var withdrawal_balance = document.getElementById("withdrawal-balance-input");

withdrawal_btn.addEventListener('click', async () => {
    try{
        const account = {
            userid : parseInt(withdrawal_userid.value),
            amount : parseInt(withdrawal_balance.value)
        };
        const jsonDataString = JSON.stringify(account);

        const res = await fetch('http://localhost:3000/os-project/withdraw',{
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
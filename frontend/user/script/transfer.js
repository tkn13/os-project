var transfer_btn = document.getElementById("money-transfer-btn");

var transfer_receiverid = document.getElementById("receiverid-input")
var transfer_senderid = document.getElementById("senderid-input")
var transfer_balance = document.getElementById("balance-input");


transfer_btn.addEventListener('click', async () => {
    try{
        const account = {
            receiverid : parseInt(transfer_receiverid.value),
            senderid : parseInt(transfer_senderid.value),
            amount : parseInt(transfer_balance.value)
        };
        const jsonDataString = JSON.stringify(account);

        const res = await fetch('http://localhost:3000/os-project/transfer',{
            method : "POST",
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




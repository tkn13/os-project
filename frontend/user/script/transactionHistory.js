async () => {
    try {
        const history = {
            userid: document.getElementById("transaction_userid").value,
        }
        const jsonDataString = JSON.stringify(history);

        const res = await fetch('http://localhost:3000/os-project/transaction', {
            method: "GET",
            body: jsonDataString
        });

        if (res.status != 200) {
            window.location.href = '../error.html';
            return;
        }
        const table = document.getElementById('transaction-table');
        data.forEach(entry => {
            const row = table.insertRow();
            const useridCell = row.insertCell(0);
            const depositCell = row.insertCell(1);
            const withdrawalCell = row.insertCell(2);
            const amountCell = row.insertCell(3);
            const timestampCell = row.insertCell(4);
            useridCell.textContent = entry.userid;
            depositCell.textContent = entry.deposit;
            withdrawalCell.textContent = entry.withdrawal;
            amountCell.textContent = entry.amount;
            const date = new Date(entry.timestamp);
            const option = {
                year: '2-digit',
                month: '2-digit',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            };
            const formattedDate = date.toLocaleString('en-GB', option);
            timestampCell.textContent = formattedDate;
        });
    } catch (error) {
        console.error('An error occurred:', error);
    }
}             
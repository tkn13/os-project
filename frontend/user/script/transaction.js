window.addEventListener('load', async () => {
    function getQueryParam(parameterName) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(parameterName);
    }

    const userId = getQueryParam("userid");
    try {
        const history = {
            userid: parseInt(userId)
        }
        const jsonDataString = JSON.stringify(history);

        const res = await fetch('http://localhost:3000/os-project/transaction', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
              },
            body: jsonDataString
        });

        const data = await res.json()

        const table = document.getElementById('transaction-table');
        data.forEach(entry => {
            const row = table.insertRow();
            const useridCell = row.insertCell(0);
            const timestampCell = row.insertCell(1);
            const depositCell = row.insertCell(2);
            const withdrawalCell = row.insertCell(3);
            const amountCell = row.insertCell(4);
            useridCell.textContent = entry.userid;
            depositCell.textContent = entry.deposit;
            withdrawalCell.textContent = entry.withdraw;
            amountCell.textContent = entry.balance;
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
)
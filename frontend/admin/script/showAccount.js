try {
    const res = await fetch('http://localhost:3000/os-project/get-account', {
        method: "GET"
    });

    if (res.status != 200) {
        window.location.href = '../error.html'
        return
    }

    const data = res.json;

    const table = document.getElementById('user-table')
    data.forEach(entry => {
        const row = table.insertRow();
        const idCell = row.insertCell(0);
        const userCell = row.insertCell(1);
        const balanceCell = row.insertCell(2);

        idCell.textContent = entry.id;
        userCell.textContent = entry.username;
        balanceCell.textContent = entry.balance;
    });

} catch (error) {
    console.error('An error occurred:', error);
}
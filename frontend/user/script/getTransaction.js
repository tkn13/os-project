var transaction_btn = document.getElementById("transaction-history-btn");
var transaction_user_input = document.getElementById("transaction-userid-input");

transaction_btn.addEventListener('click', async () => {
    var userId = transaction_user_input.value;

    var encodedUserId = encodeURIComponent(userId);

    var destinationURL = 'showtransaction.html?userid=' + encodedUserId;

    window.location.href = destinationURL;
});

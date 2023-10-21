const urlParams = new URLSearchParams(window.location.search);
const outputBox = document.getElementById("output");
const jsonDataString = urlParams.get('data');

// Decode the JSON data string and parse it into a JavaScript object
const jsonData = JSON.parse(decodeURIComponent(jsonDataString));

outputBox.innerHTML = jsonData.testmessage;
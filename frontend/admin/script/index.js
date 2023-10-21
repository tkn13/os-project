var button = document.getElementById("test-button");
var input = document.getElementById("name");

input.name

button.addEventListener('click', async () => {
    try {
        const res = await fetch('http://localhost:3000/test',{
            method : "GET"
        });

        // if (res.status !== 200) {
        //     alert('Something went wrong');
        //     return;
        // }

        const jsonData = await res.json();
        const jsonDataString = encodeURIComponent(JSON.stringify(jsonData));
        window.location.href = 'succesfully.html?data=' + jsonDataString;
    } catch (error) {
        console.error('An error occurred:', error);
    }
});
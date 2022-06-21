const button = document.querySelector("button");

button.addEventListener("click", function() {

    let userinput = document.getElementById("userinput").value;
    let url = "http://localhost:5050/fibonacci/" + userinput;
    
    fetch(url)
    .then(function(response) {
        return response.json();
    })

    .then(function(data) {
        let result = data.result;
         
        document.getElementById("fibonacci").innerHTML = `<strong><u>${result}</u></strong>`;
    })
})

const button = document.querySelector("button");
const fibonacci = document.getElementById("fibonacci");
const spinner = document.querySelector(".spinner-border");
const input = document.querySelector("input");
const nanTooltip = document.getElementById("nan-tooltip");
const maxTooltip = document.getElementById("max-tooltip");

button.addEventListener("click", function() {

    let userinput = document.getElementById("userinput").value;
    let url = "http://localhost:5050/fibonacci/" + userinput;
    const regex = /[0-9](?<!(-\d))/;

    fibonacci.innerHTML = ``;
    input.classList.remove("is-invalid");
    nanTooltip.classList.add("d-none");
    maxTooltip.classList.add("d-none");

    if (regex.test(userinput) === false) {
        input.classList.add("is-invalid");
        nanTooltip.classList.remove("d-none");
        return;
    }

    if (userinput > 50) {
        input.classList.add("is-invalid");
        maxTooltip.classList.remove("d-none");
        return;
    }

    spinner.classList.remove("d-none");

    setTimeout(function() {
        spinner.classList.add("d-none");
    }, "500");
    
    fetch(url)
    .then(function(response) {

        if (!response.ok) {
            throw "Server Error: 42 is the meaning of life";
        }

        return response.json();
    })

    .then(function(data) {

        let result = data.result;
         
        fibonacci.innerHTML = `<strong><u>${result}</u></strong>`;
    })

    .catch(function(error) {
        fibonacci.innerHTML = `<div class="text-danger fs-6">${error}</div>`;
    })
});

input.addEventListener("keyup", function(e) {
    if (e.key === "Enter") {
        e.preventDefault();
        button.click();
    }
});

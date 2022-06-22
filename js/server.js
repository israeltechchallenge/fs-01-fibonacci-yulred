const button = document.querySelector("button");
const fibonacci = document.getElementById("fibonacci");
const spinner = document.querySelector(".spinner-border");
const input = document.querySelector("input");
const nanTooltip = document.getElementById("nan-tooltip");
const maxTooltip = document.getElementById("max-tooltip");

button.addEventListener("click", function() {

    let userinput = document.getElementById("userinput").value;
    let url = "http://localhost:5050/fibonacci/" + userinput;
    const regex = /[0-9]/;

    fibonacci.innerHTML = ``
    input.classList.remove("is-invalid");
    nanTooltip.classList.add("hidden");
    maxTooltip.classList.add("hidden");

    if (regex.test(userinput) === false) {
        input.classList.add("is-invalid");
        nanTooltip.classList.remove("hidden");
        return;
    }

    if (userinput > 50) {
        input.classList.add("is-invalid");
        maxTooltip.classList.remove("hidden");
        return;
    }

    spinner.classList.remove("hidden");

    setTimeout(function() {
        spinner.classList.add("hidden");
    }, "500");
    
    fetch(url)
    .then(function(response) {

        if (!response.ok) {
            fibonacci.innerHTML = `<div class="text-danger error">Server Error: 42 is the meaning of life</div>`; 
        }

        return response.json();
    })

    .then(function(data) {

        let result = data.result;
         
        fibonacci.innerHTML = `<strong><u>${result}</u></strong>`;
    })
});

input.addEventListener("keyup", function(e) {
    if (e.key === "Enter") {
        e.preventDefault();
        button.click();
    }
});

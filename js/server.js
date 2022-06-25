const button = document.querySelector("button");
const input = document.querySelector("input");
const fibonacci = document.getElementById("fibonacci");
const fibonacciRes = document.getElementById("previous-res");
const spinnerOne = document.getElementById("spinner-one");
const spinnerTwo = document.getElementById("spinner-two");
const nanTooltip = document.getElementById("nan-tooltip");
const maxTooltip = document.getElementById("max-tooltip");

button.addEventListener("click", function() {

    let userinput = document.getElementById("userinput").value;
    const regex = /[0-9](?<!(-\d))/;

    fibonacci.innerHTML = ``;
    input.classList.remove("is-invalid");
    nanTooltip.classList.add("d-none");
    maxTooltip.classList.add("d-none");
    fibonacciRes.replaceChildren();

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

    spinnerOne.classList.remove("d-none");

    setTimeout(function() {
        spinnerOne.classList.add("d-none");
    }, "500");

    fetchResults();
});

input.addEventListener("keyup", function(e) {
    if (e.key === "Enter") {
        e.preventDefault();
        button.click();
    }
});

async function fetchResults() {

    let userinput = document.getElementById("userinput").value;
    let url = "http://localhost:5050/fibonacci/" + userinput;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw "Server Error: 42 is the meaning of life";
        }

        const data = await response.json();
    
        fibonacci.innerHTML = `<strong><u>${data.result}</u></strong>`;
        previousResults();
    }

    catch(error) {
        fibonacci.innerHTML = `<div class="text-danger fs-6">${error}</div>`;
    }
}

async function previousResults() {

    const url = "http://localhost:5050/getFibonacciResults";

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw Error(`${response.status}`);
        }

        const data = await response.json();

        let previousRes = data.results;

        previousRes.sort(function (a, b) {

            return a.createdDate - b.createdDate;
        });

        spinnerTwo.classList.remove("d-none");

        setTimeout(function() {
            spinnerTwo.classList.add("d-none");

            for (let i = 0; i < previousRes.length; i++) {
                let text = `<div class="border-bottom border-dark pt-1 pb-1">The Fibonnaci of <strong>${previousRes[i].number}</strong> is <strong>${previousRes[i].result}</strong>. Calculated at: ${new Date(previousRes[i].createdDate)}</div>`;
    
                fibonacciRes.insertAdjacentHTML("afterbegin", text);
            }
        }, "500");
    }

    catch(error) {
        fibonacciRes.innerHTML = `<div class="text-danger fs-6">${error}</div>`;
    }
}

previousResults();

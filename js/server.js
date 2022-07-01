const button = document.querySelector("button");
const input = document.querySelector("input");
const fibonacci = document.getElementById("fibonacci");
const fibonacciRes = document.getElementById("previous-res");
const spinnerOne = document.getElementById("spinner-one");
const tooltip = document.getElementById("tooltip");
const checkbox = document.querySelector(".form-check-input");
const select = document.getElementById("sort");
const userInput = document.getElementById("user-input");

button.addEventListener("click", function() {

    const regex = /[0-9](?<!(-\d))/;

    fibonacci.innerHTML = ``;
    input.classList.remove("is-invalid");
    tooltip.classList.add("d-none");
    tooltip.classList.add("d-none");

    if (regex.test(userInput.value) === false) {
        input.classList.add("is-invalid");
        tooltip.classList.remove("d-none");
        tooltip.innerText = `Must be a positive number.`;
        return;
    }

    if (userInput.value > 50) {
        input.classList.add("is-invalid");
        tooltip.classList.remove("d-none");
        tooltip.innerText = `Can't be larger than 50.`;
        return;
    }

    if (checkbox.checked) {
        spinnerOne.classList.remove("d-none");

        setTimeout(function() {
            spinnerOne.classList.add("d-none");
        }, "500");

        fetchResults();
    } else {
        calcFibonacci();
    }
});

input.addEventListener("keyup", function(e) {
    if (e.key === "Enter") {
        e.preventDefault();
        button.click();
    }
});

select.addEventListener("change", function() {
    fetchPreviousResults();
});

function calcFibonacci() {

    let num1 = 0;
    let num2 = 1;
    let fib = 0;

    for (let i = 2; i <= userInput.value; i++) {
        fib = num1 + num2;
        num1 = num2;
        num2 = fib;
    }

    fibonacci.innerHTML = `<strong><u>${num2}</u></strong>`;
};

const calcURL = "http://localhost:5050/fibonacci/";

async function fetchResults() {

    let url = calcURL + userInput.value;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw "Server Error: 42 is the meaning of life";
        }

        const data = await response.json();
    
        fibonacci.innerHTML = `<strong><u>${data.result}</u></strong>`;
        fetchPreviousResults();
    }

    catch(error) {
        fibonacci.innerHTML = `<div class="text-danger fs-6">${error}</div>`;
    }
};

const historyURL = "http://localhost:5050/getFibonacciResults";
const spinnerTwo = document.getElementById("spinner-two");

async function fetchPreviousResults() {

    try {
        const response = await fetch(historyURL);

        if (!response.ok) {
            throw Error(`${response.status}`);
        }

        const data = await response.json();

        let previousRes = data.results;

        previousRes.sort(function (a, b) {
            return a.createdDate - b.createdDate;
        });

        let selected = select.options[select.selectedIndex].value;

        if (selected === "number-asc") {
            previousRes.sort(function (a, b) {
                return b.number - a.number;
            })
        } else if (selected === "number-desc") {
            previousRes.sort(function (a, b) {
                return a.number - b.number;
            })
        } else if (selected === "date-asc") {
            previousRes.sort(function (a, b) {
                return b.createdDate - a.createdDate;
            })
        } else if (selected === "date-desc") {
            previousRes.sort(function (a, b) {
                return a.createdDate - b.createdDate;
            })
        }

        spinnerTwo.classList.remove("d-none");

        setTimeout(function() {
            spinnerTwo.classList.add("d-none");
            fibonacciRes.replaceChildren();

            for (let i = 0; i < previousRes.length; i++) {
                let text = `<div class="border-bottom border-dark pt-1 pb-1">The Fibonnaci of <strong>${previousRes[i].number}</strong> is <strong>${previousRes[i].result}</strong>. Calculated at: ${new Date(previousRes[i].createdDate)}</div>`;
    
                fibonacciRes.insertAdjacentHTML("afterbegin", text);
            }
        }, "500");
    }

    catch(error) {
        fibonacciRes.innerHTML = `<div class="text-danger fs-6">${error}</div>`;
    }
};

fetchPreviousResults();
const button = document.querySelector("button");
let x;

function fibonacci(x) {

    button.addEventListener("click", function() {

    let y = 1;
    let n = 0;
    let f = 0;

    x = document.getElementById("userinput").value;

    for (let i = 2; i <= x; i++) {
        f = n + y;
        n = y;
        y = f;
    }

    document.getElementById("fibonacci").innerHTML = `<strong><u>${y}</u></strong>`;
});
}

fibonacci(x);
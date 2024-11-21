"use strict";
function opslaan() {
    const nameElement = document.querySelector("#outingName");
    const buttonElement = document.querySelector("#outingButton");
    const resultElement = document.querySelector("#outingResult");
    buttonElement.addEventListener("click", () => {
        if (!nameElement.value) {
            resultElement.classList.add("error");
            resultElement.innerHTML = "Dat is geen geldige naam voor een uitje!";
        }
        else {
            const outingName = nameElement.value.trim().toLowerCase();
            const existingOutings = localStorage.getItem("namesOutings");
            let parsedOutings = [];
            if (existingOutings !== null) {
                parsedOutings = JSON.parse(existingOutings);
                if (parsedOutings.some(name => name.toLowerCase() === outingName)) {
                    resultElement.classList.add("error");
                    resultElement.innerHTML = "Deze naam bestaat al! Kies een andere naam.";
                    return;
                }
            }
            resultElement.classList.remove("error");
            resultElement.innerHTML = `Je uitje heet, ${nameElement.value.trim()}!`;
            localStorage.setItem("currentOuting", nameElement.value.trim());
            parsedOutings.push(nameElement.value.trim());
            localStorage.setItem("namesOutings", JSON.stringify(parsedOutings));
            setTimeout(() => {
                window.location.href = "namesOuting.html";
            }, 2000);
        }
    });
}
opslaan();

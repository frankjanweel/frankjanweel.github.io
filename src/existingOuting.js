"use strict";
function uitjes() {
    const naamHTML = document.querySelector("#namesOutings");
    const outings = (localStorage.getItem("namesOutings"));
    let parsedOutings;
    if (outings) {
        parsedOutings = JSON.parse(outings);
        parsedOutings.forEach(outing => {
            const div = document.createElement("p");
            const outingText = document.createElement("h2");
            outingText.textContent = outing;
            div.appendChild(outingText);
            const namesButton = document.createElement("button");
            namesButton.textContent = "Namen";
            namesButton.onclick = () => {
                localStorage.setItem("currentOuting", outing);
                window.location.href = "namesOuting.html";
            };
            div.appendChild(namesButton);
            const costsButton = document.createElement("button");
            costsButton.textContent = "Kosten";
            costsButton.onclick = () => {
                localStorage.setItem("currentOuting", outing);
                window.location.href = "madeCosts.html";
            };
            div.appendChild(costsButton);
            const totalButton = document.createElement("button");
            totalButton.textContent = "Totalen";
            totalButton.onclick = () => {
                localStorage.setItem("currentOuting", outing);
                window.location.href = "totalCosts.html";
            };
            div.appendChild(totalButton);
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Verwijder";
            deleteButton.classList.add("deleteButton");
            deleteButton.onclick = () => {
                localStorage.removeItem("currentOuting");
                localStorage.removeItem(`allNames ${outing}`);
                localStorage.removeItem(`madeCosts ${outing}`);
                parsedOutings = parsedOutings.filter(name => name !== outing);
                const updatedNamesOutings = JSON.stringify(parsedOutings);
                localStorage.setItem("namesOutings", updatedNamesOutings);
                window.location.href = "existingOuting.html";
            };
            div.appendChild(deleteButton);
            naamHTML.appendChild(div);
        });
    }
    else {
        naamHTML.innerHTML = "Je hebt nog geen uitje opgeslagen!";
    }
}
uitjes();

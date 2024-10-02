opslaan();

function opslaan(): void {
    const naamElement: HTMLInputElement = document.querySelector("#uitjeNaam")!;
    const knopElement: HTMLButtonElement = document.querySelector("#uitjeKnop")!;
    const resultaatElement: HTMLDivElement = document.querySelector("#uitjeResultaat")!;

    knopElement.addEventListener("click", () => {
        if (!naamElement.value) {
            resultaatElement.classList.add("error");
            resultaatElement.innerHTML = "Dat is geen geldige naam voor een uitje!";
        }
        else {
            resultaatElement.classList.remove("error");
            resultaatElement.innerHTML = `Je uitje heet, ${naamElement.value}!`;
            localStorage.setItem("Naam uitje", naamElement.value);
        }
    });
}

/* import fs from "fs";

const uitje: HTMLInputElement = document.querySelector("uitjeNaam")!;

const uitjeJson: string = JSON.stringify(uitje, null, 2);

fs.writeFile("uitje.json", uitjeJson, err => {
    if (err) {
        console.log("Error writing file:", err);
    }
    else {
        console.log("Succesfully wrote file");
    }
});
*/

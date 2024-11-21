"use strict";
function naamUitje1() {
    const nameOuting = localStorage.getItem("currentOuting");
    const nameHtml = document.querySelector("#currentOuting");
    if (nameOuting) {
        nameHtml.innerHTML = `Je bent bezig met ${nameOuting}`;
    }
    else {
        nameHtml.innerHTML = "Naam niet gevonden in localstorage";
    }
}
function createInputField(value = "", placeholder = "Voer een naam in") {
    const inputContainer = document.createElement("div");
    const newInput = document.createElement("input");
    newInput.type = "text";
    newInput.value = value;
    newInput.placeholder = placeholder;
    newInput.classList.add("dynamicInput");
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("deleteButton");
    const deleteImage = document.createElement("img");
    deleteImage.src = "assets/img/bin.png";
    deleteImage.alt = "Delete";
    deleteImage.style.width = "32px";
    deleteImage.style.height = "32px";
    deleteImage.style.cursor = "pointer";
    deleteButton.appendChild(deleteImage);
    deleteButton.addEventListener("click", () => {
        inputContainer.remove();
    });
    inputContainer.appendChild(newInput);
    inputContainer.appendChild(deleteButton);
    return inputContainer;
}
function names() {
    const addName = document.querySelector("#addName");
    const save = document.querySelector("#save");
    const result = document.querySelector("#result");
    const inputContainer = document.querySelector("#inputContainer");
    const nameOuting = localStorage.getItem("currentOuting");
    const storedNamesJson = localStorage.getItem(`allNames ${nameOuting}`);
    if (storedNamesJson) {
        const storedNames = JSON.parse(storedNamesJson);
        if (Array.isArray(storedNames) && storedNames.every(item => typeof item === "string")) {
            for (let i = 0; i < storedNames.length; i++) {
                const newInputContainer = createInputField(storedNames[i]); // Create input with stored value
                inputContainer.appendChild(newInputContainer);
            }
        }
    }
    else {
        inputContainer.appendChild(createInputField());
        inputContainer.appendChild(createInputField());
    }
    addName.addEventListener("click", () => {
        const newInputContainer = createInputField();
        inputContainer.appendChild(newInputContainer);
    });
    save.addEventListener("click", () => {
        const allInputFields = Array.from(inputContainer.getElementsByTagName("input"));
        const filledNames = allInputFields
            .filter(input => input === null || input === void 0 ? void 0 : input.value)
            .map(input => input.value.trim());
        const lowerCaseNames = filledNames.map(name => name.toLowerCase());
        const uniqueNames = new Set(lowerCaseNames);
        if (filledNames.length < 2) {
            result.classList.add("error");
            result.innerHTML = "Voer minimaal twee namen in!";
            return;
        }
        if (uniqueNames.size !== filledNames.length) {
            result.classList.add("error");
            result.innerHTML = "Dubbele namen zijn niet toegestaan!";
            return;
        }
        const nameOuting = localStorage.getItem("currentOuting");
        localStorage.setItem(`allNames ${nameOuting}`, JSON.stringify(filledNames));
        result.classList.remove("error");
        result.innerHTML = "Namen succesvol opgeslagen";
        setTimeout(() => {
            window.location.href = "madeCosts.html";
        }, 1500);
    });
}
naamUitje1();
names();

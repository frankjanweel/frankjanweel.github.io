"use strict";
function naamUitje2() {
    const nameOuting = localStorage.getItem("currentOuting");
    const nameHtml = document.querySelector("#currentOuting");
    if (nameOuting) {
        nameHtml.innerHTML = `Je bent bezig met ${nameOuting}`;
    }
    else {
        nameHtml.innerHTML = "Naam niet gevonden in localstorage";
    }
}
function addNewCostEntry(inputContainer, nameOuting) {
    const inputGroup = document.createElement("div");
    inputGroup.classList.add("dynamicEntry");
    const newDate = document.createElement("input");
    newDate.type = "date";
    newDate.classList.add("dynamicDate");
    const newDescription = document.createElement("input");
    newDescription.type = "text";
    newDescription.classList.add("dynamicDescription");
    const newCost = document.createElement("input");
    newCost.type = "number";
    newCost.classList.add("dynamicCost");
    newCost.placeholder = "Bedrag";
    newDescription.placeholder = "Beschrijving";
    const newDropdown = document.createElement("select");
    newDropdown.classList.add("dynamicDropdown");
    const placeholderOption = document.createElement("option");
    placeholderOption.value = "";
    placeholderOption.textContent = "Kies de betaler";
    placeholderOption.disabled = true;
    placeholderOption.selected = true;
    newDropdown.appendChild(placeholderOption);
    const newDropdownContainer = document.createElement("div");
    newDropdownContainer.classList.add("checkbox-dropdown");
    const newDropdownButton = document.createElement("button");
    newDropdownButton.textContent = "Kies deelnemers";
    newDropdownButton.classList.add("dropdown-button");
    const newCheckboxContainer = document.createElement("div");
    newCheckboxContainer.classList.add("checkbox-container");
    newCheckboxContainer.style.display = "none";
    const participantData = localStorage.getItem(`allNames ${nameOuting}`);
    if (participantData) {
        const participants = JSON.parse(participantData);
        participants.forEach(participant => {
            const newOption = document.createElement("option");
            newOption.value = participant;
            newOption.textContent = participant;
            newDropdown.appendChild(newOption);
            const checkboxContainer = document.createElement("div");
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.value = participant;
            checkbox.checked = true;
            const label = document.createElement("label");
            label.appendChild(checkbox);
            label.appendChild(document.createTextNode(participant));
            checkboxContainer.appendChild(label);
            newCheckboxContainer.appendChild(checkboxContainer);
        });
    }
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("deleteButton");
    deleteButton.innerHTML = "<img src=\"assets/img/bin.png\" alt=\"Delete\" style=\"width: 32px; height: 32px; cursor: pointer;\">";
    deleteButton.addEventListener("click", () => {
        inputGroup.remove();
    });
    inputGroup.appendChild(newDate);
    inputGroup.appendChild(newDescription);
    inputGroup.appendChild(newCost);
    inputGroup.appendChild(newDropdown);
    newDropdownContainer.appendChild(newDropdownButton);
    newDropdownContainer.appendChild(newCheckboxContainer);
    inputGroup.appendChild(newDropdownContainer);
    inputGroup.appendChild(deleteButton);
    inputContainer.appendChild(inputGroup);
    newDropdownButton.addEventListener("click", event => {
        event.stopPropagation();
        newCheckboxContainer.style.display = newCheckboxContainer.style.display === "block" ? "none" : "block";
    });
    window.addEventListener("click", event => {
        if (event.target !== newDropdownButton && !newCheckboxContainer.contains(event.target)) {
            newCheckboxContainer.style.display = "none";
        }
    });
}
function costs() {
    const addCost = document.querySelector("#addCostButton");
    const inputContainer = document.querySelector("#inputContainer");
    const save = document.querySelector("#save");
    const result = document.querySelector("#result");
    const nameOuting = localStorage.getItem("currentOuting");
    const storedData = localStorage.getItem(`madeCosts ${nameOuting}`);
    if (storedData) {
        const allData = JSON.parse(storedData);
        allData.forEach(costData => {
            addNewCostEntry(inputContainer, nameOuting);
            const inputGroup = inputContainer.lastElementChild;
            const dateField = inputGroup.querySelector(".dynamicDate");
            const descriptionField = inputGroup.querySelector(".dynamicDescription");
            const costField = inputGroup.querySelector(".dynamicCost");
            const dropdownField = inputGroup.querySelector(".dynamicDropdown");
            dateField.value = costData.Date;
            descriptionField.value = costData.Description;
            costField.value = costData.Cost;
            dropdownField.value = costData.Name;
            const checkboxes = inputGroup.querySelectorAll("input[type='checkbox']");
            checkboxes.forEach(checkbox => {
                if (costData.Participants.includes(checkbox.value)) {
                    console.log(checkbox.value);
                    checkbox.checked = true;
                }
            });
        });
    }
    else {
        addNewCostEntry(inputContainer, nameOuting);
    }
    addCost.addEventListener("click", () => {
        addNewCostEntry(inputContainer, nameOuting);
    });
    save.addEventListener("click", function () {
        const costsData = [];
        let errorMessage = "";
        const inputGroups = inputContainer.querySelectorAll(".dynamicEntry");
        inputGroups.forEach((inputGroup, index) => {
            const dateField = inputGroup.querySelector(".dynamicDate");
            const descriptionField = inputGroup.querySelector(".dynamicDescription");
            const costField = inputGroup.querySelector(".dynamicCost");
            const dropdownField = inputGroup.querySelector(".dynamicDropdown");
            const selectedParticipants = [];
            const checkboxes = inputGroup.querySelectorAll("input[type='checkbox']:checked");
            checkboxes.forEach(checkbox => {
                selectedParticipants.push(checkbox.value);
            });
            if (!dateField.value || !descriptionField.value || !costField.value || !dropdownField.value) {
                errorMessage += `Voer alle velden in voor invoer: ${index + 1}<br>`;
            }
            else if (parseFloat(costField.value) <= 0) {
                errorMessage += `Voer een positief bedrag in voor invoer: ${index + 1}<br>`;
            }
            const costEntry = {
                Date: dateField.value,
                Description: descriptionField.value,
                Cost: costField.value,
                Name: dropdownField.value,
                Participants: selectedParticipants,
            };
            costsData.push(costEntry);
        });
        if (errorMessage) {
            result.innerHTML = `<span style="color: red;">${errorMessage}</span>`;
            return;
        }
        localStorage.setItem(`madeCosts ${nameOuting}`, JSON.stringify(costsData));
        result.innerHTML = "Kosten opgeslagen!";
        setTimeout(() => {
            window.location.href = "totalCosts.html";
        }, 1500);
    });
}
naamUitje2();
costs();

var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
function naamUitje() {
    var naamUitje = localStorage.getItem("Naam uitje");
    var naamHTML = document.querySelector("#NaamUitje");
    if (naamUitje) {
        naamHTML.innerHTML = "Je bent bezig met ".concat(naamUitje);
    }
    else {
        naamHTML.innerHTML = "Naam niet gevonden in localstorage";
    }
}
function namen() {
    var nameOne = document.querySelector("#nameOne");
    var nameTwo = document.querySelector("#nameTwo");
    var addName = document.querySelector("#addName");
    var opslaan = document.querySelector("#opslaan");
    var resultaat = document.querySelector("#resultaat");
    var inputContainer = document.querySelector("#inputContainer");
    var saveNames = function () {
        resultaat === null || resultaat === void 0 ? void 0 : resultaat.classList.remove("error");
        resultaat.innerHTML = "";
        var allInputFields = __spreadArray([
            nameOne,
            nameTwo
        ], Array.from((inputContainer === null || inputContainer === void 0 ? void 0 : inputContainer.getElementsByTagName("input")) || []), true);
        var filledNames = allInputFields
            .filter(function (input) { return input === null || input === void 0 ? void 0 : input.value; })
            .map(function (input) { return input.value.trim(); });
        var lowerCaseNames = filledNames.map(function (name) { return name.toLowerCase(); });
        var uniqueNames = new Set(lowerCaseNames);
        if (filledNames.length < 2) {
            resultaat === null || resultaat === void 0 ? void 0 : resultaat.classList.add("error");
            resultaat.innerHTML = "Voer minimaal twee namen in!";
            return;
        }
        if (uniqueNames.size !== filledNames.length) {
            resultaat === null || resultaat === void 0 ? void 0 : resultaat.classList.add("error");
            resultaat.innerHTML = "Dubbele namen zijn niet toegestaan!";
            return;
        }
        filledNames.forEach(function (name, index) {
            localStorage.setItem("name".concat(index + 1), name);
        });
        window.location.href = "gemaakteKosten.html";
    };
    var addInputField = function () {
        if (inputContainer) {
            var newInput = document.createElement("input");
            newInput.type = "text";
            var currentInputCount = inputContainer.getElementsByTagName("input").length + 3;
            newInput.placeholder = "Voer een naam in ".concat(currentInputCount);
            newInput.classList.add("dynamic-input");
            inputContainer.appendChild(newInput);
        }
    };
    opslaan === null || opslaan === void 0 ? void 0 : opslaan.addEventListener("click", saveNames);
    addName === null || addName === void 0 ? void 0 : addName.addEventListener("click", addInputField);
}
naamUitje();
namen();

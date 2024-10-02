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
naamUitje();

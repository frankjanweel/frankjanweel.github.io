function naamUitje(): void {
    const naamUitje: string = localStorage.getItem("Naam uitje")!;
    const naamHTML: HTMLDivElement = document.querySelector("#NaamUitje")!;
    if (naamUitje) {
        naamHTML.innerHTML = `Je bent bezig met ${naamUitje}`;
    }
    else {
        naamHTML.innerHTML = "Naam niet gevonden in localstorage";
    }
}

naamUitje();

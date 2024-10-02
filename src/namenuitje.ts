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

function namen(): void {
    const nameOne: HTMLInputElement | null = document.querySelector<HTMLInputElement>("#nameOne");
    const nameTwo: HTMLInputElement | null = document.querySelector<HTMLInputElement>("#nameTwo");
    const addName: HTMLButtonElement | null = document.querySelector<HTMLButtonElement>("#addName");
    const opslaan: HTMLButtonElement | null = document.querySelector<HTMLButtonElement>("#opslaan");
    const resultaat: HTMLDivElement | null = document.querySelector<HTMLDivElement>("#resultaat");
    const inputContainer: HTMLDivElement | null = document.querySelector<HTMLDivElement>("#inputContainer");

    const saveNames: () => void = (): void => {
        resultaat?.classList.remove("error");
        resultaat!.innerHTML = "";

        const allInputFields: (HTMLInputElement | null)[] = [
            nameOne,
            nameTwo,
            ...Array.from(inputContainer?.getElementsByTagName("input") || []),
        ];

        const filledNames: string[] = allInputFields
            .filter(input => input?.value)
            .map(input => input!.value.trim());

        const lowerCaseNames: string[] = filledNames.map(name => name.toLowerCase());

        const uniqueNames: Set<string> = new Set(lowerCaseNames);

        if (filledNames.length < 2) {
            resultaat?.classList.add("error");
            resultaat!.innerHTML = "Voer minimaal twee namen in!";
            return;
        }

        if (uniqueNames.size !== filledNames.length) {
            resultaat?.classList.add("error");
            resultaat!.innerHTML = "Dubbele namen zijn niet toegestaan!";
            return;
        }

        filledNames.forEach((name, index) => {
            localStorage.setItem(`name${index + 1}`, name);
        });

        window.location.href = "gemaakteKosten.html";
    };

    const addInputField: () => void = (): void => {
        if (inputContainer) {
            const newInput: HTMLInputElement = document.createElement("input");
            newInput.type = "text";

            const currentInputCount: number = inputContainer.getElementsByTagName("input").length + 3;
            newInput.placeholder = `Voer een naam in ${currentInputCount}`;
            newInput.classList.add("dynamic-input");

            inputContainer.appendChild(newInput);
        }
    };

    opslaan?.addEventListener("click", saveNames);

    addName?.addEventListener("click", addInputField);
}

naamUitje();
namen();

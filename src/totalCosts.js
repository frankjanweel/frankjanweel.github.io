"use strict";
function naamUitje3() {
    const nameOuting = localStorage.getItem("currentOuting");
    const nameHtml = document.querySelector("#currentOuting");
    if (nameOuting) {
        nameHtml.innerHTML = `Je bent bezig met ${nameOuting}`;
    }
    else {
        nameHtml.innerHTML = "Naam niet gevonden in localstorage";
    }
}
function totalCosts() {
    const totalContainer = document.querySelector("#totalContainer");
    const totalPaid = document.querySelector("#totalPaid");
    const paidPerName = document.querySelector("#paidPerName");
    const nameOuting = localStorage.getItem("currentOuting");
    const costs = localStorage.getItem(`madeCosts ${nameOuting}`);
    let totalAmountPaid = 0;
    const totalAmountPaidPerName = {};
    const totalOwedPerParticipant = {};
    const debts = {};
    let parsedCosts = [];
    if (costs) {
        parsedCosts = JSON.parse(costs);
        parsedCosts.forEach(cost => {
            var _a;
            const costNumber = parseFloat(cost.Cost);
            totalAmountPaid += costNumber;
            const numberOfParticipants = cost.Participants.length;
            const averagePerParticipant = costNumber / numberOfParticipants;
            totalAmountPaidPerName[cost.Name] = ((_a = totalAmountPaidPerName[cost.Name]) !== null && _a !== void 0 ? _a : 0) + costNumber;
            cost.Participants.forEach(participant => {
                var _a, _b, _c;
                var _d, _e;
                (_a = debts[participant]) !== null && _a !== void 0 ? _a : (debts[participant] = {});
                (_b = (_d = debts[participant])[_e = cost.Name]) !== null && _b !== void 0 ? _b : (_d[_e] = 0);
                totalOwedPerParticipant[participant] = ((_c = totalOwedPerParticipant[participant]) !== null && _c !== void 0 ? _c : 0) + averagePerParticipant;
                if (participant !== cost.Name) {
                    debts[participant][cost.Name] += averagePerParticipant;
                }
            });
            const div = document.createElement("p");
            div.textContent = `Datum: ${cost.Date}, Omschrijving: ${cost.Description}, Kosten: €${cost.Cost}, Betaler: ${cost.Name}, Deelnemers: ${cost.Participants.join(", ")}`;
            totalContainer.appendChild(div);
        });
        totalPaid.innerHTML = `Totaal betaald: €${totalAmountPaid.toFixed(2)}`;
    }
    for (const debtor in debts) {
        for (const creditor in debts[debtor]) {
            const amount = debts[debtor][creditor];
            if (amount > 0) { // Only show positive debts
                const debtDiv = document.createElement("p");
                debtDiv.textContent = `${debtor} moet €${amount.toFixed(2)} betalen aan ${creditor}`;
                paidPerName.appendChild(debtDiv);
            }
        }
    }
}
naamUitje3();
totalCosts();

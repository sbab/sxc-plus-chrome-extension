function get_element_from_string(s) {
    let div = document.createElement("div");
    div.innerHTML = s.trim();
    return div.firstChild;
}

async function checkCardState(transaction_id, date) {
    let cardStates = await getAllCardStates();

    if (!(transaction_id in cardStates)) {
        let hisDate = new Date(date);
        let now = new Date();

        let newState = (hisDate < now ? 1 : 0);

        await setCardState(transaction_id, newState);
    }
}

function toggleCardState(state) {
    switch (state) {
        case 0: //inattiva
            return 0;
        case 1: //attiva, non usata
            return 2;
        case 2: //attiva, usata
            return 1;
        default:
            console.error("toggleCardState in errore");
    }
}

async function setCardColor(button, state) {
    let parente = button.parentNode.parentNode

    switch (state) {
        case 0: //inattiva
            parente.style.background = "";
            break;
        case 1: //attiva, non usata
            parente.style.background = "LightGreen";
            break;
        case 2: //attiva, usata
            parente.style.background = "DarkSalmon";            
            if (await getHideUsedCards()) {
                parente.setAttribute("hidden", "hidden");
            } else {
                parente.removeAttribute("hidden");
            }
            break;
        default:
            console.error("setCardColor in errore");
    }
}

async function spuntalo_listener(event) {
    let button = event.currentTarget;
    let transaction_id = button.attributes["transactionId"].value;
    
    let oldCardState = await getCardState(transaction_id);
    let newCardState = toggleCardState(oldCardState);

    await setCardState(transaction_id, newCardState);
    await setCardColor(button, newCardState);
}

async function updateCardsList() {
    let butt = $("voucher-download-button");
    
    let par = butt.parent(":not(:has(div.sxc-plus-menu))");
    let parpar = butt.parent().parent();
    
    for (let i = 0; i < par.length; i++) {
        let currentVDButton = par[i].getElementsByTagName("voucher-download-button")[0];
        let purchaseData = JSON.parse(currentVDButton.attributes["purchase-data"].value);
        let transactionId = purchaseData.transaction_id;
        let activeDate = purchaseData.active_date;

        await checkCardState(transactionId, activeDate);

        let cardState = await getCardState(transactionId);
        await setCardColor(currentVDButton, cardState);

        let newMenu = getNewMenu("sxcPlusMenu" + transactionId);

        let newButton = getNewButton("sxcPlusButton" + transactionId, "Usata", spuntalo_listener);
        newButton.attributes["transactionId"] = transactionId;        
        newMenu.insertBefore(newButton, null);
        
        par[i].insertBefore(newMenu, null);
    }

    // par.append(async function (index, html) {
    //     let currentVDButton = $("voucher-download-button", html)
    //     let purchaseData = JSON.parse(currentVDButton.attr("purchase-data"));
    //     let transactionId = purchaseData.transaction_id;

    //     await checkCardState(transactionId);

    //     let cardState = await getCardState(transactionId);
    //     await setCardColor(currentVDButton);

    //     let newMenu = getNewMenu("sxcPlusMenu" + transactionId);

    //     newMenu.insertBefore(getNewTooltip("spuntalo", "spuntalo sì"));
        
    //     return newMenu;
    // });
    
    parpar.css("margin", "0");
    parpar.css("padding", "20");
    
    // if (butt.parent().children("button").length == 0) {
    //     for (let i = 0; i < butt.length; i++) {
    //         let pData = JSON.parse(butt[i].attributes["purchase-data"].value);

    //         await checkCardState(pData.transaction_id, pData.active_date);
            
    //         let cardState = await getCardState(pData.transaction_id);
    //         await setCardColor(butt[i], cardState);

    //         let newButton = get_element_from_string("<button transaction_id=\"" + pData.transaction_id + "\">Spuntalo</button>");
    //         newButton.addEventListener("click", spuntalo_listener);
    //         butt[i].parentNode.insertBefore(newButton, null);
    //     }
    // }
}

async function loop (ms) {
    while (true) {
        await new Promise(resolve => setTimeout(resolve, ms));
        await updateCardsList();
    }
}

loop(200);
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
    let transaction_id = button.attributes["transaction_id"].value;
    
    let oldCardState = await getCardState(transaction_id);
    let newCardState = toggleCardState(oldCardState);

    await setCardState(transaction_id, newCardState);
    await setCardColor(button, newCardState);
}

async function update_cards_list() {
    let butt = $("voucher-download-button");
    
    let par = butt.parent().parent();
    
    //par.children(".col-md-8").removeClass("col-md-8").addClass("col-md-7");
    par.css("margin", "0");
    par.css("padding", "20");
    
    if (butt.parent().children("button").length == 0) {
        for (let i = 0; i < butt.length; i++) {
            let pData = JSON.parse(butt[i].attributes["purchase-data"].value);

            await checkCardState(pData.transaction_id, pData.active_date);
            
            let cardState = await getCardState(pData.transaction_id);
            await setCardColor(butt[i], cardState);

            let newButton = get_element_from_string("<button transaction_id=\"" + pData.transaction_id + "\">Spuntalo</button>");
            newButton.addEventListener("click", spuntalo_listener);
            butt[i].parentNode.insertBefore(newButton, null);
        }
    }
}

setInterval(update_cards_list, 100);
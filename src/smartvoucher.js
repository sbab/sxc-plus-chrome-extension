function get_element_from_string(s) {
    let div = document.createElement("div");
    div.innerHTML = s.trim();
    return div.firstChild;
}

function getDataAttivazione(numGiorni) {
    if (numGiorni == null || typeof numGiorni != "number") {
        throw "getDataAttivazione()";
    }

    let dataAttiv = new Date();
    let giorniRimanenti = numGiorni;

    while (giorniRimanenti > 0) {
        if (dataAttiv.getDay() <= 4) {
            giorniRimanenti -= 1;
        }

        dataAttiv.setDate(dataAttiv.getDate() + 1);
    }

    let lpad = (num) => (num < 10 ? "0" + num : "" + num);
    
    return lpad(dataAttiv.getDate()) + "/" + lpad(dataAttiv.getMonth() + 1) + "/" + dataAttiv.getFullYear();    
}

function updateTooltips () {
    let promoClaims = $("div.promo-claim");

    if (promoClaims.length == 1) {
        if (promoClaims.children("#sxc-plus-promo-claim-menu").length == 0) {
            let promoText = promoClaims[0].innerText;
            let promoRegexp = /Attivazione \d+/g

            if (promoRegexp.test(promoText)) {
                let promoMatches = promoText.match(promoRegexp);
                
                if (promoMatches.length == 1) {
                    let giorniLav = parseInt(promoMatches[0].match(/\d+/)[0]);
                    let dataAttivazioneMessage = "Se acquistata oggi, questa card sarà disponibile il giorno " + getDataAttivazione(giorniLav);

                    let newMenu = getNewMenu("sxc-plus-promo-claim-menu");

                    newMenu.insertBefore(getNewTooltip("Data attivazione", dataAttivazioneMessage), null);

                    promoClaims[0].insertBefore(newMenu, null);
                }
            }
        }
    }
}

setInterval(updateTooltips, 100);
function get_element_from_string(s) {
    let div = document.createElement("div");
    div.innerHTML = s.trim();
    return div.firstChild;
}

function getDataAttivazione(numGiorni) {
    if (numGiorni == null || typeof numGiorni != "number") {
        throw "getDataAttivazione()";
    }

    const isFestaComandata = function (gg, mm) {
        if (gg == null || typeof gg != "number" || mm == null || typeof mm != "number") {
            throw "isFestaComandata()";
        }
        
        switch ("" + mm + "/" + gg) {
            case "1/1":
            case "1/6":
            case "4/25":
            case "5/1":
            case "6/2":
            case "8/15":
            case "11/1":
            case "12/8":
            case "12/25":
            case "12/26":
                return true;
            default:
                return false;
        }
    }

    let dataAttiv = new Date();
    let giorniRimanenti = numGiorni;

    while (giorniRimanenti > 0) {
        if (!(dataAttiv.getDay() > 4) && !isFestaComandata(dataAttiv.getDate(), dataAttiv.getMonth() + 1)) {
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
        if (promoClaims.children("span.smartvoucher-activation-date-tooltip").length == 0) {
            let promoText = promoClaims[0].innerText;
            let promoRegexp = /Attivazione \d+/g

            if (promoRegexp.test(promoText)) {
                let promoMatches = promoText.match(promoRegexp);
                
                if (promoMatches.length == 1) {
                    let giorniLav = parseInt(promoMatches[0].match(/\d+/)[0]);

                    let newTooltip = get_element_from_string("<span class=\"smartvoucher-activation-date-tooltip\">Se comprata oggi, la card sarà attiva in data " + getDataAttivazione(giorniLav) + "<span>");
                    promoClaims[0].insertBefore(newTooltip, null);
                }
            }
        }
    }

    console.log("culo");
}

setInterval(updateTooltips, 100);
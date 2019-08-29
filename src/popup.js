async function initializePopup() {
    let checkboxHide = $("#hideUsedCards");
    
    //checkboxHide
    if (await getHideUsedCards()) {
        checkboxHide.attr("checked", "checked");
    } else {
        checkboxHide.removeAttr("checked");
    }

    checkboxHide.on("change", async function(event) {
        await setHideUsedCards(event.currentTarget.checked ? true : false);
    });
   
}

$().ready(initializePopup);
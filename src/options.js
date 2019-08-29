function verifyConfig (config) {
    let parsedConfig;

    try {
        parsedConfig = JSON.parse(config);

        if (parsedConfig == null || typeof parsedConfig != "object") {
            return false;
        }
    } catch (e) {
        return false;
    }

    if (parsedConfig.hideUsedCards == null || typeof parsedConfig.hideUsedCards != "boolean") {
        return false;
    }

    if (parsedConfig.cardStates == null || typeof parsedConfig.cardStates != "object") {
        return false;
    } else {
        for (let key in parsedConfig.cardStates) {
            if (!/^\d+$/.test(key)) {
                return false;
            }
            
            switch (parsedConfig.cardStates[key]) {
                case 0:
                case 1:
                case 2:                    
                    break;
                default:
                    return false;
            }
        }
    }

    return true;
}

async function initializeOptions() {
    let checkboxHide = $("#hideUsedCards");
    let exportButton = $("#exportButton");
    let importFile = $("#importFile");
    let importButton = $("#importButton");
    let importResult = $("#importResult");

    //checkboxHide
    if (await getHideUsedCards()) {
        checkboxHide.attr("checked", "checked");
    } else {
        checkboxHide.removeAttr("checked");
    }

    checkboxHide.on("change", async function(event) {
        await setHideUsedCards(event.currentTarget.checked ? true : false);
    });

    //exportButton
    exportButton.on("click", async function (event) {
        let storage = await getStorage();

        let d = new Date();
        let pad = (num) => (num < 10 ? "0" + num : num)
        let datestamp = "" + d.getFullYear() + pad(d.getMonth() + 1) + pad(d.getDate())
        let hourstamp = "" + pad(d.getHours()) + pad(d.getMinutes()) + pad(d.getSeconds());

        chrome.downloads.download({
            url:"data:application/json;base64," + btoa(JSON.stringify(storage)),
            filename:"SXC-plus-exported-data-" + datestamp + "_" + hourstamp + ".sxc"
        });
    });   

    //importFile
    importFile.on("change", async function (event) {
        let file = event.currentTarget.files[0];
        
        if (file) {
            let reader = new FileReader();

            reader.onload = function () {
                if (verifyConfig(reader.result)) {
                    importResult.removeClass();
                    importResult.addClass("successMessage");
                    importResult.text("File input valido");
                    importButton.removeAttr("disabled");
                } else {
                    importResult.removeClass();
                    importResult.addClass("errorMessage");
                    importResult.text("File input non valido");
                    importButton.attr("disabled", "disabled");
                }
            }

            reader.readAsText(file);
        }   
    });

    //importResult
    importResult.addClass("hiddenMessage");

    //importButton
    importButton.attr("disabled", "disabled");
    
    importButton.on("click", function () {
        let file = $("#importFile")[0].files[0];
        
        if (file) {
            let reader = new FileReader();

            reader.onload = async function () {
                if (verifyConfig(reader.result)) {
                    let parsedConfig = JSON.parse(reader.result);
                    await setStorage(parsedConfig);
                    chrome.extension.getBackgroundPage().alert("File di configurazione importato con successo.");
                }
            }

            reader.readAsText(file);
        }  
    });
}

$().ready(initializeOptions);